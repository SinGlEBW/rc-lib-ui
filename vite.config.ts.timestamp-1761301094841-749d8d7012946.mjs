// vite.config.ts
import { defineConfig } from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { resolve } from "path";

// package.json
var package_default = {
  name: "rc-lib-ui",
  private: false,
  version: "1.1.48",
  author: "SinGlEBW",
  license: "MIT",
  type: "module",
  module: "./dist/index.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/index.js",
      require: "./dist/index.cjs",
      types: "./dist/index.d.ts"
    },
    "./socket": {
      import: "./dist/socket.js",
      types: "./dist/NetworkAndSocket/Socket/index.d.ts"
    },
    "./preloaders": {
      import: "./dist/preloaders.js",
      types: "./dist/Preloaders/index.d.ts"
    },
    "./dashboard": {
      import: "./dist/dashboard.js",
      types: "./dist/Dashboard/index.d.ts"
    }
  },
  files: [
    "dist"
  ],
  publishConfig: {
    access: "public",
    registry: "https://registry.npmjs.org/",
    directory: "dist"
  },
  keywords: [
    "react",
    "rc-lib-ui"
  ],
  scripts: {
    dev: "vite",
    build: "tsc --project tsconfig.prod.json && vite build",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
    send: "node publishVersion.js"
  },
  dependencies: {
    "react-transition-group": "^4.4.5",
    uuid4: "^2.0.3",
    zustand: "^5.0.7"
  },
  peerDependencies: {
    classnames: ">=2.5.1",
    "@emotion/react": ">=11.11.1",
    "@emotion/styled": ">=11.11.0",
    "@mui/icons-material": ">=5.14.19",
    "@mui/material": ">=5.14.19",
    react: ">=18.2.0",
    "react-dom": ">=18.2.0",
    "react-router-dom": ">=6.26.2"
  },
  devDependencies: {
    "@types/node": "^22.7.4",
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "@typescript-eslint/eslint-plugin": "^7.1.1",
    "@typescript-eslint/parser": "^7.1.1",
    "@vitejs/plugin-react-swc": "^3.5.0",
    eslint: "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    glob: "^11.0.0",
    sass: "^1.79.4",
    "sass-embedded": "^1.79.4",
    typescript: "^5.2.2",
    vite: "^5.1.6",
    "vite-plugin-dts": "^4.2.3",
    "vite-plugin-lib-inject-css": "^2.1.1"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\Projects\\Created_Lib\\ReactCreateLib\\Components\\rc-lib-ui";
var fullNameComponent = `react-ui`;
var entryPathLib = "src/libs";
var vite_config_default = defineConfig({
  plugins: [
    dts({ include: entryPathLib }),
    libInjectCss()
  ],
  base: "./",
  resolve: {
    alias: {
      "@libs": resolve(__vite_injected_original_dirname, `./${entryPathLib}`)
    }
  },
  server: {
    open: true
  },
  css: {
    modules: {
      localsConvention: "camelCase"
    }
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    lib: {
      entry: {
        index: entryPathLib + "/index.ts",
        // network: entryPathLib +'/NetworkAndSocket/Socket/index.ts',
        socket: entryPathLib + "/NetworkAndSocket/Socket/index.ts",
        preloaders: entryPathLib + "/Preloaders/index.ts",
        dashboard: entryPathLib + "/Dashboard/index.ts"
      },
      formats: ["es"],
      name: fullNameComponent
    },
    rollupOptions: {
      external: [
        "react/jsx-runtime",
        /^@mui\/.*/,
        /^@emotion\/.*/,
        ...Object.keys(package_default.peerDependencies)
      ],
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcQ3JlYXRlZF9MaWJcXFxcUmVhY3RDcmVhdGVMaWJcXFxcQ29tcG9uZW50c1xcXFxyYy1saWItdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RzXFxcXENyZWF0ZWRfTGliXFxcXFJlYWN0Q3JlYXRlTGliXFxcXENvbXBvbmVudHNcXFxccmMtbGliLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9DcmVhdGVkX0xpYi9SZWFjdENyZWF0ZUxpYi9Db21wb25lbnRzL3JjLWxpYi11aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB7IGxpYkluamVjdENzcyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1saWItaW5qZWN0LWNzc1wiO1xuXG5pbXBvcnQgeyBleHRuYW1lLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBnbG9iIH0gZnJvbSBcImdsb2JcIjtcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IGZ1bGxOYW1lQ29tcG9uZW50ID0gYHJlYWN0LXVpYDtcbmNvbnN0IGVudHJ5UGF0aExpYiA9IFwic3JjL2xpYnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHsgaW5jbHVkZTogZW50cnlQYXRoTGliIH0pLFxuICAgIGxpYkluamVjdENzcygpXG4gIF0sXG4gIGJhc2U6ICcuLycsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAbGlic1wiOiByZXNvbHZlKF9fZGlybmFtZSwgYC4vJHtlbnRyeVBhdGhMaWJ9YCksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgbW9kdWxlczoge1xuICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZSdcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogZW50cnlQYXRoTGliICsgJy9pbmRleC50cycsXG4gICAgICAgIC8vIG5ldHdvcms6IGVudHJ5UGF0aExpYiArJy9OZXR3b3JrQW5kU29ja2V0L1NvY2tldC9pbmRleC50cycsXG4gICAgICAgIHNvY2tldDogZW50cnlQYXRoTGliICsnL05ldHdvcmtBbmRTb2NrZXQvU29ja2V0L2luZGV4LnRzJyxcbiAgICAgICAgcHJlbG9hZGVyczogZW50cnlQYXRoTGliICsnL1ByZWxvYWRlcnMvaW5kZXgudHMnLFxuICAgICAgICBkYXNoYm9hcmQ6IGVudHJ5UGF0aExpYiArJy9EYXNoYm9hcmQvaW5kZXgudHMnLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgICAgbmFtZTogZnVsbE5hbWVDb21wb25lbnQsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcInJlYWN0L2pzeC1ydW50aW1lXCIsXG4gICAgICAgIC9eQG11aVxcLy4qLyxcbiAgICAgICAgL15AZW1vdGlvblxcLy4qLyxcbiAgICAgICAgLi4uT2JqZWN0LmtleXMocGFja2FnZUpzb24ucGVlckRlcGVuZGVuY2llcylcbiAgICAgIF0sXG5cbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICBcInN0eWxlZC1jb21wb25lbnRzXCI6IFwic3R5bGVkXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAie1xuICBcIm5hbWVcIjogXCJyYy1saWItdWlcIixcbiAgXCJwcml2YXRlXCI6IGZhbHNlLFxuICBcInZlcnNpb25cIjogXCIxLjEuNDhcIixcbiAgXCJhdXRob3JcIjogXCJTaW5HbEVCV1wiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwibW9kdWxlXCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L2luZGV4LmNqc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9zb2NrZXRcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3Qvc29ja2V0LmpzXCIsXG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L05ldHdvcmtBbmRTb2NrZXQvU29ja2V0L2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL3ByZWxvYWRlcnNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvcHJlbG9hZGVycy5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9QcmVsb2FkZXJzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2Rhc2hib2FyZFwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9kYXNoYm9hcmQuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvRGFzaGJvYXJkL2luZGV4LmQudHNcIlxuICAgIH1cbiAgfSxcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCJcbiAgXSxcbiAgXCJwdWJsaXNoQ29uZmlnXCI6IHtcbiAgICBcImFjY2Vzc1wiOiBcInB1YmxpY1wiLFxuICAgIFwicmVnaXN0cnlcIjogXCJodHRwczovL3JlZ2lzdHJ5Lm5wbWpzLm9yZy9cIixcbiAgICBcImRpcmVjdG9yeVwiOiBcImRpc3RcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInJlYWN0XCIsXG4gICAgXCJyYy1saWItdWlcIlxuICBdLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ0c2MgLS1wcm9qZWN0IHRzY29uZmlnLnByb2QuanNvbiAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwic2VuZFwiOiBcIm5vZGUgcHVibGlzaFZlcnNpb24uanNcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCI6IFwiXjQuNC41XCIsXG4gICAgXCJ1dWlkNFwiOiBcIl4yLjAuM1wiLFxuICAgIFwienVzdGFuZFwiOiBcIl41LjAuN1wiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjbGFzc25hbWVzXCI6IFwiPj0yLjUuMVwiLFxuICAgIFwiQGVtb3Rpb24vcmVhY3RcIjogXCI+PTExLjExLjFcIixcbiAgICBcIkBlbW90aW9uL3N0eWxlZFwiOiBcIj49MTEuMTEuMFwiLFxuICAgIFwiQG11aS9pY29ucy1tYXRlcmlhbFwiOiBcIj49NS4xNC4xOVwiLFxuICAgIFwiQG11aS9tYXRlcmlhbFwiOiBcIj49NS4xNC4xOVwiLFxuICAgIFwicmVhY3RcIjogXCI+PTE4LjIuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiPj0xOC4yLjBcIixcbiAgICBcInJlYWN0LXJvdXRlci1kb21cIjogXCI+PTYuMjYuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjcuNFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuNjRcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4yMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4xLjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4xLjFcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjUuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC41XCIsXG4gICAgXCJnbG9iXCI6IFwiXjExLjAuMFwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjc5LjRcIixcbiAgICBcInNhc3MtZW1iZWRkZWRcIjogXCJeMS43OS40XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMS42XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeNC4yLjNcIixcbiAgICBcInZp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
