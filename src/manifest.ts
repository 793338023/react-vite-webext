import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "../package.json";
import { r } from "../scripts/utils";

export async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    icons: {
      16: "./assets/icon-512.png",
      48: "./assets/icon-512.png",
      128: "./assets/icon-512.png",
    },
    action: {
      default_icon: "./assets/icon-512.png",
      default_popup: "./dist/popup/index.html",
    },
    devtools_page: "./dist/devtool/index.html",
    options_ui: {
      page: "./dist/options/index.html",
      open_in_tab: true,
    },
    background: {
      service_worker: "./dist/background/service_worker.js",
      type: "module",
    },
    host_permissions: ["http://*/*", "https://*/*", "<all_urls>"],
    permissions: ["tabs", "storage", "activeTab"],
    content_scripts: [
      {
        matches: ["http://*/*", "https://*/*"],
        js: ["./dist/contentScripts/index.global.js"],
      },
    ],
    web_accessible_resources: [
      {
        resources: ["dist/contentScripts/style.css"],
        matches: ["<all_urls>"],
      },
    ],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self';",
    },
  };

  return manifest;
}
