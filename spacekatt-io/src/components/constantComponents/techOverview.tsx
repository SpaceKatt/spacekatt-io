import React from 'react';
import { CardProps } from '../generics';
import { CardFactory, LinkListFactory } from '../factories';

const techGalleryCardHeight = '250px';

const content: CardProps[] = [
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
