import type { Manifest } from 'webextension-polyfill'
import pkg from '../package.json'
import { IS_DEV, PORT } from '../scripts/utils'

export async function getManifest(): Promise<Manifest.WebExtensionManifest> {
  // update this file to update this manifest.json
  // can also be conditional based on your need

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/icon-512.png',
      default_popup: './popup/index.html'
    },
    background: {
      service_worker: 'background.js'
    },
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png'
    },
    permissions: ['storage'],
    content_security_policy: {}
  }

  if (IS_DEV) {
    // this is required on dev for Vite script to load
    manifest.content_security_policy = {
      extension_pages: `script-src 'self' http://localhost:${PORT}; object-src 'self'`
    }
  }

  return manifest
}
