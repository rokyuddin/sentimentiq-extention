import type { ProductMetadata } from "../types/schemas";

/**
 * Extracts product information from the current page's DOM.
 * Prioritizes JSON-LD, then Open Graph meta tags, then general meta tags.
 */
export function extractProductInfo(): ProductMetadata | null {
  try {
    console.log('[SentimentIQ] Starting extraction...');
    
    // 1. Try extracting from JSON-LD
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    console.log(`[SentimentIQ] Found ${jsonLdScripts.length} JSON-LD scripts`);
    for (const script of jsonLdScripts) {
      try {
        const data = JSON.parse(script.textContent || "{}");
        const product = findProductInJsonLd(data);
        if (product) {
          console.log('[SentimentIQ] Found product via JSON-LD:', product.name);
          return product;
        }
      } catch (e) {
        // Ignore JSON parse errors in individual scripts
      }
    }

    // 2. Try extracting from Open Graph / Meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
    const ogBrand = document.querySelector('meta[property="product:brand"]')?.getAttribute("content") ||
                   document.querySelector('meta[name="twitter:data2"]')?.getAttribute("content");
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content") || window.location.href;

    if (ogTitle) {
      console.log('[SentimentIQ] Found product via Open Graph:', ogTitle);
      return {
        name: ogTitle,
        brand: ogBrand || undefined,
        url: ogUrl,
      };
    }

    // 3. Fallback to Page Title
    const pageTitle = document.title.split("-")[0].trim();
    const isEcom = isEcommercePage();
    console.log(`[SentimentIQ] Fallback check - Title: "${pageTitle}", isEcom: ${isEcom}`);
    
    if (pageTitle && isEcom) {
        console.log('[SentimentIQ] Found product via Page Title fallback:', pageTitle);
        return {
            name: pageTitle,
            url: window.location.href,
        };
    }

    console.warn('[SentimentIQ] No product detected on this page');
    return null;
  } catch (error) {
    console.error("[SentimentIQ] Error extracting product info:", error);
    return null;
  }
}

/**
 * Recursively searches for a "Product" type in JSON-LD data.
 */
function findProductInJsonLd(data: any): ProductMetadata | null {
  if (!data || typeof data !== "object") return null;

  // Handle arrays (e.g., @graph)
  if (Array.isArray(data)) {
    for (const item of data) {
      const result = findProductInJsonLd(item);
      if (result) return result;
    }
  }

  // Check if this object is a Product
  if (data["@type"] === "Product" || data["@type"]?.includes("Product")) {
    const name = data.name;
    const brand = typeof data.brand === "string" ? data.brand : data.brand?.name;
    const category = data.category;
    const url = data.url || window.location.href;

    if (name) {
      return {
        name,
        brand: brand || undefined,
        category: category || undefined,
        url,
      };
    }
  }

  // Recursively search children
  for (const key in data) {
    if (typeof data[key] === "object") {
      const result = findProductInJsonLd(data[key]);
      if (result) return result;
    }
  }

  return null;
}

/**
 * Checks if the current page is likely an e-commerce product page.
 */
function isEcommercePage(): boolean {
    const domain = window.location.hostname;
    const ecommerceKeywords = [
        "amazon", "ebay", "walmart", "aliexpress", "alibaba", "etsy", "target", "bestbuy",
        "jd.com", "taobao", "tmall", "shopee", "mercadolibre", "flipkart", "rakuten",
        "ozon", "pinduoduo", "lazada", "zalando", "asos", "wayfair", "noon", "meesho"
    ];
    return ecommerceKeywords.some(keyword => domain.includes(keyword));
}
