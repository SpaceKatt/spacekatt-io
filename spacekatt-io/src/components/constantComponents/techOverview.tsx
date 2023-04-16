import React from 'react';
import { CardProps } from '../generics';
import { CardFactory, LinkListFactory } from '../factories';

const techGalleryCardHeight = '250px';

const content: CardProps[] = [
  {
    header: 'Git Repo Setup Best Practices',
    body: 'How-to implement best practices for setting up open source git repositories on GitHub.',
    imgSrc: '/img/dispensesTheSquars.png',
    alt: 'Meme of GitHub commit squars',
    title: 'Git Repository Setup: Best Practices and How-to',
    height: techGalleryCardHeight,
    url: '/git-repo-best-practices',
  },
  {
    header: 'Weather Station',
    body: 'WiFi-connected temperature and humidity telemetry node, using an ESP32.',
    imgSrc: '/img/weather_station.png',
    alt: 'Image of SpaceKatt Weather Station',
    title: 'SpaceKatt Weather Station',
    height: techGalleryCardHeight,
    url: '/esp32-weather-telemetry-station',
  },
  {
    header: 'Minesweeper',
    body: 'Classic game implemented using React 17 Hooks. Vaporwave aesthetic.',
    imgSrc: '/img/minesweeper.png',
    alt: 'Minesweeper squares during gameplay',
    title: 'Minesweeper Game',
    height: techGalleryCardHeight,
    url: '/minesweeper',
  },
];

export const TechOverviewGallery = () => {
  return <CardFactory {...{ cardProps: content }} />;
};

export const TechLinkList = () => {
  return <LinkListFactory {...{ pages: content }} />
}
