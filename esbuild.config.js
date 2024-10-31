import *  as esbuild from 'esbuild';
import { PLUGINS } from './plugins/index.js';

const buildOption = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'lib/index.js',
    minify: true,
    sourcemap: true,
    target: 'node20',
    platform: 'node',
    logLevel: 'info',
    metafile: true,
    treeShaking: true,
    legalComments: 'none',
    plugins: [...PLUGINS]
};

const ctx = await esbuild.context(buildOption);

ctx.watch();
