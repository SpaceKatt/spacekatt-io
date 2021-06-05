import React from 'react';
import { CardFactory, CardFactoryProps } from '../factories';
import { cardPropFactory } from '../generics';

const artGalleryCardHeight = '300px';

const artOverviewGalleryProps: CardFactoryProps = {
  cardProps: [
    cardPropFactory(
      'BOTTOM TEXT Album',
      'First official SpaceKatt album release.',
      '/img/bottom_text.png',
      'BOTTOM TEXT Album Art',
      'SpaceKatt - BOTTOM TEXT',
      artGalleryCardHeight,
      '/bottom-text',
    ),
    cardPropFactory(
      'SpaceKatt Logo',
      'Design process behind the SpaceKatt logo.',
      '/img/spacekatt-logo.svg',
      'SpaceKatt Logo',
      'SpaceKatt Logo',
      artGalleryCardHeight,
      '/spacekatt-logo',
    ),
  ],
};

export const ArtOverviewGallery = () => {
  return <CardFactory {...artOverviewGalleryProps} />;
};
