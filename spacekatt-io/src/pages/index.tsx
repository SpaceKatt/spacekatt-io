import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { ConvertKitCTA, Feature } from '../components';
import { SpaceKattConstants } from '../constants';
import styles from './styles.module.css';

const features = [
  {
    title: 'Tech',
    url: 'tech',
    imageUrl: SpaceKattConstants.logo,
    description: <>SpaceKatt Tech</>,
  },
  {
    title: 'Art',
    url: 'art',
    imageUrl: SpaceKattConstants.logo,
    description: <>SpaceKatt Art</>,
  },
  {
    title: 'Meta',
    url: 'about',
    imageUrl: SpaceKattConstants.logo,
    description: (
      <>Learn more about SpaceKatt and the International Spacekatt Station!</>
    ),
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('about/')}
            >
              Learn More!
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <div className={clsx('border-man col col--4')}>
                    <Link
                      className={clsx(styles.borderMan, styles.mainPageFeature)}
                      to={useBaseUrl(props.url)}
                    >
                      <Feature key={idx} {...props}></Feature>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <ConvertKitCTA />;
      </main>
    </Layout>
  );
}

export default Home;
