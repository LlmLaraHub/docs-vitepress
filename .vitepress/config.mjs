import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LaraLamma",
  description: "Will update After",
  themeConfig: {

    logo: '/logo.png',
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
          { text: 'Features', link: '/features' },
          { text: 'Local Setup', link: '/local' },
          { text: 'Docker Setup', link: '/docker' },
          { text: 'First Collection', link: '/first-collection' },
          { text: 'Digging In', link: '/digging-in' },
          { text: 'Use Cases', link: '/use-cases' },
          { text: 'Server', link: '/server' },
          { text: 'Developing', link: '/developing' },
          { text: 'Adding Custom Tools - Functions', link: '/tools' },
          { text: 'Links', link: '/links' },
          { text: 'APIs', link: '/api' },
          { text: 'Code APIs', link: '/code-api' }
        ]
      }
    ],

    socialLinks: [
      { 
        icon: 'github', link: 'https://github.com/LlmLaraHub/docs-vitepress'
      },
      {
        icon: 'youtube', link: 'https://www.youtube.com/watch?v=KM7AyRHx0jQ&list=PLL8JVuiFkO9I1pGpOfrl-A8-09xut-fDq'
      },
      {
        icon: 'linkedin', link: 'https://www.linkedin.com/in/alfrednutile/'
      }
    ]
  }
})
