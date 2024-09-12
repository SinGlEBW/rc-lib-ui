import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";

const fullNameComponent = `@ui-r`;
const entryPathLib = "src/lib";

export default defineConfig({
  plugins: [
    
    dts({ include: entryPathLib }),
    libInjectCss()
  ],
  resolve: {
    alias: {
      [`@lib`]: resolve(__dirname, `./src/lib/index`),
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
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/styled-engine",
        "classnames",
        "react",
        "react-dom",
        "react-transition-group",
        "sass-embedded",
        "react/jsx-runtime"
      ], //, '@emotion/react', '@emotion/styled', '@mui/material'
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
            console.dir(currentPath);
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
