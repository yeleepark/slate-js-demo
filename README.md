## Slate Editor Demo

Rich-text playground built with Next.js 14, Slate.js, Tailwind CSS, and TypeScript.

### Development

```bash
yarn install
yarn dev
```

### Static Build (GitHub Pages)

```bash
yarn build   # `next build` + docs sync
```

- Next.js writes the export to `out/` and then copies everything to `docs/`, adding a `.nojekyll` file so GitHub Pages skips the Jekyll pipeline.
- If the site will live under `https://yourname.github.io/<repo>`, set `NEXT_PUBLIC_REPO_BASE=<repo>` before running the build so all asset URLs resolve correctly.

### Scripts

| Script          | Description                               |
| --------------- | ----------------------------------------- |
| `yarn dev`      | Start local dev server                    |
| `yarn build`    | Production build then syncs `out/` → `docs/` |
| `yarn export`   | Same as `yarn build` (useful for CI)      |
| `yarn lint`     | ESLint check                              |
| `yarn format`   | Prettier write                            |
| `yarn format:check` | Prettier check                        |

### Deployment to GitHub Pages

1. `yarn build`
2. Commit and push the generated `docs/` folder (contains `.nojekyll`).
3. In repository settings → Pages, choose the `main` branch and `/docs` folder as the source.

This project relies entirely on static rendering and client-side interactivity, so no Node.js server is required in production.
