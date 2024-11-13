import { EnvironmentOptions } from './environment.interface';

export const environment: EnvironmentOptions = {
  production: true,
  title: "Angular - Système d'assemblage gouvernemental",
  header: {
    logo: {
      primary: 'images/signature-PIV.svg',
      print: 'images/signature-PIV.svg'
    },
    contactUs: {
      label: 'header.contactUs',
      redirectionRoute: 'contact-us'
    },
    options: {
      language: {
        choices: [
          {
            label: 'English',
            key: 'en'
          },
          {
            label: 'Francais',
            key: 'fr'
          }
        ],
        default: 'fr'
      }
    }
  }
};
