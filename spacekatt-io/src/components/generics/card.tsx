import React, { FunctionComponent, ReactElement } from 'react';

export interface CardProps {
  header: string;
  body: string;
  imgSrc: string;
  alt: string;
  title: string;
  height: string;
  url: string;
  classCss?: string;
  callToAction?: string;
}

export const cardPropFactory = (
  header: string,
  body: string,
  imgSrc: string,
  alt: string,
  title: string,
  height: string,
  url: string,
  classCss?: string,
  callToAction?: string,
): CardProps => {
  return {
    header,
    body,
    imgSrc,
    alt,
    title,
    height,
    url,
    classCss,
    callToAction,
  };
};

export const Card: FunctionComponent<CardProps> = (
  props: CardProps,
): ReactElement => {
  return (
    <div className="card col">
      <div className="card__image">
        <img
          src={props.imgSrc}
          alt={props.alt}
          title={props.title}
          height={props.height}
        />
      </div>
      <div className="card__body">
        <h4>{props.header}</h4>

        <small>{props.body}</small>
      </div>
      <div className="card__footer">
        <a
          href={props.url}
          className={
            props.classCss
              ? props.classCss
              : 'button button--primary button--block'
          }
        >
          {props.callToAction ? props.callToAction : 'Visit'}
        </a>
      </div>
    </div>
  );
};
