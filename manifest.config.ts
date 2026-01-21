import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: "Sentiment IQ",
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  permissions: [
    'sidePanel',
    'contentSettings',
  ],
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: [
      "https://*.amazon.com/*",
      "https://*.alibaba.com/*",
      "https://*.aliexpress.com/*",
      "https://*.ebay.com/*",
      "https://*.walmart.com/*",
      "https://*.jd.com/*",
      "https://*.taobao.com/*",
      "https://*.tmall.com/*",
      "https://*.shopee.com/*",
      "https://*.mercadolibre.com/*",
      "https://*.etsy.com/*",
      "https://*.flipkart.com/*",
      "https://*.rakuten.com/*",
      "https://*.ozon.ru/*",
      "https://*.pinduoduo.com/*",
      "https://*.target.com/*",
      "https://*.lazada.com/*",
      "https://*.zalando.com/*",
      "https://*.asos.com/*",
      "https://*.wayfair.com/*",
      "https://*.noon.com/*",
      "https://*.meesho.com/*"
    ]
  }],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
})
