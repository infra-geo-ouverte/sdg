export type AnyBreadcrumb = Breadcrumb | BreadcrumbMenu;

export interface Breadcrumb {
  title: string;
  url: string;
}

export interface BreadcrumbMenu {
  menu: Breadcrumb[];
}
