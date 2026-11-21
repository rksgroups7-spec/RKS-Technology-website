# RKS Technology - Pure Static Website

A fast, lightweight, and modern HTML, CSS, and JavaScript website driven by a single configuration file (`config.js`) with an integrated **WhatsApp enquiry form**.

- **No build steps:** No Node.js, Python, or compilers required.
- **No localhost required:** Simply double-click `index.html` to open and run the entire site locally in any browser (`file://`).
- **No backend required:** Contact and planner forms submit directly to WhatsApp (`wa.me`).
- **Config concept preserved:** All content, branding, services, prices, team members, blog posts, and legal terms are configured in `config.js`.
- **Manual deployment ready:** Ready to upload directly to any static hosting or server (cPanel, Hostinger, GitHub Pages, Netlify, Vercel, Apache, Nginx).

---

## Project Structure

```
rks-technology-website/
├── index.html          # Main HTML entry file (double-click to open)
├── config.js           # Single-source-of-truth configuration (edit all content here)
├── css/
│   └── style.css       # Complete modern styling, themes, and animations
├── js/
│   └── app.js          # Dynamic renderer, hash router, and WhatsApp handler
├── assets/             # Visual assets
│   ├── logo.png        # Official company logo (light mode)
│   ├── logo-dark.png   # Official company logo (dark mode optimized)
│   ├── favicon.png     # Browser favicon
│   ├── favicon.svg     # SVG favicon
│   ├── og-image.png    # Social share preview image
│   └── team/           # Team member photos (.jpg)
├── robots.txt          # Search engine crawler instructions
├── sitemap.xml         # SEO sitemap
├── README.md           # Documentation and editing guide
└── .gitignore
```

---

## How to Run Locally

You **do not need a local server** (no `localhost:3000`, no `npm`, no `python -m http.server`).

1. Open your file manager and navigate to the `rks-technology-website` folder.
2. **Double-click `index.html`** (or right-click → *Open With* → Chrome / Firefox / Edge / Safari).
3. The website runs with all animations, particle hero, live build simulator, project cost calculator, and client-side subpages.

---

## How the Website Works

1. **Configuration (`config.js`):**
   - Contains a global `window.CONFIG` object containing your brand details, services, prices, portfolio, team, blog posts, and FAQs.
2. **Dynamic Rendering (`js/app.js`):**
   - Renders the home page, interactive demos, and sections directly from `config.js`.
3. **Subpage Navigation (Hash Routing):**
   - Links like `#services-mobile-app-development`, `#work-quant-speed`, or `#blog` instantly render full subpages offline without refreshing or looking for subdirectories.
4. **WhatsApp Enquiry Form:**
   - When a visitor enters their name, phone, service, and project description and clicks **Send on WhatsApp**, it validates the inputs and opens `https://wa.me/{whatsapp}?text=...` directly with a pre-filled, formatted message. Zero backend server or database needed.
5. **Project Planner Assistant:**
   - An interactive chat widget (bottom right) that guides prospective clients through project scoping (type, budget, timeline) and provides a one-click WhatsApp brief export.

---

## How to Customize Content (`config.js`)

Open `config.js` in any text editor (VS Code, Notepad, etc.). All settings are well-commented:

| Section | What it controls | Example |
|---|---|---|
| `brand` | Company name, WhatsApp number, email, phone, location, aim | `whatsapp: "916390769785"` |
| `services` | 10 services across 5 groups (Web, Apps, AI, Care, Academic) with base prices & extras | `price: "₹2,999"`, `group: "academic"` |
| `careers` | Careers page toggle, message, perks, core values, and active openings | `isOpen: false`, `openings: [...]` |
| `caseStudies` | Portfolio items, screenshots, metrics, and problem/solution stories | `name: "Quant Speed"` |
| `pricing` | Pricing comparison cards, starting price tiers, and included guarantees | `carePlanFrom: "₹999"` |
| `team` | 7 team members, roles (Software Engineers, UI/UX Designer), bios, and photos | `photo: "member-7.jpg"` |
| `engineeringComparison` | Software Engineers vs Vibe Coders comparison matrix | `badge: "Real Software Engineers"` |
| `faqs` | Questions and answers shown on the home page and service pages | `q: "...", a: "..."` |
| `blog` | Articles, publication dates, and full markdown-like paragraphs | `slug: "how-much-does-a-website-cost-in-india"` |
| `legal` | Privacy Policy and Terms of Service sections | `title: "Privacy Policy"` |

