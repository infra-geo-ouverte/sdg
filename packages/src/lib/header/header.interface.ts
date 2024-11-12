import { Language } from '@igo2/sdg/core';

export interface IHeaderConfig {
  logo: IHeaderLogo;
  options?: IHeaderOptions;
  contactUs?: IHeaderContactUs;
}

export interface IHeaderLogo {
  primary: string;
  print?: string;
}

export interface IHeaderOptions {
  titleRoute?: string;
  language?: IHeaderLanguage;
}

export interface IHeaderContactUs {
  label: string;
  redirectionRoute: string;
}

export interface IHeaderLanguage {
  /** For now, we take only two language */
  choices: [IHeaderLanguageChoice, IHeaderLanguageChoice];
  default: Language;
}

export interface IHeaderLanguageChoice {
  label: string;
  key: Language;
}
