import React, { FunctionComponent, ReactElement } from 'react';

export interface ContentLink {
  title: string;
  url: string;
}

export interface CardProps extends ContentLink {
  header: string;
  body: string;
  imgSrc: string;
  alt: string;
  height: string;
  classCss?: string;
  callToAction?: string;
}

export const Card: FunctionComponent<CardProps> = (
  props: CardProps,
): ReactElement => {
  return (
    <div className="card col">
      <div
        className="card__image"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
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
