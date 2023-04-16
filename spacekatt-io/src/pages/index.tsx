import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { ConvertKitCTA, Feature } from '../components';
import { SpaceKattConstants } from '../constants';
import styles from './styles.module.css';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

const features = [
  {
    title: 'Tech',
    url: 'tech',
    imageUrl: SpaceKattConstants.logo,
    description: 'Peruse projects related to all things technology related!',
  },
  {
    title: 'Art',
    url: 'art',
    imageUrl: SpaceKattConstants.logo,
    description: 'See the art SpaceKatt has created!',
  },
  {
    title: 'Meta',
    url: 'about',
    imageUrl: SpaceKattConstants.logo,
    description:
      'Learn more about SpaceKatt and the International Spacekatt Station!',
  },
];

function Home() {
  const { siteConfig } = useDocusaurusContext();

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
            <Box sx={{ flexGrow: 1, padding: 3 }}>
              <Grid2 container spacing={{ lg: 3, md: 2, xs: 1 }}>
                {features.map((props, idx) => (
                  <Grid2 xs={12} md={6} lg={4} key={idx}>
                    <Box sx={{ padding: 3, height: '100%', minHeight: '400px' }}>
                      <Feature key={idx} {...props} ></Feature>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </section>
        )}
        <ConvertKitCTA />;
      </main>
    </Layout>
  );
}

export default Home;
