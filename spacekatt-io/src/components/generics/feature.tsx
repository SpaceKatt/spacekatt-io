import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from '../../pages/styles.module.css';

export function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="border-man text--center">
      {imgUrl && (
        <div>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p style={{ color: 'clue' }}>{description}</p>
    </div>
  );
}
