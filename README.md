# orzz5 — Portfolio Website

Personal portfolio of **orzz5**, frontend developer and Discord bot creator.
Live at **[orzz.website](https://orzz.website)**.

Built with React 18, Vite, and Tailwind CSS. Dark monochrome design with a blue accent, an interactive canvas background, smooth scrolling, and full EN/ES/FR localization.

## Features

- **Interactive background** — kinetic dot-grid canvas that warps toward the cursor, pauses when idle, and respects `prefers-reduced-motion`
- **Sections** — Hero, About, Technologies (marquee), Projects (filterable, with live GitHub stats), Contact (working form), Footer
- **Project previews** — click a project card to open a browser-style modal with an embedded live preview (keyboard accessible: Escape closes, focus is trapped)
- **Live GitHub stats** — star/fork counts fetched from the GitHub API for each project repository
- **Live Discord presence** — Lanyard API integration showing real status in the contact section and hero badge
- **Contact form** — serverless API (`/api/contact`) sending email via [Resend](https://resend.com), with validation, HTML escaping, origin checks, and rate limiting
- **Localization** — English, Spanish, and French with persisted preference (`localStorage`) and correct `<html lang>` switching
- **Accessibility** — skip link, ARIA labels, keyboard-navigable cards, dialog semantics, focus management, reduced-motion support
- **SEO** — canonical URL, Open Graph, Twitter card, JSON-LD (Person), `robots.txt`, `sitemap.xml`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 4 |
| Styling | Tailwind CSS 3 (custom theme tokens) |
| Animation | Framer Motion, Lenis (smooth scroll), react-type-animation |
| Icons | lucide-react, react-icons (Simple Icons brand logos) |
| Backend | Vercel serverless functions + Resend |
| Hosting | Vercel |

## Getting Started

```bash
git clone https://github.com/orzz5/portfolio.git
cd portfolio
npm install
npm run dev        # http://localhost:5173
```

### Environment variables (for the contact form)

Create `.env.local`:

```
RESEND_API_KEY=...
TO_EMAIL=...
ADMIN_KEY=...      # used by /api/reply
```

### Commands

```bash
npm run dev        # start dev server
npm run build      # production build (dist/)
npm run preview    # preview the production build
npm run lint       # run ESLint
```

## Project Structure

```
api/
|-- contact.js          # contact form endpoint (Resend, rate-limited)
|-- reply.js            # admin reply endpoint (key-protected)
public/
|-- projects/           # self-hosted project screenshots
|-- favicon.svg, og.png # brand assets
src/
|-- components/         # Hero, Navbar, About, Technologies, Projects, Contact, Footer, ...
|-- contexts/           # LanguageContext (i18n: en/es/fr)
|-- hooks/              # useDiscordPresence, useGithubStats
|-- lib/                # constants, cn() helper
|-- App.jsx             # layout, lazy-loaded sections, reduced-motion setup
```

## Projects Shown on the Site

| Site | Repository |
|---|---|
| bots.orzz.website | [orzz5/Bots-web](https://github.com/orzz5/Bots-web) |
| weather.orzz.website | [orzz5/orzz-weather](https://github.com/orzz5/orzz-weather) |
| bio.orzz.website | [orzz5/orzz-bio](https://github.com/orzz5/orzz-bio) |
| labs.orzz.website | [orzz5/labs](https://github.com/orzz5/labs) |

## License

MIT — see [LICENSE](LICENSE).

## Contact

- **Website**: [orzz.website](https://orzz.website)
- **GitHub**: [github.com/orzz5](https://github.com/orzz5)
- **Discord**: [orzz5](https://discord.com/users/667791939453583373)

---

Made with React and lots of coffee by orzz5
