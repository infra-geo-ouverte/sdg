import { Anchor } from './anchor-menu.interface';

export function findTitleAnchors(containerElement: HTMLElement): Anchor[] {
  const elements = containerElement.getElementsByTagName('h2');

  const anchors = Array.from(elements).map((element) => ({
    text: element.innerText,
    htmlElementId: element.id
  }));

  return anchors;
}
