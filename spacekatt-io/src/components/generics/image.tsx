import React, { FunctionComponent } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import './image.css';

export interface ImageProps {
  imageUrl: string;
  alt?: string;
  title?: string;
  height?: string;
}

export const Image: FunctionComponent<ImageProps> = (props: ImageProps) => {
  const imgUrl = convertUrl(props.imageUrl);
  return (
    <div>
      <img
        className="spk-img"
        src={imgUrl}
        alt={props.alt}
        title={props.title}
        height={props.height}
      />
    </div>
  );
};

// Assumes any relative path begins with a '.'
// External links should always begin with protocol (e.g., 'https://')
const convertUrl = (imgUrl: string) => {
  if (imgUrl[0] === '.') {
    return useBaseUrl(imgUrl);
  }

  return imgUrl;
};
