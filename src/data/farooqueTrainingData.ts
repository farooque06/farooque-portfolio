/**
 * FAROOQUE ALAM — AI TWIN COMPREHENSIVE TRAINING DATASET
 * Extracted, analyzed, and synthesized from official CV & production project artifacts.
 */

export const FAROOQUE_AI_TRAINING_DATA = {
  identity: {
    fullName: "Farooque Alam",
    preferredName: "Farooque",
    title: "Full Stack Developer",
    yearsOfExperience: 3,
    location: "New Baneshwor-31, Kathmandu, Nepal",
    emails: ["farooqueallam1@gmail.com", "far00queapril17@gmail.com"],
    phone: "+977-9818998937",
    whatsapp: "+977-9818998937",
    github: "https://github.com/farooque06",
    linkedin: "https://linkedin.com/in/md-farooque-62191024b",
    timezone: "Nepal Standard Time (NPT, UTC+5:45) — Highly adaptable to European (CET/CEST), North American, and Asian working hours",
    currentAvailability: "Available for full-time remote software engineering roles, contract-to-hire positions, and high-impact freelance projects.",
  },

  professionalSummary: {
    overview: `Farooque Alam is a dedicated Full Stack Developer with 3 years of hands-on production experience building dynamic, scalable, and user-centric web applications. His technical core spans modern JavaScript frameworks (React, Next.js, Angular, Node.js/Express) and battle-tested backend/CMS technologies (PHP, TYPO3, PostgreSQL, MySQL). He has proven experience handling international client projects (notably for German client SCHITTLY at Nirekha Dot Com) and engineering multi-tenant systems from scratch (SchoolBaba). Farooque is deeply comfortable integrating modern AI tools (Claude Code, ChatGPT, Perplexity, Gemini API) to accelerate development workflows, code quality, and architectural research.`,
    communicationStyle: "Empathetic, clear, solution-focused, honest about timelines, and proactive with status updates.",
    engineeringPhilosophy: "Build on solid architectural foundations. Prioritize multi-tenant data isolation, clean API boundaries, normalized schemas, and developer readability over fragile shortcuts.",
  },

  employmentHistory: [
    {
      company: "Nirekha Dot Com",
      location: "Kausaltar, Kathmandu, Nepal",
      period: "January 2023 — Present",
      role: "Full Stack Developer",
      nature: "Full-Time",
      clientSpotlight: {
        clientName: "SCHITTLY",
        country: "Germany",
        domain: "Enterprise Content Management & Customer Portal",
        technologies: ["TYPO3 CMS", "PHP", "Fluid Templating Engine", "SCSS", "JavaScript", "MySQL"],
        contributions: [
          "Developed custom TYPO3 extensions to accommodate unique German business logic and data workflows.",
          "Customized multi-language responsive templates complying with strict European usability and accessibility standards.",
          "Managed end-to-end template integration, database migrations, and performance profiling for optimal TTFB (time to first byte).",
          "Maintained seamless cross-timezone client communication, handling sprint planning, requirement clarifications, and QA feedback.",
        ],
      },
      responsibilities: [
        "Architect and maintain scalable web applications utilizing React, Angular, PHP, and TYPO3.",
        "Collaborate with internal design and backend engineering teams to deliver responsive, cross-browser interfaces.",
        "Refactor legacy CMS modules into reusable, modular extension architectures.",
        "Conduct comprehensive debugging, performance optimization, and database query profiling.",
      ],
    },
    {
      company: "Imagio Creations",
      location: "Sanepa, Kathmandu, Nepal",
      period: "March 2022 — June 2022",
      role: "Frontend Development Intern",
      nature: "Internship",
      responsibilities: [
        "Assisted in developing mobile-responsive web pages and components using HTML5, SCSS, JavaScript, and PHP.",
        "Implemented pixel-perfect layouts from Figma design handoffs with cross-browser compatibility.",
        "Participated in agile ceremonies, daily standups, and structured peer code reviews.",
      ],
    },
  ],

  projectsInDepth: [
    {
      name: "SchoolBaba",
      subtitle: "Multi-Tenant School Management Platform",
      status: "In Active Development",
      techStack: {
        frontend: "Next.js 14 (App Router), React, Tailwind CSS",
        backend: "Node.js with Express REST API, TypeScript",
        database: "PostgreSQL (with connection pooling & foreign key indexing)",
        authentication: "Stateless JWT (JSON Web Tokens) with bcrypt password hashing (10 salt rounds)",
        architecture: "Multi-tenant architecture with school-scoped data queries to ensure complete tenant separation and data privacy",
      },
      problemStatement: "Educational institutions struggle with fragmented administrative software, insecure student records, and complex cross-departmental record keeping without data isolation.",
      solutionsDelivered: [
        "Architected multi-tenant isolation where every database record is strictly scoped to the tenant's `school_id`.",
        "Engineered Role-Based Access Control (RBAC) with granular permissions for Super Admins, School Principals, Teachers, Accountants, Students, and Parents.",
        "Designed bulk CSV import pipeline allowing school administrators to import hundreds of student and staff records with instantaneous schema validation.",
        "Created dynamic report card generation engine producing printable, standardized academic transcripts and grade sheets.",
        "Implemented teacher assignment workflows, subject schedules, and attendance tracking grids.",
      ],
      interviewAnswer: "When building SchoolBaba, data isolation was our number one architectural priority. Rather than spinning up a new database per school—which would explode infrastructure overhead—we implemented a row-level school-scoped query pattern with compound indexing on (school_id, id). Middleware extracts and verifies the tenant ID from the authenticated JWT, ensuring no request can ever query or mutate data from another school.",
    },
    {
      name: "RestroBaba",
      subtitle: "Restaurant Management Platform",
      status: "Production Ready / Completed",
      techStack: {
        frontend: "React, CSS Modules / Tailwind CSS",
        backend: "Node.js, Express REST API",
        database: "PostgreSQL",
        realtime: "WebSockets / Polling for Live Kitchen Order Tickets (KOT)",
      },
      solutionsDelivered: [
        "Interactive floor table reservation grid with live status tracking (occupied, reserved, cleaning, available).",
        "Digital menu management with dynamic pricing, tax calculations, and category filtering.",
        "Kitchen Display System (KDS) dispatching customer orders immediately to line cooks with timer countdowns.",
        "Cashier POS checkout engine generating thermal receipt printouts and daily sales summaries.",
      ],
    },
    {
      name: "SportsBaba",
      subtitle: "Sports Platform & Tournament Hub",
      status: "Completed",
      techStack: {
        frontend: "React, Tailwind CSS, Lucide Icons",
        backend: "Node.js, RESTful API layer",
        database: "PostgreSQL",
      },
      solutionsDelivered: [
        "Automated single and double-elimination tournament bracket generator.",
        "Match fixture scheduling with venue and pitch allocation.",
        "Real-time score update feed for ongoing matches and penalty shootouts.",
        "Team roster and player profile management with statistical leaderboards.",
        "Futsal / sports arena slot booking with time-slot reservation calendars.",
      ],
    },
    {
      name: "Appointment Scheduling System",
      subtitle: "Dynamic Booking & Calendar Management",
      status: "Completed Client Project",
      techStack: {
        frontend: "Angular (Standalone components, Reactive Forms, RxJS)",
        backend: "TYPO3 CMS (PHP Service Extensions)",
        database: "MySQL",
      },
      solutionsDelivered: [
        "Dynamic calendar booking interface displaying real-time available consultant time slots.",
        "Conflict prevention algorithm preventing simultaneous double-bookings across concurrent client sessions.",
        "Automated email notifications and reminder schedules.",
        "TYPO3 administrative backend where consultants manage working hours, vacations, and emergency slot blocks.",
      ],
    },
    {
      name: "MartBus",
      subtitle: "Retail Mart Inventory & Billing System",
      status: "Production Deployed",
      techStack: {
        frontend: "React SPA",
        backend: "TYPO3 / PHP Custom API",
        database: "MySQL",
        github: "https://github.com/farooque06/MartBis_backend",
      },
      solutionsDelivered: [
        "High-throughput barcode POS scanner interface for rapid retail checkout.",
        "Automated product stock tracking with minimum threshold low-stock warning banners.",
        "Comprehensive supplier ledger tracking purchase orders, credit balances, and payment terms.",
        "Sales revenue analytics with daily, weekly, and monthly gross profit calculations.",
      ],
    },
    {
      name: "SCHITTLY German Enterprise Portal",
      subtitle: "Enterprise TYPO3 CMS Customization",
      status: "Client Project (Germany)",
      techStack: {
        cms: "TYPO3 CMS v11/v12",
        backend: "PHP 8.x, Fluid Templating",
        frontend: "SCSS, Vanilla JavaScript",
        database: "MySQL",
      },
      solutionsDelivered: [
        "Custom TYPO3 extension development creating tailored content elements and backend modules.",
        "Fluid template architecture adhering to clean separation of presentation and domain models.",
        "Rigorous performance profiling ensuring fast page load speeds across desktop and mobile devices in Europe.",
      ],
    },
  ],

  educationAndCredentials: {
    degree: "Bachelor of Computer Application (BCA)",
    status: "Completed",
    institution: "Patan Nistha Campus",
    university: "Tribhuvan University (Nepal)",
    academicFocus: [
      "Relational Database Management Systems (PostgreSQL / MySQL / Normalization)",
      "Object-Oriented Programming (Java, C#, Design Patterns)",
      "Data Structures & Algorithms (Big-O, Sorting, Graphs, Tree traversal)",
      "Web Technologies & Distributed Client-Server Systems",
      "Software Engineering Lifecycle (Agile, Waterfall, Testing, CI/CD basics)",
    ],
  },

  skillsAndToolsMatrix: {
    frontend: ["React.js", "Next.js", "Angular", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3 / SCSS", "Tailwind CSS", "Responsive Web Design", "UI/UX Optimization"],
    backend: ["Node.js", "Express.js", "PHP (OOP / Modern 8.x)", "TYPO3 CMS", "RESTful API Design", "C#", ".NET (Basics)"],
    databases: ["PostgreSQL", "MySQL", "SQL Server", "Database Indexing", "Schema Normalization", "Connection Pooling"],
    developerTools: ["Git", "GitHub", "VS Code", "Visual Studio", "Webpack", "Vite", "Postman", "npm"],
    aiWorkflow: [
      "Claude Code & Claude 3.5/3.7 for automated scaffolding, refactoring, and deep code audits",
      "ChatGPT for rapid logic brainstorming and algorithm translation",
      "Perplexity for real-time technical documentation lookup and library evaluations",
      "Antigravity for agentic workflow orchestration",
      "Gemini API for building full-stack intelligent web agents and server-side NLP workflows",
    ],
    coreStrengths: [
      "Full-stack debugging: Tracking issues across network requests, backend controller middleware, and database index locks.",
      "Team collaboration: Active participation in code reviews, technical documentation, and cross-functional handoffs.",
      "Time management: Balancing multi-project priorities (client CMS work + multi-tenant SaaS development) while meeting sprint deadlines.",
    ],
  },

  frequentlyAskedInterviewQuestions: [
    {
      q: "What makes Farooque stand out as a Full Stack Developer?",
      a: "Farooque combines 3 years of battle-tested experience with both modern JavaScript (React, Next.js, Angular, Node.js) and enterprise CMS architectures (TYPO3, PHP). He has delivered for demanding international clients in Germany (SCHITTLY) and is actively engineering complex multi-tenant systems (SchoolBaba). His proactive adoption of modern AI tools allows him to ship high-quality code at 2-3x typical velocity."
    },
    {
      q: "How does Farooque approach multi-tenancy in SchoolBaba?",
      a: "Farooque uses school-scoped queries with indexed tenant keys (`school_id`). Every API request is verified through JWT authentication that encodes the school context, preventing cross-tenant data leaks while keeping infrastructure costs minimal compared to separate database instances."
    },
    {
      q: "Can Farooque work with clients or teams in other timezones?",
      a: "Yes. In his role at Nirekha Dot Com, he has been responsible for the SCHITTLY German enterprise project, maintaining clear communication, scheduled standups, and asynchronous documentation across European Central Time (CET) and Nepal Time (NPT)."
    },
    {
      q: "Is Farooque available for hire right now?",
      a: "Yes! Farooque is available for full-time remote engineering roles, contract positions, and consulting projects. You can contact him directly at farooqueallam1@gmail.com or via WhatsApp at +977-9818998937."
    }
  ]
};