> **Tip:** Whenever you save `config.js`, just refresh `index.html` in your browser to immediately see your changes!

---

## Managing the Careers Page & Job Openings

The website features a dedicated, professional Careers page (`#careers`). It is fully controllable from `config.js`:

### 1. Active Openings & Interactive Selection
In `config.js`, `"isOpen": true` displays live job openings with:
- **Department Filter Pills:** Instant filtering (`All Openings`, `Engineering`, `Mobile`, `Cloud & DevOps`, `Product Design`, `AI Solutions`).
- **Interactive Role Selection:** Tapping **"Select & Apply for this Role ↓"** on any job card smoothly scrolls down to the form, automatically selects that job in the application dropdown, highlights the card with a `✓ Selected for Application` badge, and focuses the candidate's name input.
- **5 Pre-Configured Positions:**
  1. Full-Stack Software Engineer (React / Next.js + Node.js)
  2. Mobile Application Engineer (Flutter / Android / iOS)
  3. Backend & Cloud / DevOps Engineer (Python / Docker / AWS)
  4. UI/UX Designer (Figma / Web & Mobile Design Systems)
  5. AI / ML Software Engineer (Python / LangChain / RAG)

### 2. Form-First Candidate Application Flow
Every applicant fills out the structured application form first:
- Full Name, Phone / WhatsApp, Email Address
- Role of Interest (Select from active openings or general talent pool)
- Experience Level (Fresher 2024-2026, 0-1 yr, 1-3 yrs, 3+ yrs, Student/Intern)
- Portfolio, GitHub, or Google Drive Resume link
- Brief note on candidate background and best project built
- **Dual One-Click Submission:** Submit via **WhatsApp 💬** or **Email ✉️**

### 3. Mobile Compatibility
- Optimized for mobile viewports (360px - 480px, iPhones, Pixels, Samsung Galaxy) and tablets.
- Horizontal swipeable department filter bar.
- Stacked, full-width touch-friendly buttons for WhatsApp and Email.
- Single-column form layout preventing iOS auto-zoom (`font-size: 16px`).

---

## College & Academic Projects Service

To serve engineering (B.Tech/BE), BCA, MCA, and Polytechnic diploma students, the website includes a dedicated service:
- **Service Name:** College & Academic Projects (`#services-college-projects`)
- **Starting Price:** From ₹2,999 (Minor projects from ₹2,999, Major final-year projects from ₹6,999)
- **Included Deliverables:**
  - 100% working source code and database setup (Web, Mobile App, AI/ML, Python, Cloud).
  - Complete IEEE/college-compliant project report (.docx / .pdf), synopsis, SRS, ER & DFD diagrams.
  - Professional PowerPoint presentation (.pptx) with architecture flowcharts.
  - Direct remote setup on student's laptop via AnyDesk/TeamViewer.
  - 1-on-1 code walkthrough, viva explanation, and expected examiner questions.
  - College guide modification support until final submission.

---

## Adding or Changing Team Photos

1. Place the picture (`.jpg` or `.png`) inside the `assets/team/` folder.
2. In `config.js`, under `team: [...]`, set the `photo` field to match the filename:
   ```javascript
   {
     name: "Ritik Pandey",
     role: "UI/UX Designer",
     photo: "member-7.jpg",
     text: "Crafts intuitive user journeys, wireframes, accessible design tokens..."
   }
   ```
3. Refresh `index.html`. The team grid automatically centers and balances (4 in top row, 3 centered in bottom row on desktop).