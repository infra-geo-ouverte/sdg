export type AnyBreadcrumb = Breadcrumb | BreadcrumbMenu;
export type Breadcrumbs = Breadcrumb[];

export interface Breadcrumb extends BreadcrumbBase {
  title: string;
  url: string;
  redirectTo?: string | undefined;
}

export interface BreadcrumbMenu extends BreadcrumbBase {
  menu: Breadcrumbs;
}

interface BreadcrumbBase {
  id: string;
  firstParent?: boolean;
}
