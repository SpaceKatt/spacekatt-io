import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from '../../pages/styles.module.css';
import Link from '@docusaurus/Link';

export interface FeatureProps {
  imageUrl: string,
  title: string,
  description: string,
}
export function Feature(props: FeatureProps) {
  const { imageUrl, title, description } = props;
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <div className="border-man text--center">
      {imgUrl && (
        <div>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <Link>{description}</Link>
    </div>
  );
}
