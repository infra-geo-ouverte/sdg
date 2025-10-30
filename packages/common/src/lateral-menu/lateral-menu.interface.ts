export type LateralMenuSections = LateralMenuItem[];

export interface LateralMenuItem {
  title: string;
  path: string;
  items?: LateralMenuSection;
  opened?: boolean;
}

export type LateralMenuSection = LateralMenuSectionItem[];

export type LateralMenuSectionItem = Pick<LateralMenuItem, 'title' | 'path'>;
