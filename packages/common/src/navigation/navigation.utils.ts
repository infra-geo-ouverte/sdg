import { SdgRoute } from '../router';
import { INavigationLink } from './navigation.interface';

export function isNavigationLink(link: SdgRoute): link is INavigationLink {
  return 'title' in link && 'path' in link;
}
