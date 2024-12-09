// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { EnvironmentOptions } from './environment.interface';

export const environment: EnvironmentOptions = {
  production: false,
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
  navigation: {
    options: {
      title: {
        suffix: 'Système de design gouvernemental',
        separator: '·'
      }
    }
  },
  language: {
    prefix: ['locale/']
  }
};
