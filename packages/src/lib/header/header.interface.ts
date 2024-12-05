import { Language } from '@igo2/sdg/core';

export interface IHeaderConfig {
  contactUs?: IHeaderContactUs;
  languages?: IHeaderLanguages;
}

export interface IHeaderLogo {
  primary: string;
  print?: string;
  url: string;
}

export interface IHeaderContactUs {
  label: string;
  route: string;
}

export interface IHeaderLanguages {
  /** For now, we take only two language */
  choices: [IHeaderLanguageChoice, IHeaderLanguageChoice];
  default: Language;
}

export interface IHeaderLanguageChoice {
  label: string;
  key: Language;
}
