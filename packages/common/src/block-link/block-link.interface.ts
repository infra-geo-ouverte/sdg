export interface BlockLinkLabels {
  seeMore: string;
}

export type BlockLinkSections = BlockLinkSection[];

export interface BlockLinkSection {
  icon?: string;
  title: string;
  path: string;
  description?: string;
  subsections?: BlockLinkSubsection[];
}

export type BlockLinkSubsection = Pick<BlockLinkSection, 'title' | 'path'>;
