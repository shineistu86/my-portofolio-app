// Serverless API route: renders a Roblox user's current avatar.
//
//   GET /api/roblox-avatar?username=shineistu86
//     → { userId, displayName, username, avatarUrl }
//   GET /api/roblox-avatar?id=123456
//     → image/png (proxied render so the browser never hits Roblox CORS)
//
// Uses Roblox's official public endpoints:
//   POST https://users.roblox.com/v1/usernames/users
//   GET  https://thumbnails.roblox.com/v1/users/avatar?userIds=...
export default async function handler(req, res) {
  const { username, id } = req.query

  try {
    if (id) {
      const thumbRes = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar?userIds=${encodeURIComponent(
          id
        )}&size=420x420&format=Png&isCircular=false`
      )
      const thumbData = await thumbRes.json()
      const imageUrl = thumbData?.data?.[0]?.imageUrl
      if (!imageUrl) {
        return res.status(502).json({ error: 'render_failed' })
      }
      const imgRes = await fetch(imageUrl)
      const buffer = Buffer.from(await imgRes.arrayBuffer())
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).send(buffer)
    }

    if (!username || !/^[A-Za-z0-9_]{3,20}$/.test(username)) {
      return res.status(400).json({ error: 'invalid_username' })
    }

    const usersRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    })
    if (!usersRes.ok) {
      return res.status(502).json({ error: 'roblox_error' })
    }
    const usersData = await usersRes.json()
    const user = usersData?.data?.[0]
    if (!user) {
      return res.status(404).json({ error: 'not_found' })
    }

    return res.status(200).json({
      userId: user.id,
      displayName: user.displayName,
      username: user.name,
      avatarUrl: `/api/roblox-avatar?id=${user.id}`,
    })
  } catch {
    return res.status(500).json({ error: 'server_error' })
  }
}
