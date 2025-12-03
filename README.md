## Slate Editor Demo

### ✨ 주요 기능
- **문단/제목/목록/코드 블록/인용문** 등 기본 블록 서식
- **굵게/기울임/밑줄/인라인 코드** 등 텍스트 마크
- **정렬 도구**: 좌·중앙·우측 정렬 지원
- **하이퍼링크 삽입/해제**
- **이미지 삽입**: URL·대체 텍스트·캡션 입력 가능
- **YouTube 영상 임베드**: 링크를 입력하면 반응형 플레이어로 삽입
- **표 삽입**: 행·열 개수 지정
- **구분선(Divider) 추가**
- **실행 취소/다시 실행**: `slate-history` 기반
- **키보드 단축키**: `Ctrl/Cmd + B/I/U/\`` 등

### 🛠 기술 환경
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Editor Core**: Slate.js (`slate`, `slate-react`, `slate-history`, `slate-dom`)
- **UI & 스타일**: React 18, Tailwind CSS, 커스텀 CSS
- **언어 & 도구**: TypeScript, ESLint(`next/core-web-vitals` + `@typescript-eslint`), Prettier
- **패키지 매니저**: Yarn Berry (node-modules linker)
- **정적 배포**: `output: 'export'` + GitHub Pages (`docs/` + `.nojekyll`)
