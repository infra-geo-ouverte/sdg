import { EnvironmentOptions } from './environment.interface';

export const environment: EnvironmentOptions = {
  production: true,
  title: "Angular - Système d'assemblage gouvernemental",
  header: {
    contactUs: {
      label: 'header.contactUs',
      route: 'contact-us'
    },
    languages: {
      choices: [
        {
          label: 'English',
          key: 'en'
        },
        {
          label: 'Français',
          key: 'fr'
        }
      ],
      default: 'fr'
    }
  },
  language: {
    prefix: ['./locale/']
  }
};
