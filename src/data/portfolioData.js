export const portfolioData = {
  profile: {
    name: 'Hisyam Eka Pramudita',
    title: 'Data Analyst & Information Systems Student',
    description:
      'Information Systems student focusing on data analytics, machine learning, and business intelligence. Experienced in geospatial data processing, clustering, statistical analysis, and interactive dashboard development.',
    email: 'syamjoj@gmail.com',
    location: 'Garut, West Java, Indonesia',
    heroRoles: [
      'Data Analyst',
      'Data Science Student',
      'GIS & Dashboard Enthusiast',
      'Teaching Assistant',
    ],
  },
  education: [
    {
      institution: 'Institut Teknologi Garut',
      program: 'Information Systems',
      year: '2023 – Present',
    },
  ],
  coursework: [
    'Data Analytics',
    'Database Concepts',
    'Database Systems',
    'Statistics & Probability',
    'Business Statistics',
    'Systems Analysis & Design',
    'Web Development',
  ],
  skills: {
    programming: [
      { name: 'Python', level: 85 },
      { name: 'SQL', level: 75 },
      { name: 'JavaScript', level: 70 },
      { name: 'HTML/CSS', level: 75 },
    ],
    dataScience: [
      { name: 'Pandas', level: 85 },
      { name: 'GeoPandas', level: 75 },
      { name: 'Scikit-learn', level: 75 },
      { name: 'Matplotlib & Seaborn', level: 80 },
    ],
    tools: [
      { name: 'Power BI', level: 80 },
      { name: 'Looker Studio', level: 75 },
      { name: 'RapidMiner', level: 75 },
      { name: 'Streamlit', level: 80 },
      { name: 'Colab', level: 85 },
    ],
    design: [
      { name: 'Figma', level: 70 },
      { name: 'Canva', level: 80 },
    ],
  },
  experience: [
    {
      organization: 'BAPENDA Kabupaten Garut',
      position: 'Intern — Technology & Information Division',
      title: 'Geospatial Data Analyst (SAPADA)',
      period: 'Aug 2026 – Sep 2026',
      type: 'Internship',
      tags: ['Python', 'GeoPandas', 'Scikit-learn', 'K-Means', 'Leaflet'],
      description:
        'Processed and validated 49,994 land parcel polygons for the Spatial-Based Regional Tax Administration System (SAPADA). Extracted 27 geometric features (log-area, compactness, shape index), applied K-Means clustering with K-Medoids comparison, and evaluated results using Silhouette, Calinski-Harabasz, and Davies-Bouldin indices plus multi-seed stability testing. Visualized cluster distribution on interactive maps and exported results to CSV, GeoJSON, and JSON.',
    },
    {
      organization: 'Institut Teknologi Garut',
      position: 'Teaching Assistant',
      title: 'Database, Networks & Statistics Practicums',
      period: '2023 – Present',
      type: 'Teaching',
      tags: ['SQL', 'SPSS', 'Excel', 'Mentoring'],
      description:
        'Assist lecturers in practicums for Database Concepts, Database Systems, Computer Networks, Statistics & Probability, and Business Statistics — supporting 30+ students per class. Explain technical material, mentor students through exercises, troubleshoot SQL and statistical analysis issues, review assignments, and provide individual feedback.',
    },
    {
      organization: 'Institut Teknologi Garut',
      position: 'Team Leader',
      title: 'Systems Analysis & Design Project',
      period: 'Feb 2025 – Jul 2025',
      type: 'Academic Project',
      tags: ['Requirements', 'UML', 'DFD', 'Figma'],
      description:
        'Identified and documented functional & non-functional requirements (Elicitation Stage 1–5). Designed system models: Flowmap, DFD Level 0–2, UML (Use Case, Activity, Sequence, Class). Created UI/UX prototypes for user interface, product details, and admin dashboard using Figma.',
    },
    {
      organization: 'Yukiee Store',
      position: 'Business Process Reengineering',
      title: 'Process Improvement Project',
      period: 'Feb 2025 – Jul 2025',
      type: 'Academic Project',
      tags: ['BPMN', 'As-Is / To-Be', 'Automation'],
      description:
        'Analyzed As-Is business processes and identified 8 major operational issues. Designed To-Be processes focusing on automation using WhatsApp/Telegram Bot, Google Sheets, and AI Agent. Modeled As-Is and To-Be workflow using BPMN.',
    },
    {
      organization: 'HIMASISFO ITG',
      position: 'Vice Chairman',
      title: 'Information Systems Student Association',
      period: '2025 – 2026',
      type: 'Organization',
      tags: ['Leadership', 'Coordination', 'Mentoring'],
      description:
        'Support the chairman in coordinating programs across divisions, maintain communication between boards, lecturers, and members, and initiated interest-based learning communities for students in technical and career tracks.',
    },
    {
      organization: 'Gifttime (Student Digital Business Team)',
      position: 'Member',
      title: 'Technical Support',
      period: 'Jul 2024 – Apr 2025',
      type: 'Organization',
      tags: ['Database', 'Support'],
      description:
        'Provided technical support to the team, including database management.',
    },
  ],
  projects: [
    {
      name: 'SAPADA Land Parcel Clustering',
      description:
        'Unsupervised machine learning on 49,994 land parcel polygons for regional tax administration: geometry validation, 27 morphometric features, K-Means (K=2) vs K-Medoids, evaluation with Silhouette/CH/DBI and multi-seed stability, plus spatial visualization on an interactive map dashboard.',
      technologies: ['Python', 'GeoPandas', 'Scikit-learn', 'Folium', 'Leaflet.js'],
      link: 'https://github.com/shineistu86',
      image: null,
      year: '2026',
      category: 'data',
      type: 'Internship',
      featured: true,
    },
    {
      name: 'Zonify — Smart Retail Zoning Intelligence',
      description:
        'Capstone project (Coding Camp by DBS Foundation) analyzing minimarket–traditional market distance compliance in South Jakarta using Haversine calculations, spatial feature engineering (distance-to-nearest-market, kecamatan target encoding, K-Means zone encoding), and a 5-tab Streamlit dashboard.',
      technologies: ['Python', 'Pandas', 'GeoPandas', 'Scikit-learn', 'Streamlit', 'Folium'],
      link: 'https://github.com/shineistu86',
      image: null,
      year: '2025 – 2026',
      category: 'data',
      type: 'Team',
      featured: true,
    },
    {
      name: 'DANA Sentiment Analysis',
      description:
        'Analysis of thousands of DANA app user reviews to determine sentiment and user complaint trends.',
      technologies: ['Python', 'pandas', 'matplotlib'],
      link: 'https://dcn-visualization.streamlit.app/',
      image: 'overview-dana.png',
      year: '2026',
      category: 'data',
      type: 'Team',
    },
    {
      name: 'DPR Twitter Sentiment Analysis',
      description:
        'Collected and analyzed Twitter (X) data related to public discussions about the Indonesian DPR (Dewan Perwakilan Rakyat) using Python. The project includes tweet crawling, text preprocessing, word cloud visualization, and emotion analysis to identify trending topics and public sentiment.',
      technologies: ['Python', 'pandas', 'matplotlib', 'NLP'],
      link: 'https://github.com/shineistu86',
      image: 'dpr.png',
      year: '2025',
      category: 'data',
      type: 'Personal',
    },
    {
      name: 'Osamunime',
      description:
        "Web application to search and manage users' favorite anime lists.",
      technologies: ['Laravel', 'MySQL', 'Tailwind CSS'],
      link: 'https://github.com/shineistu86/Osamunime-App.git',
      image: 'osamunime.png',
      year: '2026',
      category: 'web',
    },
    {
      name: 'NationNote',
      description:
        'Website displaying country information worldwide with search and region filter features.',
      technologies: ['React', 'REST API'],
      link: 'https://nationnote-app.vercel.app',
      image: 'notion-note.png',
      year: '2026',
      category: 'web',
      type: 'Team',
    },
    {
      name: 'Heating Oil Consumption Prediction',
      description:
        'Data mining project to predict household heating oil consumption.',
      technologies: ['RapidMiner', 'Data Mining'],
      link: 'https://github.com/shineistu86',
      image: 'heating-oil.png',
      year: '2025',
      category: 'data',
      type: 'Team',
    },
    {
      name: 'DariGarut',
      description:
        'Designed a UI/UX prototype for DariGarut, an e-commerce platform to help promote and sell local products from Garut. The design focuses on a simple and user-friendly shopping experience with essential features like product browsing, cart, and checkout.',
      technologies: ['Figma'],
      link: 'https://www.figma.com/proto/V4T9lLKF2vSIl7pEqFEswX/Untitled?node-id=1-3&t=tFEefEZLkzXYptdY-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3',
      image: 'darigarut.png',
      year: '2025',
      category: 'design',
      type: 'Team',
    },
  ],
  certifications: [
    {
      name: 'Data Science Learning Path',
      issuer: 'Coding Camp powered by DBS Foundation',
      year: '2026',
    },
  ],
  awards: [
    {
      title: 'Eight-Time First Place Winner',
      detail: 'Regional & organizational karate championships',
      year: '2019 – 2026',
    },
    {
      title: 'First Place — Men’s Individual Kata',
      detail: 'UPI Karate Cup V',
      year: '2025',
    },
    {
      title: 'International Participant',
      detail: '4th International Shureido Open Karate Championship & Seminar',
      year: '2025',
    },
  ],
  social: {
    github: 'https://github.com/shineistu86',
    linkedin: 'https://www.linkedin.com/in/hisyam-eka-pramudita-0a1667248/',
    instagram: 'https://www.instagram.com/isaac.tangiss/',
    email: 'mailto:syamjoj@gmail.com',
  },
}
