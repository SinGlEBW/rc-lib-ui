// vite.config.ts
import { defineConfig } from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { resolve } from "path";

// package.json
var package_default = {
  name: "rc-lib-ui",
  private: false,
  version: "1.5.29",
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
    "./webrtc": {
      import: "./dist/webrtc.js",
      types: "./dist/WebRTC/index.d.ts"
    },
    "./network": {
      import: "./dist/network.js",
      types: "./dist/NetworkAndSocket/Network/index.d.ts"
    },
    "./preloaders": {
      import: "./dist/preloaders.js",
      types: "./dist/Preloaders/index.d.ts"
    },
    "./dashboard": {
      import: "./dist/dashboard.js",
      types: "./dist/Dashboard/index.d.ts"
    },
    "./control-cards": {
      import: "./dist/control-cards.js",
      types: "./dist/ControlCards/index.d.ts"
    },
    "./hooks": {
      import: "./dist/hooks.js",
      types: "./dist/hooks/index.d.ts"
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
    send: "node publishVersion.js",
    "build:dev": "node buildEditVersion.js"
  },
  dependencies: {
    "dev-classes": "^1.6.12",
    mediabunny: "^1.50.3",
    notistack: "^3.0.2",
    "react-transition-group": "^4.4.5",
    uuid4: "^2.0.3",
    zustand: "^5.0.7"
  },
  peerDependencies: {
    "@emotion/react": ">=11.11.1",
    "@emotion/styled": ">=11.11.0",
    "@mui/icons-material": ">=5.14.19",
    "@mui/material": ">=5.14.19",
    classnames: ">=2.5.1",
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
        socket: entryPathLib + "/NetworkAndSocket/Socket/index.ts",
        network: entryPathLib + "/NetworkAndSocket/Network/index.ts",
        preloaders: entryPathLib + "/Preloaders/index.ts",
        dashboard: entryPathLib + "/Dashboard/index.ts",
        webrtc: entryPathLib + "/WebRTC/index.ts",
        "control-cards": entryPathLib + "/ControlCards/index.ts",
        "hooks": entryPathLib + "/hooks/index.ts"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcQ3JlYXRlZF9MaWJcXFxcUmVhY3RDcmVhdGVMaWJcXFxcQ29tcG9uZW50c1xcXFxyYy1saWItdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RzXFxcXENyZWF0ZWRfTGliXFxcXFJlYWN0Q3JlYXRlTGliXFxcXENvbXBvbmVudHNcXFxccmMtbGliLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9DcmVhdGVkX0xpYi9SZWFjdENyZWF0ZUxpYi9Db21wb25lbnRzL3JjLWxpYi11aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB7IGxpYkluamVjdENzcyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1saWItaW5qZWN0LWNzc1wiO1xuXG5pbXBvcnQgeyBleHRuYW1lLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBnbG9iIH0gZnJvbSBcImdsb2JcIjtcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IGZ1bGxOYW1lQ29tcG9uZW50ID0gYHJlYWN0LXVpYDtcbmNvbnN0IGVudHJ5UGF0aExpYiA9IFwic3JjL2xpYnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHsgaW5jbHVkZTogZW50cnlQYXRoTGliIH0pLFxuICAgIGxpYkluamVjdENzcygpXG4gIF0sXG4gIGJhc2U6ICcuLycsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAbGlic1wiOiByZXNvbHZlKF9fZGlybmFtZSwgYC4vJHtlbnRyeVBhdGhMaWJ9YCksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgbW9kdWxlczoge1xuICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZSdcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogZW50cnlQYXRoTGliICsgJy9pbmRleC50cycsXG4gICAgICAgIHNvY2tldDogZW50cnlQYXRoTGliICsnL05ldHdvcmtBbmRTb2NrZXQvU29ja2V0L2luZGV4LnRzJyxcbiAgICAgICAgbmV0d29yazogZW50cnlQYXRoTGliICsnL05ldHdvcmtBbmRTb2NrZXQvTmV0d29yay9pbmRleC50cycsXG4gICAgICAgIHByZWxvYWRlcnM6IGVudHJ5UGF0aExpYiArJy9QcmVsb2FkZXJzL2luZGV4LnRzJyxcbiAgICAgICAgZGFzaGJvYXJkOiBlbnRyeVBhdGhMaWIgKycvRGFzaGJvYXJkL2luZGV4LnRzJyxcbiAgICAgICAgd2VicnRjOiBlbnRyeVBhdGhMaWIgKycvV2ViUlRDL2luZGV4LnRzJyxcbiAgICAgICAgJ2NvbnRyb2wtY2FyZHMnOiBlbnRyeVBhdGhMaWIgKycvQ29udHJvbENhcmRzL2luZGV4LnRzJyxcbiAgICAgICAgJ2hvb2tzJzogZW50cnlQYXRoTGliICsnL2hvb2tzL2luZGV4LnRzJyxcbiAgICAgIH0sXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICAgIG5hbWU6IGZ1bGxOYW1lQ29tcG9uZW50LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICAvXkBtdWlcXC8uKi8sXG4gICAgICAgIC9eQGVtb3Rpb25cXC8uKi8sXG4gICAgICAgIC4uLk9iamVjdC5rZXlzKHBhY2thZ2VKc29uLnBlZXJEZXBlbmRlbmNpZXMpXG4gICAgICBdLFxuXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG4gICAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiOiBcInN0eWxlZFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwicmMtbGliLXVpXCIsXG4gIFwicHJpdmF0ZVwiOiBmYWxzZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMS41LjI5XCIsXG4gIFwiYXV0aG9yXCI6IFwiU2luR2xFQldcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICBcInR5cGVzXCI6IFwiLi9kaXN0L2luZGV4LmQudHNcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9pbmRleC5janNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vc29ja2V0XCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3NvY2tldC5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9OZXR3b3JrQW5kU29ja2V0L1NvY2tldC9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi93ZWJydGNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3Qvd2VicnRjLmpzXCIsXG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L1dlYlJUQy9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9uZXR3b3JrXCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L25ldHdvcmsuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvTmV0d29ya0FuZFNvY2tldC9OZXR3b3JrL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL3ByZWxvYWRlcnNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvcHJlbG9hZGVycy5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9QcmVsb2FkZXJzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2Rhc2hib2FyZFwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9kYXNoYm9hcmQuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvRGFzaGJvYXJkL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2NvbnRyb2wtY2FyZHNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvY29udHJvbC1jYXJkcy5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9Db250cm9sQ2FyZHMvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vaG9va3NcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaG9va3MuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaG9va3MvaW5kZXguZC50c1wiXG4gICAgfVxuICB9LFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcInB1Ymxpc2hDb25maWdcIjoge1xuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCIsXG4gICAgXCJyZWdpc3RyeVwiOiBcImh0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnL1wiLFxuICAgIFwiZGlyZWN0b3J5XCI6IFwiZGlzdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwicmVhY3RcIixcbiAgICBcInJjLWxpYi11aVwiXG4gIF0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAtLXByb2plY3QgdHNjb25maWcucHJvZC5qc29uICYmIHZpdGUgYnVpbGRcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJzZW5kXCI6IFwibm9kZSBwdWJsaXNoVmVyc2lvbi5qc1wiLFxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwibm9kZSBidWlsZEVkaXRWZXJzaW9uLmpzXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZGV2LWNsYXNzZXNcIjogXCJeMS42LjEyXCIsXG4gICAgXCJtZWRpYWJ1bm55XCI6IFwiXjEuNTAuM1wiLFxuICAgIFwibm90aXN0YWNrXCI6IFwiXjMuMC4yXCIsXG4gICAgXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCI6IFwiXjQuNC41XCIsXG4gICAgXCJ1dWlkNFwiOiBcIl4yLjAuM1wiLFxuICAgIFwienVzdGFuZFwiOiBcIl41LjAuN1wiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZW1vdGlvbi9yZWFjdFwiOiBcIj49MTEuMTEuMVwiLFxuICAgIFwiQGVtb3Rpb24vc3R5bGVkXCI6IFwiPj0xMS4xMS4wXCIsXG4gICAgXCJAbXVpL2ljb25zLW1hdGVyaWFsXCI6IFwiPj01LjE0LjE5XCIsXG4gICAgXCJAbXVpL21hdGVyaWFsXCI6IFwiPj01LjE0LjE5XCIsXG4gICAgXCJjbGFzc25hbWVzXCI6IFwiPj0yLjUuMVwiLFxuICAgIFwicmVhY3RcIjogXCI+PTE4LjIuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiPj0xOC4yLjBcIixcbiAgICBcInJlYWN0LXJvdXRlci1kb21cIjogXCI+PTYuMjYuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjcuNFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuNjRcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4yMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4xLjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4xLjFcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjUuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC41XCIsXG4gICAgXCJnbG9iXCI6IFwiXjExLjAuMFwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjc5LjRcIixcbiAgICBcInNhc3MtZW1iZWRkZWRcIjogXCJeMS43OS40XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMS42XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeNC4yLjNcIixcbiAgICBcInZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzXCI6IFwiXjIuMS4xXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVyxTQUFT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
