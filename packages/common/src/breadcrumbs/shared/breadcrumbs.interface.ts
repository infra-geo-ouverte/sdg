export type AnyBreadcrumb = Breadcrumb | BreadcrumbMenu;
export type Breadcrumbs = Breadcrumb[];

export interface Breadcrumb {
  id: string;
  title: string;
  url: string;
}

export interface BreadcrumbMenu {
  id: string;
  menu: Breadcrumbs;
}
