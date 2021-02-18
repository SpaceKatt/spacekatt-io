module.exports = {
  title: "International SpaceKatt Station",
  tagline: "Welcome aboard the ISS.",
  url: "https://spacekattt.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "spacekatt",
  projectName: "spacekatt-io",
  themeConfig: {
    navbar: {
      title: "SpaceKatt.io",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "projects/",
          activeBasePath: "projects",
          sidebarPath: "projects",
          label: "Projects",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/spacekatt/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Apps",
          items: [
            {
              label: "Minesweeper",
              to: "projects/",
            },
            {
              label: "Game of Life",
              to: "projects/gameOfLife/",
            },
          ],
        },
        {
          title: "Music",
          items: [
            {
              label: "BandCamp",
              href: "https://spacekatt.bandcamp.com",
            },
            {
              label: "SoundCloud",
              href: "https://soundcloud.com/spacekatt",
            },
          ],
        },
        {
          title: "Other",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/SpaceKatt",
            },
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Neuromancy Cybernetics, LLC.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          path: "projects",
          routeBasePath: "projects",
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
