import React, { ReactElement } from 'react';

export interface ExternalLinkProps {
  href: string;
  text: string;
}

export const ExternalLink = (props: ExternalLinkProps): ReactElement => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
};
