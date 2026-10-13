# hackTAMS 2027

The hackTAMS event site, built with Next.js (Pages Router), React and Tailwind CSS. The jungle backgrounds, duck illustrations, Nunito typeface and olive/brown palette carry forward the existing visual identity.

This repository is [AnshVKapadia/hackTAMS2027](https://github.com/AnshVKapadia/hackTAMS2027), a fork of the previous event repository. Submit changes to this fork.

## Local development

Use the latest Node.js 22 maintenance release (at least 22.20.0) and npm 10.9.3. With nvm, run `nvm install` and `nvm use`.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Use npm and `package-lock.json` as the authoritative dependency manager. The historical `yarn.lock` is retained because it contained a pre-existing local change; it is not maintained or used for deployment.

```bash
npm run lint
npm test
npm run build
npm start
```

The build creates a static site in `out/` and regenerates `public/social-card.png` from the event configuration. `npm start` serves the exported site on localhost:3000; it requires a completed build. Set `PORT` to use another port.

For layout, keyboard and automated accessibility checks, install Google Chrome, build the site and run:

```bash
npm run test:browser
```

Alternatively set `CHROME_PATH` to a Chromium-based browser executable. The check starts and stops its own local preview server. Screenshots and results are written to ignored `artifacts/`. It checks widths of 320, 390, 768, 976 and 1440 pixels, FAQ keyboard controls, mobile navigation, broken assets/anchors, outdated visible claims and WCAG A/AA rules through axe. Automated checks complement visual and organizer review.

## Annual content updates

Edit **`data/event.mjs`**. Page sections, FAQ answers, titles, descriptions and the generated sharing image use this file.

- Set the year, event date, location and registration deadline after organizer approval. Keep unknown values as “To be announced”.
- Keep registration `status: 'closed'` and `url: null` until a new form is ready. To open it, set `status: 'open'` and a confirmed HTTPS URL together. Remove the form again when resetting for the next year.
- Confirm schedule/check-in rules, eligibility and consent requirements, costs, packing guidance and team rules under `logistics`. Do not assume previous policies or benefits still apply.
- Update the workshop/activity descriptions in `program`; speaker details come from `speakers`. Add only confirmed entries to `tracks.items`, `prizes.items` and `speakers.items`: `{ id, name, description }`. IDs must be unique within each list.
- Add confirmed sponsors/partners as `{ id, name, url }` in their respective `items` lists. Update their section descriptions after confirmation.
- Confirm the code-of-conduct URL, contact email, social channels, project-submission and donation links. Leave unconfirmed links as `null`. A code-of-conduct link or logo must not imply an unconfirmed affiliation.
- Confirm the public origin in `siteUrl`, or set `NEXT_PUBLIC_SITE_URL` at build time. Use an origin such as `https://example.com`, without paths or query parameters. When unset, canonical URLs and absolute sharing-image URLs are omitted. Sharing titles and descriptions still work; a full image preview needs the confirmed URL.
- Rebuild after configuration/environment changes. Inspect the sharing image and mobile/desktop screenshots; do not copy old badges, sponsor commitments, prize lists, merchandise promises or registration forms.

The old community collage has a historical filename and is explicitly captioned as a look back. Unused illustration and logo assets in `public/` are retained as source material, not displayed as current sponsorships. Annual content lives in the configuration, not in image filenames.

## Netlify deployment

The repository includes `netlify.toml`. For a future deployment, connect **this fork** and use:

| Setting | Value |
| --- | --- |
| Base directory | Repository root (leave blank) |
| Build command | `npm run lint && npm test && npm run build` |
| Publish directory | `out` |
| Node.js | Latest Node.js 22 (`NODE_VERSION=22`, also in `.nvmrc`) |
| npm | `10.9.3` |
| Next.js runtime plugin | Skip: `NETLIFY_NEXT_PLUGIN_SKIP=true` |
| Package manager | npm: `NETLIFY_USE_YARN=false` |
| Optional public URL | `NEXT_PUBLIC_SITE_URL`, set only after confirmation |

`NETLIFY_USE_YARN` remains supported by Netlify but is deprecated; it is set explicitly to prevent the retained historical Yarn lockfile from selecting Yarn. The site uses Next.js `output: 'export'`, local fonts and unoptimized local images. It needs no API routes, image-optimization server, functions or SPA fallback rewrite. Keep dev dependencies available during the build. The publish directory is **not** `.next`.

Do not use `next export` or `next start` for this configuration. If server features become necessary later, review the hosting strategy and Netlify adapter settings first. See the [Next.js static-export guide](https://nextjs.org/docs/pages/guides/static-exports) and [Netlify dependency settings](https://docs.netlify.com/build/configure-builds/manage-dependencies/).

Review the pull request before merging. Connecting a repository can trigger deployment automatically; organizers must approve production publishing and domain/DNS changes separately.

## Dependency maintenance

See [the dependency review](docs/dependency-review.md) for the baseline advisories, upgrade decisions and compatibility changes. Run `npm audit` with network access after dependency updates; a cached/offline result is not a security verification. Review recommended changes before installing them, commit the resulting npm lockfile, and rerun lint, tests, the production build and browser checks. Do not run `npm audit fix --force` without reviewing the proposed major-version changes.

## Organizer input still needed

Date, venue, registration form and deadline, attendance/check-in policy, eligibility/consent rules, costs and included benefits, team rules, tracks, workshops, speakers, activities, prizes, sponsors, partners, contact/social channels, code of conduct, donation/submission links and the public site URL remain unconfirmed. The site uses placeholders and does not make commitments about these details.
