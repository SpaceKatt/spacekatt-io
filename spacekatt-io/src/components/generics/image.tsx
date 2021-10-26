import React, { FunctionComponent } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import './image.css';

export interface Source {
  link: string;
  text: string;
}

export interface ImageProps {
  imageUrl: string;
  source?: Source;
  alt?: string;
  title?: string;
  height?: string;
  width?: string;
}

export const Image: FunctionComponent<ImageProps> = (props: ImageProps) => {
  const imgUrl = convertUrl(props.imageUrl);
  const width = props.width || '800px';
  const height = props.height || '600px';
  return (
    <div>
      <img
        className="spk-img"
        src={imgUrl}
        alt={props.alt}
        title={props.title}
        width={width}
      />
    </div>
  );
};

// Assumes any relative path begins with a '.' or '/'
// External links should always begin with protocol (e.g., 'https://')
const convertUrl = (imgUrl: string) => {
  if (imgUrl[0] === '.' || imgUrl[0] === '/') {
    return useBaseUrl(imgUrl);
  }

  return imgUrl;
};
