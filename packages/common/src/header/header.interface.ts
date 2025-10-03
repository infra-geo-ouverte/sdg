export interface IHeaderLabels {
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
  default: string;
}

export interface IHeaderLanguageChoice {
  label: string;
  key: string;
}
