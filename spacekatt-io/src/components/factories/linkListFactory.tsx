import Link from '@docusaurus/Link';
import React, { ReactElement } from 'react';
import { ContentLink } from '..';

export interface LinkListFactoryProps {
  pages: ContentLink[];
}

export const LinkListFactory = (props: LinkListFactoryProps): ReactElement => {
  return (
    <div>
      {props.pages.map((page, idx) => {
        return (
          <li key={idx}>
            <Link to={page.url}>{page.title}</Link>
          </li>
        );
      })}
    </div>
  );
};
