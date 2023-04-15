import React from 'react';
import { CardProps } from '..';
import { CardFactory, LinkListFactory } from '../factories';

const artGalleryCardHeight = '300px';

const content: CardProps[] = [
  {
    header: 'BOTTOM TEXT Album',
    body: 'First official SpaceKatt album release.',
    imgSrc: '/img/bottom_text.png',
    title: 'BOTTOM TEXT Album Art',
    alt: 'SpaceKatt - BOTTOM TEXT',
    height: artGalleryCardHeight,
    url: '/bottom-text',
  },
  {
    header: 'SpaceKatt Logo',
    body: 'Design process behind the SpaceKatt logo.',
    imgSrc: '/img/spacekatt-logo.svg',
    title: 'SpaceKatt Logo',
    alt: 'SpaceKatt Logo',
    height: artGalleryCardHeight,
    url: '/spacekatt-logo',
  },
];

export const ArtOverviewGallery = () => {
  return <CardFactory {...{ cardProps: content }} />;
};

export const ArtLinkList = () => {
  return <LinkListFactory {...{ pages: content }} />
};