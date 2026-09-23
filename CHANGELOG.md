# Changelog

## 1.1.2

### Fixes

- Ship the corrected `index.js` package entry point so bundlers and Vitest can resolve the package (#44; includes the previously merged #36 fix).
- Ship the standalone compound-consonant fixes from #30 and #32, including `ㅁㄴㅇㄻㄴㅇㄹ` → `asdfasdf` (#26).
- Preserve instance context when `ko2en` or `en2ko` is destructured or passed as a callback (#39).
- Return an Inko instance when called without `new`, as shown in an older README example.
- Match TypeScript declarations to the CommonJS runtime while retaining default imports with interop and the `InkoOption` type.
- Initialize the Web Worker global explicitly so strict-mode scripts work.
- Render example output as text rather than HTML.

### Packaging and maintenance

- Remove the runtime Mocha dependency present in npm 1.1.1 (#29). The installed library has no dependencies.
- Replace the obsolete Gulp/Babel toolchain with Node's test runner and a direct Terser build. Refresh the development lockfile and remove the obsolete Yarn lockfile.
- Supersede dependency PRs #31, #33, #34, #35, #37, #40, #41, #42, and #43: all affected dependencies are removed except Terser, which is updated to 5.x.
- Rebuild the browser bundle and source map from the same source as the Node package.
- Test the packed artifact, all 11,172 modern Hangul syllables, and Node.js 22, 24, and 26 in CI.
- Limit published files to the runtime, types, browser bundle, source map, and documentation.

Three-set keyboard support (#11) and contextual `www.` correction (#23) remain open feature requests. The default two-set mapping is unchanged.

## 1.1.1 — 2019-07-31

- Update the project website and npm badges.
