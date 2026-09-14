# SJA Main Portfolio

Personal portfolio website for **Syeda Juveria Afreen (SJA)** — CEO | CTO | Software Engineer | Game Developer | Content Writer | MEng Robotics Student.

## Pages

- **Landing Page** (`index.html`) — Hero-style intro with name, title, and quick links to Email, CV, Telegram, LinkedIn, Profile, and GitHub.
- **Portfolio** (`portfolio.html`) — Full portfolio with sections for Code Projects, SaaS / Platforms, NoCode Projects, Game Projects, AI / Robotics Projects, and Articles.
- **All Websites** (`allwebsites.md`) — Flat list of every live website/app with a one-line description, stack and link.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Lexend Deca, Inter, IBM Plex Mono)
- Fully responsive design
- CSS animations and scroll-based reveal effects (staggered card reveals, 3D card tilt, scroll progress bar, cursor glow, ripple buttons, letter-by-letter hero title) — all respect `prefers-reduced-motion`

## Structure

```
├── index.html                  # Main landing page
├── pages/
│   ├── portfolio.html          # Full portfolio page
│   ├── education.html          # Education timeline
│   ├── experience.html         # Experience timeline
│   └── certificates.html       # Certificates & credentials
├── assets/
│   ├── css/
│   │   ├── landing.css         # Landing page styles
│   │   ├── portfolio.css       # Portfolio page styles
│   │   ├── pages.css           # Education & experience styles
│   │   ├── certificates.css    # Certificates page styles
│   │   ├── section-bg.css      # Floating section background icons
│   │   ├── animations.css      # Shared animations & transitions
│   │   └── modal.css           # Role/education detail modal + document lightbox
│   ├── images/
│   │   ├── education/          # University logos
│   │   ├── experience/         # Company logos
│   │   ├── code/ saas/ nocode/ games/ ai-robotics/ articles/   # Project thumbnails
│   │   └── sja/                # Profile photo & background
│   ├── docs/                   # Transcripts (PDF) opened in the lightbox
│   └── js/
│       ├── animations.js       # Shared scroll/hover animation behaviour
│       ├── experience-data.js  # Role & education descriptions (edit text here)
│       └── experience-modal.js # "View Details" modal + certificate/transcript lightbox
├── allwebsites.md              # Every live website with description + link
└── README.md
```

## Links

- [LinkedIn](https://www.linkedin.com/in/sja-thedude/)
- [GitHub](https://github.com/sja-thedude)
- [Telegram](https://t.me/sjathedude)
