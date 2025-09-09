import { compileBootstrapLayout } from './compile-bootstrap-layout.mts';
import { cleanPackageExports } from './core/packages.mts';
import { resolveDist, resolvePackage } from './core/paths.mts';
import { executor } from './utils/executor.mts';
import { createFile } from './utils/file-system.utils.mts';
import * as log from './utils/log.mts';
import { getDuration } from './utils/performance.utils.mts';

/**
 * Remove any Typescript references from the distribution in the package.json
 * Example of removed reference in the exports:
 * ".": {
      "import": "./src/public-api.ts"
    },
 */
executor('Cleaning package.json exports', async () => {
  const [_nodePath, _scriptPath, name] = process.argv;
  await compileBaseStyle();
  await cleanPackageExports(name);
});

async function compileBaseStyle(): Promise<void> {
  const startTime = performance.now();
  const baseUrl = 'src/layout';
  const input = resolvePackage('core', baseUrl, 'bootstrap-layout.scss');
  const output = resolveDist('core', baseUrl);
  const result = await compileBootstrapLayout(input);

  await createFile(
    'bootstrap-layout.scss',
    output,
    `/** Auto-compiled file **/ \n ${result}`
  );

  const duration = getDuration(startTime);
  log.success(`✔ Compile base style in ${duration}`);
}
