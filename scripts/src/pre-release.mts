import { readdirSync } from 'node:fs';

import { PATHS, getPackageJson, resolvePackage } from './core/paths.mts';
import { executor } from './utils/executor.mts';
import { writeFile2 } from './utils/file-system.utils.mts';
import * as log from './utils/log.mts';

executor('Library Prepublish', async () => {
  const [_nodePath, _scriptPath, argVersion] = process.argv;
  const version = argVersion ?? process.env.npm_new_version;
  const packageFolders = readdirSync(PATHS.packages);

  log.info('Propagating the version to sub-packages');

  // Read all package.json files in parallel and bump the version
  const packageVersionPromises = packageFolders.map(async (folder) => {
    await setPackageVersion(folder, version);
  });

  // Wait for all package.json updates to complete
  await Promise.all(packageVersionPromises);

  log.info('Version update complete');
});

async function setPackageVersion(name: string, version: string): Promise<void> {
  const packageJSON = getPackageJson('packages', name);
  packageJSON.version = version;
  await writeFile2(resolvePackage(name, 'package.json'), packageJSON);
  log.success(`Write version ${version} to packages/${name}/package.json`);
}
