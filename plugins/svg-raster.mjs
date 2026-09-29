import sharp from 'sharp';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';

export function svgRaster({ cacheDir = 'node_modules/.cache/svg-raster', density = 300 } = {}) {
  const cache = path.resolve(cacheDir);
  return {
    name: 'svg-raster',
    enforce: 'pre',
    async load(id) {
      const [file, query] = id.split('?');
      if (!file.endsWith('.svg') || !query) return null;

      const params = new URLSearchParams(query);
      const width = params.has('width') ? Number(params.get('width')) : undefined;
      const height = params.has('height') ? Number(params.get('height')) : undefined;

      if (width === undefined && height === undefined) return null;

      if (width !== undefined && height !== undefined) {
        this.error(`svg-raster: pass either "width" or "height", not both (${file})`);
      }

      const [dim, size] = width !== undefined ? ['width', width] : ['height', height];
      if (!Number.isInteger(size) || size <= 0) {
        this.error(`svg-raster: "${dim}" must be a positive integer (${file})`);
      }

      this.addWatchFile(file);
      const svg = await readFile(file);
      const hash = createHash('sha1').update(svg).update(`${dim}${size}`).digest('hex').slice(0, 12);
      const out = path.join(cache, `${path.basename(file, '.svg')}-${dim[0]}${size}-${hash}.png`);

      await mkdir(cache, { recursive: true });
      try { await access(out); } catch {
        const png = await sharp(svg, { density }).resize({ [dim]: size }).png().toBuffer();
        await writeFile(out, png);
      }

      return `import img from ${JSON.stringify(out)}; export default img;`;
    },
  };
}
