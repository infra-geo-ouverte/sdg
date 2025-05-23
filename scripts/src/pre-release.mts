import { $ } from 'execa';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { PATHS, getPackageJson, resolvePackage } from './core/paths.mts';
import { executor } from './utils/executor.mts';
import { writeFile2 } from './utils/file-system.utils.mts';
import * as log from './utils/log.mts';

executor('Library Pre-release', async () => {
  const [_nodePath, _scriptPath, argVersion] = process.argv;
  const version = argVersion ?? process.env.npm_new_version;

  log.info('Propagating the version to sub-packages');
  const folders = readdirSync(PATHS.packages);
  for (const folder of folders) {
    await setPackageVersion(folder, version);
  }

  // Regenerate the package-lock.json with the latest version
  await $({ stdio: 'inherit' })`npm i --package-lock-only --no-audit`;

  log.info('Build the lib');
  await $({ stdio: 'inherit' })`npm run build.libs`;

  log.info(`Setting @igo2/sdg-xxx distribution versions to ${version}`);
  for (const folder of folders) {
    await setDistributionVersion(folder, version, '@igo2/sdg-');
  }

  log.info('Pre-release complete');
});

async function setPackageVersion(name: string, version: string): Promise<void> {
  const packageJSON = getPackageJson('packages', name);
  packageJSON.version = version;
  await writeFile2(resolvePackage(name, 'package.json'), packageJSON);
  log.success(`Write version ${version} to packages/${name}/package.json`);
}

/**
 * Permet de changer la version du package et remplacer les dépendendances génériques de "@igo2/*"
 */
export async function setDistributionVersion(
  folder: string,
  version: string,
  scope = '@igo2'
): Promise<void> {
  const packageJSON = getPackageJson('dist', folder);
  packageJSON.version = version;

  Object.keys(packageJSON.peerDependencies).forEach((key) => {
    if (key.includes(scope)) {
      packageJSON.peerDependencies[key] = `^${version}`;
    }
  });

  await writeFile2(resolve(PATHS.dist, folder, 'package.json'), packageJSON);
  log.success(
    `Write version ${version} and @igo2 peerDependencies to dist/${folder}/package.json`
  );
}
