// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro'
import netlify from '@astrojs/netlify';

import { svgRaster } from './plugins/svg-raster.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://promotionlefort.netlify.app',
    integrations: [mdx(), sitemap(), react(), markdoc(), keystatic()],
    fonts: [
        {
            provider: fontProviders.local(),
            name: 'Literata',
            cssVariable: '--font-literata',
            fallbacks: ['serif'],
            options: {
                variants: [{
                    src: ['./src/assets/Literata-VariableFont_opsz,wght.ttf'],
                    weight: 'normal',
                    style: 'normal',
                }],
            },
        },
    ],
    output: 'server',
    adapter: netlify(),
    vite: { plugins: [svgRaster()] },
});
