const SITE = "https://handpanmanufacturer.com";
const PRODUCTS_VERSION = "20260610-nav-pages";

const finishLabels = ["Purple", "Black", "Gold", "Silver", "Blue"];
const customScaleLinks = [
  ["Celtic Minor", "celtic-minor", "/products/celtic-minor-432hz-handpan"],
  ["Equinox", "equinox", "/products/equinox-9-note-handpan"],
  ["Pygmy", "pygmy", "/products/f2-pygmy-9-note-stainless-steel-handpan"],
  ["Amara", "amara", "/products/custom-oem-handpan"],
  ["Integral", "integral", "/products/custom-oem-handpan"],
  ["Hijaz", "hijaz", "/products/custom-oem-handpan"],
  ["Other requested scales", "other-requested-scales", "/products/custom-oem-handpan"]
];

const customPatternImages = [
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-01.webp",
    width: 1600,
    height: 1067,
    label: "Custom Pattern Finish",
    alt: "Custom handpan pattern finish detail for OEM order",
    caption: "Custom pattern reference"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-02.webp",
    width: 1600,
    height: 1067,
    label: "Surface Finish Detail",
    alt: "Custom handpan surface texture detail for finish discussion",
    caption: "Surface finish detail"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-03.webp",
    width: 1600,
    height: 1067,
    label: "OEM Finish Reference",
    alt: "Handpan custom color and pattern craftsmanship reference",
    caption: "OEM finish discussion reference"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-04.webp",
    width: 1600,
    height: 1067,
    label: "Custom Color Texture",
    alt: "Custom handpan color texture detail for OEM finish discussion",
    caption: "Custom color texture"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-05.webp",
    width: 1600,
    height: 1067,
    label: "Craftsmanship Detail",
    alt: "Custom handpan craftsmanship detail for finish discussion",
    caption: "Craftsmanship detail"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-06.webp",
    width: 1600,
    height: 1067,
    label: "Pattern Finish Example",
    alt: "Custom handpan pattern finish example for OEM order",
    caption: "Pattern finish example"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-07.webp",
    width: 1600,
    height: 1067,
    label: "Custom Finish Detail",
    alt: "Custom handpan finish detail for OEM finish discussion",
    caption: "Custom handpan finish detail"
  },
  {
    src: "/images/products/custom-patterns/custom-handpan-pattern-08.webp",
    width: 1600,
    height: 1067,
    label: "OEM Pattern Reference",
    alt: "Custom handpan pattern and surface finish reference",
    caption: "OEM custom pattern reference"
  }
];

const productDisplayImages = {
  "/images/products/d-kurd-10-note-handpan-main.webp": "/images/products/d-kurd-10-note-handpan-main-display.webp",
  "/images/products/d-kurd-10-note-handpan-purple.webp": "/images/products/d-kurd-10-note-handpan-purple-display.webp",
  "/images/products/d-kurd-10-note-handpan-black.webp": "/images/products/d-kurd-10-note-handpan-black-display.webp",
  "/images/products/d-kurd-10-note-handpan-gold.webp": "/images/products/d-kurd-10-note-handpan-gold-display.webp",
  "/images/products/d-kurd-10-note-handpan-silver.webp": "/images/products/d-kurd-10-note-handpan-silver-display.webp",
  "/images/products/d-kurd-10-note-handpan-blue.webp": "/images/products/d-kurd-10-note-handpan-blue-display.webp"
};

