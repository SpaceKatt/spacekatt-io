import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import React from 'react';
import { ReactElement } from 'react';
import { Card, CardProps } from '..';

export interface CardFactoryProps {
  cardProps: CardProps[];
}

export const CardFactory = (
  cardFactoryProps: CardFactoryProps,
): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid2 container spacing={{ lg: 3, md: 2, xs: 1 }}>
        {cardFactoryProps.cardProps.map((prop, idx) => {
          return (
            <Grid2 xs={12} md={12} lg={6} xl={4} key={idx}>
              <Box sx={{ padding: 3, height: '100%', minHeight: '400px' }}>
                <Card {...prop} />
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};
