import { $ } from 'execa';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { BehaviorSubject, combineLatest, first, firstValueFrom } from 'rxjs';

import { writeFile2 } from '../utils/file-system.utils.mts';
import * as log from '../utils/log.mts';
import { PATHS, getPackageJson } from './paths.mts';
import { RELEASE_TAGS } from './release.interface.mts';

export type PackageName = 'common' | 'core' | 'geo' | 'sdg';

export interface PackageOptions {
  dependsOn: PackageName[];
  observer: BehaviorSubject<boolean>;
}

export type PackageTopologies = Map<PackageName, PackageOptions>;

/**
 *
 * @param scope This is the npm scope of the library, ex: '@igo2/sdg-core' the scope is '@igo2'
 * @returns
 */
export function getPackagesTopologies(scope = '@igo2/sdg-'): PackageTopologies {
  const folders = readdirSync(PATHS.packages) as PackageName[];
  const topologies: PackageTopologies = new Map();

  folders.forEach((folder) => {
    if (!folder) {
      return;
    }

    const packageJson = getPackageJson('packages', folder);
    const igoDependencies = Object.keys({
      ...packageJson.peerDependencies,
      ...packageJson.dependencies
    })
      .filter((key) => key.includes(scope))
      .map((key) => {
        return key.split('/sdg-')[1];
      }) as PackageName[];

    topologies.set(folder, {
      dependsOn: igoDependencies,
      observer: new BehaviorSubject(false)
    });
  });
  return topologies;
}

export async function waitOnPackageRelations(
  relations: PackageName[],
  topologies: PackageTopologies
): Promise<boolean> {
  const observers = relations.map((relation) =>
    topologies.get(relation)!.observer.pipe(first((value) => value === true))
  );

  if (observers.length) {
    await firstValueFrom(combineLatest(observers));
  }

  return true;
}

export function cleanPackageExports(name: string): Promise<void> {
  const packageJSON = getPackageJson('dist', name);
  const exports = packageJSON.exports;
  Object.keys(exports).forEach((key) => {
    const config = exports[key];

    if (config && typeof config === 'object' && config?.['import']) {
      delete config.import;
      exports[key] = config;
    }
  });
  return writeFile2(resolve(PATHS.dist, name, 'package.json'), packageJSON);
}

export async function publishPackage(
  name: string,
  version: string
): Promise<void> {
  const tag = RELEASE_TAGS.find((tag) => version.includes(tag));

  let command = `npm publish --provenance --access public`;

  if (tag) {
    command += ` --tag ${tag}`;
  }
  log.info(command);

  // shell true is mandotary to publish on Github Actions
  await $({ stdio: 'inherit', shell: true, cwd: `dist/${name}` })`${command}`;

  log.success(`Published @igo2/sdg-${name} version ${version}`);
}
