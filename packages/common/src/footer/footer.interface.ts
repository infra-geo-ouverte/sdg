export interface IFooterConfig {
  logo?: FooterNavLogo;
  title?: string;
  siteMapLinks?: SiteMapLinks;
  externalLinks?: SiteMapLinks;
  copyright: FooterCopyright;
}

export interface FooterNavLogo {
  url: string;
  height: number;
}

export type SiteMapLinks = SiteMapLink[];

export interface SiteMapLink {
  title: string;
  path: string;
}

export interface FooterCopyright {
  logo: string;
  logoUrl: string;
  year?: number;
}
