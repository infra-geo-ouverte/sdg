import { readdirSync } from 'node:fs';

import { PackageName, publishPackage } from './core/packages.mts';
import { PATHS } from './core/paths.mts';
import { executor } from './utils/executor.mts';
import * as log from './utils/log.mts';

executor('Library publishing', async () => {
  try {
    const [_nodePath, _scriptPath, argVersion, type] = process.argv;
    const version = argVersion ?? process.env.npm_new_version;

    const folders = readdirSync(PATHS.packages);
    for (const name of folders) {
      log.info(`Start publishing @igo2/sdg-${name}@${version}`);
      await publishPackage(name as PackageName, version);
      log.success(`@igo2/sdg-${name}@${version} was published successfully`);
    }
    log.info(`Published ${type} release version ${version}`);
  } catch (err: any) {
    log.error(`The automated release failed with: ${err?.message}`);
    process.exit(1);
  }
});
