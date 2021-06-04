import renderRoutes from '@docusaurus/renderRoutes';
import React, { FunctionComponent, ReactElement } from 'react';

export interface CardProps {
  header: string;
  body: string;
  imgSrc: string;
  alt: string;
  title: string;
  height: string;
  url: string;
  classCss?: string;
}

export const Card: FunctionComponent<CardProps> = (
  props: CardProps,
): ReactElement => {
  return (
    <div className="card col">
      <div className="card__image">
        <img
          src={props.imgSrc}
          alt={props.alt}
          title={props.title}
          height={props.height}
        />
      </div>
      <div class="card__body">
        <h4>{props.header}</h4>

        <small>
          Classic game implemented using React 17 Hooks. Vaporwave aesthetic.
        </small>
      </div>
      <div className="card__footer">
        <a
          href={props.url}
          className={
            props.classCss
              ? props.classCss
              : 'button button--primary button--block'
          }
        >
          Visit
        </a>
      </div>
    </div>
  );
};

export interface CardCollectionProps {}

export const CardFactory = (
  cardFactoryProps: CardFactoryProps,
): ReactElement => {
  const cards = cardFactoryProps.cardProps.map(Card);

  return (
    <div className="container">
      <div className="row" style={{ gap: '50px' }}>
        {cards}
      </div>
    </div>
  );
};

export interface CardFactoryProps {
  cardProps: CardProps[];
}

export const cardPropFactory = (
  header: string,
  body: string,
  imgSrc: string,
  alt: string,
  title: string,
  height: string,
  url: string,
  classCss?: string,
): CardProps => {
  return {
    header,
    body,
    imgSrc,
    alt,
    title,
    height,
    url,
    classCss,
  };
};

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
