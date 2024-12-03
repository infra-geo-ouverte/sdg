export type Sections = Section[];

export interface Section {
  title: string;
  path: string;
  description: string;
  subsections?: Subsection[];
}

export type Subsection = Pick<Section, 'title' | 'path'>;
