/* ==========================================================================
   Role descriptions shown in the experience detail modal.
   Keyed by the `data-role` attribute on each "View Details" button.
   ========================================================================== */
window.EXPERIENCE_ROLES = {
    upwork: {
        title: 'Full-Stack Developer & Automation Engineer',
        org: 'Upwork · Freelancer.com',
        url: 'https://www.upwork.com/',
        logo: '../assets/images/experience/freelance.png',
        period: 'May 2026 – Present',
        type: 'Freelance · Remote',
        tagline: 'AI-powered WordPress automation, SaaS hosting portals and 30+ client sites',
        stack: ['React', 'Tailwind CSS', 'PHP', 'Python', 'Bash', 'WordPress', 'WooCommerce', 'Stripe API', 'Cloudflare Workers', 'Hetzner Cloud'],
        bullets: [
            'Built an AI-powered WordPress automation platform that autonomously generates and deploys complete websites — 9,378 automated tests, 49/50 build streak with zero broken sites, 137 commits.',
            'Developed and tested a full-stack SaaS hosting portal with 20+ live integrations: Stripe payments, Hetzner Cloud provisioning, Openprovider domains, Apifon SMS/Viber, Meta/TikTok/Google OAuth, Mailcow email and Resend newsletters.',
            'Automated cloud server provisioning via the Hetzner API with cloud-init — zero-touch WordPress deployment including nginx, PHP, MariaDB, SSL and monitoring.',
            'Built 30+ client demo websites with React and Tailwind CSS, deployed to Cloudflare Workers.',
            'Delivered a WordPress/Kadence e-commerce site for a D2C brand — 5-star review and Rising Talent badge on Upwork.'
        ]
    },
    sjapathway: {
        title: 'Founder & CEO',
        org: 'SJA Pathway',
        url: 'https://sjapathway.com/',
        logo: '../assets/images/experience/sjapathway.png',
        period: 'March 2025 – Present',
        type: 'Self-Employed · Part-time · Remote',
        tagline: 'AI-powered career development platform',
        stack: ['Next.js', 'React', 'TypeScript', 'Python', 'Supabase', 'Cloudflare', 'OpenRouter API', 'Resend', 'Vitest', 'GitHub Actions'],
        bullets: [
            'Built and launched two AI-powered SaaS platforms solo — JPlatform (job-seeker tools) and EPlatform (learning platform) — serving 35+ members across 15+ countries, with subscription plans from $10/month.',
            'JPlatform: AI CV analysis with ATS scoring and section-by-section rewrites, per-skill job matching with match %, AI cover-letter generator, AI mock interviews with STAR feedback scoring, LinkedIn profile optimizer and elevator-pitch generator.',
            'EPlatform: AI-generated personalised learning paths, 60+ courses with interactive step-by-step lessons, in-browser coding playground (JS/Python/HTML), AI code review on project submissions, AI mentor chatbot with conversation memory, timed quizzes with AI-generated questions, gamification (points, streaks, 9 achievement badges) and certificate + AI-generated reference letter.',
            'Engineered per-plan feature gating with usage-metered access control, outcome tracking ("I Got Hired!" counter + public success wall), email notifications via Resend, admin dashboards with real-time metrics and CSV export, and a daily job scraper with 30-day auto-expiry.',
            '197 unit tests (Vitest), 0 vulnerabilities (npm audit), TypeScript strict mode, CI/CD via GitHub Actions deploying to Cloudflare Pages.'
        ]
    },
    mapca: {
        title: 'Product & Engineering Lead',
        org: 'Map.ca',
        url: 'https://map.ca',
        logo: '../assets/images/experience/map-ca.jpeg',
        period: 'Nov 2025 – March 2026',
        type: 'Full-time · Remote · Canada',
        tagline: 'Community mapping platform',
        stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostGIS', 'Mapbox GL JS', 'Cloudflare Pages & Workers', 'GitHub Actions'],
        bullets: [
            'Led product and technical strategy across 3 platforms (Map.ca, AgriHome.ca, AndCandid.com), managing a cross-functional team of 8 across engineering, design, AI and marketing.',
            'Conducted a security audit across 4 Supabase projects: converted SECURITY DEFINER views to INVOKER, replaced permissive RLS policies, pinned search paths on 25+ functions and enabled RLS on unprotected tables.',
            'Built and maintained CI/CD pipelines via GitHub Actions deploying to Cloudflare Pages and Workers; led full credential rotation and infrastructure recovery after developer offboarding.',
            'Shipped community mapping features (Peace Pin, pin packages, DeafMap, HelpMap) and standalone sub-products (personality profiler, IQ assessment, geographic news platform) as sole developer.',
            'Drove the Google.org AI for Government Innovation grant application.'
        ]
    },
    escape: {
        title: 'AI & Game QA Developer',
        org: 'Escape™ App AI',
        url: '',
        logo: '../assets/images/experience/escape-app-ai.png',
        period: 'May 2025 – Dec 2025',
        type: 'Internship · Remote',
        tagline: 'AI-powered storytelling game',
        stack: ['Unreal Engine', 'PyTorch', 'TensorFlow', 'Twinmotion', 'iOS'],
        bullets: [
            'Integrated ML and LLM-based systems into game avatars for dynamic dialogue, emotional responses and adaptive narrative.',
            'Developed facial mood tracking and AI-driven soundscapes using PyTorch and TensorFlow.',
            'Tested and debugged iOS builds in Unreal Engine for performance, stability and responsiveness.'
        ]
    },
    globalcontriver: {
        title: 'Lead Consultant (Web & Software Development)',
        org: 'Global Contriver',
        url: 'https://globalcontriver.com/',
        logo: '../assets/images/experience/globalcontriver.jpg',
        period: 'Oct 2024 – Nov 2025',
        type: 'Freelance · Remote · Sri Lanka',
        tagline: 'Full-stack delivery for clients across the US, Europe and Asia',
        stack: ['PHP', 'Laravel', 'React', 'Next.js', 'WordPress', 'WooCommerce', 'Python', 'Docker', 'GCP App Engine', 'WHMCS API', 'GitHub Actions'],
        bullets: [
            'Fine Hosted LLC (USA): built and maintained full-stack web applications with PHP, Laravel, WordPress and WooCommerce, integrating the WHMCS API for hosting automation; implemented secure coding practices including CSRF protection, input validation and PSR compliance.',
            'Betr Beta (Singapore): deployed Python applications on Google Cloud Platform (App Engine) with Docker containerisation; integrated third-party APIs and set up CI/CD pipelines via GitHub Actions.',
            'Anixsoft (Europe): developed web applications with Laravel, React and Next.js; managed the full deployment lifecycle including server configuration, domain setup and feature development for enterprise clients.',
            'Delivered new features, bug fixes, performance optimisations and cross-platform testing across all client projects; owned project setup, deployment pipelines and server operations for international clients.'
        ]
    },
    khepri: {
        title: 'Lead Software Engineer (Code + No-Code)',
        org: 'Khepri Service',
        url: 'https://khepri-service.carrd.co/',
        logo: '../assets/images/experience/khepriservice.jpg',
        period: 'May 2024 – Feb 2025',
        type: 'Freelance · Remote · France',
        tagline: 'Hybrid code + no-code delivery for a French services company',
        stack: ['Carrd', 'Systeme.io', 'WordPress', 'HTML / CSS / JS', 'Marketing automation'],
        bullets: [
            'Led the company\'s digital presence end-to-end, choosing code or no-code tooling per deliverable to ship fast without sacrificing quality.',
            'Designed and launched the bilingual company website (English and French editions) on Carrd.',
            'Built the marketing landing page and lead-capture funnel on Systeme.io, connected to email automation.',
            'Handled ongoing iterations, content updates and performance tuning across all properties.'
        ]
    },
    lifelovers: {
        title: 'Content Writer',
        org: 'Life Lovers Magazine',
        url: 'https://lifeloversmag.com',
        logo: '../assets/images/experience/lifeloversmagazine.jpg',
        period: 'April 2023 – Sep 2025',
        type: 'Part-time · Remote',
        tagline: 'Lifestyle, travel, wellness and culture writing',
        stack: ['Long-form writing', 'SEO', 'WordPress', 'Editorial planning'],
        bullets: [
            'Published 11 long-form articles covering wellness, travel, personal growth and culture — from journaling for mindfulness to emergency-landing safety and Eid al-Fitr traditions.',
            'Pitched, researched and wrote each piece end-to-end, working with the editorial team on headlines, structure and SEO.',
            'Built a recurring readership around practical, personal-experience-driven pieces (see the Articles section of the portfolio for every published link).'
        ]
    },
    apexgames: {
        title: 'Co-Founder & CTO',
        org: 'Apex Games',
        url: 'https://apex-games-website-git-dev-4-apex-website.vercel.app/',
        logo: '../assets/images/experience/apexgames.png',
        period: 'Sep 2022 – Dec 2025',
        type: 'Part-time · Remote',
        tagline: 'Indie game studio building a carnival-themed MMO',
        stack: ['Unity', 'C#', 'React', 'Vite'],
        bullets: [
            'Led technical strategy and a development team building a carnival-themed MMO with Unity/C# and a React web companion.',
            'Secured grant funding and partnered with Microverse for engineering talent.',
            'Delivered a tech talk to 150+ attendees on the studio\'s development process.',
            'Built and shipped the studio\'s marketing website with React + Vite.'
        ]
    },
    itelescope: {
        title: 'Software Developer',
        org: 'iTelescope.net',
        url: 'https://www.itelescope.net/',
        logo: '../assets/images/experience/itelescope.jpg',
        period: 'Feb 2025 – April 2025',
        type: 'Contract · Remote',
        tagline: 'Global astronomy platform',
        stack: ['.NET Core', 'Blazor', 'C#', 'VB', 'Classic ASP', 'Docker', 'PowerShell'],
        bullets: [
            'Refactored legacy codebases (C#, VB, VBScript, JScript, Classic ASP), improving maintainability and performance across a platform used by astronomers worldwide.',
            'Developed frontend and backend systems with .NET Core, Blazor and ASP.NET; automated operations with PowerShell and Batch scripting.',
            'Containerised applications with Docker and wrote technical documentation for the development team.'
        ]
    },
    learnrobotics: {
        title: 'Content Creator (Technical Blogging)',
        org: 'Learn Robotics & AI',
        url: '',
        logo: '../assets/images/experience/learnroboticsandai.jpg',
        period: 'Jan 2025 – March 2025',
        type: 'Part-time · Remote',
        tagline: 'Technical writing on robotics and AI',
        stack: ['Technical writing', 'Robotics', 'Machine Learning', 'MATLAB', 'Python'],
        bullets: [
            'Wrote technical blog posts explaining robotics and AI concepts for learners, drawing on MEng Robotics coursework and hands-on projects.',
            'Translated topics such as kinematics, control systems and computer vision into approachable, example-driven tutorials.',
            'Planned an editorial calendar and iterated on posts based on reader feedback.'
        ]
    },
    safholdings: {
        title: 'Social Media Administrator',
        org: 'SAF Holdings',
        url: '',
        logo: '../assets/images/experience/safholdings.jpg',
        period: 'April 2024',
        type: 'Short-term · Remote',
        tagline: 'Social media setup and content administration',
        stack: ['Social media management', 'Content scheduling', 'Brand assets'],
        bullets: [
            'Set up and administered the company\'s social media presence, establishing profiles, branding and posting cadence.',
            'Produced and scheduled launch content and reported on early engagement.'
        ]
    },
    genrait: {
        title: 'Senior Software Engineer',
        org: 'GenRAIT Inc.',
        url: '',
        logo: '../assets/images/experience/genrait.jpg',
        period: 'Jan 2023 – Feb 2024',
        type: 'Full-time · Remote',
        tagline: 'Life sciences platform',
        stack: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'Python', 'FastAPI', 'AWS', 'TestCafe', 'Cypress', 'Docker'],
        bullets: [
            'Developed software architecture and shipped features with the MEAN stack (MongoDB, Express.js, Angular, Node.js) and Python/FastAPI microservices deployed on AWS.',
            'Built end-to-end automated testing pipelines with TestCafe, Cypress and Docker across browsers and environments.',
            'Implemented machine-learning algorithms contributing to life sciences research.'
        ]
    },
    dovelp: {
        title: 'Game Developer & Producer',
        org: 'Dovelp',
        url: 'https://dovelp.carrd.co',
        logo: '../assets/images/experience/dovelp.jpg',
        period: 'Aug 2022 – April 2023',
        type: 'Contract · Remote · United Kingdom',
        tagline: 'IT company — game development and production',
        stack: ['Unity', 'C#', 'Unreal Engine', 'Blueprints', 'Production planning'],
        bullets: [
            'Developed gameplay systems and prototypes in Unity/C# and Unreal Engine for the studio\'s game projects.',
            'Produced the development pipeline — scoping milestones, coordinating artists and engineers, and running playtest feedback loops.',
            'Built the company\'s web presence and supported client-facing demos.'
        ]
    },
    microverse: {
        title: 'Technical Support Engineer',
        org: 'Microverse',
        url: 'https://www.microverse.org/',
        logo: '../assets/images/experience/microverse.jpg',
        period: 'March 2022 – Feb 2023',
        type: 'Part-time · Remote',
        tagline: 'Remote developer bootcamp — code review and mentoring',
        stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Ruby on Rails', 'PostgreSQL', 'Code review'],
        bullets: [
            'Delivered 600+ code reviews across HTML, CSS, JavaScript, React, Redux, Ruby on Rails and PostgreSQL projects.',
            'Raised pull-request quality and developer skills through detailed, actionable feedback and mentoring.'
        ]
    }
};

