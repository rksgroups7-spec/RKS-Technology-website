(() => {
  "use strict";

  const C = window.CONFIG;
  if (!C) {
    console.error("Configuration (CONFIG) not found. Make sure config.js is loaded before app.js.");
    return;
  }

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const sl = ms => new Promise(r => setTimeout(r, ms));
  const e = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = n => Math.round(n).toLocaleString("en-IN");
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const ini = n => n.split(" ").map(w => w[0]).slice(0, 2).join("");
  const rv = (c = "", i = 0) => `class="rv ${c}" style="--d:${i * .08}s"`;
  const plur = w => w + (/(ch|s|x)$/.test(w) ? "es" : "s");
  const pC = C.pricing ? C.pricing.currency : "₹";
  const PT = C.services ? C.services.map(s => ({
    n: s.name,
    key: s.key,
    g: s.group,
    base: s.estimator.basePrice,
    unit: s.estimator.extraUnit,
    per: s.estimator.pricePerUnit,
    weeks: s.estimator.weeks,
    sfx: s.estimator.priceSuffix,
    inc: s.included,
    x: s.extras.map(x => [x.name, x.price])
  })) : [];
  const svcOptions = [...C.services.map(s => s.name), "Not sure yet"];
  const HOME_TITLE = C.seo.homeTitle;

  const DEMO = {
    "Static Website": { f: "website/home", l: ['<nav> logo + menu </nav>', '<h1>Your Brand Story</h1>', '<section class="services">', '<footer> contact + map </footer>'], pv: `<div class="bu">🔒 yourbrand.com</div><div class="pb nb" data-k="0"><i></i><s></s><s></s><s></s></div><div class="pb hb" data-k="1">Grow your business online<s></s></div><div class="pb cg" data-k="2"><i></i><i></i><i></i></div><div class="pb ft2" data-k="3"><em>Fast</em><em>SEO ready</em><em>Mobile ready</em></div>` },
    "Dynamic Website": { f: "website/dashboard", l: ['user = auth.login()', 'orders = database.watch("orders")', 'dashboard.show(orders)', 'payments.create(order)'], pv: `<div class="bu">🔒 yourbrand.com/dashboard</div><div class="pb nb" data-k="0"><i></i><s></s><s></s><s></s></div><div class="pb hb" data-k="1">Welcome back, Admin<s></s></div><div class="pb bc" data-k="2"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="pb ft2" data-k="3"><em>DB connected</em><em>Payments ✓</em><em>Live orders</em></div>` },
    "Mobile App": { f: "app/home-screen", l: ['screen Home(user)', 'list.show(items)', 'tabs.add("Home", "Chat", "Profile")', 'notify.onMessage(showAlert)'], pv: `<div class="ph"><div class="pb nb" data-k="0"><i></i><s></s><s></s></div><div class="pb hb" data-k="1" style="font-size:13px;padding:12px">Hello, Rahul 👋<s></s></div><div class="pb cg" data-k="2" style="grid-template-columns:1fr"><i></i><i></i></div><div class="pb ft2" data-k="3"><em>Home</em><em>Chat</em></div></div>` },
    "2D Game": { f: "game/level-1", l: ['scene.sky(clouds)', 'scene.ground(tiles: 40)', 'player.jump(gravity: 9.8)', 'coins.spawn(count: 12)'], pv: `<div class="sky pb" data-k="0"><i></i><i style="top:40px;animation-delay:-4s"></i></div><div class="pb gr" data-k="1"></div><div class="pb pl2" data-k="2"></div><div class="pb cn" data-k="3"><i></i><i></i><i></i></div>` },
    "AI Chatbot": { f: "chatbot/assistant", l: ['reply = bot.answer(question, faq)', 'widget.mount(brand)', 'lead = form.capture(name, email)', 'channels.add("whatsapp")'], pv: `<div class="bu">🔒 yourbrand.com</div><div class="pb cbh" data-k="0"><i></i><b>Support bot</b><em>● online</em></div><div class="pb bub u" data-k="1">Do you have a weekend batch?</div><div class="pb bub" data-k="2">Yes! Saturday and Sunday, 9 am. Shall we call you? <span class="dots"><i></i><i></i><i></i></span></div><div class="pb ft2" data-k="3"><em>Lead captured</em><em>WhatsApp ✓</em></div>` },
    "RAG System": { f: "knowledge/search", l: ['docs = ingest("policies/*.pdf")', 'index = search_index.build(chunks)', 'context = index.find(question, top: 4)', 'answer = assistant.reply(context, cite: true)'], pv: `<div class="bu">📚 knowledge.yourbrand.com</div><div class="pb ft2" data-k="0"><em>📄 Policy.pdf</em><em>📄 Manual.docx</em><em>📄 Prices.xlsx</em></div><div class="pb cg" data-k="1"><i></i><i></i><i></i></div><div class="pb bub u" data-k="2">What is the refund policy?</div><div class="pb bub" data-k="3">Refunds are processed within 7 days. <b class="src">Source: Policy.pdf, page 4</b></div>` }
  };
  const hl = s => e(s).replace(/(&lt;\/?[\w-]*)|(&quot;[^&]*(?:&quot;|$))|\b(const|await|final|screen|scene)\b/g, (m, t, q) => t ? `<b class="t">${m}</b>` : q ? `<b class="s">${m}</b>` : `<b class="kw">${m}</b>`);
  const SCR = [
    `<h5>Quant Speed</h5><span class="lv">● 1v1 LIVE</span><div class="qq">47 × 6</div><div class="tmb"><i></i></div><div class="op"><i>262</i><i>272</i><i>282</i><i>292</i></div>`,
    `<h5>ThinkQ Leaderboard</h5><span class="lv" style="background:#3b4bff22;color:#3b4bff">Science · Hard</span><div class="lb"><b>1</b><s style="--w:92%"></s></div><div class="lb"><b>2</b><s style="--w:78%"></s></div><div class="lb"><b>3</b><s style="--w:64%"></s></div><div class="lb"><b>4</b><s style="--w:48%"></s></div>`,
    `<h5>Today’s Attendance</h5><div class="qr"></div><div class="okb">✓ Attendance marked</div><div class="tmb" style="margin-top:6px"><i style="animation:none;width:72%"></i></div><span style="font:500 12px 'Hanken Grotesk',system-ui,sans-serif;color:#5a6482">Batch fee paid: 72%</span>`
  ];
  const BV = {
    static: '<div class="vbr"><div class="vbl"><i></i></div><b>0.4s</b><div style="font-size:12px;color:var(--mut)">Page loaded</div></div>',
    dynamic: '<div class="bc" style="width:62%;height:90px;background:var(--cd)">' + "<i></i>".repeat(9) + '</div>',
    mobile: '<div class="swp"><i></i><i></i></div>',
    desktop: '<div class="dw"><div><i></i><i></i><i></i></div><s></s><s></s><s></s><s></s></div>',
    game: '<div style="display:flex;gap:18px;align-items:flex-end;height:100px"><div class="pl2" style="margin:0"></div><div class="cn"><i></i><i></i><i></i></div></div>',
    care: '<div class="pp"><i></i><i></i><i></i><i></i></div>',
    aiapp: '<div class="ainet">' + [[8, 50], [38, 15], [38, 50], [38, 85], [70, 28], [70, 72], [92, 50]].map((q, i) => `<i style="left:${q[0]}%;top:${q[1]}%;animation-delay:${-i * .35}s"></i>`).join("") + '</div>',
    chatbot: '<div class="cbv"><s></s><s class="r"></s><s class="t"></s></div>',
    rag: '<div class="ragv"><b>📄</b><b>📄</b><b>📄</b><span>→</span><em>✓ Answer · p.4</em></div>'
  };
  const RINGS = [{ inset: 30, t: 34, dir: "normal", from: 0, to: 4 }, { inset: 15, t: 52, dir: "reverse", from: 4, to: 10 }, { inset: 0, t: 74, dir: "normal", from: 10, to: 16 }];
  const PH = ["Discuss", "Design", "Build", "Test", "Deploy"], PHR = [.08, .2, .45, .17, .1];
  const nav = [["About", "#about"], ["Services", "#services"], ["Process", "#process"], ["Work", "#work"], ["Pricing", "#pricing"], ["Team", "#team"], ["Blog", "#blog"], ["Contact", "#contact"]];

  // --------------------------------------------------------------------------
  // RENDER HOME PAGE
  // --------------------------------------------------------------------------
  function renderHome() {
    $("#lg").innerHTML = `<img src="assets/logo.png" class="logo-light" alt="${e(C.brand.name)}" height="38"><img src="assets/logo-dark.png" class="logo-dark" alt="${e(C.brand.name)}" height="38">`;
    $("#mn").innerHTML = nav.map(n => `<a href="${n[1]}">${n[0]}</a>`).join("");
    $("#wa").href = `https://wa.me/${C.brand.whatsapp}`;
    $("#mw").href = `https://wa.me/${C.brand.whatsapp}`;
    $("#rail").innerHTML = nav.filter(n => n[1].startsWith("#") && n[1] !== "#blog").map(n => `<a href="${n[1]}" data-l="${n[0]}" aria-label="${n[0]}"></a>`).join("");

    $("#top").innerHTML = `
<section id="hero"><div class="bl" style="width:440px;height:440px;background:#3b4bff;left:-130px;top:40px"></div><div class="bl" style="width:380px;height:380px;background:#ff6b3d;right:-90px;top:260px;animation-delay:-6s"></div><div class="bl" style="width:320px;height:320px;background:#00b587;left:40%;bottom:-140px;animation-delay:-10s"></div>
<div class="w hg"><div><span class="bd"><b></b>${e(C.hero.badge)}</span><h1>${C.hero.lines.map((l, i) => `<span><i style="animation-delay:${.7 + i * .14}s">${i == 2 ? `<b class="gt">${e(l)}</b>` : e(l)}</i></span>`).join("")}</h1><p class="hs">${e(C.hero.text || C.hero.sub)}</p><div class="hc"><a class="bt" href="#pricing">See pricing</a><a class="bt o" href="#contact">Free consultation</a></div><div class="ch" id="hch">${["RKS Technology", "Websites", "Mobile Apps", "2D Games", "AI Solutions"].map((k, i) => `<button class="${i ? "" : "on"}">${e(k)}</button>`).join("")}</div></div>
<a class="sd" href="#about" aria-label="Scroll down"><i></i></a><div class="pcw"><canvas id="pc" aria-label="Animated particles forming shapes"></canvas>${C.hero.tags.map((t, i) => `<div class="fl2" style="${["top:6%;left:0", "top:44%;right:-2%;animation-delay:-2s", "bottom:12%;left:6%;animation-delay:-3.5s"][i % 3]}">${e(t)}</div>`).join("")}<div class="pcl" id="pcl">${e(C.brand.name)}</div></div></div></section>
<div class="mq" aria-label="Our promises"><div>${[...C.trustStrip, ...C.trustStrip].map(t => `<span>${e(t)}</span>`).join("")}</div></div>
<div class="w"><div class="str">${C.stats.map((s, i) => `<div class="stt rv z" style="--d:${i * .1}s"><b data-n="${s.n}" data-p="${e(s.p || "")}" data-s="${e(s.s || "")}">0</b><span>${e(s.l)}</span></div>`).join("")}</div></div>
<section id="about"><div class="w ab"><div ${rv("l")}><span class="k">${e(C.about.label || C.about.k)}</span><h2>${e(C.about.title || C.about.t)}</h2><div style="margin-top:26px">${(C.about.paragraphs || C.about.p).map(p => `<p>${e(p)}</p>`).join("")}</div></div><div class="sp rv r">${(C.about.points || C.about.pts).map(p => { const icon = p.icon || p[0], tit = p.title || p[1], txt = p.text || p[2]; return `<div><b>${icon}</b><div><h4>${e(tit)}</h4><p>${e(txt)}</p></div></div>` }).join("")}</div></div></section>
${C.engineeringComparison ? `<section id="engineering" style="padding-top:20px;padding-bottom:70px"><div class="w"><div class="c"><span class="k">${e(C.engineeringComparison.label)}</span><h2 class="c rv">${e(C.engineeringComparison.title)}</h2><p class="ld rv">${e(C.engineeringComparison.lead)}</p></div><div class="cmp-grid"><div class="cmp-card vibe rv l"><span class="cmp-badge">⚠️ ${e(C.engineeringComparison.vibeCoder.badge)}</span><h3>${e(C.engineeringComparison.vibeCoder.tagline)}</h3><p class="tagl">What happens when software is built without engineering discipline:</p><ul class="cmp-list">${C.engineeringComparison.vibeCoder.points.map(pt => `<li><i>✕</i><span>${e(pt)}</span></li>`).join("")}</ul></div><div class="cmp-card eng rv r"><span class="cmp-badge">✓ ${e(C.engineeringComparison.engineer.badge)}</span><h3>${e(C.engineeringComparison.engineer.tagline)}</h3><p class="tagl">How RKS software engineers build your software to scale and last:</p><ul class="cmp-list">${C.engineeringComparison.engineer.points.map(pt => `<li><i>✓</i><span>${e(pt)}</span></li>`).join("")}</ul></div></div></div></section>` : ""}
<section id="services" style="background:var(--cd)"><div class="w"><span class="k">Services</span><h2 ${rv()}>One structured catalogue for everything you need</h2><p class="ld rv">Nine focused services in four groups. Each has a clear starting price, and every extra feature is itemised separately.</p>
<div class="ch sfl" id="sfl"><button class="on" data-g="all">All services</button>${C.groups.map(g => `<button data-g="${g.key}">${e(g.title)}</button>`).join("")}</div>
${C.groups.map(g => `<div class="sg rv" data-g="${g.key}"><div class="sgh"><h3>${e(g.title)}</h3><p>${e(g.text)}</p></div><div class="sv">${C.services.filter(s => s.group === g.key).map(s => `<article class="cd bn"><div class="vz">${BV[s.key] || ""}</div><span class="pr2">${e(s.priceLabel)} <b>${e(s.price)}</b></span><h3>${e(s.name)}</h3><p>${e(s.card)}</p><ul class="ul">${s.bullets.map(f => `<li>${e(f)}</li>`).join("")}</ul><a class="more" href="#services-${s.slug}">View details and pricing →</a></article>`).join("")}</div></div>`).join("")}</div></section>
<section id="build" style="background:var(--cd)"><div class="w"><div class="c"><span class="k">Watch it build</span><h2 class="c rv">This is how your product comes to life</h2><p class="ld rv">Choose what you want to build and watch the code and the live preview appear side by side.</p></div><div class="ch" id="ch" style="justify-content:center;margin-bottom:30px">${Object.keys(DEMO).map((k, i) => `<button class="${i ? "" : "on"}">${e(k)}</button>`).join("")}</div><div class="ide rv z" style="max-width:920px;margin:auto"><div class="tbar"><i></i><i></i><i></i><span id="cf">index.html</span></div><div class="pn"><div id="cd"></div><div id="pv"></div></div><div id="st">Building…</div></div></div></section>
<section id="process" class="pin" style="--n:${C.process.length}"><div class="in"><div class="w" style="width:100%;position:relative"><span class="k">How a project flows</span><div class="pg" id="pg"><div class="ln" id="pl"></div><div class="nd">${C.process.map((s, i) => `<span>${i + 1}</span>`).join("")}</div></div><div class="pgrid"><div id="ps"></div><div class="tm2"><div class="tbar"><i></i><i></i><i></i><span>rks-terminal</span></div><div class="bd2" id="pt"></div></div></div></div></div></section>
<section id="work"><div class="w"><span class="k">Our work</span><h2 ${rv()}>Real products, built and launched by us</h2><p class="ld rv">Tap a product and see how it looks and works.</p><div class="wk"><div><div class="wt" id="wt">${C.caseStudies.map((x, i) => `<button class="${i ? "" : "on"}" data-i="${i}">${e(x.name)}</button>`).join("")}</div><div id="wd"></div></div><div class="stage rv z" id="stg"><div class="tw3" id="tw3"><div class="pm"><div class="sc" id="scr"></div></div></div></div></div></div></section>
<section id="stack" style="overflow:hidden"><div class="w"><div class="c"><span class="k">Capabilities</span><h2 class="c rv">Everything around your product, from one team</h2><p class="ld rv">Design, build, launch and grow. We choose the right technology for each project and explain it in your quote. Hover to pause.</p></div><div class="orb rv z" role="img" aria-label="What we do: ${e(C.capabilities.join(", "))}"><div class="core"><b>${e(C.brand.short)}</b></div>${RINGS.map((r) => `<div class="ring" style="--in:${r.inset}%;--t:${r.t}s;--dir:${r.dir}">${C.capabilities.slice(r.from, r.to).map((t, i, a) => { const ang = i / a.length * 2 * Math.PI, x = 50 + 50 * Math.cos(ang), y = 50 + 50 * Math.sin(ang); return `<i style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%"><span>${e(t)}</span></i>` }).join("")}</div>`).join("")}</div></div></section>
<section id="upgrade"><div class="w"><div class="c"><span class="k">Redesign</span><h2 class="c rv">Already have a website? Drag to see the upgrade.</h2><p class="ld rv">We also redesign old websites into fast, modern, mobile-friendly ones.</p></div><div class="ba rv z" id="ba"><div class="bf"><div class="old"><h6>WELCOME TO OUR WEBSITE!!!</h6><div class="bar"></div><div class="row"><a>Home</a> | <a>About Us</a> | <a>Products</a> | <a>Gallery</a> | <a>Contact</a></div><div class="im">photo.jpg</div><p>We are a company since 1998. Click <a>here</a> to see our products. Please sign our guestbook.</p><p>Best viewed in Internet Explorer 6 at 800x600.</p><p style="clear:both">Visitors: 000123</p></div></div><div class="af"><div class="new"><div class="nb2"><b>YourBrand</b><span><a>Services</a><a>Work</a><a>Contact</a></span></div><div class="h">Grow your business with a website people love.<br><s>Get started</s></div><div class="c3"><i></i><i></i><i></i></div></div></div><div class="hd"><i>⇆</i></div><span class="tg2" style="left:16px;background:#000a;color:#fff">Before</span><span class="tg2" style="right:16px;background:var(--p);color:#fff">After</span><input type="range" min="0" max="100" value="50" id="bx" aria-label="Drag to compare before and after"></div></div></section>
<section id="quality" style="background:var(--cd)"><div class="w"><div class="c"><span class="k">Quality</span><h2 class="c rv">Built to score high. Every time.</h2><p class="ld rv">These are the delivery targets we build and test every project against.</p></div><div class="gz">${C.quality.map((q, i) => { const lbl = q.label || q[0], scr = q.score || q[1]; return `<div class="gg rv z" style="--d:${i * .1}s"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="gb"/><circle cx="60" cy="60" r="52" class="gf" style="--v:${scr}"/></svg><b data-n="${scr}" data-p="" data-s="">0</b><span>${e(lbl)}</span></div>` }).join("")}</div></div></section>
<section id="trust" style="background:var(--cd)"><div class="w"><div class="c"><span class="k">Transparency</span><h2 class="c rv">Watch your project move. No surprises.</h2><p class="ld rv">Every client gets a live board like this. You always know what is done, what is in progress and what is next.</p></div><div class="kb rv" id="kb"></div></div></section>
<section id="pricing"><div class="w"><div class="c"><span class="k">Pricing</span><h2 class="c rv">Clear starting prices. Pay only for what you add.</h2><p class="ld rv">From low-cost launchpads to advanced software solutions. Every service has a base price that covers its core scope, and extra features are itemised separately.</p></div>
<div class="spectrum-bar rv">
  <div class="spec-box"><span class="sp-tag">Tier 1: Starter</span><b>From ₹4,999</b><p>Static websites, portfolio pages & startup launchpads with WhatsApp lead capture.</p></div>
  <div class="spec-box"><span class="sp-tag">Tier 2: Growth</span><b>From ₹14,999</b><p>Dynamic web apps & mobile apps with Google AdMob / AdSense and payment gateways.</p></div>
  <div class="spec-box"><span class="sp-tag">Tier 3: Advanced</span><b>From ₹24,999</b><p>Custom desktop software, 2D games, enterprise AI chatbots & RAG systems.</p></div>
  <div class="spec-box"><span class="sp-tag">Tier 4: DevOps</span><b>From ₹999/mo</b><p>Cloud server deployment (AWS/GCP/VPS), Docker, CI/CD, SSL & ongoing care.</p></div>
</div>
<div class="hp3">${[["1", "Base price", "Covers the core scope listed on each service page."], ["2", "Add extras", "Pick optional features. Each one has its own clear price."], ["3", "Fixed quote", "You get one itemised, fixed quote in writing before work begins."]].map((x, i) => `<div class="cd rv" style="--d:${i * .1}s"><b class="num">${x[0]}</b><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div>
<div class="cat">${C.groups.map((g, gi) => `<div class="cd rv" style="--d:${gi * .08}s"><h3>${e(g.title)}</h3><div class="crow">${C.services.filter(s => s.group === g.key).map(s => `<a href="#services-${s.slug}"><span>${e(s.name)}</span><b>${e(s.priceLabel)} ${e(s.price)}</b></a>`).join("")}</div></div>`).join("")}</div>
<h3 class="rv" style="margin:72px 0 8px;font-size:clamp(24px,3vw,34px)">Estimate your project</h3><p class="rv" style="color:var(--mut);margin-bottom:22px">Choose a service, then tick the extras you want. The estimate updates instantly.</p>
<div class="cf"><div class="cd rv l" style="transform:none"><label for="pT" style="margin-top:0">Service</label><select id="pT">${C.groups.map(g => `<optgroup label="${e(g.title)}">${PT.filter(t => t.g === g.key).map(t => `<option value="${PT.indexOf(t)}">${e(t.n)}</option>`).join("")}</optgroup>`).join("")}</select><div id="pInc" class="inc2"></div><div id="pPw"><label for="pP">Extra <span id="pUl">pages</span>: <b id="pV">0</b></label><input type="range" id="pP" min="0" max="20" value="0"></div><label>Optional extras (priced separately)</label><div class="ao" id="pX"></div></div>
<div class="out rv r"><small id="pOl">Starting price (base scope)</small><b id="pO">₹0</b><small>Base price plus the extras you select. Pay in milestones. Your final quote is fixed and itemised after a free call.</small><em>Care plans from ${e(C.pricing.carePlanFrom)}/month</em><a class="bt" href="#contact" style="background:#fff;color:var(--p);margin-top:22px;align-self:flex-start">Lock this quote →</a></div></div>
<div class="cd rv" style="transform:none;margin-top:28px"><div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:10px"><h3>Estimated delivery timeline</h3><b id="tw" style="font:800 28px 'Bricolage Grotesque',system-ui,sans-serif;color:var(--p)"></b></div><div>${PH.map((p, i) => `<div class="gr2"><span>${p}</span><div class="gtk"><i id="g${i}"><b></b></i></div></div>`).join("")}</div><p style="font-size:14px;margin-top:14px">Indicative. The exact schedule is agreed in writing before work starts.</p></div>
<div class="vs">${(C.pricing.compare || []).map((v, i) => { const name = v.name || v[0], price = v.price || v[1], plbl = v.priceLabel || v[2], tag = v.tagline || v[3], feats = v.features || v[4]; return `<div class="cd rv" style="--d:${i * .1}s"><h3>${e(name)}</h3><div class="pc"><small>${e(plbl)} </small>${e(price)}</div><p><b>${e(tag)}</b></p><ul class="ul">${feats.map(f => `<li>${e(f)}</li>`).join("")}</ul></div>` }).join("")}</div><div class="inc rv"><h3>Included with every project</h3><div class="ig">${C.pricing.included.map(t => `<div><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>${e(t)}</div>`).join("")}</div></div>${C.pricing.launchOffer ? `<p class="rv" style="text-align:center;margin-top:28px;color:var(--mut)">${e(C.pricing.launchOffer)}</p>` : ""}</div></section>
<section id="team" style="background:var(--cd)"><div class="w"><div class="c"><span class="k">The team</span><h2 class="c rv">Meet the team behind your product</h2><p class="ld rv">Engineers and designers working as one. You talk directly to the people building your product.</p></div><div class="tm">${C.team.map((m, i) => `<article class="m rv" style="--d:${(i % 4) * .08}s"><div class="im">${m.photo ? `<img src="assets/team/${e(m.photo)}" alt="${e(m.name)}, ${e(m.role)}" loading="lazy" width="400" height="400" onerror="this.replaceWith(document.createTextNode('${ini(m.name)}'))">` : e(ini(m.name))}</div><div class="t"><h3>${e(m.name)}</h3><div class="r">${e(m.role)}</div><p>${e(m.text)}</p></div></article>`).join("")}</div></div></section>
${(C.testimonials && C.testimonials.length) ? `<section style="padding-bottom:40px"><div class="w c"><span class="k">Client words</span><h2 class="c rv">What clients say</h2></div><div class="mq t" style="margin-top:30px"><div>${[...C.testimonials, ...C.testimonials].map(q => `<div class="cd q"><div class="st">★★★★★</div><p>“${e(q.quote || q.q)}”</p><b>${e(q.name || q.a)}</b><small>${e(q.role || q.c)}</small></div>`).join("")}</div></div></section>` : ""}
<section id="faq" style="padding-top:60px"><div class="w" style="max-width:860px"><div class="c"><span class="k">FAQ</span><h2 class="c rv">Questions, answered honestly</h2></div><div style="margin-top:44px">${C.faqs.map((f, i) => `<div class="fq rv" style="--d:${i * .05}s"><button aria-expanded="false">${e(f.q)}</button><div class="a"><div>${e(f.a)}</div></div></div>`).join("")}</div></div></section>
<div class="bigm" id="bm" aria-hidden="true"><div>DESIGN ✦ BUILD ✦ TEST ✦ DEPLOY ✦ REPEAT ✦ DESIGN ✦ BUILD ✦ TEST ✦ DEPLOY ✦ REPEAT ✦</div></div>
<div class="band"><div class="bl" style="width:300px;height:300px;background:#ff6b3d;left:-60px;top:-80px;opacity:.5"></div><div class="w"><h2 class="rv">Your website can wow your clients too.</h2><a class="bt rv" href="#contact" style="--d:.15s">Start my project →</a></div></div>
<section id="contact"><div class="w ct"><div><span class="k">Contact</span><h2 class="rv l">Tell us your idea. We’ll reply in ${e(C.stats[3].n)} hours.</h2><p class="ld rv">Free consultation, NDA on request and an instant fixed quote via WhatsApp.</p><div class="cl"><a class="rv l" href="https://wa.me/${e(C.brand.whatsapp)}" target="_blank" rel="noopener" style="border-color:var(--p)"><i>💬</i>Chat directly on WhatsApp</a><a class="rv l" style="--d:.1s" href="mailto:${e(C.brand.email)}"><i>✉️</i>${e(C.brand.email)}</a><a class="rv l" style="--d:.2s" href="tel:${e(C.brand.phone)}"><i>📞</i>${e(C.brand.phone)}</a></div></div>
<form class="cd fm rv r" id="fm" style="transform:none">
  <div class="r2">
    <input name="name" placeholder="Your name" required aria-label="Name">
    <input name="phone" type="tel" placeholder="WhatsApp / Phone number" required aria-label="Phone number">
  </div>
  <div class="r2">
    <input name="email" type="email" placeholder="Email address (optional)" aria-label="Email address">
    <select name="svc" aria-label="Service">${svcOptions.map(s => `<option>${e(s)}</option>`).join("")}</select>
  </div>
  <textarea name="msg" rows="4" placeholder="Describe your project, timeline and requirements..." required aria-label="Project details"></textarea>
  <button type="submit" class="bt" style="justify-self:start">Send on WhatsApp 💬</button>
  <div id="fs" style="font-weight:700;font-size:14.5px;line-height:1.5"></div>
</form>
</div></section>`;

    $("#ft").innerHTML = `<div class="w"><div class="fg"><div class="ft-bio"><div class="ft-logo"><img src="assets/logo.png" class="logo-light" alt="${e(C.brand.name)}" height="42"><img src="assets/logo-dark.png" class="logo-dark" alt="${e(C.brand.name)}" height="42"></div><p>${e(C.brand.aim || "Low-cost to advanced software solutions built by real software engineers. We believe in process, industry standards, scalability, maintainability, production cloud deployment, and monetization.")}</p><div class="ft-loc">${e(C.brand.location)}</div></div><div><b>Company</b>${nav.slice(0, 6).map(n => `<a href="${n[1]}">${n[0]}</a>`).join("")}<a href="#blog">Blog</a></div><div><b>Services</b>${C.services.map(s => `<a href="#services-${s.slug}">${e(s.name)}</a>`).join("")}</div><div><b>Connect</b><a href="mailto:${e(C.brand.email)}">${e(C.brand.email)}</a><a href="https://wa.me/${e(C.brand.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>${Object.entries(C.brand.social || {}).filter(([k, v]) => /^https?:\/\//.test(v)).map(([k, v]) => `<a href="${e(v)}" target="_blank" rel="noopener">${e(k)}</a>`).join("")}</div></div><div class="big-ft" aria-hidden="true">${e(C.brand.short)} TECHNOLOGY</div><div class="cp"><span>© ${new Date().getFullYear()} ${e(C.brand.name)}. All rights reserved.</span><span><a href="#privacy-policy" style="display:inline;margin-right:16px">Privacy Policy</a><a href="#terms-of-service" style="display:inline">Terms of Service</a></span></div></div>`;

    initHomeInteractions();
  }

  // --------------------------------------------------------------------------
  // SUBPAGE RENDERERS
  // --------------------------------------------------------------------------
  function renderCta(text) {
    return `<div class="band"><div class="w"><h2>${e(text || "Ready to start your project?")}</h2><a class="bt" href="#contact">Get a free quote →</a></div></div>`;
  }
  function renderHero(crumb, h1, lead, extra = "") {
    const cr = crumb.map(c => typeof c === "string" ? `<b>${e(c)}</b>` : `<a href="${c[0]}">${e(c[1])}</a>`).join('<span> / </span>');
    return `<section class="pgh"><div class="w"><nav class="crumb" aria-label="Breadcrumb">${cr}</nav><h1>${e(h1)}</h1><p class="lead2">${e(lead)}</p>${extra}</div></section>`;
  }

  function renderSubpage(key) {
    // 1. Service Page
    if (key.startsWith("services-")) {
      const slug = key.replace("services-", "");
      const s = C.services.find(item => item.slug === slug);
      if (!s) return null;

      const extraChips = `<div class="chips2"><span>${e(s.priceLabel)} <b>${e(s.price)}</b></span><span>Fixed, itemised quote</span><span>Source code is yours</span></div>
        <div class="hc"><a class="bt" href="#contact">Get a free quote</a><a class="bt o" href="#pricing">Estimate my cost</a></div>`;

      const cards = s.benefits.map((b, i) => `<div class="cd rv" style="--d:${i * .08}s"><h3>${e(b.title)}</h3><p>${e(b.text)}</p></div>`).join("");
      const gets = s.included.map(g => `<li>${e(g)}</li>`).join("");
      const extras = s.extras.map(x => `<div class="rowx"><span>${e(x.name)}</span><b>+₹${fmt(x.price)}${e(s.estimator.priceSuffix || "")}</b></div>`).join("");
      const who = s.whoFor.map((w, i) => `<div class="cd rv" style="--d:${i * .08}s"><p style="color:var(--fg);font-size:17px">${e(w)}</p></div>`).join("");
      const steps = [
        ["Discuss", "A free call to understand your goal, users and budget."],
        ["Design", "Wireframes and a clickable UI before we build."],
        ["Build", "Agile sprints with a live demo every week."],
        ["Test", "Manual and automated testing plus a security review."],
        ["Deploy", "A controlled production release, then ongoing support."]
      ].map((st, i) => `<div class="rv" style="--d:${i * .08}s"><em>STEP ${i + 1}</em><h3>${e(st[0])}</h3><p>${e(st[1])}</p></div>`).join("");

      const rel = (s.related || []).map(rSlug => {
        const r = C.services.find(x => x.slug === rSlug);
        if (!r) return "";
        return `<a class="cd" href="#services-${r.slug}"><h3>${e(r.name)}</h3><p>${e(r.seoDescription.slice(0, 120))}…</p><span class="more">Learn more →</span></a>`;
      }).join("");

      const faqsHtml = (s.faqs || []).map(f => `<div class="fq"><button aria-expanded="false">${e(f.q)}</button><div class="a"><div>${e(f.a)}</div></div></div>`).join("");

      const html = renderHero([["#top", "Home"], ["#services", "Services"], s.name], s.h1 || s.title, s.intro || s.seoDescription, extraChips) +
        `<section class="sec"><div class="w"><span class="k">Why it works</span><h2>What you gain with our ${e(s.name)} service</h2><div class="two">${cards}</div></div></section>
        <section class="sec alt2"><div class="w"><span class="k">Pricing structure</span><h2>What is included, and what costs extra</h2><div class="two"><div class="cd"><h3>Included in the starting price</h3><p style="margin:6px 0 10px">${e(s.priceLabel)} <b style="color:var(--p);font-size:22px">${e(s.price)}</b></p><ul class="ul">${gets}</ul></div><div class="cd"><h3>Optional extras (priced separately)</h3><div class="crow">${extras}</div></div></div><p style="margin-top:22px;color:var(--mut)">Every extra is itemised in your fixed quote, so you only pay for what you add. <a class="more" href="#pricing">Estimate your project →</a></p></div></section>
        <section class="sec"><div class="w"><span class="k">Who it is for</span><h2>Built for businesses like yours</h2><div class="three">${who}</div></div></section>
        <section class="sec alt2"><div class="w"><span class="k">How we deliver</span><h2>A clear process from first call to launch</h2><div class="steps2">${steps}</div><h3 style="margin:44px 0 12px;font-size:22px">How we choose technology</h3><p style="color:var(--mut);max-width:760px">We select the technology that best fits your project, users and budget, and explain our recommendation in your written quote. You always receive the full source code.</p></div></section>
        <section class="sec"><div class="w" style="max-width:860px"><span class="k">FAQ</span><h2>Common questions about ${e(s.name)}</h2>${faqsHtml}</div></section>
        ${rel ? `<section class="sec alt2"><div class="w"><span class="k">Related services</span><h2>You may also need</h2><div class="two">${rel}</div></div></section>` : ""}
        ${renderCta("Get a fixed quote for " + s.name)}`;

      return { title: s.title || s.name, html };
    }

    // 2. Case Study Page
    if (key.startsWith("work-")) {
      const slug = key.replace("work-", "");
      const c = C.caseStudies.find(item => item.slug === slug);
      if (!c) return null;

      const facts = c.facts.map(f => `<div><small>${e(f.label)}</small><b>${e(f.value)}</b></div>`).join("");
      const feats = c.features.map(f => `<li>${e(f)}</li>`).join("");
      const relSvc = C.services.find(s => s.slug === c.relatedService);

      const html = renderHero([["#top", "Home"], ["#work", "Work"], c.name], c.title, c.summary, '<div class="hc"><a class="bt" href="#contact">Build something like this</a></div>') +
        `<section class="sec"><div class="w"><div class="facts">${facts}</div><div class="art" style="margin:0"><h2>The challenge</h2><p>${e(c.challenge)}</p><h2>Our solution</h2><p>${e(c.solution)}</p><h2>Key features</h2><ul>${feats}</ul><h2>The outcome</h2><p>${e(c.outcome)}</p></div></div></section>
        ${relSvc ? `<section class="sec alt2"><div class="w"><span class="k">Related service</span><h2>Want something similar?</h2><a class="cd" href="#services-${relSvc.slug}" style="display:block;max-width:560px"><h3>${e(relSvc.title || relSvc.name)}</h3><p>${e(relSvc.seoDescription.slice(0, 140))}…</p><span class="more">Learn more →</span></a></div></section>` : ""}
        ${renderCta("Have an idea like this? Let’s build it.")}`;

      return { title: c.title, html };
    }

    // 3. Blog Index
    if (key === "blog") {
      const cards = C.blog.map((p, i) => `<a class="cd rv" style="--d:${i * .08}s" href="#blog-${p.slug}"><small>${e(p.date)} · ${p.readMinutes} min read</small><h3>${e(p.title)}</h3><p>${e(p.seoDescription)}</p><span class="more">Read article →</span></a>`).join("");
      const html = renderHero([["#top", "Home"], "Blog"], "Software, website and app insights", C.seo.blogIntro) +
        `<section class="sec" style="padding-top:20px"><div class="w"><div class="bgrid">${cards}</div></div></section>${renderCta("Need help with your project?")}`;
      return { title: C.seo.blogTitle || "Blog", html };
    }

    // 4. Blog Article Page
    if (key.startsWith("blog-")) {
      const slug = key.replace("blog-", "");
      const p = C.blog.find(item => item.slug === slug);
      if (!p) return null;

      const body = p.sections.map(s => `<h2>${e(s.heading)}</h2>` + s.paragraphs.map(x => `<p>${e(x)}</p>`).join("")).join("");
      const others = C.blog.filter(q => q.slug !== slug).slice(0, 2);
      const more = others.map(q => `<a class="cd" href="#blog-${q.slug}"><h3>${e(q.title)}</h3><p>${e(q.seoDescription)}</p><span class="more">Read article →</span></a>`).join("");
      const meta = `<div class="meta"><span>By ${e(C.brand.name)} team</span><span>${e(p.date)}</span><span>${p.readMinutes} min read</span></div>`;

      const html = renderHero([["#top", "Home"], ["#blog", "Blog"], "Article"], p.title, p.seoDescription, meta) +
        `<section class="sec" style="padding-top:20px"><div class="art">${body}</div></section><section class="sec alt2"><div class="w"><span class="k">Keep reading</span><h2>More from the blog</h2><div class="two">${more}</div></div></section>${renderCta("Want a fixed quote for your project?")}`;

      return { title: p.title, html };
    }

    // 5. Legal: Privacy Policy
    if (key === "privacy-policy") {
      const secs = (C.legal && C.legal.privacy) ? C.legal.privacy : [];
      const body = secs.map(s => `<h2>${e(s.heading)}</h2>` + s.paragraphs.map(x => `<p>${e(x)}</p>`).join("")).join("");
      const meta = `<div class="meta"><span>Last updated: ${e(C.legal.lastUpdated || "2026-11-01")}</span></div>`;
      const html = renderHero([["#top", "Home"], "Privacy Policy"], "Privacy Policy", "How RKS Technology collects, uses and protects your personal information.", meta) +
        `<section class="sec" style="padding-top:20px"><div class="art">${body}<p>Questions? Email <a class="more" href="mailto:${e(C.brand.email)}">${e(C.brand.email)}</a>.</p></div></section>`;
      return { title: "Privacy Policy", html };
    }

    // 6. Legal: Terms of Service
    if (key === "terms-of-service") {
      const secs = (C.legal && C.legal.terms) ? C.legal.terms : [];
      const body = secs.map(s => `<h2>${e(s.heading)}</h2>` + s.paragraphs.map(x => `<p>${e(x)}</p>`).join("")).join("");
      const meta = `<div class="meta"><span>Last updated: ${e(C.legal.lastUpdated || "2026-11-01")}</span></div>`;
      const html = renderHero([["#top", "Home"], "Terms of Service"], "Terms of Service", "The terms that apply when you use the RKS Technology website or engage us for software development services.", meta) +
        `<section class="sec" style="padding-top:20px"><div class="art">${body}<p>Questions? Email <a class="more" href="mailto:${e(C.brand.email)}">${e(C.brand.email)}</a>.</p></div></section>`;
      return { title: "Terms of Service", html };
    }

    return null;
  }

  // --------------------------------------------------------------------------
  // HASH ROUTER
  // --------------------------------------------------------------------------
  function route() {
    const raw = decodeURIComponent(location.hash.slice(1));
    const subpage = $("#subpage");
    const top = $("#top");

    // Check if it's a home section anchor or empty
    const homeSections = ["", "top", "about", "services", "build", "process", "work", "stack", "upgrade", "quality", "trust", "pricing", "team", "faq", "contact"];
    if (homeSections.includes(raw)) {
      subpage.hidden = true;
      subpage.innerHTML = "";
      top.style.display = "";
      document.body.classList.remove("pgv");
      document.title = HOME_TITLE;
      if (raw && raw !== "top") {
        const el = document.getElementById(raw);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
      }
      return;
    }

    // Try rendering as subpage
    const res = renderSubpage(raw);
    if (res) {
      top.style.display = "none";
      subpage.innerHTML = res.html;
      subpage.hidden = false;
      document.body.classList.add("pgv");
      document.title = `${res.title} | ${C.brand.name}`;
      window.scrollTo(0, 0);

      // Accordion click bindings in subpage
      subpage.querySelectorAll(".fq button").forEach(b => {
        b.onclick = () => {
          const o = b.parentElement.classList.toggle("o");
          b.setAttribute("aria-expanded", o);
        };
      });

      // Animate reveal elements
      subpage.querySelectorAll(".rv").forEach(n => n.classList.add("on"));
    } else {
      // Unknown hash, restore home
      subpage.hidden = true;
      top.style.display = "";
      document.body.classList.remove("pgv");
      document.title = HOME_TITLE;
    }
  }

  // --------------------------------------------------------------------------
  // HOME PAGE INTERACTIONS
  // --------------------------------------------------------------------------
  function initHomeInteractions() {
    // Theme toggle
    const root = document.documentElement;
    let sv = null;
    try { sv = localStorage.getItem("rks-theme"); } catch (_) {}
    const setT = t => {
      root.dataset.theme = t;
      $("#th").textContent = t === "dark" ? "☀" : "☾";
      const mc = document.querySelector('meta[name="theme-color"]');
      if (mc) mc.content = t === "dark" ? "#070b18" : "#f5f7fb";
    };
    setT(sv === "dark" ? "dark" : "light");

    function toggleT(ev) {
      const t = root.dataset.theme === "dark" ? "light" : "dark";
      const go = () => {
        setT(t);
        try { localStorage.setItem("rks-theme", t); } catch (_) {}
      };
      if (!document.startViewTransition || rm) { go(); return; }
      const x = ev.clientX, y = ev.clientY, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      let ran = false;
      const once = () => { if (!ran) { ran = true; go(); } };
      setTimeout(once, 350);
      try {
        document.startViewTransition(once).ready.then(() =>
          root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 650, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" })
        ).catch(() => {});
      } catch (_) { once(); }
    }
    $("#th").onclick = toggleT;

    // Mobile nav toggle
    $("#mb").onclick = () => $("#mn").classList.toggle("o");
    $("#mn").onclick = ev => { if (ev.target.closest("a")) $("#mn").classList.remove("o"); };

    // Scroll progress bar and floating back to top button
    addEventListener("scroll", () => {
      const y = scrollY;
      const maxScroll = Math.max(1, root.scrollHeight - innerHeight);
      const pct = (y / maxScroll) * 100;
      $("#bar").style.width = pct + "%";
      $("#hd").classList.toggle("s", y > 40);
      $("#up").classList.toggle("s", y > 800);
      $("#up").style.setProperty("--pg", Math.min(100, pct) + "%");
      if (y < 1400) $$(".bl").forEach((b, i) => b.style.translate = `0 ${y * (.06 + i * .04)}px`);

      // Section highlight
      const activeNavLinks = nav.filter(n => n[1].startsWith("#") && n[1] !== "#top" && n[1] !== "#blog");
      const secs = activeNavLinks.map(n => $(n[1])).filter(Boolean);
      let cur = -1;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
      $$("#mn a").forEach((a, i) => a.classList.toggle("on", i === cur));
      $$("#rail a").forEach((a, i) => a.classList.toggle("on", i === cur));

      // Process timeline scroll progress
      const pSec = $("#process");
      if (pSec) {
        const r = pSec.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -r.top / (r.height - innerHeight)));
        const ST = C.process;
        $("#pl").style.setProperty("--p", `calc((100% - 28px) * ${p * (ST.length - 1) / (ST.length - 1)})`);
        stage(Math.min(ST.length - 1, Math.floor(p * ST.length)));
      }
    }, { passive: true });
    $("#up").onclick = () => scrollTo({ top: 0, behavior: "smooth" });

    // Live build hero demo
    let tok = 0, picked = false;
    const keys = Object.keys(DEMO);
    async function buildDemo(k) {
      const my = ++tok, d = DEMO[k];
      $("#cf").textContent = d.f;
      $("#cd").innerHTML = "";
      $("#pv").innerHTML = d.pv;
      $("#st").className = "";
      $("#st").textContent = "Building…";
      $$("#ch button").forEach(b => b.classList.toggle("on", b.textContent === k));
      for (let i = 0; i < d.l.length; i++) {
        const row = document.createElement("div");
        $("#cd").appendChild(row);
        const el = $(`#pv [data-k="${i}"]`);
        if (el) setTimeout(() => el.classList.add("on"), rm ? 0 : 150);
        const s = d.l[i];
        for (let j = 1; j <= s.length; j++) {
          if (my !== tok) return;
          row.innerHTML = hl(s.slice(0, j)) + (rm ? "" : "<u></u>");
          if (!rm) await sl(17);
        }
        if (!rm) await sl(260);
      }
      if (my !== tok) return;
      $("#st").textContent = "✓ Tests passed  ✓ Deployed to production";
      $("#st").className = "ok";
      if (!picked && !rm) {
        await sl(4500);
        if (my === tok && !picked) buildDemo(keys[(keys.indexOf(k) + 1) % keys.length]);
      }
    }
    $("#ch").onclick = ev => {
      const b = ev.target.closest("button");
      if (b) { picked = true; buildDemo(b.textContent); }
    };
    new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) { o.disconnect(); buildDemo(keys[0]); }
    }, { threshold: .2 }).observe($("#build"));

    // Pinned process stages
    const ST = C.process;
    let cs = -1;
    const spans = $$("#pg .nd span");
    function stage(i) {
      if (i === cs) return;
      cs = i;
      const s = ST[i];
      $("#ps").innerHTML = `<h3>${e(s.title || s[0])}</h3><p>${e(s.text || s[1])}</p>`;
      const lines = s.terminal || s[2] || [];
      $("#pt").innerHTML = lines.map((l, k) => `<p class="${l[0] === "✔" ? "ok" : ""}" style="animation-delay:${k * .35}s">${e(l)}</p>`).join("");
      spans.forEach((x, k) => {
        x.classList.toggle("on", k <= i);
        x.classList.toggle("cur", k === i);
      });
    }
    stage(0);

    // Work showcase
    function work(i) {
      const x = C.caseStudies[i];
      const relSlug = x.slug;
      $("#wd").innerHTML = `<div class="wd"><p style="font-size:19px">${e(x.showcase ? x.showcase.text : x.summary)}</p><ul class="ul">${(x.showcase ? x.showcase.bullets : x.features).map(b => `<li>${e(b)}</li>`).join("")}</ul><div class="tg">${(x.showcase ? x.showcase.tags : []).map(k => `<span>${e(k)}</span>`).join("")}</div><div style="margin-top:26px"><a class="bt" href="#contact">Build something like this</a><a class="more" href="#work-${relSlug}" style="margin-left:20px">Read case study →</a></div></div>`;
      $("#scr").style.animation = "none";
      $("#scr").offsetWidth;
      $("#scr").style.animation = "";
      $("#scr").innerHTML = SCR[i] || "";
      const s = $("#stg");
      const c = (x.showcase && x.showcase.colors) ? x.showcase.colors : ["#3b4bff", "#8a3dff"];
      s.style.setProperty("--c1", c[0]);
      s.style.setProperty("--c2", c[1]);
      $$("#wt button").forEach((b, k) => b.classList.toggle("on", k === i));
    }
    work(0);
    let wpk = false;
    $("#wt").onclick = ev => {
      const b = ev.target.closest("button");
      if (b) { wpk = true; work(+b.dataset.i); }
    };
    if (!rm) {
      let wi = 0;
      setInterval(() => {
        if (!wpk) { wi = (wi + 1) % C.caseStudies.length; work(wi); }
      }, 6500);
    }

    // Transparency Kanban board
    const cols = ["To do", "In progress", "Done"], colr = ["#98a3c7", "#ff6b3d", "#00b587"];
    let bs = [2, 1, 1, 0, 0, 0];
    function kb() {
      $("#kb").innerHTML = cols.map((c, ci) => {
        const t = C.board.map((n, k) => bs[k] === ci ? `<div class="kt" style="--c:${colr[ci]}">${e(n)}</div>` : "").join("");
        return `<div class="kc"><h4>${c}<b>${bs.filter(x => x === ci).length}</b></h4>${t}</div>`;
      }).join("");
    }
    kb();
    if (!rm) setInterval(() => {
      let k = bs.findIndex(x => x === 1);
      if (k < 0) k = bs.findIndex(x => x === 0);
      if (k < 0) bs = [0, 0, 0, 0, 0, 0];
      else bs[k]++;
      kb();
    }, 2200);

    // Price configurator
    function xr() {
      const t = PT[+$("#pT").value];
      $("#pX").innerHTML = t.x.map((a, i) => `<label><input type="checkbox" data-a="${i}">${e(a[0])}<small>+${pC}${fmt(a[1])}${e(t.sfx)}</small></label>`).join("");
      $("#pInc").innerHTML = `<b>Base price includes</b><ul class="ul">${t.inc.map(f => `<li>${e(f)}</li>`).join("")}</ul>`;
      $("#pPw").style.display = t.unit ? "" : "none";
      $("#pUl").textContent = t.unit ? plur(t.unit) : "";
      $("#pP").value = 0;
      $$("[data-a]").forEach(c => c.addEventListener("change", calc));
      calc();
    }
    function calc() {
      const t = PT[+$("#pT").value], p = +$("#pP").value;
      let na = 0, v = t.base;
      $("#pV").textContent = p;
      if (t.unit) v += p * t.per;
      $$("[data-a]").forEach(c => { if (c.checked) { v += t.x[c.dataset.a][1]; na++; } });
      $("#pO").textContent = t.sfx ? pC + fmt(v) + t.sfx : na || p ? pC + fmt(v) + " – " + fmt(v * 1.15) : pC + fmt(v);
      $("#pOl").textContent = na || p ? "Estimated investment (base + extras)" : "Starting price (base scope)";
      if (t.weeks == null) {
        $("#tw").textContent = "Ongoing monthly plan";
        PHR.forEach((r, i) => $("#g" + i).style.setProperty("--w", "0%"));
        return;
      }
      const wk = Math.max(1, t.weeks + p * .12 + na * .6), d = Math.round(wk * 7);
      $("#tw").textContent = d < 14 ? d + " days" : "About " + Math.round(wk) + " weeks";
      let c0 = 0;
      PHR.forEach((r, i) => {
        const g = $("#g" + i);
        g.style.setProperty("--l", c0 + "%");
        g.style.setProperty("--w", r * 100 + "%");
        g.firstChild.textContent = Math.max(1, Math.round(d * r)) + "d";
        c0 += r * 100;
      });
    }
    $("#pT").addEventListener("input", xr);
    $("#pP").addEventListener("input", calc);
    xr();

    // Service category filter
    $("#sfl").onclick = ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      $$("#sfl button").forEach(x => x.classList.toggle("on", x === b));
      const g = b.dataset.g;
      $$(".sg").forEach(d => {
        d.hidden = g !== "all" && d.dataset.g !== g;
        if (!d.hidden) {
          d.classList.remove("rv", "on");
          d.style.animation = "none";
          d.offsetWidth;
          d.style.animation = "fi .5s both";
        }
      });
    };

    // FAQ Accordion
    $$(".fq button").forEach(b => {
      b.onclick = () => {
        const o = b.parentElement.classList.toggle("o");
        b.setAttribute("aria-expanded", o);
      };
    });

    // Before/after comparison slider
    const ba = $("#ba"), bx = $("#bx"), sx = v => { ba.style.setProperty("--x", v + "%"); bx.value = v; };
    if (bx) {
      bx.oninput = () => sx(bx.value);
      new IntersectionObserver((es, o) => {
        if (es[0].isIntersecting) {
          o.disconnect();
          if (rm) return;
          const t0 = performance.now();
          (function f(n) {
            const p = (n - t0) / 2800;
            if (p < 1) { sx(50 + 42 * Math.sin(p * Math.PI * 2) * (1 - p)); requestAnimationFrame(f); }
            else sx(50);
          })(t0);
        }
      }, { threshold: .5 }).observe(ba);
    }

    // Scroll reveal observer
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) {
        const t = x.target;
        t.classList.add("on");
        io.unobserve(t);
        if (t.classList.contains("rv") && !t.matches(".gg,.ide,.inc")) {
          setTimeout(() => { t.classList.remove("rv", "on"); t.style.transitionDelay = ""; }, 1400);
        }
      }
    }), { threshold: .12 });
    $$("h2.rv").forEach(h => {
      h.innerHTML = h.textContent.split(" ").map((w, i) => `<span class="wsp" style="transition-delay:${i * .05}s">${e(w)}</span>`).join(" ");
      h.classList.remove("rv");
      h.classList.add("sw");
      io.observe(h);
    });
    $$(".rv").forEach(n => io.observe(n));

    // Number counters observer
    const co = new IntersectionObserver(es => es.forEach(x => {
      if (!x.isIntersecting) return;
      co.unobserve(x.target);
      const el = x.target, t = +el.dataset.n, t0 = performance.now(), f = v => el.dataset.p + fmt(v) + el.dataset.s;
      (function g(n) {
        const p = Math.min((n - t0) / 1600, 1);
        el.textContent = f(t * (1 - Math.pow(1 - p, 3)));
        if (p < 1 && !rm) requestAnimationFrame(g);
        else el.textContent = f(t);
      })(t0);
    }), { threshold: .6 });
    $$(".stt b,.gg b").forEach(n => co.observe(n));

    // Particle canvas morph in Hero
    (function () {
      const cv = $("#pc");
      if (!cv) return;
      const x = cv.getContext("2d");
      const SH = [
        [C.brand.short || "RKS", C.brand.name || "RKS Technology"],
        ["🌐", "Websites"],
        ["📱", "Mobile Apps"],
        ["🎮", "2D Games"],
        ["🤖", "AI Solutions"]
      ];
      const cols = ["#3b4bff", "#8a3dff", "#00b587", "#ff6b3d"];
      const dpr = Math.min(devicePixelRatio || 1, 2);
      let W, H, P = [], T = [], mx = -999, my = -999, si = 0, vis = true, pk = false;

      function samp(t) {
        const o = document.createElement("canvas");
        o.width = W; o.height = H;
        const s = o.getContext("2d");
        s.textAlign = "center";
        s.textBaseline = "middle";
        const em = !/[A-Za-z]/.test(t);
        s.font = em ? `${Math.min(W, H) * .55}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif` : `800 ${Math.min(W * .36, H * .42)}px "Bricolage Grotesque",sans-serif`;
        s.fillText(t, W / 2, H / 2);
        const d = s.getImageData(0, 0, W, H).data, g = Math.max(4, Math.round(W / 85)), a = [];
        for (let y = 0; y < H; y += g) {
          for (let q = 0; q < W; q += g) {
            if (d[(y * W + q) * 4 + 3] > 100) a.push([q, y]);
          }
        }
        return a;
      }
      function setS(i) {
        si = i;
        const a = samp(SH[i][0]);
        T = P.map((p, k) => a.length ? a[Math.floor(k * a.length / P.length)] : [W / 2, H / 2]);
        $("#pcl").textContent = SH[i][1];
        $$("#hch button").forEach((b, k) => b.classList.toggle("on", k === i));
        if (rm) { P.forEach((p, k) => { p.x = T[k][0]; p.y = T[k][1]; }); draw(); }
      }
      function draw() {
        x.setTransform(dpr, 0, 0, dpr, 0, 0);
        x.clearRect(0, 0, W, H);
        for (let c = 0; c < 4; c++) {
          x.fillStyle = cols[c];
          for (let k = c; k < P.length; k += 4) x.fillRect(P[k].x, P[k].y, 2.8, 2.8);
        }
      }
      function step() {
        for (let k = 0; k < P.length; k++) {
          const p = P[k], t = T[k];
          p.vx += (t[0] - p.x) * .014;
          p.vy += (t[1] - p.y) * .014;
          const dx = p.x - mx, dy = p.y - my, d = dx * dx + dy * dy;
          if (d < 10000) {
            const l = Math.sqrt(d) || 1, f = (1 - d / 10000) * 2.4;
            p.vx += dx / l * f;
            p.vy += dy / l * f;
          }
          p.vx *= .85; p.vy *= .85;
          p.x += p.vx; p.y += p.vy;
        }
      }
      function init() {
        W = cv.parentElement.offsetWidth;
        H = cv.parentElement.offsetHeight;
        cv.width = W * dpr;
        cv.height = H * dpr;
        P = Array.from({ length: Math.min(1400, Math.round(W * 2.4)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0 }));
        setS(si);
      }

      Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1000))]).then(init);
      addEventListener("resize", () => { if (W) init(); });
      const pw = cv.parentElement;
      pw.addEventListener("pointermove", ev => {
        const r = cv.getBoundingClientRect();
        mx = ev.clientX - r.left;
        my = ev.clientY - r.top;
      });
      pw.addEventListener("pointerleave", () => { mx = my = -999; });
      new IntersectionObserver(es => vis = es[0].isIntersecting).observe(cv);
      $("#hch").onclick = ev => {
        const b = ev.target.closest("button");
        if (b) { pk = true; setS([...$$("#hch button")].indexOf(b)); }
      };
      if (!rm) {
        (function fr() {
          if (vis && P.length) { step(); draw(); }
          requestAnimationFrame(fr);
        })();
        setInterval(() => {
          if (!pk && vis && W) setS((si + 1) % SH.length);
        }, 4200);
      }
    })();

    // WhatsApp enquiry form onsubmit handler
    const fm = $("#fm");
    if (fm) {
      fm.onsubmit = ev => {
        ev.preventDefault();
        const f = ev.target, d = new FormData(f);
        const name = (d.get("name") || "").trim();
        const phone = (d.get("phone") || "").trim();
        const email = (d.get("email") || "").trim();
        const service = d.get("svc") || "General Enquiry";
        const msg = (d.get("msg") || "").trim();

        const text = `Hello ${C.brand.name},\n\n*New Project Enquiry*\n• *Name:* ${name}\n• *Phone:* ${phone}${email ? `\n• *Email:* ${email}` : ""}\n• *Service:* ${service}\n\n*Project Details:*\n${msg}`;
        const url = `https://wa.me/${C.brand.whatsapp}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");

        const fs = $("#fs");
        if (fs) {
          fs.style.color = "var(--g)";
          fs.innerHTML = `✓ Opening WhatsApp with your enquiry! If it didn't open automatically, <a href="${url}" target="_blank" rel="noopener" style="color:var(--p);text-decoration:underline">click here to chat on WhatsApp</a>.`;
        }
      };
    }

    // 3D tilt on Work stage & magnetic buttons
    if (!rm) {
      const stg = $("#stg"), t3 = $("#tw3");
      if (stg && t3) {
        stg.addEventListener("pointermove", ev => {
          const r = stg.getBoundingClientRect();
          t3.style.transform = `rotateY(${((ev.clientX - r.left) / r.width - .5) * 22}deg) rotateX(${-((ev.clientY - r.top) / r.height - .5) * 16}deg)`;
        });
        stg.addEventListener("pointerleave", () => t3.style.transform = "");
      }
      if (matchMedia("(pointer:fine)").matches) {
        $$(".bt:not(.sm)").forEach(b => {
          b.addEventListener("pointermove", ev => {
            const r = b.getBoundingClientRect();
            b.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * .2}px,${(ev.clientY - r.top - r.height / 2) * .28}px)`;
          });
          b.addEventListener("pointerleave", () => b.style.transform = "");
        });
      }
    }

    // Pointer cursor ripple
    $$(".bt").forEach(b => b.addEventListener("click", ev => {
      const r = b.getBoundingClientRect(), s = document.createElement("span");
      s.className = "rp";
      s.style.cssText = `width:40px;height:40px;left:${ev.clientX - r.left - 20}px;top:${ev.clientY - r.top - 20}px`;
      b.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }));

    // Project brief planner chat
    initPlanner();

    // Command menu (Ctrl+K or /)
    initCommandMenu();
  }

  // --------------------------------------------------------------------------
  // PROJECT BRIEF PLANNER CHAT
  // --------------------------------------------------------------------------
  function initPlanner() {
    const cm = $("#cm"), cq = $("#cq");
    if (!cm || !cq) return;
    let S = {};

    const say = (t, c = "b") => {
      const d = document.createElement("div");
      d.className = "mg " + c;
      d.textContent = t;
      cm.appendChild(d);
      cm.scrollTop = cm.scrollHeight;
    };
    async function bot(t) {
      const ty = document.createElement("div");
      ty.className = "mg b ty";
      ty.innerHTML = "<i></i><i></i><i></i>";
      cm.appendChild(ty);
      cq.innerHTML = "";
      cm.scrollTop = cm.scrollHeight;
      await sl(rm ? 0 : 650);
      ty.remove();
      say(t);
    }
    const OPT = (a, cb) => {
      cq.innerHTML = a.map((x, i) => `<button data-i="${i}">${e(x)}</button>`).join("");
      cq.onclick = ev => {
        const b = ev.target.closest("button");
        if (!b) return;
        const v = a[+b.dataset.i];
        say(v, "u");
        cq.innerHTML = "";
        cb(v);
      };
    };
    const TXT = (ph, cb) => {
      cq.onclick = null;
      cq.innerHTML = `<input id="ci" placeholder="${e(ph)}" aria-label="${e(ph)}"><button id="cs">Send</button><button id="ck">Skip</button>`;
      const go = v => { say(v || "Skip", "u"); cq.innerHTML = ""; cb(v); };
      $("#cs").onclick = () => go($("#ci").value.trim());
      $("#ck").onclick = () => go("");
      $("#ci").onkeydown = ev => { if (ev.key === "Enter") go(ev.target.value.trim()); };
      $("#ci").focus();
    };
    const KEY = {
      "Static (information only)": "static",
      "Dynamic (login, database, payments)": "dynamic",
      "Mobile app": "mobile",
      "Desktop software": "desktop",
      "2D game": "game",
      "AI-integrated app": "aiapp",
      "AI chatbot": "chatbot",
      "RAG (chat with documents)": "rag"
    };

    async function flow() {
      S = {};
      cm.innerHTML = "";
      await bot("Hi! I’m the RKS project planner. Answer 4 quick questions and I’ll prepare a ready-to-send brief. What do you want to build?");
      OPT(["Website", "Mobile app", "Desktop software", "2D game", "AI solution", "Not sure yet"], async t => {
        S.t = t; S.k = KEY[t] || "";
        if (t === "Website") {
          await bot("Do you need a static or a dynamic website?");
          OPT(["Static (information only)", "Dynamic (login, database, payments)", "Not sure"], v => {
            S.t = "Website, " + v; S.k = KEY[v] || "dynamic"; q2();
          });
        } else if (t === "AI solution") {
          await bot("Which kind of AI solution do you need?");
          OPT(["AI-integrated app", "AI chatbot", "RAG (chat with documents)", "Not sure"], v => {
            S.t = "AI solution: " + v; S.k = KEY[v] || "aiapp"; q2();
          });
        } else q2();
      });
    }
    async function q2() {
      await bot("What kind of business is it? For example: clinic, boutique, coaching institute.");
      TXT("Your business type", async v => {
        S.b = v;
        await bot("What budget do you have in mind?");
        OPT(["Under ₹10,000", "₹10,000 to ₹30,000", "₹30,000 to ₹75,000", "Above ₹75,000", "Not decided"], async v => {
          S.m = v;
          await bot("When do you need it?");
          OPT(["As soon as possible", "Within 1 month", "2 to 3 months", "Flexible"], v => {
            S.w = v; fin();
          });
        });
      });
    }
    async function fin() {
      const t = PT.find(x => x.key === S.k);
      const pr = t ? `\nStarting price for this: ${pC}${fmt(t.base)}${t.sfx}. Extra features are priced separately.\n` : "";
      const msg = `Hello ${C.brand.name}, I want to build: ${S.t}.\nBusiness: ${S.b || "not shared"}\nBudget: ${S.m}\nTimeline: ${S.w}`;
      await bot(`Thanks! Here is your brief:\n\n${msg}${pr}\nSend it to us directly on WhatsApp for an immediate quote:`);
      cq.onclick = null;
      cq.innerHTML = `<a href="https://wa.me/${C.brand.whatsapp}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Send on WhatsApp</a><a href="mailto:${C.brand.email}?subject=${encodeURIComponent("Project brief")}&body=${encodeURIComponent(msg)}">Email brief</a><button id="cr">Start over</button>`;
      $("#cr").onclick = flow;
    }

    function openChat() {
      $("#cw").classList.add("o");
      $("#cb").style.display = "none";
      if (!cm.children.length) flow();
    }
    $("#cb").onclick = openChat;
    $("#cx").onclick = () => {
      $("#cw").classList.remove("o");
      $("#cb").style.display = "";
    };
    addEventListener("keydown", ev => {
      if (ev.key === "Escape" && $("#cw").classList.contains("o")) $("#cx").click();
    });
  }

  // --------------------------------------------------------------------------
  // COMMAND MENU (Ctrl+K or /)
  // --------------------------------------------------------------------------
  function initCommandMenu() {
    const cpw = $("#cp"), cpi = $("#cpi"), cpl = $("#cpl");
    if (!cpw || !cpi || !cpl) return;

    const CMD = [
      ...nav.map(n => ["Go to " + n[0], "Section", () => {
        location.hash = n[1];
      }]),
      ["Plan my project (chat)", "Assistant", () => { $("#cb").click(); }],
      ["Toggle dark / light mode", "Theme", () => { $("#th").click(); }],
      ["Chat on WhatsApp", "Contact", () => window.open(`https://wa.me/${C.brand.whatsapp}`, "_blank")],
      ["Send an email", "Contact", () => location.href = "mailto:" + C.brand.email],
      ["Back to top", "Page", () => scrollTo({ top: 0, behavior: "smooth" })]
    ];

    let cx = 0, cl = [];
    const rend = () => {
      const q = cpi.value.toLowerCase();
      cl = CMD.filter(c => c[0].toLowerCase().includes(q));
      cx = Math.min(cx, Math.max(0, cl.length - 1));
      cpl.innerHTML = cl.length ? cl.map((c, i) => `<button class="${i === cx ? "on" : ""}" data-i="${i}">${e(c[0])}<em>${e(c[1])}</em></button>`).join("") : '<p style="padding:14px;color:var(--mut)">No results</p>';
    };
    const cpo = o => {
      cpw.hidden = !o;
      if (o) {
        cpi.value = "";
        cx = 0;
        rend();
        setTimeout(() => cpi.focus(), 30);
      }
    };
    const run = i => {
      const c = cl[i];
      if (c) { cpo(false); c[2](); }
    };

    cpi.oninput = () => { cx = 0; rend(); };
    cpl.onclick = ev => {
      const b = ev.target.closest("button");
      if (b) run(+b.dataset.i);
    };
    cpw.onclick = ev => { if (ev.target === cpw) cpo(false); };
    $("#ck2").onclick = () => cpo(true);

    addEventListener("keydown", ev => {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "k") {
        ev.preventDefault();
        cpo(cpw.hidden);
        return;
      }
      if (!cpw.hidden) {
        if (ev.key === "Escape") cpo(false);
        else if (ev.key === "ArrowDown") {
          ev.preventDefault();
          cx = (cx + 1) % (cl.length || 1);
          rend();
        } else if (ev.key === "ArrowUp") {
          ev.preventDefault();
          cx = (cx - 1 + cl.length) % (cl.length || 1);
          rend();
        } else if (ev.key === "Enter") run(cx);
      } else if (ev.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        ev.preventDefault();
        cpo(true);
      }
    });
  }

  // --------------------------------------------------------------------------
  // BOOTSTRAP APPLICATION
  // --------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // Render home structure
    renderHome();

    // Listen to hash changes for subpage routing
    window.addEventListener("hashchange", route);

    // Initial route check (if page loaded with hash)
    route();

    // Hide initial boot loader
    setTimeout(() => {
      const ld = $("#ld");
      if (ld) ld.classList.add("x");
    }, rm ? 0 : 1200);
  });
})();
