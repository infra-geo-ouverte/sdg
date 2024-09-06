export interface Anchor {
  text: string;
  htmlElementId: string;
}

export function findTitleAnchors(containerElement: HTMLElement): Anchor[] {
  const elements = containerElement.getElementsByTagName('h2');

  const anchors = Array.from(elements).map((element) => ({
    text: element.innerText,
    htmlElementId: element.id
  }));

  return anchors;
}
