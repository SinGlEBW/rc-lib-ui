// vite.config.ts
import { defineConfig } from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///D:/Projects/Created_Lib/ReactCreateLib/Components/rc-lib-ui/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { resolve } from "path";

// package.json
var package_default = {
  name: "rc-lib-ui",
  private: false,
  version: "1.6.9-beta.0",
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
    "react-dom": ">=18.2.0"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcQ3JlYXRlZF9MaWJcXFxcUmVhY3RDcmVhdGVMaWJcXFxcQ29tcG9uZW50c1xcXFxyYy1saWItdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RzXFxcXENyZWF0ZWRfTGliXFxcXFJlYWN0Q3JlYXRlTGliXFxcXENvbXBvbmVudHNcXFxccmMtbGliLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9DcmVhdGVkX0xpYi9SZWFjdENyZWF0ZUxpYi9Db21wb25lbnRzL3JjLWxpYi11aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB7IGxpYkluamVjdENzcyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1saWItaW5qZWN0LWNzc1wiO1xuXG5pbXBvcnQgeyBleHRuYW1lLCByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBnbG9iIH0gZnJvbSBcImdsb2JcIjtcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IGZ1bGxOYW1lQ29tcG9uZW50ID0gYHJlYWN0LXVpYDtcbmNvbnN0IGVudHJ5UGF0aExpYiA9IFwic3JjL2xpYnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZHRzKHsgaW5jbHVkZTogZW50cnlQYXRoTGliIH0pLFxuICAgIGxpYkluamVjdENzcygpXG4gIF0sXG4gIGJhc2U6ICcuLycsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAbGlic1wiOiByZXNvbHZlKF9fZGlybmFtZSwgYC4vJHtlbnRyeVBhdGhMaWJ9YCksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgbW9kdWxlczoge1xuICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZSdcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogZW50cnlQYXRoTGliICsgJy9pbmRleC50cycsXG4gICAgICAgIHNvY2tldDogZW50cnlQYXRoTGliICsnL05ldHdvcmtBbmRTb2NrZXQvU29ja2V0L2luZGV4LnRzJyxcbiAgICAgICAgbmV0d29yazogZW50cnlQYXRoTGliICsnL05ldHdvcmtBbmRTb2NrZXQvTmV0d29yay9pbmRleC50cycsXG4gICAgICAgIHByZWxvYWRlcnM6IGVudHJ5UGF0aExpYiArJy9QcmVsb2FkZXJzL2luZGV4LnRzJyxcbiAgICAgICAgZGFzaGJvYXJkOiBlbnRyeVBhdGhMaWIgKycvRGFzaGJvYXJkL2luZGV4LnRzJyxcbiAgICAgICAgd2VicnRjOiBlbnRyeVBhdGhMaWIgKycvV2ViUlRDL2luZGV4LnRzJyxcbiAgICAgICAgJ2NvbnRyb2wtY2FyZHMnOiBlbnRyeVBhdGhMaWIgKycvQ29udHJvbENhcmRzL2luZGV4LnRzJyxcbiAgICAgICAgJ2hvb2tzJzogZW50cnlQYXRoTGliICsnL2hvb2tzL2luZGV4LnRzJyxcbiAgICAgIH0sXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICAgIG5hbWU6IGZ1bGxOYW1lQ29tcG9uZW50LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICAvXkBtdWlcXC8uKi8sXG4gICAgICAgIC9eQGVtb3Rpb25cXC8uKi8sXG4gICAgICAgIC4uLk9iamVjdC5rZXlzKHBhY2thZ2VKc29uLnBlZXJEZXBlbmRlbmNpZXMpXG4gICAgICBdLFxuXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG4gICAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiOiBcInN0eWxlZFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwicmMtbGliLXVpXCIsXG4gIFwicHJpdmF0ZVwiOiBmYWxzZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMS42LjktYmV0YS4wXCIsXG4gIFwiYXV0aG9yXCI6IFwiU2luR2xFQldcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcIm1vZHVsZVwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICBcInR5cGVzXCI6IFwiLi9kaXN0L2luZGV4LmQudHNcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9pbmRleC5janNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vc29ja2V0XCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3NvY2tldC5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9OZXR3b3JrQW5kU29ja2V0L1NvY2tldC9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi93ZWJydGNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3Qvd2VicnRjLmpzXCIsXG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L1dlYlJUQy9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9uZXR3b3JrXCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L25ldHdvcmsuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvTmV0d29ya0FuZFNvY2tldC9OZXR3b3JrL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL3ByZWxvYWRlcnNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvcHJlbG9hZGVycy5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9QcmVsb2FkZXJzL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2Rhc2hib2FyZFwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9kYXNoYm9hcmQuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvRGFzaGJvYXJkL2luZGV4LmQudHNcIlxuICAgIH0sXG4gICAgXCIuL2NvbnRyb2wtY2FyZHNcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvY29udHJvbC1jYXJkcy5qc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9Db250cm9sQ2FyZHMvaW5kZXguZC50c1wiXG4gICAgfSxcbiAgICBcIi4vaG9va3NcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaG9va3MuanNcIixcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaG9va3MvaW5kZXguZC50c1wiXG4gICAgfVxuICB9LFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcInB1Ymxpc2hDb25maWdcIjoge1xuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCIsXG4gICAgXCJyZWdpc3RyeVwiOiBcImh0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnL1wiLFxuICAgIFwiZGlyZWN0b3J5XCI6IFwiZGlzdFwiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwicmVhY3RcIixcbiAgICBcInJjLWxpYi11aVwiXG4gIF0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAtLXByb2plY3QgdHNjb25maWcucHJvZC5qc29uICYmIHZpdGUgYnVpbGRcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJzZW5kXCI6IFwibm9kZSBwdWJsaXNoVmVyc2lvbi5qc1wiLFxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwibm9kZSBidWlsZEVkaXRWZXJzaW9uLmpzXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZGV2LWNsYXNzZXNcIjogXCJeMS42LjEyXCIsXG4gICAgXCJtZWRpYWJ1bm55XCI6IFwiXjEuNTAuM1wiLFxuICAgIFwibm90aXN0YWNrXCI6IFwiXjMuMC4yXCIsXG4gICAgXCJyZWFjdC10cmFuc2l0aW9uLWdyb3VwXCI6IFwiXjQuNC41XCIsXG4gICAgXCJ1dWlkNFwiOiBcIl4yLjAuM1wiLFxuICAgIFwienVzdGFuZFwiOiBcIl41LjAuN1wiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZW1vdGlvbi9yZWFjdFwiOiBcIj49MTEuMTEuMVwiLFxuICAgIFwiQGVtb3Rpb24vc3R5bGVkXCI6IFwiPj0xMS4xMS4wXCIsXG4gICAgXCJAbXVpL2ljb25zLW1hdGVyaWFsXCI6IFwiPj01LjE0LjE5XCIsXG4gICAgXCJAbXVpL21hdGVyaWFsXCI6IFwiPj01LjE0LjE5XCIsXG4gICAgXCJjbGFzc25hbWVzXCI6IFwiPj0yLjUuMVwiLFxuICAgIFwicmVhY3RcIjogXCI+PTE4LjIuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiPj0xOC4yLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi43LjRcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjY0XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuMjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjcuMS4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMS4xXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjogXCJeMy41LjBcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjQuNVwiLFxuICAgIFwiZ2xvYlwiOiBcIl4xMS4wLjBcIixcbiAgICBcInNhc3NcIjogXCJeMS43OS40XCIsXG4gICAgXCJzYXNzLWVtYmVkZGVkXCI6IFwiXjEuNzkuNFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxuICAgIFwidml0ZVwiOiBcIl41LjEuNlwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiXjQuMi4zXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1saWItaW5qZWN0LWNzc1wiOiBcIl4yLjEuMVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1csU0FBUyxvQkFBb0I7QUFDNVksT0FBTyxTQUFTO0FBQ2hCLFNBQVMs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
