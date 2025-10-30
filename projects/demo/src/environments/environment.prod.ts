import { EnvironmentOptions } from './environment.interface';

export const environment: EnvironmentOptions = {
  production: true,
  title: 'Composants Angular - Système de design gouvernemental',
  header: {
    contactUsRoute: 'contact-us',
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
  navigation: {
    options: {
      title: {
        suffix: 'Système de design gouvernemental',
        separator: '·'
      }
    }
  },
  footer: {
    copyright: {
      logo: 'images/piv-pied-page.svg',
      logoUrl: 'https://www.quebec.ca/gouvernement/ministere/securite-publique'
    }
  }
};
