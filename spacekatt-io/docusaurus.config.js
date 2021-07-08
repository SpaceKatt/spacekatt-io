module.exports = {
  title: 'International SpaceKatt Station',
  tagline: 'Welcome aboard the ISS.',
  url: 'https://spacekatt.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/spacekatt-logo.svg',
  organizationName: 'spacekatt',
  projectName: 'spacekatt-io',
  themeConfig: {
    navbar: {
      title: 'SpaceKatt.io',
      logo: {
        alt: 'SpaceKatt Logo',
        src: 'img/spacekatt-logo.svg',
      },
      items: [
        {
          to: 'tech',
          activeBasePath: 'tech',
          sidebarPath: 'techSidebar',
          label: 'Tech',
          position: 'left',
        },
        {
          to: 'art',
          activeBasePath: 'art',
          sidebarPath: 'artSidebar',
          label: 'Art',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'right' },
        {
          href: 'https://github.com/spacekatt/spacekatt-io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Apps',
          items: [
            {
              label: 'Minesweeper',
              to: 'minesweeper/',
            },
            {
              label: 'Weather Station',
              to: 'esp32-weather-telemetry-station/',
            },
          ],
        },
        {
          title: 'Music',
          items: [
            {
              label: 'BandCamp',
              href: 'https://spacekatt.bandcamp.com',
            },
            {
              label: 'SoundCloud',
              href: 'https://soundcloud.com/spacekatt',
            },
          ],
        },
        {
          title: 'Other',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/SpaceKatt',
            },
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Neuromancy Cybernetics, LLC.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars/sidebars.js'),
          // Please change this to your repo.
          path: 'docs',
          routeBasePath: '/',
          editUrl:
            'https://github.com/SpaceKatt/spacekatt-io/edit/main/spacekatt-io/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/SpaceKatt/spacekatt-io/edit/main/spacekatt-io/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/minesweeper', // string
            from: ['/tech/minesweeper', '/tech/minesweeper.html'], // string | string[]
          },
        ],
      },
    ],
  ],
};
