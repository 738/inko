# Releasing Inko

Use a supported Node.js release (22 or newer) and npm. The npm package is `inko`; only an authorized package maintainer can publish it.

1. Update the version in `package.json`, `bower.json`, and `Inko.prototype.VERSION` in `index.js`. Run `npm install --package-lock-only --ignore-scripts` to sync the lockfile and update the CDN version and changelog.
2. Run `npm ci --ignore-scripts`, `npm run verify`, and `npm audit`. Review the generated `inko.min.js` and source map with the source changes.
3. Merge the reviewed PR after CI passes. Start from a clean, current `master` checkout.
4. Check `npm view inko version` and `npm whoami`. Run `npm login` as a package maintainer if necessary; complete any required authentication in your own browser.
5. Run `npm publish --access public`. The `prepublishOnly` hook verifies the package before publication, and `prepack` rebuilds the browser bundle.
6. Confirm the published version with `npm view inko version`, fetch it with `npm pack inko@<version>`, and run `node scripts/check-package.cjs <downloaded-tarball>` against that exact published artifact.
7. Create the matching Git tag and GitHub release from the verified commit. Close resolved user issues only after the npm release is available; include the version in the release notes. Dependency PRs superseded by the merged toolchain update can be closed after the merge.

GitHub access and npm publishing access are separate. A GitHub merge alone does not update the npm package. If authentication blocks publishing, leave the npm release and user issue closures pending.