const catalogFaq = [
  ["Can I order a sample before wholesale production?", "Yes. Sample orders are recommended so you can check tuning, finish, packaging and market response before confirming bulk production."],
  ["Can you customize the scale and note layout?", "Yes. We mainly show the D Kurd / D minor 10 note handpan with real photos, and we can also support requested scales and custom layouts from 9 notes up to 21 notes."],
  ["Do you support 432Hz and 440Hz tuning?", "Yes. Both 432Hz and 440Hz tuning are available. Please tell us the target frequency before production."],
  ["Can you add our logo or custom packaging?", "Yes. Logo plates, stickers, instruction cards, accessory bundles and branded cartons can be discussed for OEM / ODM orders."],
  ["Can I choose the finish color?", "Yes. Purple, black, gold, silver and blue finishes are available for the D Kurd / D minor 10 note handpan, with additional custom finish discussions for OEM projects."],
  ["How are handpans packed for international shipping?", "We use protective bags, inner cushioning and reinforced export cartons. Branded retail packaging can be added for wholesale buyers."]
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function htmlResponse(html) {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}

async function loadProducts(request, env) {
  const response = await env.ASSETS.fetch(new Request(new URL("/products.json", request.url), { method: "GET" }));
  return response.json();
}

function header(active = "") {
  const navItems = [
    ["craft", "Craft", "/craft"],
    ["products", "Products", "/products"],
    ["scales", "Scales", "/scales"],
    ["specs", "Specs", "/specs"],
    ["custom", "Custom", "/custom"],
    ["inquiry", "Inquiry", "/inquiry"]
  ];

  return `<header class="site-header catalog-header">
    <a class="brand" href="/" aria-label="Lingyin Handpan home">
      <span class="brand-mark">L</span>
      <span><strong>Lingyin</strong><small>Handpan Atelier</small></span>
    </a>
    <nav class="nav" aria-label="Main navigation">
      ${navItems.map(([key, label, href]) => `<a class="${active === key ? "active" : ""}" href="${href}">${label}</a>`).join("")}
    </nav>
  </header>`;
}

function pageShell({ title, description, canonical, ogType = "website", ogImage, body, schema, active = "" }) {
  const imageUrl = ogImage ? `${SITE}${ogImage}` : "";
  const imageMeta = imageUrl
    ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${escapeHtml(ogType)}" />
    <meta property="og:site_name" content="Lingyin Handpan" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    ${imageMeta}
    <meta name="theme-color" content="#f7f2e8" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/assets/app-icon-192.png" />
    <link rel="stylesheet" href="/styles.css?v=${PRODUCTS_VERSION}" />
    ${schema || ""}
  </head>
  <body>
    ${header(active)}
    ${body}
  </body>
</html>`;
}

function mainProduct(products) {
  return products.find((product) => product.slug === "d-kurd-10-note-nitrided-handpan") || products[0];
}

function quoteUrl(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const query = search.toString();
  return `/inquiry${query ? `?${query}` : ""}`;
}

function detailQuoteUrl(product, extra = {}) {
  return quoteUrl({ model: product.slug, ...extra });
}

function trustModule() {
  const items = ["Factory Direct", "Sample Orders Available", "OEM / ODM Branding", "432Hz / 440Hz Tuning", "Export Packing", "Final Tuning QC", "Global Delivery"];
  return `<section class="b2b-trust" aria-label="B2B buyer trust points">
    ${items.map((item) => `<div><strong>${escapeHtml(item)}</strong></div>`).join("")}
  </section>`;
}

function imageTag({ src, width, height, alt, loading = "lazy", className = "" }) {
  return `<img${className ? ` class="${escapeHtml(className)}"` : ""} src="${escapeHtml(src)}" width="${escapeHtml(width)}" height="${escapeHtml(height)}" ${loading === "eager" ? "" : 'loading="lazy"'} alt="${escapeHtml(alt)}" />`;
}

function displayImageSrc(src) {
  return productDisplayImages[src] || src;
}

function productHeroThumbnails(product) {
  const order = ["gold", "purple", "black", "silver", "blue"];
  const variants = new Map(product.variants.map((variant) => [variant.slug, variant]));
  return order.map((slug) => variants.get(slug)).filter(Boolean);
}

function mainProductCard(product) {
  return `<article class="main-product-card">
    <a class="main-product-media" href="${escapeHtml(product.url)}" aria-label="View ${escapeHtml(product.name)} details">
      ${imageTag({
        src: product.image,
        width: product.imageWidth,
        height: product.imageHeight,
        alt: product.imageAlt,
        loading: "eager"
      })}
    </a>
    <div class="main-product-copy">
      <p class="eyebrow">Main Product With Real Photos</p>
      <h2><a href="${escapeHtml(product.url)}">${escapeHtml(product.name)}</a></h2>
      <p>${escapeHtml(product.description)}</p>
      <dl class="product-card-specs">
        <div><dt>Scale</dt><dd>${escapeHtml(product.scale)}</dd></div>
        <div><dt>Notes</dt><dd>${escapeHtml(product.notesCount)}</dd></div>
        <div><dt>Material</dt><dd>${escapeHtml(product.material)}</dd></div>
        <div><dt>Frequency</dt><dd>${escapeHtml(product.frequency)}</dd></div>
        <div><dt>Finish options</dt><dd>${escapeHtml(product.finishOptions)}</dd></div>
        <div><dt>OEM / ODM</dt><dd>${escapeHtml(product.privateLabelOptions)}</dd></div>
        <div><dt>Sample order</dt><dd>${escapeHtml(product.sampleOrder)}</dd></div>
        <div><dt>Wholesale order</dt><dd>${escapeHtml(product.wholesaleOrder)}</dd></div>
      </dl>
      <div class="product-card-actions">
        <a class="button secondary" href="${escapeHtml(product.url)}">View Details</a>
        <a class="button primary" href="${detailQuoteUrl(product)}">${escapeHtml(product.ctaText || "Request Quote")}</a>
      </div>
    </div>
  </article>`;
}

function finishOptions(product) {
  return `<section class="product-section finish-options-section" id="finish-options">
    <div class="section-head">
      <p class="eyebrow">Finish Options</p>
      <h2>D Kurd / D minor 10 Note Handpan finish variants.</h2>
      <p>These finish photos all belong to the same D Kurd / D minor 10 note handpan model. Choose a finish for sample orders, wholesale batches, or OEM / ODM planning.</p>
    </div>
    <div class="finish-grid">
      ${product.variants.map((variant) => `<article class="finish-card">
        <a href="${detailQuoteUrl(product, { finish: variant.slug })}" aria-label="Request quote for ${escapeHtml(variant.label)}">
          ${imageTag({
            src: variant.image,
            width: variant.width,
            height: variant.height,
            alt: variant.alt
          })}
          <span class="finish-swatch" style="--swatch:${escapeHtml(variant.swatch)}"></span>
          <strong>${escapeHtml(variant.finish)} Finish</strong>
          <small>D Kurd / D minor 10 Note Handpan</small>
        </a>
      </article>`).join("")}
    </div>
  </section>`;
}

function noteCountTable() {
  const rows = [
    ["9 notes", "D Kurd / custom scale", "Custom order", "Available"],
    ["10 notes", "D Kurd / D minor", "Main product with photos", "Available"],
    ["12 notes", "D Kurd / custom scale", "Custom order", "Available"],
    ["15 notes", "Custom extended layout", "Custom order", "Available"],
    ["17 notes", "Custom extended layout", "Custom order", "Available"],
    ["up to 21 notes", "Professional extended layout", "Custom order", "Available"]
  ];

  return `<section class="product-section compact-product-section" id="custom-note-counts">
    <div class="section-head">
      <p class="eyebrow">Custom Note Counts Available</p>
      <h2>Custom handpan layouts from 9 notes up to 21 notes.</h2>
      <p>The D Kurd / D minor 10 note handpan is the main photographed model. Other note counts are handled as custom inquiry and technical review projects.</p>
    </div>
    <div class="capability-table-wrap">
      <table class="capability-table">
        <thead><tr><th>Notes</th><th>Scale</th><th>Production type</th><th>Customization</th><th>Inquiry</th></tr></thead>
        <tbody>
          ${rows.map(([notes, scale, type, status]) => `<tr>
            <td>${escapeHtml(notes)}</td>
            <td>${escapeHtml(scale)}</td>
            <td>${escapeHtml(type)}</td>
            <td>${escapeHtml(status)}</td>
            <td><a href="${quoteUrl({ customNoteCount: notes.replace(" notes", "").replace("up to ", "") })}">Request Quote</a></td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>`;
}

function scaleOptions() {
  return `<section class="product-section compact-product-section" id="custom-scales">
    <div class="section-head">
      <p class="eyebrow">Custom Scales Available</p>
      <h2>Scale planning for OEM / ODM handpan buyers.</h2>
      <p>Send your preferred scale, note count, target frequency, finish and order quantity. We can discuss Celtic Minor, Equinox, Pygmy, Amara, Integral, Hijaz and other requested scales.</p>
    </div>
    <div class="scale-chip-grid">
      ${customScaleLinks.map(([label, slug, url]) => `<a href="${escapeHtml(url)}">
        <strong>${escapeHtml(label)}</strong>
        <span>Custom inquiry</span>
      </a>`).join("")}
    </div>
  </section>`;
}

function inquiryLinks(products) {
  const customPages = products.filter((product) => product.pageType === "custom-inquiry");
  return `<section class="product-section compact-product-section" id="custom-inquiry-pages">
    <div class="section-head">
      <p class="eyebrow">Custom Inquiry Pages</p>
      <h2>Common custom order directions.</h2>
      <p>Use these pages to send scale, note count, frequency, finish, logo and packing requirements. Reference photos are clearly marked on custom inquiry pages.</p>
    </div>
    <div class="comparison-list custom-link-list" role="list">
      ${customPages.map((product) => `<article class="comparison-row custom-inquiry-row" role="listitem">
        <div class="comparison-main">
          <h3><a href="${escapeHtml(product.url)}">${escapeHtml(product.name)}</a></h3>
          <p>${escapeHtml(product.scale)} · ${escapeHtml(product.notesCount)} notes · ${escapeHtml(product.frequency)}</p>
        </div>
        <dl class="comparison-specs">
          <div><dt>Material</dt><dd>${escapeHtml(product.material)}</dd></div>
          <div><dt>Order type</dt><dd>Custom inquiry</dd></div>
        </dl>
        <a class="button primary comparison-quote" href="${quoteUrl({ model: product.slug })}">${escapeHtml(product.ctaText || "Request Custom Quote")}</a>
      </article>`).join("")}
    </div>
  </section>`;
}

function valuesFromParams(products, params) {
  const modelSlug = params.get("model");
  const selected = modelSlug ? products.find((product) => product.slug === modelSlug || product.aliases?.includes(modelSlug)) : null;
  const base = selected || mainProduct(products);
  const finish = params.get("finish") || "";
  const customFinish = params.get("customFinish") || "";
  const customNoteCount = params.get("customNoteCount") || "";
  const customScale = params.get("customScale") || "";
  return {
    selected,
    base,
    model: selected?.name || (customNoteCount || customScale ? "Custom handpan order" : ""),
    scale: customScale ? customScale.replace(/-/g, " ") : (selected?.scale || ""),
    notes: customNoteCount || (selected?.notesCount || ""),
    material: selected?.material || (customNoteCount || customScale ? base.material : ""),
    frequency: selected?.frequency || "432Hz / 440Hz available",
    finish: finish || (customFinish ? customFinish.replace(/-/g, " ") : "")
  };
}

function inquiryForm(products, params, options = {}) {
  const values = valuesFromParams(products, params);
  const source = options.source || "handpanmanufacturer.com/products";
  const heading = options.heading || "Get a factory quote for your handpan order.";
  const intro = options.intro || "Tell us the model, finish, quantity, delivery country and branding needs. We will reply with production advice and a quotation.";
  const submitText = options.submitText || "Send Product Inquiry";
  const messageLines = [
    values.model ? `Selected model: ${values.model}` : "",
    values.scale ? `Scale: ${values.scale}` : "",
    values.notes ? `Notes: ${values.notes}` : "",
    values.material ? `Material: ${values.material}` : "",
    values.frequency ? `Frequency: ${values.frequency}` : "",
    values.finish ? `Finish: ${values.finish}` : ""
  ].filter(Boolean).join("\n");

  return `<section class="section contact products-inquiry" id="product-inquiry">
    <div>
      <p class="eyebrow">Inquiry</p>
      <h2>${escapeHtml(heading)}</h2>
      <p>${escapeHtml(intro)}</p>
    </div>
    <form name="product-inquiry" action="https://formsubmit.co/19954068506a@gmail.com" method="POST">
      <input type="hidden" name="_subject" value="New Handpan Product Inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="${SITE}/thank-you.html" />
      <input type="hidden" name="source" value="${escapeHtml(source)}" />
      <label>
        Selected model
        <input type="text" name="selected_model" value="${escapeHtml(values.model)}" />
      </label>
      <div class="form-row">
        <label>Scale<input type="text" name="scale" value="${escapeHtml(values.scale)}" /></label>
        <label>Notes<input type="text" name="notes" value="${escapeHtml(values.notes)}" /></label>
      </div>
      <div class="form-row">
        <label>Material<input type="text" name="material" value="${escapeHtml(values.material)}" /></label>
        <label>Frequency<input type="text" name="frequency" value="${escapeHtml(values.frequency)}" /></label>
      </div>
      <div class="form-row">
        <label>Finish<input type="text" name="finish" value="${escapeHtml(values.finish)}" /></label>
        <label>Quantity<input type="text" name="quantity" /></label>
      </div>
      <div class="form-row">
        <label>Destination country<input type="text" name="destination_country" /></label>
        <label>Email<input type="email" name="email" required /></label>
      </div>
      <div class="form-row">
        <label>WhatsApp<input type="text" name="whatsapp" /></label>
        <label>Logo needs<input type="text" name="logo_needs" /></label>
      </div>
      <div class="form-row">
        <label>Packaging needs<input type="text" name="packaging_needs" /></label>
        <label>Contact note<input type="text" name="contact_note" placeholder="Preferred reply channel" /></label>
      </div>
      <label>
        Message
        <textarea name="message">${escapeHtml(messageLines ? `${messageLines}\n\n` : "")}</textarea>
      </label>
      <button type="submit">${escapeHtml(submitText)}</button>
      <p class="form-status" aria-live="polite">We will reply through the contact details you provide.</p>
    </form>
  </section>`;
}

function faqSection(faq = catalogFaq) {
  return `<section class="section faq-section products-faq" aria-label="Products FAQ">
    <div class="section-head">
      <p class="eyebrow">Buyer FAQ</p>
      <h2>Common questions before sample and wholesale orders.</h2>
    </div>
    <div class="faq-list">
      ${faq.map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}
    </div>
  </section>`;
}

function stickyCta(product) {
  const href = product ? detailQuoteUrl(product) : "/inquiry";
  return `<div class="sticky-quote-bar" aria-label="Quick inquiry actions">
    <a href="${escapeHtml(href)}">Get Factory Quote</a>
    <a href="${escapeHtml(href)}">Request Sample</a>
    <a href="${escapeHtml(href)}">Discuss OEM Order</a>
  </div>`;
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`
    }))
  };
}

function pageJsonLd({ title, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE}${path}`
  };
}

function pageSchema({ title, description, path, label }) {
  return jsonLd([
    pageJsonLd({ title, description, path }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: label, path }
    ])
  ]);
}

