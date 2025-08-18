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
    alias: [
      {
        find: '@lib',
        replacement: resolve(__dirname, `./src/lib`)
      },
      // {
      //   find: /^@mui\/icons-material\/(.*)/,
      //   replacement: '@mui/icons-material/$1.js'
      // },
      // {
      //   find: /^@mui\/material\/styles\/(.*)/,
      //   replacement: '@mui/material/styles/$1.js' // Явное указание расширения
      // },
      // {
      //   find: 'react-router-dom',
      //   replacement: 'react-router-dom/dist/index.js'
      // },
      // {
      //   find: 'react-transition-group',
      //   replacement: 'react-transition-group/dist/react-transition-group.js'
      // },
      // {
      //   find: 'classnames',
      //   replacement: 'classnames/index.js'
      // }
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
        /*
          Четкий контроль, но не обязательно указывать. Можно только в package.json в exports. 
          для разделения компонентов по папкам нужно включать в 
          output: { preserveModules: true, preserveModulesRoot: 'src/lib', ...} 
        */
        // Dashboard: 'src/lib/Dashboard/index.ts' 
      },
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
        /^@mui\/.*/,
        /^@emotion\/.*/,
        'react-router-dom',
        'react-transition-group',
        'classnames'
   
        // ...filesPathToExclude
      ],
      input: Object.fromEntries(
        glob
          .sync(entryPathLib + "/**/*.{ts,tsx}")
          .map((file) => [relative(entryPathLib, file.slice(0, file.length - extname(file).length)), fileURLToPath(new URL(file, import.meta.url))])
      ),
      output: {
        // inlineDynamicImports: false,
        //preserveModules: false,//Для возможности разделения компонентов по отдельным папкам.Пример: import { Dashboard } from 'your-lib/Dashboard';
        //preserveModulesRoot: 'src/lib',//Теперь можно отдельные компоненты экспортировать в package.json

        entryFileNames: '[name].js',
        // assetFileNames: 'assets/[name][extname]',

        assetFileNames: ({originalFileName, name}) => {
          if(originalFileName){
            const itemsPath = originalFileName.replace('src/lib/', '').split('/');
            const currentPath =  itemsPath.slice(0, itemsPath.length - 1).join('/');
            return `${currentPath}/${name}`;
          }
          return "";
        },

  
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          "styled-components": "styled"
        }
      },
    },
  },
});
