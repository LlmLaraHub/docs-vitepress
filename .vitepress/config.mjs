import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LaraLamma",
  description: "Will update After",
  themeConfig: {

    logo: '/images/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs' }
    ],

    sidebar: [
      {
        text: '🚀 The Docs',
        items: [
          { text: 'Overview', link: '/docs' },
          { text: 'Local Setup', link: '/local' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
