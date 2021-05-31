import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

const features = [
  {
    title: "Tech",
    imageUrl: "img/spacekatt_logo.jpg",
    description: <>SpaceKatt Tech</>,
  },
  {
    title: "Art",
    imageUrl: "img/spacekatt_logo.jpg",
    description: <>SpaceKatt Art</>,
  },
  {
    title: "And More!",
    imageUrl: "img/spacekatt_logo.jpg",
    description: (
      <>Change is constant! Check the blog for content updates on this site.</>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="border-man">
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 style={{ color: "black" }}>{title}</h3>
      <p style={{ color: "clue" }}>{description}</p>
    </div>
  );
}

const urlArr = ["tech/", "art/", "blog/"];
function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("tech/")}
            >
              View Site Content
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
                  <div className={clsx("border-man col col--4")}>
                    <Link
                      className={clsx(styles.borderMan, styles.mainPageFeature)}
                      to={useBaseUrl(urlArr[idx])}
                    >
                      <Feature key={idx} {...props}></Feature>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
