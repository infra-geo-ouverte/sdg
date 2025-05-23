/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    { name: 'next', prerelease: 'next' }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    // Only update the package.json
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/exec',
      {
        // The prepareCmd is important because the files will be include in the commit and
        // we bump the version in the "packages" package.json.
        prepareCmd:
          'node --import tsx scripts/src/pre-release.mts ${nextRelease.version}',
        publishCmd:
          'node --import tsx scripts/src/publish.mts ${nextRelease.version} ${nextRelease.type}'
      }
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['packages/**/*.*', 'package.json', 'package-lock.json']
      }
    ]
  ]
};
