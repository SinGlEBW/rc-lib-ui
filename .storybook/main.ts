import type { StorybookConfig } from "@storybook/react-vite";
import { withoutVitePlugins } from '@storybook/builder-vite'
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@storybook/addon-onboarding",
    // "@chromatic-com/storybook",
    // "@storybook/addon-interactions",
  ],
  async viteFinal(config, options) {
    // Add your configuration here
    return config;
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        // viteConfigPath: 'vite.config.ts',
      },
    },
  },
 
};
export default config;
