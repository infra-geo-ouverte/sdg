import { Language } from '@igo2/sdg-i18n';

export interface HeaderLabels {
  contactUs: string;
}

export interface IHeaderConfig {
  contactUsRoute?: string;
  languages?: IHeaderLanguages;
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