/* ==========================================================================
   Education — same modal, rendered with coursework instead of a tech stack.
   ========================================================================== */
window.EDUCATION_ENTRIES = {
    stevens: {
        title: 'Master of Engineering, Robotics',
        org: 'Stevens Institute of Technology',
        url: 'https://www.stevens.edu/',
        logo: '../assets/images/education/stevens.jpg',
        period: 'Sep 2024 – Present',
        type: 'Hoboken, NJ, USA · Currently enrolled',
        tagline: 'Graduate study in robotics, control and machine learning',
        stackLabel: 'Coursework',
        stack: ['Robotics', 'Modern Control Engineering', 'Machine Learning', 'Autonomous Navigation', 'Computer-Aided Design', 'Biomechanics'],
        docs: [
            { label: 'Unofficial Transcript (PDF)', src: '../assets/docs/meng-robotics-transcript.pdf', type: 'pdf' }
        ],
        bulletsLabel: 'Projects & highlights',
        bullets: [
            'Robot Arm Kinematics — forward and inverse kinematics analysis of a manipulator in MATLAB.',
            'Simulation Lab — PID and state-feedback controller design and tuning in Simulink.',
            'Journal presentation on the elastic stability of concentric tube robots.',
            'Related portfolio projects: Autonomous Object Sorting with a Mobile Robot, Mobile Robot Simulation (Simscape), Image Processing for Vision-Based Tasks.'
        ]
    },
    sgvu: {
        title: 'Master of Computer Applications',
        org: 'Suresh Gyan Vihar University',
        url: 'https://www.gyanvihar.org/',
        logo: '../assets/images/education/sgvu.jpg',
        period: 'July 2018 – Dec 2021',
        type: 'Jaipur, Rajasthan, India',
        tagline: 'Postgraduate degree in software engineering and web technologies',
        stackLabel: 'Coursework',
        stack: ['Web Technologies', 'Software Engineering', 'Software Testing', 'Project Management'],
        docs: [
            { label: 'Degree Certificate', src: '../assets/images/education/mca-certificate.jpeg', type: 'image' }
        ],
        bulletsLabel: 'Capstone & highlights',
        bullets: [
            'Capstone: "Atiana The Robo World" — a Unity/C# game project, the origin of the Atiana autonomous-robot AI concept in the portfolio.',
            'Built a foundation in the full software lifecycle: requirements, design, testing and delivery.'
        ]
    },
    alagappa: {
        title: 'Bachelor of Computer Applications',
        org: 'Alagappa University',
        url: 'https://www.alagappauniversity.ac.in/homepage',
        logo: '../assets/images/education/alagappa.jpg',
        period: 'June 2014 – August 2017',
        type: 'Karaikudi, Tamil Nadu, India',
        tagline: 'Undergraduate degree in computer applications',
        stackLabel: 'Coursework',
        stack: ['Microprocessors', 'Systems Analysis', 'C', 'C++', 'Java', 'Oracle', 'RDBMS', 'Internet Technologies'],
        docs: [
            { label: 'Degree Certificate', src: '../assets/images/education/bca-certificate.jpeg', type: 'image' }
        ],
        bulletsLabel: 'Highlights',
        bullets: [
            'Core computer-science grounding in systems, programming languages and relational databases.',
            'First exposure to web development through the Internet Technologies track, which led directly into the later MCA and full-stack career.'
        ]
    }
};
