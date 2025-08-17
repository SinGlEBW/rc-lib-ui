import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import packageJson from './package.json';

const fullNameComponent = `react-ui`;
const entryPathLib = "src/lib";


const excludeFiles = ["src/LibTesting/**/*"];

// const filesPathToExclude = excludeFiles.map((src) => {
//   return fileURLToPath(new URL(src, import.meta.url));
// });

// console.dir(Object.keys(packageJson.dependencies));
// console.dir(Object.keys(packageJson.devDependencies));

export default defineConfig({
  plugins: [
    dts({ include: entryPathLib }),
    libInjectCss()
  ],
  base: './',
  resolve: {
    alias: {
      [`@lib`]: resolve(__dirname, `./src/lib`),
    },
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
      entry: resolve(__dirname, entryPathLib),
      formats: ["es"],
      name: fullNameComponent,
    },
    rollupOptions: {
      //В пакет не входит external. Пользователь сам это ставит
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        //Если нужно оставить в пакете, то убрать отсюда и оставить в dependencies
        "@mui/material",
        "@mui/material/styles",
        "@emotion/react",
        "@emotion/styled",
   
        // ...filesPathToExclude
      ],
      input: Object.fromEntries(
        glob
          .sync(entryPathLib + "/**/*.{ts,tsx}")
          .map((file) => [relative(entryPathLib, file.slice(0, file.length - extname(file).length)), fileURLToPath(new URL(file, import.meta.url))])
      ),
      output: {
        // inlineDynamicImports: false,
        assetFileNames: ({originalFileName, name}) => {
          if(originalFileName){
            const itemsPath = originalFileName.replace('src/lib/', '').split('/');
            const currentPath =  itemsPath.slice(0, itemsPath.length - 1).join('/');
            return `${currentPath}/${name}`;
          }
          return "";
        },
        entryFileNames: "[name].js",
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          "styled-components": "styled"
        }
      },
    },
  },
});
