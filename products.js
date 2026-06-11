const PRODUCTS_URL = "/products.json";

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function productUrl(product) {
  return `/products/${product.slug}`;
}

function inquiryUrl(product) {
  return `/?product=${encodeURIComponent(product.name)}#contact`;
}

function createProductCard(product) {
  const article = createElement("article", "product-card");
  const mediaLink = createElement("a", "product-card-media");
  mediaLink.href = productUrl(product);
  const image = createElement("img");
  image.src = product.images[0];
  image.alt = `${product.name} handpan`;
  image.loading = "lazy";
  mediaLink.append(image);

  const body = createElement("div", "product-card-body");
  const title = createElement("h2");
  const titleLink = createElement("a", "", product.name);
  titleLink.href = productUrl(product);
  title.append(titleLink);
  const specs = createElement("dl", "product-card-specs");
  [["Material", product.material], ["Frequency", product.frequency]].forEach(([label, value]) => {
    const item = createElement("div");
    item.append(createElement("dt", "", label), createElement("dd", "", value));
    specs.append(item);
  });
  const actions = createElement("div", "product-card-actions");
  const details = createElement("a", "button secondary", "View details");
  details.href = productUrl(product);
  const inquiry = createElement("a", "button primary", "Inquire");
  inquiry.href = inquiryUrl(product);
  actions.append(details, inquiry);
  body.append(
    createElement("p", "eyebrow", `${product.scale} · ${product.notesCount} notes`),
    title,
    createElement("p", "product-card-description", product.description),
    specs,
    actions
  );
  article.append(mediaLink, body);
  return article;
}

function renderCatalog(products) {
  const grid = document.querySelector("[data-products-grid]");
  if (!grid) return;
  grid.replaceChildren(...products.map(createProductCard));
  document.querySelector("[data-product-count]").textContent = `${products.length} models`;
}

function getProductSlug() {
  const querySlug = new URLSearchParams(window.location.search).get("slug");
  if (querySlug) return querySlug;
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[0] === "products" && parts[1] ? parts[1] : "";
}

function addSpec(list, label, value) {
  const item = createElement("div");
  item.append(createElement("dt", "", label), createElement("dd", "", value));
  list.append(item);
}

function updateProductMeta(product) {
  const canonicalUrl = `https://handpanmanufacturer.com${productUrl(product)}`;
  const description = `${product.name}: ${product.description}`;
  document.title = `${product.name} Handpan | Lingyin Handpan`;
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('link[rel="canonical"]').href = canonicalUrl;
  document.querySelector('meta[property="og:title"]').content = `${product.name} | Lingyin Handpan`;
  document.querySelector('meta[property="og:description"]').content = description;
  document.querySelector('meta[property="og:url"]').content = canonicalUrl;
  document.querySelector('meta[property="og:image"]').content = `https://handpanmanufacturer.com${product.images[0]}`;
  document.querySelector("[data-product-jsonld]").textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => `https://handpanmanufacturer.com${image}`),
    brand: { "@type": "Brand", name: "Lingyin Handpan" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Scale", value: product.scale },
      { "@type": "PropertyValue", name: "Notes Count", value: product.notesCount },
      { "@type": "PropertyValue", name: "Material", value: product.material },
      { "@type": "PropertyValue", name: "Frequency", value: product.frequency }
    ]
  });
}

function renderProductDetail(products) {
  const root = document.querySelector("[data-product-detail]");
  if (!root) return;
  const product = products.find((item) => item.slug === getProductSlug());
  if (!product) {
    root.className = "product-not-found";
    root.replaceChildren(
      createElement("p", "eyebrow", "Product not found"),
      createElement("h1", "", "This handpan model is not available."),
      createElement("p", "", "Return to the catalog to view our current handpan models.")
    );
    const link = createElement("a", "button primary", "View products");
    link.href = "/products";
    root.append(link);
    document.title = "Product Not Found | Lingyin Handpan";
    return;
  }

  updateProductMeta(product);
  const gallery = createElement("div", "product-gallery");
  product.images.forEach((source, index) => {
    const figure = createElement("figure", index === 0 ? "product-image-main" : "product-image-secondary");
    const image = createElement("img");
    image.src = source;
    image.alt = `${product.name} ${index === 0 ? "main view" : "detail view"}`;
    if (index > 0) image.loading = "lazy";
    figure.append(image);
    gallery.append(figure);
  });

  const copy = createElement("div", "product-detail-copy");
  const specs = createElement("dl", "product-detail-specs");
  addSpec(specs, "Scale", product.scale);
  addSpec(specs, "Notes Count", String(product.notesCount));
  addSpec(specs, "Material", product.material);
  addSpec(specs, "Frequency", product.frequency);
  const actions = createElement("div", "product-detail-actions");
  const inquiry = createElement("a", "button primary", `Inquire about ${product.name}`);
  inquiry.href = inquiryUrl(product);
  const back = createElement("a", "button secondary", "Back to products");
  back.href = "/products";
  actions.append(inquiry, back);
  copy.append(
    createElement("p", "eyebrow", `${product.scale} collection`),
    createElement("h1", "", product.name),
    createElement("p", "product-lead", product.description),
    specs,
    actions
  );
  root.replaceChildren(gallery, copy);
}

async function loadProducts() {
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) throw new Error(`Products request failed: ${response.status}`);
    const products = await response.json();
    renderCatalog(products);
    renderProductDetail(products);
  } catch (error) {
    document.querySelectorAll("[data-products-loading]").forEach((element) => {
      element.textContent = "Products could not be loaded. Please refresh the page.";
    });
    console.error(error);
  }
}

loadProducts();
