import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "aritools",
  description: "media website",
  head: [
		['link', { href: '/purple.png', rel: 'icon', type: 'image/png' }],
		['link', { href: '/purple.png', rel: 'apple-touch-icon', sizes: '128x128' }],
	],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/movies/search' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        link: '/introduction'
      },
      {
        text: 'Providers',
        link: '/providers'
      },
      {
        text: 'FAQ',
        link: '/faq'
      },
      {
        text: 'API',
        items: [
          {
            text: 'Movies',
            items: [
              { text: 'Search', link: '/movies/search' },
              { text: 'Get Movie Source', link: '/movies/getmoviesource' }
            ]
          },
          {
            text: 'Anime',
            items: [
              { text: 'Search', link: '/anime/search' },
              { text: 'Get Episode Source', link: '/anime/getepisodesource' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eftpmc/aritools' }
    ]
  }
})
