export type AnyBreadcrumb = Breadcrumb | BreadcrumbMenu;

export interface Breadcrumb {
  id: string;
  title: string;
  url: string;
}

export interface BreadcrumbMenu {
  id: string;
  menu: Breadcrumb[];
}
