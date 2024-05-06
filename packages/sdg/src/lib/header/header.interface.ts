export interface IHeaderConfig {
  logo: IHeaderLogo;
  options?: IHeaderOptions;
}

export interface IHeaderLogo {
  primary: string;
  print?: string;
}

export interface IHeaderOptions {
  titleRoute?: string;
  language?: IHeaderLanguage;
  contactUs?: IHeaderContactUs;
  // search?: {
  //   label: string;
  //   url: string;
  // };
}

export interface IHeaderContactUs {
  label: string;
  redirectionRoute: string;
}

type AppLanguage = 'fr' | 'en';

export interface IHeaderLanguage {
  /** For now, we take only two language */
  choices: [IHeaderLanguageChoice, IHeaderLanguageChoice];
  default: AppLanguage;
}

export interface IHeaderLanguageChoice {
  label: string;
  key: AppLanguage;
}
