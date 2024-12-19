export type BlockLinkSections = BlockLinkSection[];

export interface BlockLinkSection {
  title: string;
  path: string;
  description: string;
  subsections?: BlockLinkSubsection[];
}

export type BlockLinkSubsection = Pick<BlockLinkSection, 'title' | 'path'>;
