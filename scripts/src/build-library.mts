import { $ } from 'execa';
import { rm } from 'fs/promises';

import {
  getPackagesTopologies,
  waitOnPackageRelations
} from './core/packages.mts';
import { PATHS } from './core/paths.mts';
import { executor } from './utils/executor.mts';
import { pathExist } from './utils/file-system.utils.mts';
import * as log from './utils/log.mts';

executor('Build librairies', async () => {
  if (pathExist(PATHS.dist)) {
    log.info('Deleting dist folder...');
    await rm(PATHS.dist, { recursive: true });
  }

  const topologies = getPackagesTopologies();
  const promises = Array.from(topologies).map(
    async ([name, { dependsOn, observer }]) => {
      if (dependsOn) {
        await waitOnPackageRelations(dependsOn, topologies);
      }

      await $({ stdio: 'inherit' })`npm run build -w @igo2/sdg-${name}`;

      observer.next(true);
    }
  );

  await Promise.all(promises);
});
