# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, none of them secondary:

- **Recruiters and hiring managers** screening for a DevOps / Cloud role. They need to judge fit quickly, find the CV, and get in touch.
- **Freelance / consulting clients** weighing whether to bring Pablo in for an infrastructure, cloud, or CI/CD engagement. They need to trust his track record.
- **Peer engineers** who read his projects and, later, his blog. For them the site builds reputation; it isn't about hiring.

## Product Purpose

The personal portfolio of Pablo Pan, a DevOps engineer (cloud architecture, CI/CD, infrastructure as code). It presents who he is, what he has built, and how to reach him, and it will host technical writing. Success means a visitor from any of the three audiences leaves with a clear sense of his expertise and an easy way to contact him or download his CV.

## Positioning

**Domain experience**: specific industries where he has run critical systems. The current copy names financial and e-commerce environments. The user has not yet confirmed the exact list or how it should be phrased, so confirm it before treating it as a headline claim.

## Operating Context

- Visitors arrive at a public site, often from a CV, LinkedIn, or GitHub link.
- Routes: Home (`/`), About (`/about`), Projects (`/projects`, `/projects/:id`), Blog (`/blog`), and a CV download (`cat cv.pdf` in the nav).
- The site owner edits content live through an admin mode (Firebase Auth login). Edit modals cover site config, about text, skills, tech stack, projects, and the projects subtitle. Content lives in Firestore per locale, and static data in `src/data/static.js` is the fallback.

## Capabilities and Constraints

- Vue 3 + Vite + Tailwind CSS, vue-router, vue-i18n, Firebase (Auth + Firestore). Deployed as an SPA with `public/_redirects` (Netlify-style).
- Four locales: Spanish, English, German, French. The default comes from the browser language. Any new copy needs all four.
- Every public surface needs an admin editing path, and that path has to keep working.
- Blog: planned, with technical posts coming. It currently shows a "Coming soon" placeholder.
- The "Open for hire" availability status is real and current.

## Brand Commitments

- **The terminal / CLI concept is binding.** Navigation as shell commands (`cd /projects`, `./login.sh`), the boot sequence, prompts (`pablo@portfolio:~$`), and command-line wit in the copy are part of his identity online. Future work keeps this concept; a redesign may change how it is executed but not drop it.
- Name: Pablo Pan. Role framing in the current copy: Cloud Architect & CI/CD Specialist.
- Social: GitHub `atxpaul`, LinkedIn `pablo-pan-veira`.

## Evidence on Hand

- **No metrics are confirmed.** The user flagged these values in the static/default data as placeholders: 99.99% uptime, 1,250+ deployments, 85% automation, "5+ years of experience", "reduced deployment time by 40%". Firestore may hold edited versions. Do not present any of these as fact, and do not invent replacements.
- **Contact email `dev@root.sh` is a placeholder.** Do not show it as a real address.
- The featured project in static data ("Kubernetes Auto-Scaler") uses a stock image and `#` links. Treat it as sample content.
- No testimonials, client logos, or case studies exist. Do not fabricate any.

## Product Principles

1. **One site, three readers.** Every surface has to work for a recruiter scanning fast, a client looking for trust, and an engineer reading in depth. Don't make any of them feel like they're in the wrong place.
2. **Show proof, never invent it.** Credibility comes from real projects and confirmed experience. Placeholder numbers are worse than no numbers.
3. **The terminal is the voice.** Command-line framing is identity, not decoration. It should make the content clearer, never hide it.
4. **Contact is always one step away.** CV, email, and social links stay easy to reach from anywhere.
5. **Editable by the owner.** Content changes happen through the admin UI, not code. Design must not hardcode what should be editable.
