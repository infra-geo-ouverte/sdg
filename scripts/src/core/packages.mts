import { $ } from 'execa';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { BehaviorSubject, combineLatest, first, firstValueFrom } from 'rxjs';

import { writeFile2 } from '../utils/file-system.utils.mts';
import * as log from '../utils/log.mts';
import { PATHS, getPackageJson } from './paths.mts';
import { RELEASE_TAGS } from './release.interface.mts';

export type PackageName =
  | 'auth'
  | 'common'
  | 'context'
  | 'core'
  | 'geo'
  | 'integration'
  | 'utils';

export interface PackageOptions {
  dependsOn: PackageName[];
  observer: BehaviorSubject<boolean>;
}

export type PackageTopologies = Map<PackageName, PackageOptions>;

/**
 *
 * @param scope This is the npm scope of the library, ex: '@igo2/core' the scope is '@igo2'
 * @returns
 */
export function getPackagesTopologies(scope: string): PackageTopologies {
  const packageFolders = readdirSync(PATHS.packages) as PackageName[];
  const packageTopologies: PackageTopologies = new Map();

  packageFolders.forEach((folder) => {
    if (!folder) {
      return;
    }

    const packageJson = getPackageJson('packages', folder);
    const igoDependencies = Object.keys({
      ...packageJson.peerDependencies,
      ...packageJson.dependencies
    })
      .filter((key) => key.includes(scope))
      .map((key) => key.split('/')[1]) as PackageName[];

    packageTopologies.set(folder, {
      dependsOn: igoDependencies,
      observer: new BehaviorSubject(false)
    });
  });
  return packageTopologies;
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
  name: PackageName,
  version: string
): Promise<void> {
  const tag = RELEASE_TAGS.find((tag) => version.includes(tag));

  let command = `npm publish dist/${name} --provenance --access public`;

  if (tag) {
    command += ` --tag ${tag}`;
  }
  log.info(command);

  await $({ stdio: 'inherit' })`${command}`;

  log.success(`Published @igo2/${name} version ${version}`);
}
