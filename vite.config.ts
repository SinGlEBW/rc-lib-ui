import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import packageJson from './package.json';

const fullNameComponent = `react-ui`;
const entryPathLib = "src/lib";


export default defineConfig({
  plugins: [
    dts({ include: entryPathLib }),
    libInjectCss()
  ],
  base: './',
  resolve: {
    alias: [
      {
        find: '@lib',
        replacement: resolve(__dirname, `./src/lib`)
      },
    ],
  },
  server: {
    open: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    lib: {
      entry: {
        index: entryPathLib + '/index.ts',
        socket: entryPathLib +'/NetworkAndSocket/Socket/index.ts' 
      },
      formats: ["es"],
      name: fullNameComponent,
    },
    rollupOptions: {
      external: [
        "react/jsx-runtime",
        /^@mui\/.*/,
        /^@emotion\/.*/,
        ...Object.keys(packageJson.peerDependencies)
      ],

      output: {
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          "styled-components": "styled"
        }
      },
    },
  },
});
