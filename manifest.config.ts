import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'
import {matches} from './src/lib/matches.ts'

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
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  permissions: [
    'sidePanel',
    'contentSettings',
    'storage',
    'tabs',
  ],
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: matches
  }],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
})