function pageIntro({ eyebrow, h1, text, note }) {
  return `<section class="catalog-intro products-hero">
    <div>
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(h1)}</h1>
    </div>
    <div class="catalog-intro-copy">
      <p>${escapeHtml(text)}</p>
      ${note ? `<span>${escapeHtml(note)}</span>` : ""}
    </div>
  </section>`;
}

function processGrid(items) {
  return `<div class="feature-grid nav-page-grid">
    ${items.map((item, index) => `<article>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(item[0])}</h3>
      <p>${escapeHtml(item[1])}</p>
    </article>`).join("")}
  </div>`;
}

function specsTable(rows) {
  return `<div class="capability-table-wrap">
    <table class="capability-table">
      <tbody>
        ${rows.map(([label, value, note]) => `<tr>
          <th>${escapeHtml(label)}</th>
          <td>${escapeHtml(value)}</td>
          <td>${escapeHtml(note)}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`;
}

function renderCraftPage(products) {
  const product = mainProduct(products);
  const title = "Handpan Craftsmanship | Lingyin Handpan Atelier";
  const description = "Learn how Lingyin makes D Kurd handpans with shaping, tuning, surface finishing, final QC and export packing for OEM and wholesale buyers.";
  const body = `<main class="catalog-main products-ssg nav-page">
    ${pageIntro({
      eyebrow: "Craft",
      h1: "Handpan Craftsmanship & Tuning Process",
      text: "Lingyin builds D Kurd / D minor handpans for OEM and wholesale buyers through controlled forming, note preparation, hand tuning, surface finishing, final tuning QC and export packing.",
      note: "Main product: D Kurd 10 Note Handpan · Custom layouts up to 21 notes"
    })}
    ${trustModule()}
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Workshop process</p>
        <h2>Manufacturing steps built for clear, stable resonance.</h2>
      </div>
      ${processGrid([
        ["Shell forming / shaping", "Steel shells are shaped for stable structure before tone fields are prepared for the requested scale and note count."],
        ["Note layout preparation", "The note layout is planned for D Kurd / D minor or custom scales before shaping and tuning work begins."],
        ["Hand tuning", "Fundamental, octave and overtone relationships are adjusted by hand for balanced response and clean resonance."],
        ["Surface finish", "Purple, black, gold, silver, blue and custom pattern references can be discussed for OEM / ODM projects."],
        ["Final tuning check", "Each handpan receives a final pitch, resonance, appearance and touch-response check before packing."],
        ["Export packing", "Protective bag, inner cushioning, reinforced carton and optional branded packing support overseas shipping."]
      ])}
    </section>
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Craft details</p>
        <h2>Custom finish and pattern discussion references.</h2>
        <p>These images are craftsmanship references for OEM finish discussions, not separate product models.</p>
      </div>
      <div class="detail-gallery custom-pattern-gallery">
        ${customPatternImages.slice(0, 4).map((image) => `<figure>
          ${imageTag({ src: image.src, width: image.width, height: image.height, alt: image.alt })}
          <figcaption><strong>${escapeHtml(image.label)}</strong><span>${escapeHtml(image.caption)}</span></figcaption>
        </figure>`).join("")}
      </div>
      <div class="custom-finish-cta"><a class="button primary" href="${detailQuoteUrl(product, { customFinish: "pattern" })}">Discuss Custom Handpan Production</a></div>
    </section>
  </main>${stickyCta(product)}`;

  return pageShell({
    title,
    description,
    canonical: `${SITE}/craft`,
    ogImage: product.image,
    body,
    schema: pageSchema({ title, description, path: "/craft", label: "Craft" }),
    active: "craft"
  });
}

function renderScalesPage(products, params) {
  const product = mainProduct(products);
  const title = "Custom Handpan Scales | D Kurd, Celtic Minor, Pygmy & More";
  const description = "Lingyin produces D Kurd / D minor handpans and custom handpan scales including Celtic Minor, Equinox, Pygmy, Amara, Integral, Hijaz and layouts up to 21 notes.";
  const scaleRows = [
    ["D Kurd / D minor", "Main photographed scale", "Recommended for sample and wholesale planning"],
    ["Celtic Minor", "Custom order", "Airy, expressive and suitable for wellness or performance buyers"],
    ["Equinox", "Custom order", "Bright, open intervals for advanced playing styles"],
    ["Pygmy", "Custom order", "Warm pentatonic character for meditative playing"],
    ["Amara", "Custom order", "Balanced emotional scale for videos and sound therapy"],
    ["Integral", "Custom order", "Calm, flowing layout for intuitive playing"],
    ["Hijaz", "Custom order", "Distinctive character for custom market positioning"],
    ["Other requested scales", "Technical review", "Send your preferred layout for production review"]
  ];
  const body = `<main class="catalog-main products-ssg nav-page">
    ${pageIntro({
      eyebrow: "Scales",
      h1: "Custom Handpan Scales & Note Layouts",
      text: "Product photos currently show our D Kurd / D minor 10 note handpan. Other note counts, finishes and scales are available by custom order.",
      note: "432Hz / 440Hz available · Custom layouts from 9 notes up to 21 notes"
    })}
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Scale options</p>
        <h2>Main D Kurd production plus requested custom scales.</h2>
      </div>
      ${specsTable(scaleRows)}
    </section>
    ${noteCountTable()}
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">How to request</p>
        <h2>Send scale, note count, frequency, finish and quantity.</h2>
        <p>Buyers can send a note map, reference video, target frequency, preferred finish and destination country. We will review tuning feasibility before sample or bulk production.</p>
      </div>
      <div class="custom-finish-cta"><a class="button primary" href="${quoteUrl({ customScale: "celtic-minor" })}">Request Custom Scale Quote</a></div>
    </section>
  </main>${stickyCta()}`;

  return pageShell({
    title,
    description,
    canonical: `${SITE}/scales`,
    ogImage: product.image,
    body,
    schema: pageSchema({ title, description, path: "/scales", label: "Scales" }),
    active: "scales"
  });
}

function renderSpecsPage(products) {
  const product = mainProduct(products);
  const title = "Handpan Specifications | Materials, Sizes, Packing & Tuning";
  const description = "Compare Lingyin handpan specifications including stainless steel, nitrided steel, 432Hz/440Hz tuning, 53-56 cm diameter, export packing and OEM order details.";
  const body = `<main class="catalog-main products-ssg nav-page">
    ${pageIntro({
      eyebrow: "Specifications",
      h1: "Handpan Specifications for Wholesale Orders",
      text: "Use these common specifications for D Kurd 10 Note sample planning and OEM / ODM wholesale discussions.",
      note: "Final details are confirmed by scale, finish, logo, packing and order quantity"
    })}
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">B2B specification table</p>
        <h2>Materials, sizes, tuning and export packing.</h2>
      </div>
      ${specsTable([
        ["Material", "Stainless steel / nitrided steel available", "Confirmed by tone target and finish"],
        ["Diameter", "53-56 cm", "Common handpan size range"],
        ["Weight", "4.3-4.9 kg", "Varies by shell and finish"],
        ["Packing size", "Approx. 62 x 62 x 36 cm per carton", "Protective bag and reinforced carton"],
        ["Tuning", "432Hz / 440Hz", "Confirm target frequency before production"],
        ["Finishes", "Purple, black, gold, silver, blue", "Custom pattern references available"],
        ["Note layouts", "9 notes, 10 notes, 12 notes, 15 notes, 17 notes, up to 21 notes", "Custom layouts require technical review"],
        ["Accessories", "Soft bag, cleaning cloth, playing guide and reinforced export carton", "Accessory bundles can be adjusted"],
        ["MOQ / sample", product.moqSampleNote, "Sample first is recommended"],
        ["Lead time", product.leadTime, "Bulk timing depends on quantity and OEM details"],
        ["QC", product.qcProcess, "Final tuning check before packing"]
      ])}
      <div class="custom-finish-cta"><a class="button primary" href="${quoteUrl({ model: product.slug })}">Ask for Full Specs</a></div>
    </section>
  </main>${stickyCta(product)}`;

  return pageShell({
    title,
    description,
    canonical: `${SITE}/specs`,
    ogImage: product.image,
    body,
    schema: pageSchema({ title, description, path: "/specs", label: "Specs" }),
    active: "specs"
  });
}

function renderCustomPage(products) {
  const product = mainProduct(products);
  const title = "Custom OEM Handpan Manufacturer | Logo, Finish, Packaging";
  const description = "Lingyin supports OEM and ODM handpan orders with custom finish colors, patterns, logos, packaging, accessories, scales and layouts up to 21 notes.";
  const body = `<main class="catalog-main products-ssg nav-page">
    ${pageIntro({
      eyebrow: "Custom",
      h1: "Custom OEM / ODM Handpan Manufacturing",
      text: "Lingyin supports custom finish colors, pattern references, logo customization, private label packing, accessory bundles, custom scales and note layouts up to 21 notes.",
      note: "Sample order before wholesale · OEM / ODM branding support"
    })}
    ${trustModule()}
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">OEM / ODM options</p>
        <h2>Customization options for handpan brands and distributors.</h2>
      </div>
      ${processGrid([
        ["Custom finish colors", "Purple, black, gold, silver and blue are available for the D Kurd / D minor 10 note handpan."],
        ["Custom patterns", "Surface texture and pattern references can be discussed before sample production."],
        ["Logo customization", "Logo plate, brand sticker, instruction card and other private label details can be planned."],
        ["Custom packaging", "Retail carton, accessory bundle, English material and export carton can be adjusted for your channel."],
        ["Custom scales", "Celtic Minor, Equinox, Pygmy, Amara, Integral, Hijaz and other requested scales are reviewed by tuning requirements."],
        ["Custom note layouts", "We can discuss 9 notes, 10 notes, 12 notes, 15 notes, 17 notes and extended layouts up to 21 notes."]
      ])}
    </section>
    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Finish references</p>
        <h2>Craft details for custom finish discussions.</h2>
        <p>These craft detail images are OEM finish references, not separate product models.</p>
      </div>
      <div class="detail-gallery custom-pattern-gallery">
        ${customPatternImages.map((image) => `<figure>
          ${imageTag({ src: image.src, width: image.width, height: image.height, alt: image.alt })}
          <figcaption><strong>${escapeHtml(image.label)}</strong><span>${escapeHtml(image.caption)}</span></figcaption>
        </figure>`).join("")}
      </div>
      <div class="custom-finish-cta"><a class="button primary" href="${quoteUrl({ model: product.slug, customFinish: "pattern" })}">Discuss OEM Order</a></div>
    </section>
  </main>${stickyCta(product)}`;

  return pageShell({
    title,
    description,
    canonical: `${SITE}/custom`,
    ogImage: product.image,
    body,
    schema: pageSchema({ title, description, path: "/custom", label: "Custom" }),
    active: "custom"
  });
}

function renderInquiryPage(products, params) {
  const product = mainProduct(products);
  const title = "Request a Handpan Factory Quote | Lingyin Handpan";
  const description = "Request a factory quote for D Kurd 10 note handpans, custom scales, finishes, OEM logo, packaging and wholesale handpan orders.";
  const body = `<main class="catalog-main products-ssg nav-page">
    ${pageIntro({
      eyebrow: "Inquiry",
      h1: "Request a Handpan Factory Quote",
      text: "Send your model, scale, note count, finish, frequency, quantity, destination country, logo needs and packaging needs. We will reply with production advice and quotation details.",
      note: "D Kurd 10 Note samples · Custom scales · OEM / ODM wholesale orders"
    })}
    ${inquiryForm(products, params, {
      source: "handpanmanufacturer.com/inquiry",
      heading: "Send your handpan order requirements.",
      intro: "Use this form for D Kurd 10 note handpans, custom scales, finish colors, custom patterns, OEM logo, packaging and wholesale order planning.",
      submitText: "Send Inquiry"
    })}
  </main>`;

  return pageShell({
    title,
    description,
    canonical: `${SITE}/inquiry`,
    ogImage: product.image,
    body,
    schema: pageSchema({ title, description, path: "/inquiry", label: "Inquiry" }),
    active: "inquiry"
  });
}

function renderCatalog(products, params) {
  const product = mainProduct(products);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Custom Handpan Products",
    url: `${SITE}/products`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE}${item.url}`,
        name: item.name
      }))
    }
  };

  const body = `<main class="catalog-main products-ssg">
    <section class="catalog-intro products-hero">
      <div>
        <p class="eyebrow">Products Catalog</p>
        <h1>Custom Handpan Models for Wholesale &amp; OEM Buyers</h1>
      </div>
      <div class="catalog-intro-copy">
        <p>Lingyin mainly produces D Kurd / D minor 10 note handpans, with purple, black, gold, silver and blue finish options. Other note counts, custom layouts up to 21 notes, and different scales are available for OEM / ODM orders.</p>
        <span>D Kurd 10 Note main product · Custom orders up to 21 notes</span>
      </div>
    </section>
    ${trustModule()}
    <section class="product-section" id="main-product">
      ${mainProductCard(product)}
    </section>
    ${finishOptions(product)}
    ${noteCountTable()}
    ${scaleOptions()}
    ${inquiryLinks(products)}
    ${inquiryForm(products, params)}
    ${faqSection()}
  </main>${stickyCta()}`;

  return pageShell({
    title: "Custom Handpan Products | Wholesale OEM Handpan Manufacturer",
    description: "Compare D Kurd, Celtic Minor, Equinox and custom handpan models by notes, material, 432Hz/440Hz tuning, finish, OEM branding and wholesale packaging options.",
    canonical: `${SITE}/products`,
    ogImage: product.image,
    body,
    schema: jsonLd(itemList),
    active: "products"
  });
}

function productJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`${SITE}${product.image}`],
    brand: { "@type": "Brand", name: "Lingyin Handpan" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Scale", value: product.scale },
      { "@type": "PropertyValue", name: "Notes Count", value: String(product.notesCount) },
      { "@type": "PropertyValue", name: "Material", value: product.material },
      { "@type": "PropertyValue", name: "Frequency", value: product.frequency },
      { "@type": "PropertyValue", name: "Finish Options", value: product.finishOptions },
      { "@type": "PropertyValue", name: "Diameter", value: product.diameter },
      { "@type": "PropertyValue", name: "Weight", value: product.weight },
      { "@type": "PropertyValue", name: "MOQ / Sample Order", value: product.moqSampleNote },
      { "@type": "PropertyValue", name: "Included Accessories", value: product.includedAccessories },
      { "@type": "PropertyValue", name: "Packing Size", value: product.packingSize },
      { "@type": "PropertyValue", name: "Private Label Options", value: product.privateLabelOptions },
      { "@type": "PropertyValue", name: "QC Process", value: product.qcProcess },
      { "@type": "PropertyValue", name: "Suggested Buyer Type", value: product.suggestedBuyerType },
      { "@type": "PropertyValue", name: "Shipping Method", value: product.shippingMethod }
    ]
  };
}

