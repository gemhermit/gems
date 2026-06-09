'use strict';

const fs = require('fs');
const path = require('path');
const htmlTag = require('hexo-util').htmlTag;

const ASSET_ROOT = 'assets';
const SCRIPT_DIR = 'js';
const STYLE_DIR = 'css';
const APLAYER_SCRIPT = 'APlayer.min.js';
const APLAYER_STYLE = 'APlayer.min.css';
const METING_SCRIPT = 'Meting.min.js';

const DEFAULT_OPTIONS = {
  autoplay: false,
  mutex: true,
  'list-max-height': '340px',
  preload: 'auto',
  theme: '#ad7a86'
};

const BOOLEAN_OPTIONS = new Set(['autoplay', 'fixed', 'mini', 'listfolded']);
const OPTION_MAP = {
  lrctype: 'lrc-type',
  listfolded: 'list-folded',
  listmaxheight: 'list-max-height',
  storagename: 'storage-name'
};

function optionName(name) {
  return OPTION_MAP[name] || name;
}

function optionValue(value) {
  if (value === true) return 'true';
  if (value === false) return 'false';
  return value;
}

function publicAssetPath(...segments) {
  return path.posix.join(ASSET_ROOT, ...segments);
}

function resolvePackageFile(packageName, ...segments) {
  return path.join(path.dirname(require.resolve(`${packageName}/package.json`)), ...segments);
}

function copyAsset(name, sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) return;

  hexo.extend.generator.register(`meting-${name}`, () => ({
    path: targetPath,
    data: () => fs.createReadStream(sourcePath)
  }));
}

function parseMetingArgs(args) {
  const [id, server, type] = args;

  if (!id || !server || !type) {
    throw new Error('[meting-tag] Usage: {% meting "id" "server" "type" [options] %}');
  }

  const settings = {
    ...DEFAULT_OPTIONS,
    id,
    server,
    type
  };

  for (const arg of args.slice(3)) {
    if (BOOLEAN_OPTIONS.has(arg)) {
      settings[optionName(arg)] = true;
      continue;
    }

    const separator = arg.indexOf(':');
    if (separator === -1) {
      throw new Error(`[meting-tag] Unrecognized tag argument: ${arg}`);
    }

    const key = arg.slice(0, separator);
    const value = arg.slice(separator + 1);
    settings[optionName(key)] = key === 'mutex' ? value === 'true' : value;
  }

  return settings;
}

copyAsset(
  'aplayer-script',
  resolvePackageFile('aplayer', 'dist', APLAYER_SCRIPT),
  publicAssetPath(SCRIPT_DIR, APLAYER_SCRIPT)
);
copyAsset(
  'aplayer-style',
  resolvePackageFile('aplayer', 'dist', APLAYER_STYLE),
  publicAssetPath(STYLE_DIR, APLAYER_STYLE)
);
copyAsset(
  'meting-script',
  resolvePackageFile('meting', 'dist', METING_SCRIPT),
  publicAssetPath(SCRIPT_DIR, METING_SCRIPT)
);

hexo.extend.injector.register('head_end', () => [
  htmlTag('link', {
    rel: 'stylesheet',
    href: hexo.config.root + publicAssetPath(STYLE_DIR, APLAYER_STYLE)
  }),
  htmlTag('script', {
    src: hexo.config.root + publicAssetPath(SCRIPT_DIR, APLAYER_SCRIPT)
  }, '')
].join('\n'));

hexo.extend.injector.register('body_end', () => htmlTag('script', {
  src: hexo.config.root + publicAssetPath(SCRIPT_DIR, METING_SCRIPT)
}, ''));

hexo.extend.tag.register('meting', args => {
  const settings = parseMetingArgs(args);
  const attrs = {};

  for (const [key, value] of Object.entries(settings)) {
    attrs[key] = optionValue(value);
  }

  return htmlTag('meting-js', attrs, '');
});
