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
- 기본 베이스 경로는 `/slate-js-demo`로 설정되어 있으므로 `https://<username>.github.io/slate-js-demo/`에 바로 배포할 수 있습니다. 다른 경로로 배포하려면 `NEXT_PUBLIC_BASE_PATH=<다른-경로>`를 지정한 뒤 빌드하세요.

### Scripts

| Script          | Description                               |
| --------------- | ----------------------------------------- |
| `yarn dev`      | Start local dev server                    |
| `yarn build`    | Production build then syncs `out/` → `docs/` |
| `yarn build:gh` | Same as `yarn build` with `NEXT_PUBLIC_BASE_PATH=/slate-js-demo` |
| `yarn lint`     | ESLint check                              |
| `yarn format`   | Prettier write                            |
| `yarn format:check` | Prettier check                        |

### Deployment to GitHub Pages

1. `yarn build`
2. 생성된 `docs/` 폴더를 Pages 배포 전용 브랜치(예: `gh-pages`)로 푸시하거나, GitHub Actions로 업로드합니다. (기본 브랜치에는 커밋하지 않아도 됩니다.)
3. Repository settings → Pages에서 해당 브랜치와 `/docs` 폴더(또는 root)를 소스로 지정합니다.
4. 다른 리포지토리 이름이나 커스텀 경로에 배포하고 싶다면 빌드 전에 `NEXT_PUBLIC_BASE_PATH` 환경 변수를 원하는 경로로 설정하세요.

This project relies entirely on static rendering and client-side interactivity, so no Node.js server is required in production.
