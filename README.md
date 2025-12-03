## Slate Editor Demo

Rich-text playground built with Next.js 14, Slate.js, Tailwind CSS, and TypeScript.

### Development

```bash
yarn install
yarn dev
```

### Static Build (GitHub Pages)

```bash
yarn build   # `next build` with output: 'export'
```

- The static site will be generated in the `out/` directory, ready to upload to GitHub Pages.
- If the site will live under `https://yourname.github.io/<repo>`, set `NEXT_PUBLIC_REPO_BASE=<repo>` before running `yarn build` to ensure the correct basePath/assetPrefix.

### Scripts

| Script          | Description                               |
| --------------- | ----------------------------------------- |
| `yarn dev`      | Start local dev server                    |
| `yarn build`    | Production build (writes `out/` via `output: 'export'`) |
| `yarn export`   | Alias for `yarn build`                    |
| `yarn lint`     | ESLint check                              |
| `yarn format`   | Prettier write                            |
| `yarn format:check` | Prettier check                        |

### Deployment to GitHub Pages

1. `yarn build`
2. Upload the `out/` folder contents to your `gh-pages` branch (or use a GitHub Action to do so).
3. Enable GitHub Pages for that branch/folder.

This project relies entirely on static rendering and client-side interactivity, so no Node.js server is required in production.
