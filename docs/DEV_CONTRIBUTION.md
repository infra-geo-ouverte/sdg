# @igo2/sdg Développement Guides

## Contenu

| Section                                             | Description                                     |
| --------------------------------------------------- | ----------------------------------------------- |
| [🚧 Requis](#-requis)                               | Dépendances requises                            |
| [🚀 Config dans un projet](#-config-dans-un-projet) | Comment configurer le projet                    |
| [📜 Commandes](#-commandes)                         | Commandes npm disponible                        |
| [🌎 Contribution](#-contribution)                   | Explication minimale du flow de développement   |
| [🧰 Dépannage](#-dépannage)                         | Liste des problèmes possible avec les solutions |

## 🚧 Requis

- [Git]
- [Node.js] qui inclus le [Node Package Manager][npm]
- Extensions: Eslint, Prettier, Angular Language Service dans votre IDE

## 🚀 Config dans un projet

Installer les librairies, il existe 4 modules (core, common, carto et i18n):

Pour commencer installer le paquet core et importer le style et le thème
```shell
npm install @igo2/sdg-core --save
```

```scss
// File: theme.scss
@use '@angular/material' as mat;
@use '@igo2/sdg-core' as sdg;

html {
  color-scheme: light;

  @include mat.theme(sdg.$material-theme);

  // La propriété boolean permet de générer, pour le thème sombre,
  // ses variante des variables CSS
  @include sdg.theme(true);
}
```

Pour utiliser les composants communs:
```shell
npm install @igo2/sdg-common --save
```

```typescript
import { YOUR_IMPORT_NAME } from '@igo2/sdg-common';
```

Il existe des sous-module comme pour le volet cartographique. Un exemple d'importation du volet carto pour le moteur cartographique Openlayers via le sous-module:

```typescript
import { SdgOlReferenceMapComponent } from '@igo2/sdg-carto/ol';
```

## 📜 Commandes

| Commande | Description                                     |
| -------- | ----------------------------------------------- |
| `start`  | Lancer la démo                                  |
| `lint`   | Permet de valider la syntaxe du projet          |
| `format` | Corriger automatiquement les erreurs de syntaxe |
| `test`   | Permet de rouler la suite de test Karma         |

## 🌎 Contribution

### Première étape

1. Prendre/assigner une sous-tâche Github en priorité avant une nouvelle story.
2. Mettre cette sous-tâche/story en « In Progress ».
3. Ensuite:
   1. Si nouvelle story, faire un kickoff technique avec le tech lead, l'architecte associé et désigneur si nécessaire.
   2. Pour une sous-tâche, simplement aviser la personne associée à la story liée.
4. Faire ce qui est demandé dans la story/sous-tâche.
5. Créer une PR sur Github avec une description la plus claire possible avec des screenshots/vidéos si changement visuel.
6. Mettre la story/sous-tâche en « Code review ».
7. Une fois approuvé, merger la PR. Si la tâche faite est une sous-tâche, simplement la mettre à « Done » sinon mettre la story à « QA ».
8. Si nouvelle story, faire la validation sur la DEV de ce qui a été fait et mettre en « In Review ».

### Message de commit

Ce projet utilise un déploiement automatisé qui est basé sur [Conventional Commits][conventional-commits], une convention des messages de commit. Il y une validation du message de commit.

Ressources:

- Semantic-Release comment ça fonctionne [le format du message de commit][semantic-release]

## 🧰 Dépannage

À documenter...

## SYMLINK - Config et démarrage (AVANCÉ)

Le lien symbolique permet de développer un projet d'assemblage de manière intégré avec la librairie.

1. Cloner un projet d'assemblage qui utilise cette librairie dans le dossier projects. Ex:
   ```
   cd projects
   git clone https://github.com/infra-geo-ouverte/igo2-quebec
   git checkout next
   ```
2. Assurez-vous que vos branches sélectionné de la lib et du projet sont compatibles
3. Dans une fenêtre terminal, rouler la commande `npm i` pour installer les dépendances.
4. Assurez vous que l'installation n'a pas créé de dossier `node_modules` dans les répertoires de projets `projects/PROJECT_NAME`. S'il existe, supprimer le ou du moins le dossier `@igo2/sdg`.
5. Excéuter le build pour la librairie `npm run build -w @igo2/sdg`
6. Dans VsCode, vous pouvez lancer le processus à partir du panneau `Run and Debug` pour bénéficier des breakpoints sinon exécuter la commande (valider dans les scripts du projet) `npm run link-sdg.start -w PROJECT_NAME`

[git]: https://git-scm.com/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/
[semantic-release]: https://semantic-release.gitbook.io/semantic-release#how-does-it-work
