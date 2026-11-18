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
| `brand` | Company name, WhatsApp number, email, phone, location | `whatsapp: "916390769785"` |
| `services` | 9 services with base prices, included features, and optional extras | `price: "₹14,999"`, `extras: [...]` |
| `caseStudies` | Portfolio items, screenshots, metrics, and problem/solution stories | `name: "Quant Speed"` |
| `pricing` | Pricing comparison cards and included guarantees | `carePlanFrom: "₹2,499"` |
| `team` | Team members, roles, bios, and photo filenames in `assets/team/` | `photo: "member-1.jpg"` |
| `faqs` | Questions and answers shown on the home page and service pages | `q: "...", a: "..."` |
| `blog` | Articles, publication dates, and full markdown-like paragraphs | `slug: "how-much-does-a-website-cost-in-india"` |
| `legal` | Privacy Policy and Terms of Service sections | `title: "Privacy Policy"` |

> **Tip:** Whenever you save `config.js`, just refresh `index.html` in your browser to immediately see your changes!

---

## Adding or Changing Team Photos

1. Place the picture (`.jpg` or `.png`) inside the `assets/team/` folder.
2. In `config.js`, under `team: [...]`, set the `photo` field to match the filename:
   ```javascript
   {
     name: "Your Name",
     role: "Software Engineer",
     photo: "your-photo.jpg",
     text: "Your brief bio..."
   }
   ```
3. Refresh `index.html`.


  - Run `firebase init hosting` and set the public directory to `.` (current directory).
# RKS-Technology-website
# RKS-Technology-website