function renderMainProductDetail(product, products) {
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 4);
  const heroThumbnails = productHeroThumbnails(product);
  const body = `<main class="product-main products-ssg">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span><a href="/products">Products</a><span>/</span><span>${escapeHtml(product.shortName)}</span>
    </nav>
    <section class="product-detail product-detail-ssg">
      <div class="product-gallery single-product-gallery">
        <figure class="product-image-main product-gallery-main">
          ${imageTag({
            src: displayImageSrc(product.image),
            width: 1400,
            height: 1400,
            alt: product.imageAlt,
            loading: "eager"
          })}
        </figure>
        <div class="product-thumbnails" aria-label="D Kurd 10 Note finish preview thumbnails">
          ${heroThumbnails.map((variant) => `<figure class="product-thumbnail${variant.slug === "gold" ? " is-active" : ""}">
            ${imageTag({
              src: displayImageSrc(variant.image),
              width: 1400,
              height: 1400,
              alt: variant.alt,
              className: "product-thumbnail-image"
            })}
            <figcaption>${escapeHtml(variant.finish)}</figcaption>
          </figure>`).join("")}
        </div>
      </div>
      <div class="product-detail-copy">
        <p class="eyebrow">D Kurd / D minor wholesale model</p>
        <h1>${escapeHtml(product.name)}</h1>
        <p class="product-lead">${escapeHtml(product.description)}</p>
        <dl class="product-detail-specs">
          <div><dt>Scale</dt><dd>${escapeHtml(product.scale)}</dd></div>
          <div><dt>Notes</dt><dd>${escapeHtml(product.notesCount)}</dd></div>
          <div><dt>Material</dt><dd>${escapeHtml(product.material)}</dd></div>
          <div><dt>Tuning</dt><dd>${escapeHtml(product.frequency)}</dd></div>
          <div><dt>Finish</dt><dd>${escapeHtml(product.finishOptions)}</dd></div>
          <div><dt>Diameter</dt><dd>${escapeHtml(product.diameter)}</dd></div>
          <div><dt>Weight</dt><dd>${escapeHtml(product.weight)}</dd></div>
          <div><dt>Packing size</dt><dd>${escapeHtml(product.packingSize)}</dd></div>
        </dl>
        <div class="product-detail-actions">
          <a class="button primary" href="${detailQuoteUrl(product)}">Request Quote</a>
          <a class="button secondary" href="/products">Back to Products</a>
        </div>
      </div>
    </section>
    <section class="section product-b2b-details">
      <article><p class="eyebrow">Customization</p><h2>OEM / ODM handpan options</h2><p>${escapeHtml(product.customizationOptions)}</p></article>
      <article><h3>MOQ / sample order note</h3><p>${escapeHtml(product.moqSampleNote)}</p></article>
      <article><h3>Included accessories</h3><p>${escapeHtml(product.includedAccessories)}</p></article>
      <article><h3>Available finishes</h3><p>${escapeHtml(product.finishOptions)}</p></article>
      <article><h3>Private label options</h3><p>${escapeHtml(product.privateLabelOptions)}</p></article>
      <article><h3>QC process</h3><p>${escapeHtml(product.qcProcess)}</p></article>
      <article><h3>Suggested buyer type</h3><p>${escapeHtml(product.suggestedBuyerType)}</p></article>
      <article><h3>Export packing</h3><p>${escapeHtml(product.exportPacking)}</p></article>
      <article><h3>Shipping method</h3><p>${escapeHtml(product.shippingMethod)}</p></article>
      <article><h3>Lead time</h3><p>${escapeHtml(product.leadTime)}</p></article>
    </section>
    <section class="product-section detail-finish-section">
      <div class="section-head">
        <p class="eyebrow">Finish Variants</p>
        <h2>Color finish options for D Kurd / D minor 10 Note Handpan.</h2>
      </div>
      <div class="finish-grid">
        ${product.variants.map((variant) => `<article class="finish-card">
          <a href="${detailQuoteUrl(product, { finish: variant.slug })}">
            ${imageTag({ src: variant.image, width: variant.width, height: variant.height, alt: variant.alt })}
            <span class="finish-swatch" style="--swatch:${escapeHtml(variant.swatch)}"></span>
            <strong>${escapeHtml(variant.finish)} Finish</strong>
            <small>D Kurd / D minor 10 Note Handpan</small>
          </a>
        </article>`).join("")}
      </div>
    </section>
    <section class="product-section detail-gallery-section">
      <div class="section-head">
        <p class="eyebrow">Custom Finish &amp; Craftsmanship Details</p>
        <h2>Craft Details for Custom Finish Discussions</h2>
        <p>These craft detail photos show custom finish, pattern and surface treatment references for OEM / ODM handpan orders. Buyers can share preferred colors, textures or pattern ideas before production.</p>
      </div>
      <div class="detail-gallery">
        ${product.detailGallery.map((image) => `<figure>
          ${imageTag({ src: image.src, width: image.width, height: image.height, alt: image.alt })}
          <figcaption>${escapeHtml(image.label)}</figcaption>
        </figure>`).join("")}
      </div>
      <div class="detail-gallery custom-pattern-gallery" aria-label="Custom pattern reference images">
        ${customPatternImages.map((image) => `<figure>
          ${imageTag({ src: image.src, width: image.width, height: image.height, alt: image.alt })}
          <figcaption><strong>${escapeHtml(image.label)}</strong><span>${escapeHtml(image.caption)}</span></figcaption>
        </figure>`).join("")}
      </div>
      <div class="custom-finish-cta">
        <a class="button secondary" href="${detailQuoteUrl(product, { finish: "custom-pattern" })}">Discuss Custom Finish</a>
      </div>
    </section>
    ${faqSection([
      ["Can this D Kurd 10 Note Handpan be ordered as a sample first?", product.moqSampleNote],
      ["Can you customize the finish, logo and packaging?", product.privateLabelOptions],
      ["Is 432Hz and 440Hz tuning available?", `Yes. ${product.frequency} tuning options are available for this product.`],
      ["Can you make custom note counts beyond 10 notes?", "Yes. We can discuss custom layouts from 9 notes up to 21 notes depending on scale, note arrangement and tuning requirements."],
      ["How is this handpan packed for export?", product.exportPacking]
    ])}
    <section class="section related-products">
      <div class="section-head">
        <p class="eyebrow">Related Custom Inquiry Pages</p>
        <h2>Discuss custom scales and note counts.</h2>
      </div>
      <div class="scale-chip-grid">
        ${related.map((item) => `<a href="${escapeHtml(item.url)}"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.ctaText || "Request Custom Quote")}</span></a>`).join("")}
      </div>
    </section>
  </main>${stickyCta(product)}`;

  return pageShell({
    title: "D Kurd 10 Note Handpan | Wholesale OEM Handpan Manufacturer",
    description: "D Kurd / D minor 10 note handpan with purple, black, gold, silver and blue finish options, 432Hz / 440Hz tuning, OEM branding, sample orders and export packing.",
    canonical: `${SITE}${product.url}`,
    ogType: "product",
    ogImage: product.image,
    body,
    schema: jsonLd(productJsonLd(product)),
    active: "products"
  });
}

function webPageJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: product.name,
    description: product.description,
    url: `${SITE}${product.url}`
  };
}

function renderCustomInquiryDetail(product, products) {
  const main = mainProduct(products);
  const body = `<main class="product-main products-ssg">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span><a href="/products">Products</a><span>/</span><span>${escapeHtml(product.shortName)}</span>
    </nav>
    <section class="custom-detail-hero">
      <div class="custom-detail-copy">
        <p class="eyebrow">Custom order / custom inquiry</p>
        <h1>${escapeHtml(product.name)}</h1>
        <p class="product-lead">${escapeHtml(product.description)}</p>
        <dl class="product-detail-specs">
          <div><dt>Scale</dt><dd>${escapeHtml(product.scale)}</dd></div>
          <div><dt>Notes</dt><dd>${escapeHtml(product.notesCount)}</dd></div>
          <div><dt>Material</dt><dd>${escapeHtml(product.material)}</dd></div>
          <div><dt>Tuning</dt><dd>${escapeHtml(product.frequency)}</dd></div>
          <div><dt>Finish</dt><dd>${escapeHtml(product.finishOptions)}</dd></div>
          <div><dt>Diameter</dt><dd>${escapeHtml(product.diameter)}</dd></div>
          <div><dt>Weight</dt><dd>${escapeHtml(product.weight)}</dd></div>
          <div><dt>Packing size</dt><dd>${escapeHtml(product.packingSize)}</dd></div>
        </dl>
        <div class="product-detail-actions">
          <a class="button primary" href="${quoteUrl({ model: product.slug })}">${escapeHtml(product.ctaText || "Request Custom Quote")}</a>
          <a class="button secondary" href="/products">Back to Products</a>
        </div>
      </div>
      <figure class="custom-reference-card">
        ${imageTag({
          src: product.referenceImage || main.image,
          width: product.referenceImageWidth || main.imageWidth,
          height: product.referenceImageHeight || main.imageHeight,
          alt: product.referenceImageAlt || "D Kurd 10 note handpan craftsmanship reference for custom handpan order",
          loading: "eager"
        })}
        <figcaption>${escapeHtml(product.referenceLabel || "Finish, material and craftsmanship reference")}</figcaption>
      </figure>
    </section>
    <section class="section product-b2b-details">
      <article><p class="eyebrow">Customization</p><h2>Custom handpan order planning</h2><p>${escapeHtml(product.customizationOptions)}</p></article>
      <article><h3>MOQ / sample order note</h3><p>${escapeHtml(product.moqSampleNote)}</p></article>
      <article><h3>Included accessories</h3><p>${escapeHtml(product.includedAccessories)}</p></article>
      <article><h3>Available finishes</h3><p>${escapeHtml(product.finishOptions)}</p></article>
      <article><h3>Private label options</h3><p>${escapeHtml(product.privateLabelOptions)}</p></article>
      <article><h3>QC process</h3><p>${escapeHtml(product.qcProcess)}</p></article>
      <article><h3>Suggested buyer type</h3><p>${escapeHtml(product.suggestedBuyerType)}</p></article>
      <article><h3>Export packing</h3><p>${escapeHtml(product.exportPacking)}</p></article>
      <article><h3>Shipping method</h3><p>${escapeHtml(product.shippingMethod)}</p></article>
      <article><h3>Lead time</h3><p>${escapeHtml(product.leadTime)}</p></article>
    </section>
    ${faqSection([
      ["Can I order this custom model as a sample first?", product.moqSampleNote],
      ["Can you customize the scale and note layout?", "Yes. Please send your preferred scale, note count, frequency, finish and order quantity for review."],
      ["Can extended layouts go beyond 17 notes?", "Yes. We can customize handpans from 9 notes to professional extended layouts up to 21 notes, depending on the requested scale, note arrangement and tuning requirements."],
      ["How are custom orders packed for export?", product.exportPacking]
    ])}
    <section class="section related-products">
      <div class="section-head">
        <p class="eyebrow">Related Product</p>
        <h2>Main photographed D Kurd / D minor 10 Note Handpan.</h2>
      </div>
      ${mainProductCard(main)}
    </section>
  </main>${stickyCta(product)}`;

  return pageShell({
    title: `${product.name} | Custom OEM Handpan Inquiry`,
    description: `${product.name} available by custom order with ${product.frequency}, ${product.material}, finish options, OEM branding, sample order and export packing support.`,
    canonical: `${SITE}${product.url}`,
    body,
    schema: jsonLd(webPageJsonLd(product)),
    active: "products"
  });
}

