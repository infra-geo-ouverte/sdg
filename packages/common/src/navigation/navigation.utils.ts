import { SdgRoute } from '@igo2/sdg-core';

import { INavigationLink } from './navigation.interface';

export function isNavigationLink(link: SdgRoute): link is INavigationLink {
  return 'title' in link && 'path' in link;
}
