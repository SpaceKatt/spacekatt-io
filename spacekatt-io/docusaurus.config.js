module.exports = {
  title: "International SpaceKatt Station",
  tagline: "Welcome aboard the ISS.",
  url: "https://spacekatt.io",
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
        src: "img/spacekatt_logo.jpg",
      },
      items: [
        {
          to: "tech/",
          activeBasePath: "tech",
          sidebarPath: "tech",
          label: "Tech",
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
              to: "tech/",
            },
            {
              label: "Weather Station",
              to: "tech/esp32-weather-telemetry-station/",
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
          path: "tech",
          routeBasePath: "tech",
          editUrl:
            "https://github.com/SpaceKatt/spacekatt-io/edit/main/spacekatt-io/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/SpaceKatt/spacekatt-io/edit/main/spacekatt-io/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
