# Dependency review

Reviewed on October 12, 2026, against the live npm registry.

## Baseline

The checkout used Next.js 12.2.3, React 18.2.0, Tailwind 3.1.6 and ESLint 8.20.0. The existing production build passed, with a missing image-alt warning and stale Browserslist data.

A live `npm install` / `npm audit` reported **23 vulnerable packages: 9 moderate, 13 high, 1 critical**. An earlier sandboxed/offline audit reported zero and was discarded as unreliable.

| Affected packages | Reported issues |
| --- | --- |
| next | Authorization bypass (including [GHSA-f82v-jwr5-mffw](https://github.com/advisories/GHSA-f82v-jwr5-mffw)), image-processing RCE, denial of service, cache poisoning, SSRF, request smuggling and content injection |
| postcss, postcss-selector-parser, postcss-nested, tailwindcss | CSS parsing/stringification problems, source-map file disclosure, selector complexity and inherited vulnerable parsers |
| @babel/runtime, @babel/runtime-corejs3, cross-spawn, semver, word-wrap | Regular-expression denial of service |
| brace-expansion, braces, micromatch, minimatch, picomatch | Resource exhaustion, unsafe pattern handling, recursion and regular-expression denial of service |
| ajv, browserslist, source-map-js, yaml | Resource exhaustion and parser failures |
| flatted, js-yaml, json5 | Prototype pollution and parser/resource-exhaustion issues |
| nanoid | Predictability, looping and integer-handling flaws |

These are dependency advisories, not proof that every issue was exploitable by this static homepage. The old Next.js version is nevertheless [unsupported](https://nextjs.org/support-policy). Updating within the old major would not address the full audit.

## Upgrade decisions and breaking changes

- **Next.js 16.4.0 / React 19.3.0:** retain the Pages Router and React components. Next.js 16 requires Node.js 20.9+ and modern browsers; this project selects Node.js 22. Removed the obsolete `swcMinify` option. Modern `next/image` sizing is controlled by explicit responsive CSS. There are no App Router/server-action/request-API migrations in this site.
- **Static export:** `output: 'export'` emits `out/`. The unused example API route is removed; API routes and server rendering are incompatible with this deployment. Local images use `unoptimized: true`, so no image server is required. `npm start` now previews the export instead of running `next start`.
- **Tailwind 4.3.3:** a first attempt to keep Tailwind 3.4.19 left an unpatched `braces` advisory and vulnerable selector-parser paths. Migrated to `@tailwindcss/postcss`, a CSS import plus explicit legacy configuration loading, and removed Autoprefixer. Preserve the existing 480/768/976/1440 breakpoints and palette. Tailwind 4 targets Safari 16.4+, Chrome 111+ and Firefox 128+; older browsers need a separately reviewed compatibility strategy. See the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide).
- **ESLint 10.12.0:** both ESLint 8 and 9 are [end of life](https://eslint.org/version-support/). Use flat config, `@eslint/js`, maintained `@eslint-react/eslint-plugin` and React Hooks rules. Removed the older Next preset, whose React plugins do not declare ESLint 10 support and whose glob dependency retained an unpatched advisory. Next.js 16 removes `next lint` and build-time linting, so lint runs explicitly in the Netlify build command. Axe browser checks cover alt text and accessibility alongside code linting.
- **Unused dependencies:** remove Flowbite and hamburger-react. A native button replaces the hamburger dependency; native details/summary controls replace mutating FAQ state.
- **Local font and sharing image:** bundle Nunito using `@fontsource/nunito`. Sharp generates a small PNG sharing card from the annual data on each build. Fonts do not require a Google Fonts request.

Development and builds explicitly select the supported Webpack bundler. Turbopack rejected the repository's existing uppercase `.PNG` imports; Webpack preserves those artwork paths. See the [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16).

## Verification

- Live clean install and full npm audit: **0 vulnerabilities**; no forced fixes or peer-dependency overrides.
- Lint: passes with zero warnings.
- Content tests: four pass, covering configuration IDs, safe links, closed registration and public-origin validation.
- Production build: passes and exports the homepage and 404 page to `out/`.
- Headless Chrome: checks pass at 320, 390, 768, 976 and 1440 pixels, including FAQ/menu keyboard controls, metadata, assets, anchors and fixed-header visibility. No horizontal overflow, runtime errors, failed requests or automated WCAG A/AA violations. Desktop/mobile screenshots were visually inspected.
- Content search: no obsolete event details or links in active page copy. The historical collage filename remains and is explicitly captioned as a previous event; unused archived logo assets are not sponsor claims.

Live npm audits must be repeated as advisories and registry versions change. Automated accessibility checks do not replace human review or test every browser.
