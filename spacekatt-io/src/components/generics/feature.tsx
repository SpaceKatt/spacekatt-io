import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Link from '@docusaurus/Link';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export interface FeatureProps {
  imageUrl: string;
  title: string;
  description: string;
  url: string;
}

export function Feature(props: FeatureProps) {
  const { imageUrl, title, description, url } = props;
  const imgUrl = useBaseUrl(imageUrl);

  const fontColor = 'var(--ifm-color-emphasis-800)';

  return (
    <Link to={url} style={{ height: '100%', verticalAlign: 'top'}}>
      <Card
        raised
        style={{
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          height: '100%',
        }}
      >
        <CardActionArea style={{ height: '100%' }}>
          <CardMedia
            component="img"
            image={imageUrl}
            height="200px"
            sx={{
               paddingTop: '1.5em',
               objectFit: 'contain',
               verticalAlign: 'top',
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              align="center"
              variant="h4"
              component="div"
              sx={{ color: fontColor }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: 'var(--ifm-color-emphasis-800)' }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
