import React from 'react';
import { ReactElement } from 'react';
import { Card, CardProps } from '..';

export interface CardFactoryProps {
  cardProps: CardProps[];
}

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
