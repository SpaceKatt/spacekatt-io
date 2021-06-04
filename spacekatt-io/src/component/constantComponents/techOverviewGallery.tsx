import React from 'react';
import { CardFactory, CardFactoryProps, cardPropFactory } from '..';

export const techOverviewGalleryProps: CardFactoryProps = {
  cardProps: [
    cardPropFactory(
      'Weather Station',
      'WiFi-connected temperature and humidity telemetry node, using an ESP32.',
      '/img/weather_station.png',
      'Image of SpaceKatt Weather Station',
      'SpaceKatt Weather Station',
      '200px',
      '/esp32-weather-telemetry-station',
    ),
    cardPropFactory(
      'Minesweeper',
      'Classic game implemented using React 17 Hooks. Vaporwave aesthetic.',
      '/img/minesweeper.png',
      'Minesweeper squares during gameplay',
      'Minesweeper Screenshot',
      '200px',
      '/minesweeper',
    ),
  ],
};

export const TechOverviewGallery = () => {
  return <CardFactory {...techOverviewGalleryProps} />;
};