function renderProductDetail(product, products) {
  if (product.pageType === "main-product") {
    return renderMainProductDetail(product, products);
  }
  return renderCustomInquiryDetail(product, products);
}

function findProduct(products, slug) {
  return products.find((product) => product.slug === slug || product.aliases?.includes(slug));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname !== "/" && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;

    const pageRoutes = {
      "/craft": renderCraftPage,
      "/scales": renderScalesPage,
      "/specs": renderSpecsPage,
      "/custom": renderCustomPage,
      "/inquiry": renderInquiryPage
    };

    if (pageRoutes[path]) {
      const products = await loadProducts(request, env);
      return htmlResponse(pageRoutes[path](products, url.searchParams));
    }

    if (path === "/products") {
      const products = await loadProducts(request, env);
      return htmlResponse(renderCatalog(products, url.searchParams));
    }

    const productMatch = path.match(/^\/products\/([^/]+)$/);
    if (productMatch) {
      const products = await loadProducts(request, env);
      const product = findProduct(products, productMatch[1]);
      if (!product) return env.ASSETS.fetch(request);
      if (productMatch[1] !== product.slug) {
        return Response.redirect(`${SITE}${product.url}`, 301);
      }
      return htmlResponse(renderProductDetail(product, products));
    }

    return env.ASSETS.fetch(request);
  }
};
