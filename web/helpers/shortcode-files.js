import * as fs from 'fs';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { Shopify } from "@shopify/shopify-api";
import { Asset } from '@shopify/shopify-api/dist/rest-resources/2022-07/index.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SHORTCODE_FILES = [
  'shortcode.liquid',
  'shortcode-render.liquid',
  'shortcode-product.liquid'
]

export async function getShortcodes(session) {
  const assets = await Asset.all({
    session: session,
    theme_id: 121211420856,
  })
  
  return assets.filter(file => file.key.includes('shortcode'));
}


export async function shortcodeCreator(session) {
  const promises = await Promise.all(SHORTCODE_FILES.map(url => {
    const asset = new Asset({session: session});
    asset.theme_id = 121211420856; //@TODO make this dynamic
    asset.key = 'snippets/' + url
    asset.value = fs.readFileSync(join(__dirname + '/../frontend/assets/shortcodes/' + url), "utf8").toString();
    asset.save({
      update: true,
    });

    return asset
  }))

  return await Promise.all(promises)
}

// @TODO remove method
export async function removeShortcodes(session) {

}
