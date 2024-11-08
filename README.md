[Issues](https://github.com/infra-geo-ouverte/sdg/issues)

# Libairie du Système de design gouvernemental du Québec (SDG) de IGO pour Angular

## Présentation

La libairie du [Système de design gouvernemental du Québec (SDG)](https://design.quebec.ca/) de IGO dont l'objectif est d'offrir une suite de composante Angular basé sur le système de design gouvernemental. Il offre aussi un assemblage cartographique pour faciliter l'intégration de carte tout en utilisant les techniques de IGO [IGO2-LIB](https://github.com/infra-geo-ouverte/igo2-lib).

## Contenu

| Section                                   | Description                                     |
| ----------------------------------------- | ----------------------------------------------- |
| [🚧 Requis](#-requis)                     | Dépendances requises                            |
| [🚀 Config du projet](#-config-du-projet) | Comment configurer le projet                    |
| [📜 Commandes](#-commandes)               | Commandes npm disponible                        |
| [🌎 Contribution](#-contribution)         | Explication minimale du flow de développement   |
| [🧰 Dépannage](#-dépannage)               | Liste des problèmes possible avec les solutions |

## 🚧 Requis

- [Git]
- [Node.js] qui inclus le [Node Package Manager][npm]
- Extensions: Eslint, Prettier, Angular Language Service dans votre IDE 

## 🚀 Config dans un projet

Installer la librairie:
```
npm install @igo2/sdg --save
```

La majorité des composantes sont accessible au premier niveau d'importation:
```
import { YOUR_IMPORT_NAME } from "@igo2/sdg"
```

Pour le volet cartographique, l'importation se fait via un sous-module:
```
import { YOUR_IMPORT_NAME } from "@igo2/sdg/geo"
```




## 📜 Commandes

| Commande | Description                                     |
| -------- | ----------------------------------------------- |
| `start`  | Lancer la démo                                  |
| `lint`   | Permet de valider la syntaxe du projet          |
| `format` | Corriger automatiquement les erreurs de syntaxe |
| `test`   | Permet de rouler la suite de test Karma         |

 <!-- @TODO | `start`                                         | Démarre la démo. Ce mode est utilisé pour le développement principalement | -->


## 🌎 Contribution

1. Prendre/assigner une sous-tâche Github en priorité avant une nouvelle story.
2. Mettre cette sous-tâche/story en « In Progress ».
3. Ensuite:
   1. Si nouvelle story, faire un kickoff technique avec le tech lead, l’architecte associé et désigneur si nécessaire.
   2. Pour une sous-tâche, simplement aviser la personne associée à la story liée.
4. Faire ce qui est demandé dans la story/sous-tâche.
5. Créer une PR sur Github avec une description la plus claire possible avec des screenshots/vidéos si changement visuel.
6. Mettre la story/sous-tâche en « Code review ».
7. Une fois approuvé, merger la PR. Si la tâche faite est une sous-tâche, simplement la mettre à « Done » sinon mettre la story à « QA ».
8. Si nouvelle story, faire la validation sur la DEV de ce qui a été fait et mettre en « In Review ».

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
