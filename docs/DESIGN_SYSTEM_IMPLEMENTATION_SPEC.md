# DDoni Design System 구현 명세서

> 이 문서는 사람에게 개념을 설명하는 소개서가 아니라, **Codex가 저장소를 실제로 생성·수정·검증할 수 있도록 작성된 실행 명세서**다.

- 문서 상태: 구현 기준 문서
- 기준일: 2026-08-10
- 언어: 한국어
- 패키지 매니저: npm
- 저장소 형태: npm workspaces 모노레포
- 기본 npm scope: `@ddoni-ds`
- CSS Custom Property prefix: `--dds-`
- 테마 속성: `data-dds-theme`
- 초기 패키지 버전: `0.1.0`

---

## 0. Codex가 이 문서를 사용하는 방법

### 0.1 우선순위

요구사항이 충돌할 경우 아래 순서로 판단한다.

1. 현재 사용자의 직접 지시
2. 루트 `AGENTS.md`
3. 이 문서의 고정 결정 및 인수 조건
4. 현재 저장소의 기존 구현과 관례
5. 각 라이브러리의 현재 공식 문서

### 0.2 기본 실행 방식

- 사용자가 특정 Phase를 지정하면 해당 Phase만 구현한다.
- 사용자가 Phase를 지정하지 않으면 가장 앞의 미완료 Phase 하나만 구현한다.
- 사용자가 전체 구현을 명시하면 Phase 0부터 순서대로 진행하되, 각 Phase의 검증을 통과한 뒤 다음 Phase로 이동한다.
- 각 Phase 종료 시 `docs/IMPLEMENTATION_STATUS.md`를 갱신한다.
- 명세와 현재 라이브러리 API가 충돌하면 현재 stable 공식 API를 따르되, 결과가 이 문서의 공개 계약을 만족해야 한다.
- npm publish는 사용자가 별도로 지시하기 전까지 실행하지 않는다.

### 0.3 완료 보고에 사용할 요구사항 ID

| 영역 | 접두어 |
|---|---|
| 저장소 및 도구 | `ARCH-*` |
| 토큰 및 테마 | `TOK-*` |
| Sass/CSS | `STYLE-*` |
| UI 공개 API | `UI-*` |
| 컴포넌트 | `CMP-*` |
| Tailwind 연동 | `TW-*` |
| Storybook | `SB-*` |
| 테스트/접근성 | `QA-*` |
| 빌드/배포 | `REL-*` |

---

# 1. 프로젝트 목표

## 1.1 핵심 목표

하나의 React 디자인 시스템을 여러 프로젝트에서 재사용하되, 프로젝트별 브랜드·색상·radius·타이포그래피는 CSS 변수 오버라이드만으로 변경할 수 있어야 한다.

```text
SCSS 소스
  ↓ 빌드
CSS Custom Properties + Component CSS
  ↓
React 프로젝트 / 일반 CSS 프로젝트 / Tailwind CSS 프로젝트
```

## 1.2 성공 조건

- 동일한 `Button`, `Input`, `Dialog` 코드를 두 개 이상의 예제 앱에서 사용한다.
- 일반 Vite React 앱과 Tailwind CSS 앱 모두에서 소비 가능하다.
- 브랜드 색상과 control radius를 컴포넌트 소스 수정 없이 변경할 수 있다.
- light/dark 테마를 `data-dds-theme` 속성으로 전환할 수 있다.
- npm package tarball에 소스가 아니라 필요한 배포 산출물과 타입만 포함된다.
- Storybook에서 모든 공개 컴포넌트의 주요 상태를 확인할 수 있다.
- lint, typecheck, test, package build, Storybook build가 모두 통과한다.

## 1.3 비목표

초기 버전에서 아래 항목은 구현하지 않는다.

- DataGrid
- DatePicker 또는 Calendar
- Rich Text Editor
- Chart
- TreeView
- Drag and Drop 시스템
- 복합 Combobox
- 제품 도메인 전용 컴포넌트
- 모바일 네이티브 패키지
- Figma 플러그인 또는 자동 토큰 동기화
- Tailwind CSS v3 preset
- 자동 npm publish 파이프라인
- 시각 회귀 SaaS 연동

---

# 2. 고정 기술 결정

## ARCH-001 — 패키지 매니저

- npm만 사용한다.
- 루트에 단일 `package-lock.json`을 커밋한다.
- CI는 `npm install`이 아니라 `npm ci`를 사용한다.
- 의존성 추가는 가능하면 workspace를 명시한다.

```bash
npm install clsx -w @ddoni-ds/ui
npm install -D vitest
```

## ARCH-002 — 런타임 및 버전 정책

- Node.js 최소 버전은 `20.19.0`으로 설정한다.
- prerelease 의존성을 사용하지 않는다.
- 구현 시점의 최신 stable 호환 버전을 설치한다.
- `.npmrc`에 `save-exact=true`를 설정해 개발 의존성을 정확한 버전으로 기록한다.
- 라이브러리의 소비 범위는 `peerDependencies`에서 semver range로 표현한다.
- 루트 `package.json`의 `engines.node`는 `>=20.19.0`으로 둔다.
- `.nvmrc`는 CI와 로컬에서 사용할 안정적인 Node major를 기록한다. 기본값은 `22`다.

## ARCH-003 — 프레임워크와 빌드

- React + TypeScript
- Vite library mode
- ESM 및 CJS 산출물
- TypeScript declaration 산출물
- SCSS Modules
- CSS Custom Properties
- Radix Primitives
- Storybook React + Vite
- Vitest + Testing Library

## ARCH-004 — React 의존성

- `react`, `react-dom`은 루트 개발 환경과 예제 앱에 설치한다.
- `@ddoni-ds/ui`에서는 `dependencies`가 아니라 `peerDependencies`로 선언한다.
- UI 패키지는 React 18.2 이상과 React 19 계열에서 사용할 수 있는 API만 사용한다.
- React 18 호환을 위해 공개 DOM 컴포넌트의 ref 전달은 `forwardRef`를 사용한다.

## ARCH-005 — 스타일 경계

- SCSS는 디자인 시스템 내부 구현 도구다.
- CSS Custom Properties는 외부 소비자가 사용하는 공개 테마 API다.
- Tailwind CSS는 필수 의존성이 아니다.
- Sass 변수 또는 Sass map을 소비자 커스터마이징 계약으로 노출하지 않는다.
- 전역 reset을 자동 import하지 않는다.

## ARCH-006 — 패키지 이름

기본 이름은 아래와 같다.

```text
@ddoni-ds/tokens
@ddoni-ds/ui
@ddoni-ds/tailwind
```

`@ddoni-ds` scope를 실제 npm에서 사용할 수 없다면 **첫 publish 전에 한 번만** 전체 이름을 변경한다. 변경 시 package.json, imports, 문서, 예제, Storybook을 모두 원자적으로 수정한다.

---

# 3. 저장소 구조

## ARCH-010 — 최종 디렉터리 구조

```text
.
├─ AGENTS.md
├─ README.md
├─ package.json
├─ package-lock.json
├─ .npmrc
├─ .nvmrc
├─ .gitignore
├─ tsconfig.base.json
├─ eslint.config.mjs
├─ prettier.config.mjs
├─ vitest.config.ts
├─ vitest.setup.ts
│
├─ .storybook/
│  ├─ main.ts
│  ├─ preview.ts
│  └─ manager.ts                 # 필요할 때만
│
├─ .github/
│  └─ workflows/
│     └─ ci.yml
│
├─ docs/
│  ├─ DESIGN_SYSTEM_IMPLEMENTATION_SPEC.md
│  ├─ IMPLEMENTATION_STATUS.md
│  └─ decisions/
│     ├─ 0001-scss-css-variables.md
│     └─ 0002-tailwind-adapter.md
│
├─ packages/
│  ├─ tokens/
│  │  ├─ package.json
│  │  ├─ README.md
│  │  ├─ src/
│  │  │  ├─ index.scss
│  │  │  ├─ abstracts/
│  │  │  │  ├─ _primitive-colors.scss
│  │  │  │  ├─ _primitive-foundations.scss
│  │  │  │  ├─ _semantic-light.scss
│  │  │  │  ├─ _semantic-dark.scss
│  │  │  │  ├─ _component-tokens.scss
│  │  │  │  └─ _index.scss
│  │  │  └─ tools/
│  │  │     ├─ _emit-css-vars.scss
│  │  │     └─ _index.scss
│  │  └─ dist/                  # Git 제외
│  │
│  ├─ ui/
│  │  ├─ package.json
│  │  ├─ README.md
│  │  ├─ tsconfig.json
│  │  ├─ tsconfig.build.json
│  │  ├─ vite.config.ts
│  │  └─ src/
│  │     ├─ index.ts
│  │     ├─ styles/
│  │     │  ├─ _mixins.scss
│  │     │  ├─ _utilities.scss
│  │     │  └─ _index.scss
│  │     ├─ internal/
│  │     │  ├─ icons/
│  │     │  └─ VisuallyHidden.tsx
│  │     └─ components/
│  │        ├─ Button/
│  │        │  ├─ Button.tsx
│  │        │  ├─ Button.module.scss
│  │        │  ├─ Button.test.tsx
│  │        │  ├─ Button.stories.tsx
│  │        │  └─ index.ts
│  │        └─ ...
│  │
│  └─ tailwind/
│     ├─ package.json
│     ├─ README.md
│     └─ theme.css
│
└─ examples/
   ├─ react-vite/
   │  ├─ package.json
   │  └─ src/
   └─ tailwind-vite/
      ├─ package.json
      └─ src/
```

## ARCH-011 — 루트 workspaces

루트 `package.json`은 아래 workspace glob을 사용한다.

```json
{
  "private": true,
  "workspaces": ["packages/*", "examples/*"]
}
```

루트는 npm에 publish하지 않는다.

## ARCH-012 — 내부 패키지 의존 관계

```text
@ddoni-ds/tokens
      ↑
@ddoni-ds/ui

@ddoni-ds/tailwind  ── CSS 변수 이름만 참조
```

- `@ddoni-ds/ui`는 `@ddoni-ds/tokens`를 dependency로 선언한다.
- `@ddoni-ds/tailwind`는 런타임 JS 의존성이 없다.
- 예제 앱은 세 패키지를 실제 소비자처럼 package name으로 import한다.
- workspace 내부 package version은 모두 `0.1.0`으로 시작한다.

---

# 4. 루트 설정 및 명령

## ARCH-020 — `.npmrc`

```ini
save-exact=true
package-lock=true
fund=false
```

`legacy-peer-deps`, `force`, registry token은 기록하지 않는다.

## ARCH-021 — 루트 scripts 계약

실제 도구 버전에 맞게 세부 인자는 조정할 수 있지만, 아래 script 이름은 유지한다.

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "build:packages": "npm run build -w @ddoni-ds/tokens && npm run build -w @ddoni-ds/ui",
    "build:examples": "npm run build -w @ddoni-ds/example-react-vite && npm run build -w @ddoni-ds/example-tailwind-vite",
    "build": "npm run build:packages && npm run build:examples",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "npm run typecheck --workspaces --if-present",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "pack:check": "node scripts/check-packages.mjs",
    "check": "npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build && npm run build-storybook && npm run pack:check"
  }
}
```

`pack:check` 구현 시 생성 tarball은 임시 폴더에 두고 종료 후 제거한다.

## ARCH-022 — TypeScript 기본 설정

`tsconfig.base.json`은 최소 아래 옵션을 포함한다.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "noEmit": true
  }
}
```

- `@ddoni-ds/ui/tsconfig.build.json`은 declaration 생성용으로 별도 구성한다.
- 공개 API 타입 생성 시 `declaration`, `declarationMap`, `emitDeclarationOnly`를 사용한다.

## ARCH-023 — lint 및 format

- ESLint flat config를 사용한다.
- TypeScript, React Hooks, JSX accessibility 규칙을 활성화한다.
- Prettier와 충돌하는 formatting lint 규칙은 사용하지 않는다.
- lint 대상에서 `dist`, `storybook-static`, `coverage`, 임시 tarball을 제외한다.
- 공개 컴포넌트 파일에서 `console.log`를 남기지 않는다.

---

# 5. 디자인 토큰 시스템

## TOK-001 — 토큰 계층

토큰은 아래 세 계층으로 관리한다.

```text
Primitive Token
  ↓
Semantic Token
  ↓
Component Token
```

- Primitive: 실제 raw 값과 scale
- Semantic: 용도와 의미
- Component: 독립적으로 재정의할 필요가 있는 컴포넌트 계약

컴포넌트는 primitive token을 직접 사용하지 않는다. semantic 또는 component token만 사용한다.

## TOK-002 — public prefix

모든 공개 CSS 변수는 `--dds-`로 시작한다.

```css
--dds-color-neutral-900
--dds-color-text-primary
--dds-button-primary-bg
```

다른 prefix를 섞지 않는다.

## TOK-003 — primitive color 기본값

`packages/tokens/src/abstracts/_primitive-colors.scss`에 Sass map으로 정의한다.

### Neutral

| Token suffix | Value |
|---|---|
| `color-neutral-0` | `#ffffff` |
| `color-neutral-50` | `#f8fafc` |
| `color-neutral-100` | `#f1f5f9` |
| `color-neutral-200` | `#e2e8f0` |
| `color-neutral-300` | `#cbd5e1` |
| `color-neutral-400` | `#94a3b8` |
| `color-neutral-500` | `#64748b` |
| `color-neutral-600` | `#475569` |
| `color-neutral-700` | `#334155` |
| `color-neutral-800` | `#1e293b` |
| `color-neutral-900` | `#0f172a` |
| `color-neutral-950` | `#020617` |

### Brand

| Token suffix | Value |
|---|---|
| `color-brand-50` | `#eef2ff` |
| `color-brand-100` | `#e0e7ff` |
| `color-brand-200` | `#c7d2fe` |
| `color-brand-300` | `#a5b4fc` |
| `color-brand-400` | `#818cf8` |
| `color-brand-500` | `#6366f1` |
| `color-brand-600` | `#4f46e5` |
| `color-brand-700` | `#4338ca` |
| `color-brand-800` | `#3730a3` |
| `color-brand-900` | `#312e81` |
| `color-brand-950` | `#1e1b4b` |

### Status

Status palette는 각 색상의 `50`, `100`, `400`, `500`, `600`, `700`, `900` 단계를 제공한다.

- danger: red 계열
- success: emerald 계열
- warning: amber 계열
- info: sky 계열

Codex는 접근 가능한 기본 대비가 나오도록 널리 쓰이는 안정적인 palette 값을 사용하며, 모든 값은 한 Sass map에서 관리한다.

## TOK-004 — foundation scale

`_primitive-foundations.scss`에 아래 항목을 정의한다.

### Spacing

```text
0=0
1=4px
2=8px
3=12px
4=16px
5=20px
6=24px
8=32px
10=40px
12=48px
16=64px
20=80px
24=96px
```

CSS 변수 예시:

```css
--dds-space-4: 16px;
```

### Radius

```text
none=0
xs=2px
sm=4px
md=8px
lg=12px
xl=16px
full=9999px
```

### Typography

- font family: sans, mono (`sans`는 Pretendard 우선, platform fallback 포함)
- font size: xs, sm, md, lg, xl, 2xl, 3xl
- font weight: regular, medium, semibold, bold
- line height: tight, normal, relaxed
- letter spacing: tight, normal, wide

기본 본문은 `font-size-md = 16px`, `line-height-normal = 24px`다.

### Shadow

- `shadow-xs`
- `shadow-sm`
- `shadow-md`
- `shadow-lg`
- `shadow-overlay`

Shadow는 dark theme에서도 과도한 검은 그림자가 되지 않도록 semantic/component token으로 다시 연결한다.

### Motion

```text
duration-fast=120ms
duration-normal=180ms
duration-slow=240ms
ease-standard=cubic-bezier(0.2, 0, 0, 1)
ease-emphasized=cubic-bezier(0.2, 0, 0, 1.2)
```

`prefers-reduced-motion: reduce`에서는 장식성 animation과 transform transition을 제거하거나 즉시 완료한다.

### Z-index

```text
base=0
dropdown=1000
sticky=1100
overlay=1200
modal=1300
toast=1400
tooltip=1500
```

## TOK-005 — semantic light theme

최소 아래 공개 변수를 제공한다.

```css
--dds-color-bg-canvas
--dds-color-bg-surface
--dds-color-bg-surface-subtle
--dds-color-bg-surface-elevated
--dds-color-bg-inverse
--dds-color-bg-overlay

--dds-color-text-primary
--dds-color-text-secondary
--dds-color-text-tertiary
--dds-color-text-disabled
--dds-color-text-inverse
--dds-color-text-link

--dds-color-border-default
--dds-color-border-strong
--dds-color-border-focus
--dds-color-border-danger

--dds-color-action-primary-bg
--dds-color-action-primary-hover
--dds-color-action-primary-active
--dds-color-action-primary-text

--dds-color-action-neutral-bg
--dds-color-action-neutral-hover
--dds-color-action-neutral-active
--dds-color-action-neutral-text

--dds-color-action-danger-bg
--dds-color-action-danger-hover
--dds-color-action-danger-active
--dds-color-action-danger-text

--dds-color-status-success-bg
--dds-color-status-success-text
--dds-color-status-success-border
--dds-color-status-warning-bg
--dds-color-status-warning-text
--dds-color-status-warning-border
--dds-color-status-danger-bg
--dds-color-status-danger-text
--dds-color-status-danger-border
--dds-color-status-info-bg
--dds-color-status-info-text
--dds-color-status-info-border
```

Light theme 기본 연결:

- canvas → neutral-50
- surface/elevated → neutral-0
- surface-subtle → neutral-100
- primary text → neutral-900
- secondary text → neutral-600
- default border → neutral-200
- focus → brand-500
- primary action → brand-600/700/800
- neutral action → neutral-100/200/300
- danger action → danger-600/700/900

## TOK-006 — semantic dark theme

Dark theme에서는 primitive scale을 새로 만들지 않고 semantic mapping만 교체한다.

- canvas → neutral-950
- surface → neutral-900
- surface-subtle → neutral-800
- elevated → neutral-800 또는 시각적 구분이 가능한 값
- primary text → neutral-50
- secondary text → neutral-300
- default border → neutral-700
- focus → brand-400
- primary action → brand-500 중심
- overlay → light theme보다 높은 불투명도

Dark theme에서도 텍스트와 주요 control의 WCAG AA 대비를 목표로 한다.

## TOK-007 — component tokens

최소 아래 token을 제공한다.

```css
--dds-control-height-sm
--dds-control-height-md
--dds-control-height-lg
--dds-control-radius
--dds-control-border-width
--dds-focus-ring-width
--dds-focus-ring-offset

--dds-button-primary-bg
--dds-button-primary-hover
--dds-button-primary-active
--dds-button-primary-text
--dds-button-neutral-bg
--dds-button-neutral-hover
--dds-button-neutral-active
--dds-button-neutral-text
--dds-button-danger-bg
--dds-button-danger-hover
--dds-button-danger-active
--dds-button-danger-text

--dds-input-bg
--dds-input-text
--dds-input-placeholder
--dds-input-border
--dds-input-border-hover
--dds-input-border-focus
--dds-input-border-invalid
--dds-input-disabled-bg
--dds-input-disabled-text

--dds-dialog-bg
--dds-dialog-radius
--dds-dialog-shadow
--dds-dialog-overlay

--dds-tooltip-bg
--dds-tooltip-text
--dds-tooltip-radius
```

Component token은 semantic token을 참조한다. consumer는 필요할 때 component 단위로 override할 수 있다.

---

# 6. Sass와 CSS 출력 규칙

## STYLE-001 — Sass module system

- deprecated `@import`를 사용하지 않는다.
- `@use`, `@forward`를 사용한다.
- token map과 mixin은 파일 단위로 분리한다.
- private Sass symbol은 외부 계약으로 문서화하지 않는다.

## STYLE-002 — CSS 변수 emit mixin

`_emit-css-vars.scss`는 Sass map을 CSS 변수로 변환한다.

요구사항:

- nested map을 재귀적으로 평탄화한다.
- key는 kebab-case로 출력한다.
- 최종 이름은 `--dds-{path}`다.
- CSS custom property 값에 Sass 값을 넣을 때 interpolation을 사용한다.
- 빈 map, 중복 key, 지원하지 않는 값은 명확한 Sass error를 발생시킨다.

개념 예시:

```scss
$tokens: (
  "color": (
    "brand": (
      "600": #4f46e5,
    ),
  ),
);

:root {
  @include emit-css-vars($tokens, "dds");
}
```

출력:

```css
:root {
  --dds-color-brand-600: #4f46e5;
}
```

## STYLE-003 — theme selector

`tokens.css`는 아래 계약을 만족한다.

```css
:root {
  /* primitive + light semantic default */
}

[data-dds-theme="light"] {
  /* light semantic */
  color-scheme: light;
}

[data-dds-theme="dark"] {
  /* dark semantic */
  color-scheme: dark;
}

[data-dds-theme="system"] {
  /* light semantic fallback */
}

@media (prefers-color-scheme: dark) {
  [data-dds-theme="system"] {
    /* dark semantic */
    color-scheme: dark;
  }
}
```

- `data-dds-theme`는 `html`뿐 아니라 하위 container에도 적용 가능해야 한다.
- theme selector가 없으면 light theme가 기본이다.
- JavaScript 없이 CSS만으로 nested theme scope가 가능해야 한다.

## STYLE-004 — 공개 커스터마이징 예시

```css
:root {
  --dds-color-brand-600: #7c3aed;
  --dds-color-brand-700: #6d28d9;
  --dds-control-radius: 12px;
}
```

위 코드만으로 `Button`, `Input`, `Dialog`의 브랜드 표현이 일관되게 변경되어야 한다.

## STYLE-005 — UI component CSS layer

모든 UI SCSS Module의 실제 component rule은 `@layer components` 안에 출력한다.

```scss
@layer components {
  .root {
    box-sizing: border-box;
    font: inherit;
  }
}
```

목적:

- Tailwind의 `utilities` layer가 필요할 때 layout utility로 override할 수 있게 한다.
- 일반 consumer의 unlayered CSS도 명시적으로 override 가능하게 한다.
- `!important` 없이 확장성을 확보한다.

## STYLE-006 — 금지 사항

- component SCSS에서 primitive color 직접 사용
- `#4f46e5` 같은 브랜드 color 하드코딩
- Tailwind class를 UI 패키지 내부에서 사용
- 전역 element selector reset
- 소비자 DOM 구조에 의존하는 selector
- 지나치게 높은 specificity
- `!important`
- Sass 변수만 바꾸면 테마가 된다고 문서화하는 행위

---

# 7. 패키지별 계약

## REL-001 — `@ddoni-ds/tokens`

### 목적

- compiled `tokens.css` 제공
- light/dark/system theme 변수 제공

### package.json 핵심 계약

```json
{
  "name": "@ddoni-ds/tokens",
  "version": "0.1.0",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "files": ["dist", "README.md"],
  "exports": {
    "./tokens.css": "./dist/tokens.css"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### build

```bash
sass src/index.scss dist/tokens.css --style=compressed --no-source-map
```

build 전에 Node script 또는 cross-platform Node 명령으로 `dist`를 생성한다.

## REL-002 — `@ddoni-ds/ui`

### 목적

- React component와 타입 제공
- component CSS를 `styles.css`로 제공

### package.json 핵심 계약

```json
{
  "name": "@ddoni-ds/ui",
  "version": "0.1.0",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "files": ["dist", "README.md"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": ">=18.2.0 <20.0.0",
    "react-dom": ">=18.2.0 <20.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

- `react`와 `react-dom`을 bundle하지 않는다.
- 실제 dependencies도 library build에서 external 처리한다.
- Vite library mode로 ESM/CJS와 단일 CSS asset을 생성한다.
- CSS file 이름은 `styles.css`로 고정한다.
- TypeScript declaration map을 생성한다.

## REL-003 — `@ddoni-ds/tailwind`

### 목적

- Tailwind CSS v4 theme variable namespace와 `--dds-*`를 연결한다.
- UI component를 Tailwind로 다시 구현하지 않는다.

### package.json 핵심 계약

```json
{
  "name": "@ddoni-ds/tailwind",
  "version": "0.1.0",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "files": ["theme.css", "README.md"],
  "exports": {
    "./theme.css": "./theme.css"
  },
  "peerDependencies": {
    "tailwindcss": ">=4.0.0 <5.0.0"
  },
  "peerDependenciesMeta": {
    "tailwindcss": {
      "optional": true
    }
  },
  "publishConfig": {
    "access": "public"
  }
}
```

---
# 8. UI 패키지 공통 구현 규칙

## UI-001 — 공개 export

- 모든 공개 API는 `packages/ui/src/index.ts`에서 named export한다.
- component 폴더별 `index.ts`는 해당 component의 공개 entry다.
- default export를 사용하지 않는다.
- `internal/` 하위 구현은 root barrel에서 export하지 않는다.
- 패키지 내부 파일은 같은 패키지의 root barrel을 import하지 않는다.

예시:

```ts
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
```

## UI-002 — 파일과 이름 규칙

```text
ComponentName/
├─ ComponentName.tsx
├─ ComponentName.module.scss
├─ ComponentName.test.tsx
├─ ComponentName.stories.tsx
└─ index.ts
```

- React component: PascalCase
- prop type: `{ComponentName}Props`
- SCSS class: camelCase 또는 단일 의미의 kebab-case 중 하나를 저장소 전체에서 통일
- CSS Custom Property: kebab-case
- data attribute value: lowercase kebab-case

## UI-003 — React component 기본 계약

DOM을 직접 렌더링하는 공개 component는 다음을 만족한다.

- native element props를 확장한다.
- 올바른 DOM node에 ref를 전달한다.
- `className`, `style`, `data-*`, `aria-*`를 전달한다.
- 사용자 `className`을 제거하거나 덮어쓰지 않는다.
- 이벤트 handler를 임의로 삼키지 않는다.
- `displayName`을 설정한다.
- 기본 button type은 `button`이다.
- disabled state에서는 불필요한 event가 발생하지 않는다.
- loading state에서는 중복 action을 방지한다.
- DOM에 알 수 없는 custom prop이 전달되지 않는다.

## UI-004 — variant 표현

SCSS Modules와 `data-*` selector를 사용한다.

```tsx
<button
  className={clsx(styles.root, className)}
  data-variant={variant}
  data-tone={tone}
  data-size={size}
/>
```

- variant 조합을 위해 Tailwind를 사용하지 않는다.
- 초기 버전에서는 CVA를 필수 dependency로 추가하지 않는다.
- 조합 로직이 실제로 복잡해질 때 별도 결정 문서 없이 신규 variant library를 도입하지 않는다.

## UI-005 — polymorphism

- 모든 component에 무분별한 `as` prop을 추가하지 않는다.
- 실제 composition 가치가 있는 component만 Radix Slot 기반 `asChild`를 제공한다.
- `asChild` 사용 시 type과 접근성 계약이 깨지지 않아야 한다.
- Button의 `loading`과 `asChild`를 함께 지원하기 어렵다면 초기 버전에서는 해당 조합을 명시적으로 금지하고 개발 환경 경고를 제공한다.

## UI-006 — className 커스터마이징 정책

우선순위는 아래와 같다.

```text
Component props
  ↓
CSS token override
  ↓
className / style 예외 처리
```

권장:

```tsx
<Button className="w-full mt-4">저장</Button>
```

비권장:

```tsx
<Button className="bg-pink-300 text-black rounded-none">저장</Button>
```

비권장 사용을 런타임에서 차단하지는 않지만, 문서에서는 브랜드 변경에 token을 사용하도록 안내한다.

## UI-007 — 내부 SVG와 아이콘

- icon library 전체를 UI package에 포함하지 않는다.
- Checkbox check, Dialog close 예시 등에 필요한 최소 SVG는 `internal/icons`에 둔다.
- 내부 SVG는 `aria-hidden="true"`, `focusable="false"`를 기본으로 한다.
- 일반 버튼 아이콘은 소비자가 `ReactNode`로 전달한다.

## UI-008 — CSS 규칙

- 모든 component root에 필요한 범위에서 `box-sizing: border-box`, `font: inherit`를 선언한다.
- font family는 상속하거나 typography token을 사용한다.
- focus style은 `:focus-visible`을 사용한다.
- outline을 제거한 뒤 대체 focus indicator를 제공하지 않는 코드는 금지한다.
- hover만으로 상태를 전달하지 않는다.
- disabled는 cursor뿐 아니라 색상과 interaction도 반영한다.
- transition은 motion token을 사용한다.
- reduced motion을 존중한다.

---

# 9. 초기 공개 컴포넌트 명세

## CMP-001 — Button

### 공개 API

```ts
export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonTone = "primary" | "neutral" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
```

### 기본값

```text
variant=solid
tone=primary
size=md
loading=false
fullWidth=false
type=button
```

### 동작

- `disabled || loading`이면 native disabled를 적용한다.
- loading이면 `aria-busy="true"`를 적용한다.
- spinner는 장식 요소로 처리하고 label 중복을 만들지 않는다.
- loading 중에도 button 폭이 갑자기 변하지 않아야 한다.
- leading/trailing icon은 spacing token으로 배치한다.
- children 없이 icon만 사용하는 용도는 `IconButton`을 사용한다.
- ref는 실제 `HTMLButtonElement`를 가리킨다.

### 필수 stories

- Playground
- All variants
- All tones
- All sizes
- With icons
- Loading
- Disabled
- Full width
- Long text
- Dark theme

### 필수 tests

- 기본 type이 button인지 확인
- click handler 호출
- disabled에서 호출되지 않음
- loading에서 호출되지 않음
- aria-busy 확인
- native props와 ref 전달
- 사용자 className 유지

## CMP-002 — IconButton

### 공개 API

```ts
export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> {
  "aria-label": string;
  icon: React.ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
}
```

### 요구사항

- `aria-label`은 TypeScript에서 필수다.
- 정사각형 hit area를 가진다.
- icon은 시각 장식이며 accessible name은 `aria-label`에서 온다.
- Button과 tone/variant/size token을 공유한다.
- 모든 size에서 focus ring이 잘리지 않는다.

## CMP-003 — Spinner

### 공개 API

```ts
export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
  decorative?: boolean;
}
```

### 요구사항

- standalone 기본값은 `role="status"`와 시각적으로 숨긴 label을 제공한다.
- 기본 label은 `로딩 중`이다.
- `decorative=true`이면 `aria-hidden="true"`를 사용한다.
- animation은 reduced motion 환경에서 정지 또는 단순화한다.

## CMP-004 — Badge

### 공개 API

```ts
export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  dot?: boolean;
}
```

### 요구사항

- 기본 element는 span이다.
- 상태를 색상만으로 전달해야 하는 경우 consumer가 별도 텍스트를 제공하도록 문서화한다.
- dot은 `aria-hidden` 장식이다.
- 지나치게 작은 font나 낮은 대비를 사용하지 않는다.

## CMP-005 — Input

### 공개 API

```ts
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  invalid?: boolean;
}
```

### 요구사항

- wrapper 없는 순수 input primitive로 시작한다.
- `invalid=true`이면 `aria-invalid="true"`를 설정한다. 사용자가 명시한 `aria-invalid`가 있으면 모순되지 않게 처리한다.
- disabled, readOnly, placeholder, required, name, value, defaultValue, onChange를 native처럼 전달한다.
- ref는 input을 가리킨다.
- label은 consumer가 `<label htmlFor>` 또는 `aria-label`로 제공한다.
- prefix/suffix adornment는 초기 버전에 포함하지 않는다.

### 필수 stories

- All sizes
- Placeholder
- Disabled
- Read only
- Invalid
- With label and description example
- Dark theme

### 필수 tests

- label로 접근 가능
- typing과 onChange
- invalid ARIA
- disabled/readOnly
- ref/native props/className

## CMP-006 — Textarea

### 공개 API

```ts
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: InputSize;
  invalid?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}
```

### 요구사항

- Input과 상태 token을 공유한다.
- 기본 resize는 vertical이다.
- 최소 높이는 token 기반으로 제공한다.
- controlled/uncontrolled native 동작을 보존한다.

## CMP-007 — Checkbox

Radix Checkbox Primitive를 기반으로 한다.

### 공개 API

```ts
export type CheckboxCheckedState = boolean | "indeterminate";

export interface CheckboxProps {
  checked?: CheckboxCheckedState;
  defaultChecked?: CheckboxCheckedState;
  onCheckedChange?: (checked: CheckboxCheckedState) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}
```

### 요구사항

- checked, unchecked, indeterminate를 지원한다.
- keyboard Space로 toggle된다.
- focus-visible indicator를 제공한다.
- form 관련 prop을 Radix root에 전달한다.
- label component를 강제하지 않으며 native `<label htmlFor>` 예시를 제공한다.
- check indicator SVG는 내부 장식이다.

### 필수 tests/stories

- uncontrolled toggle
- controlled example
- indeterminate
- disabled
- label click
- keyboard interaction
- form name/value example

## CMP-008 — Card

### 공개 API

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title asChild>
      <h2>프로젝트</h2>
    </Card.Title>
    <Card.Description>설명</Card.Description>
  </Card.Header>
  <Card.Content>...</Card.Content>
  <Card.Footer>...</Card.Footer>
</Card.Root>
```

### 하위 컴포넌트

- `Card.Root`
- `Card.Header`
- `Card.Title`
- `Card.Description`
- `Card.Content`
- `Card.Footer`

### 요구사항

- Root 기본 element는 div다.
- Title은 기본 div로 렌더링하고, heading hierarchy가 필요할 때 `asChild`를 사용한다.
- 모든 하위 component는 className/native props를 전달한다.
- Card 자체에 product-specific layout을 넣지 않는다.
- interactive Card를 별도 prop으로 추상화하지 않는다. 링크/버튼 semantics는 consumer가 구성한다.

## CMP-009 — Dialog

Radix Dialog Primitive를 기반으로 compound API를 제공한다.

### 공개 API

```tsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>열기</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>제목</Dialog.Title>
        <Dialog.Description>설명</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>...</Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### 하위 컴포넌트

- Root
- Trigger
- Portal
- Overlay
- Content
- Header
- Title
- Description
- Footer
- Close

### 요구사항

- controlled/uncontrolled open state를 Radix 계약대로 지원한다.
- Escape close, focus trap, trigger focus restore를 유지한다.
- Overlay와 Content z-index를 token으로 관리한다.
- Content는 viewport를 벗어나지 않고 작은 화면에서 scroll 가능해야 한다.
- Title/Description를 올바르게 연결한다.
- close icon을 Content에 강제로 넣지 않는다. consumer가 `Dialog.Close`로 구성한다.
- animation은 reduced motion을 존중한다.

### 필수 interaction story

- Trigger click → dialog open
- title/description 확인
- Escape → close
- trigger로 focus 복귀

## CMP-010 — Tooltip

Radix Tooltip Primitive를 기반으로 한다.

### 하위 컴포넌트

- `Tooltip.Provider`
- `Tooltip.Root`
- `Tooltip.Trigger`
- `Tooltip.Content`
- `Tooltip.Arrow`

### 요구사항

- keyboard focus와 pointer hover 모두에서 노출된다.
- essential information 또는 error message의 유일한 전달 수단으로 사용하지 않도록 문서화한다.
- Content는 tooltip role과 trigger 관계를 유지한다.
- 기본 delay duration은 Provider에서 조절 가능하다.
- Storybook preview에는 전역 Provider decorator를 둘 수 있다.

## CMP-011 — DropdownMenu

Radix DropdownMenu Primitive를 기반으로 한다.

### 하위 컴포넌트 최소 범위

- Root
- Trigger
- Portal
- Content
- Item
- CheckboxItem
- RadioGroup
- RadioItem
- Label
- Separator
- Group
- Sub
- SubTrigger
- SubContent

### 요구사항

- keyboard navigation, Escape, focus restore를 유지한다.
- disabled item을 지원한다.
- destructive item은 `tone="danger"` 또는 `data-tone="danger"`로 표현한다.
- item inset, indicator slot, shortcut slot을 지원하되 과도한 prop API를 만들지 않는다.
- menu item에 임의의 button을 중첩하지 않는다.
- portal content의 collision handling을 Radix에 위임한다.

---

# 10. 이후 추가 예정이지만 MVP에서 제외되는 컴포넌트

아래는 `v0.2+` 후보로 문서만 남기고 초기 구현하지 않는다.

- Field / FormField
- RadioGroup
- Switch
- Tabs
- Accordion
- Popover
- Toast
- Skeleton
- Select
- Pagination
- Table
- EmptyState
- PageHeader
- FilterBar

추가 시에는 실제 프로젝트 사용 사례가 최소 2개 이상 생긴 뒤 공개 API를 설계한다.

---

# 11. Tailwind CSS 어댑터

## TW-001 — 경계

- `@ddoni-ds/ui` 내부에서는 Tailwind를 사용하지 않는다.
- `@ddoni-ds/tailwind`는 plain CSS 파일 하나를 제공한다.
- Tailwind v4의 `@theme inline`을 사용해 `--dds-*`를 utility namespace에 연결한다.
- Sass와 Tailwind를 한 전처리 파이프라인에 섞지 않는다.

## TW-002 — `theme.css` 최소 계약

```css
@theme inline {
  --color-dds-canvas: var(--dds-color-bg-canvas);
  --color-dds-surface: var(--dds-color-bg-surface);
  --color-dds-surface-subtle: var(--dds-color-bg-surface-subtle);
  --color-dds-text: var(--dds-color-text-primary);
  --color-dds-text-muted: var(--dds-color-text-secondary);
  --color-dds-text-disabled: var(--dds-color-text-disabled);
  --color-dds-border: var(--dds-color-border-default);
  --color-dds-border-strong: var(--dds-color-border-strong);
  --color-dds-primary: var(--dds-color-action-primary-bg);
  --color-dds-danger: var(--dds-color-action-danger-bg);
  --color-dds-success: var(--dds-color-status-success-text);
  --color-dds-warning: var(--dds-color-status-warning-text);
  --color-dds-info: var(--dds-color-status-info-text);

  --font-dds-sans: var(--dds-font-family-sans);
  --font-dds-mono: var(--dds-font-family-mono);

  --text-dds-sm: var(--dds-font-size-sm);
  --text-dds-sm--line-height: var(--dds-line-height-normal);
  --text-dds-md: var(--dds-font-size-md);
  --text-dds-md--line-height: var(--dds-line-height-normal);
  --text-dds-lg: var(--dds-font-size-lg);
  --text-dds-lg--line-height: var(--dds-line-height-tight);

  --radius-dds-sm: var(--dds-radius-sm);
  --radius-dds-md: var(--dds-radius-md);
  --radius-dds-lg: var(--dds-radius-lg);
  --radius-dds-control: var(--dds-control-radius);

  --shadow-dds-sm: var(--dds-shadow-sm);
  --shadow-dds-md: var(--dds-shadow-md);
  --shadow-dds-lg: var(--dds-shadow-lg);

  --spacing-dds-1: var(--dds-space-1);
  --spacing-dds-2: var(--dds-space-2);
  --spacing-dds-3: var(--dds-space-3);
  --spacing-dds-4: var(--dds-space-4);
  --spacing-dds-6: var(--dds-space-6);
  --spacing-dds-8: var(--dds-space-8);
}
```

실제 설치된 Tailwind가 지원하는 companion variable 문법은 공식 타입/문서를 확인하고 조정할 수 있다. 생성되는 utility 이름과 의미는 유지한다.

## TW-003 — consumer import 순서

Tailwind Vite consumer의 main CSS:

```css
@import "tailwindcss";
@import "@ddoni-ds/tokens/tokens.css";
@import "@ddoni-ds/tailwind/theme.css";
@import "@ddoni-ds/ui/styles.css";

:root {
  --dds-color-brand-600: #7c3aed;
  --dds-color-brand-700: #6d28d9;
  --dds-control-radius: 12px;
}
```

사용 예시:

```tsx
<div className="bg-dds-canvas text-dds-text p-dds-6">
  <Button className="w-full">저장</Button>
</div>
```

## TW-004 — 검증

Tailwind 예제 앱에서 최소 아래 utility가 실제 CSS로 생성되어야 한다.

- `bg-dds-canvas`
- `bg-dds-surface`
- `text-dds-text`
- `text-dds-text-muted`
- `border-dds-border`
- `rounded-dds-control`
- `shadow-dds-md`
- `p-dds-4`

Tailwind utility를 `Button`에 추가했을 때 `w-full`, margin, positioning 등 layout override가 동작해야 한다.

---

# 12. Storybook 명세

## SB-001 — 역할

Storybook은 다음의 공통 기반이다.

- component 격리 개발
- 상태 catalog
- 사용법 문서
- interaction test
- 접근성 자동 검사
- theme 확인

## SB-002 — 설정

- React + Vite framework를 사용한다.
- stories glob은 `packages/ui/src/**/*.stories.@(ts|tsx)` 및 필요한 MDX를 포함한다.
- `packages/tokens/src/index.scss`를 preview에 import한다.
- component source가 각 SCSS Module을 직접 import하도록 한다.
- `@storybook/addon-a11y`를 활성화한다.
- 현재 stable Storybook의 Vitest 연동이 설치 환경과 호환되면 공식 addon을 사용한다.
- generator가 만든 불필요한 예제 story와 asset은 제거한다.

## SB-003 — hierarchy

```text
Foundations/
  Colors
  Typography
  Spacing
  Radius
  Shadows
  Motion

Components/
  Actions/Button
  Actions/IconButton
  Feedback/Spinner
  Data Display/Badge
  Data Display/Card
  Forms/Input
  Forms/Textarea
  Forms/Checkbox
  Overlays/Dialog
  Overlays/Tooltip
  Navigation/DropdownMenu
```

## SB-004 — story 작성 규칙

- CSF와 TypeScript `satisfies Meta<typeof Component>`를 사용한다.
- 기본 story 이름은 `Playground`다.
- controls로 의미 없는 native prop 전체를 노출하지 않는다.
- callback은 Storybook의 spy utility를 사용한다.
- interactive component는 최소 하나의 `play` function을 가진다.
- 모든 story는 콘솔 error/warning 없이 렌더링되어야 한다.
- dark theme에서도 주요 state가 깨지지 않아야 한다.

## SB-005 — theme toolbar

Storybook toolbar에서 `light`, `dark`, `system`을 선택할 수 있어야 한다.

- 선택값을 preview root 또는 document element의 `data-dds-theme`에 반영한다.
- story 간 theme 상태가 예측 가능해야 한다.
- nested theme scope를 보여주는 별도 foundation story를 만든다.

## SB-006 — foundation stories

Colors story는 primitive 색상과 semantic 색상을 구분한다.

- token 이름
- 현재 computed value
- light/dark 의미
- 사용 권장 영역

Typography, spacing, radius, shadow도 token 이름과 시각 결과를 함께 보여준다.

토큰 표시 코드는 package의 공개 API로 export하지 않는다.

## SB-007 — docs

각 component docs에 최소 아래를 포함한다.

- 한 줄 목적
- 언제 사용하는가
- 언제 사용하지 않는가
- 기본 사용 예시
- 주요 props
- 접근성 주의점
- token 커스터마이징 방법

---

# 13. 테스트 및 접근성

## QA-001 — 테스트 계층

```text
Typecheck
  → 공개 타입과 strict 보장

Vitest + Testing Library
  → rendering, native props, state, event, ref

Storybook play
  → 실제 사용자 interaction과 overlay 흐름

Storybook a11y
  → 자동 접근성 검사

Example build
  → 실제 소비자 통합
```

## QA-002 — Vitest 기본 설정

- root `vitest.config.ts`에서 package test를 수집한다.
- 일반 component test는 jsdom을 사용한다.
- `vitest.setup.ts`에서 `@testing-library/jest-dom`을 등록한다.
- 테스트 후 DOM cleanup을 보장한다.
- Radix test에 필요한 최소 browser API polyfill만 추가한다.
- 실제 browser behavior가 중요한 Dialog/Dropdown/Tooltip은 Storybook interaction test를 우선한다.

## QA-003 — query 규칙

우선순위:

1. `getByRole`
2. `getByLabelText`
3. `getByText`
4. semantic query로 불가능할 때만 test id

CSS class hash나 내부 DOM depth를 기준으로 테스트하지 않는다.

## QA-004 — 공통 component test

공개 component는 해당되는 범위에서 아래를 검증한다.

- default render
- public variants
- disabled/readOnly/loading/invalid
- click, change, checked state
- ref forwarding
- native prop forwarding
- className forwarding
- ARIA state
- keyboard operation
- controlled/uncontrolled behavior
- console error 없음

## QA-005 — 접근성 기준

- WCAG 2.2 AA를 목표로 한다.
- 모든 interactive element는 keyboard로 조작 가능해야 한다.
- focus indicator가 명확해야 한다.
- icon-only control은 accessible name이 필수다.
- color만으로 상태를 전달하지 않는다.
- disabled, invalid, busy state는 의미론적으로 노출한다.
- Dialog는 title을 제공한다.
- Tooltip은 필수 정보의 유일한 채널이 아니다.
- automated a11y test 통과만으로 접근성 완료를 선언하지 않는다.

## QA-006 — 테스트 금지 패턴

- 동작 검증 대신 snapshot 하나만 두기
- 테스트 통과를 위해 accessibility warning 숨기기
- 구현 내부 함수 직접 호출
- 무의미한 100% coverage 목표
- flaky timeout 증가로 문제 감추기

## QA-007 — 최소 coverage 정책

초기에는 전역 percentage gate를 강제하지 않는다. 대신 모든 공개 component에 최소 한 개 이상의 behavior test와 모든 주요 interactive component에 Storybook play test를 요구한다.

---

# 14. 예제 앱

## ARCH-030 — 일반 React Vite 예제

package name:

```text
@ddoni-ds/example-react-vite
```

`private: true`로 설정한다.

### import

```tsx
import "@ddoni-ds/tokens/tokens.css";
import "@ddoni-ds/ui/styles.css";
```

### 화면 요구사항

- light/dark/system theme selector
- Button variants
- Input/Textarea/Checkbox form
- Card
- Dialog
- Tooltip
- DropdownMenu
- CSS 변수로 brand color와 radius를 override한 theme section

## ARCH-031 — Tailwind Vite 예제

package name:

```text
@ddoni-ds/example-tailwind-vite
```

`private: true`로 설정한다.

### 도구

- Vite React TypeScript
- Tailwind CSS v4
- 공식 Vite plugin

### 화면 요구사항

- Tailwind semantic utility로 page layout 작성
- `@ddoni-ds/ui` component 사용
- Button에 `w-full`, responsive width, margin utility 적용
- `--dds-*` token override로 UI component theme 변경
- adapter utility와 component가 동일한 색상/radius를 공유하는 것을 시각적으로 확인

## ARCH-032 — example 검증 목적

예제 앱은 demo만이 아니라 package contract test다.

- package name import가 동작해야 한다.
- CSS subpath export가 동작해야 한다.
- React peer dependency 중복이 없어야 한다.
- Tailwind 없이도 UI가 동작해야 한다.
- Tailwind를 사용해도 UI package가 Tailwind에 의존하지 않아야 한다.

---

# 15. 빌드와 npm 배포 준비

## REL-010 — UI library build

Vite library mode 설정은 아래 결과를 만들어야 한다.

```text
packages/ui/dist/
├─ index.js
├─ index.cjs
├─ styles.css
└─ types/
   ├─ index.d.ts
   ├─ index.d.ts.map
   └─ components/...
```

- `react`, `react-dom`, `react/jsx-runtime`를 externalize한다.
- declared dependencies도 불필요하게 bundle하지 않는다.
- source map은 JS 및 type declaration에 제공할 수 있다.
- CSS는 한 파일로 출력한다.
- output file 이름은 package exports와 일치해야 한다.

## REL-011 — package side effects

CSS import가 consumer bundler에서 제거되지 않도록 각 CSS 제공 package의 `sideEffects`를 설정한다.

```json
{
  "sideEffects": ["**/*.css"]
}
```

## REL-012 — pack 검사

`scripts/check-packages.mjs`는 최소 아래를 수행한다.

1. tokens, ui, tailwind workspace를 build한다.
2. 각 workspace에서 `npm pack --dry-run --json` 또는 현재 npm stable의 동등 명령을 실행한다.
3. 포함 파일 목록을 검사한다.
4. 금지 파일이 있으면 실패한다.

필수 포함:

- package.json
- README.md
- dist 또는 theme.css
- UI type declaration

금지:

- `src` 전체
- test
- stories
- local config
- coverage
- `.env`
- npm token

## REL-013 — publish 순서

사용자가 publish를 지시한 경우에만 실행한다.

```bash
npm run check
npm publish -w @ddoni-ds/tokens --access public
npm publish -w @ddoni-ds/ui --access public
npm publish -w @ddoni-ds/tailwind --access public
```

- 먼저 `npm whoami`와 scope 권한을 확인한다.
- version이 이미 존재하는지 확인한다.
- OTP 등 인증은 사용자에게 노출하지 않는다.
- root와 example은 publish하지 않는다.

## REL-014 — README 소비자 예시

루트 README와 package README는 최소 아래 예시를 포함한다.

### 일반 React

```bash
npm install @ddoni-ds/ui @ddoni-ds/tokens
```

```tsx
import "@ddoni-ds/tokens/tokens.css";
import "@ddoni-ds/ui/styles.css";
import { Button } from "@ddoni-ds/ui";
```

### Tailwind CSS v4

```bash
npm install @ddoni-ds/ui @ddoni-ds/tokens @ddoni-ds/tailwind
```

```css
@import "tailwindcss";
@import "@ddoni-ds/tokens/tokens.css";
@import "@ddoni-ds/tailwind/theme.css";
@import "@ddoni-ds/ui/styles.css";
```

### theme override

```css
[data-dds-brand="violet"] {
  --dds-color-brand-600: #7c3aed;
  --dds-color-brand-700: #6d28d9;
  --dds-control-radius: 12px;
}
```

---

# 16. CI

## QA-010 — GitHub Actions

`.github/workflows/ci.yml`은 pull request와 main push에서 실행한다.

```text
checkout
→ setup Node
→ npm ci
→ npm run check
```

요구사항:

- `actions/setup-node` npm cache 사용
- repo의 `.nvmrc` 또는 명시한 Node major 사용
- `package-lock.json`이 맞지 않으면 실패
- build artifact를 repository에 commit하지 않음
- publish job 없음

## QA-011 — CI 실패 기준

아래 중 하나라도 실패하면 CI를 실패시킨다.

- formatting
- lint warning 또는 error
- type error
- test failure
- package build failure
- example build failure
- Storybook build failure
- package content 검사 failure

---

# 17. 구현 Phase

## Phase 0 — 저장소 및 도구 초기화

### 범위

- [ ] `ARCH-001` npm workspaces root 생성
- [ ] `ARCH-002` Node/npm 정책 적용
- [ ] `ARCH-010` 기본 폴더 생성
- [ ] `ARCH-020` `.npmrc` 생성
- [ ] `ARCH-021` root scripts skeleton 생성
- [ ] `ARCH-022` TypeScript 설정
- [ ] `ARCH-023` ESLint/Prettier 설정
- [ ] Storybook React Vite 초기화
- [ ] Vitest/Testing Library 초기화
- [ ] `docs/IMPLEMENTATION_STATUS.md` 생성
- [ ] 초기 README 생성

### 인수 조건

```bash
npm install
npm run format:check
npm run lint
npm run typecheck
```

모든 명령이 통과하거나, 아직 코드가 없어 해당 script가 안전하게 통과해야 한다.

## Phase 1 — Tokens 및 Theme

### 범위

- [ ] `TOK-001` 계층 구현
- [ ] `TOK-002` prefix 적용
- [ ] `TOK-003` primitive colors
- [ ] `TOK-004` foundations
- [ ] `TOK-005` light semantic
- [ ] `TOK-006` dark semantic
- [ ] `TOK-007` component tokens
- [ ] `STYLE-001` Sass modules
- [ ] `STYLE-002` recursive emit mixin
- [ ] `STYLE-003` theme selector
- [ ] tokens package build/exports
- [ ] token build smoke test

### 인수 조건

```bash
npm run build -w @ddoni-ds/tokens
```

`dist/tokens.css`에 다음이 존재해야 한다.

```text
--dds-color-brand-600
--dds-color-text-primary
--dds-control-radius
[data-dds-theme="dark"]
[data-dds-theme="system"]
```

## Phase 2 — UI build infrastructure와 기본 컴포넌트

### 범위

- [ ] UI package Vite library build
- [ ] declaration build
- [ ] public exports
- [ ] common SCSS helpers
- [ ] `CMP-001` Button
- [ ] `CMP-002` IconButton
- [ ] `CMP-003` Spinner
- [ ] `CMP-004` Badge
- [ ] component tests
- [ ] component stories

### 인수 조건

```bash
npm run typecheck -w @ddoni-ds/ui
npm run build -w @ddoni-ds/ui
npm run test
npm run build-storybook
```

## Phase 3 — Form 및 Layout 컴포넌트

### 범위

- [ ] `CMP-005` Input
- [ ] `CMP-006` Textarea
- [ ] `CMP-007` Checkbox
- [ ] `CMP-008` Card
- [ ] tests/stories/docs

### 인수 조건

- label, keyboard, controlled/uncontrolled story 확인
- dark theme 확인
- lint/typecheck/test/build 통과

## Phase 4 — Overlay 및 Menu

### 범위

- [ ] `CMP-009` Dialog
- [ ] `CMP-010` Tooltip
- [ ] `CMP-011` DropdownMenu
- [ ] Radix dependencies를 UI runtime dependencies에 정확히 선언
- [ ] Storybook play tests
- [ ] a11y tests

### 인수 조건

- keyboard interaction
- Escape close
- focus restore
- portal layer
- build and Storybook 통과

## Phase 5 — Storybook foundation과 Tailwind adapter

### 범위

- [ ] `SB-001`~`SB-007`
- [ ] `TW-001`~`TW-004`
- [ ] Tailwind package README
- [ ] theme toolbar
- [ ] foundation stories

### 인수 조건

```bash
npm run build-storybook
```

Tailwind adapter의 CSS를 실제 Tailwind example에서 compile할 준비가 되어 있어야 한다.

## Phase 6 — 소비자 예제 앱

### 범위

- [ ] `ARCH-030` React Vite example
- [ ] `ARCH-031` Tailwind Vite example
- [ ] `ARCH-032` package contract 검증
- [ ] theme override demonstration

### 인수 조건

```bash
npm run build:examples
```

두 예제 앱 모두 workspace package name과 CSS subpath export를 사용해야 한다.

## Phase 7 — CI 및 배포 준비

### 범위

- [ ] `QA-010` CI
- [ ] `QA-011` fail gates
- [ ] `REL-010` build output
- [ ] `REL-011` side effects
- [ ] `REL-012` pack check
- [ ] `REL-014` README
- [ ] architecture decision records

### 최종 인수 조건

```bash
npm ci
npm run check
```

clean checkout 기준으로 통과해야 한다.

---

# 18. Definition of Done

전체 v0.1은 아래 조건을 모두 만족할 때 완료다.

## Architecture

- [ ] npm 외 다른 package manager 파일이 없음
- [ ] 단일 root `package-lock.json`
- [ ] workspace package name으로 내부 연결
- [ ] root/examples private
- [ ] package exports와 build output 일치

## Tokens/Styles

- [ ] primitive → semantic → component 계층
- [ ] 모든 public CSS var가 `--dds-`
- [ ] light/dark/system
- [ ] SCSS 내부 구현, CSS vars 외부 API
- [ ] component CSS가 `@layer components`
- [ ] brand color 하드코딩 없음
- [ ] global reset 자동 주입 없음

## Components

- [ ] Button
- [ ] IconButton
- [ ] Spinner
- [ ] Badge
- [ ] Input
- [ ] Textarea
- [ ] Checkbox
- [ ] Card
- [ ] Dialog
- [ ] Tooltip
- [ ] DropdownMenu
- [ ] named exports/types
- [ ] ref/native props/className

## Documentation

- [ ] Storybook states
- [ ] Storybook theme toolbar
- [ ] foundation token catalog
- [ ] component purpose/usage/a11y/token docs
- [ ] root README
- [ ] package README

## Quality

- [ ] format
- [ ] lint
- [ ] typecheck
- [ ] unit/component tests
- [ ] Storybook interaction
- [ ] a11y addon
- [ ] package build
- [ ] example builds
- [ ] Storybook build
- [ ] pack content check
- [ ] CI

## Integration

- [ ] 일반 React example에서 동작
- [ ] Tailwind v4 example에서 동작
- [ ] token override로 두 환경의 UI가 함께 변경
- [ ] Tailwind layout utility가 component className에서 동작
- [ ] Tailwind 없는 consumer도 정상 동작

---

# 19. Codex 작업 시 금지되는 지름길

- Storybook을 단순 showcase로만 두고 tests/docs를 생략
- Sass 변수만 공개하고 CSS 변수 커스터마이징을 생략
- Tailwind를 UI package dependency로 추가
- 모든 스타일을 `className`으로 덮도록 설계
- component마다 raw hex, px 값을 복제
- Radix source를 복사해서 자체 구현처럼 유지
- public API 없이 내부 파일 path로 import하도록 문서화
- build 없이 TS/SCSS source를 npm consumer에게 직접 처리시키기
- `src` 전체를 package tarball에 포함
- 예제 앱에서 상대 경로로 package source import
- test를 삭제하거나 warning을 숨겨 CI 통과
- 명세에 없는 대형 component를 선제 구현

---

# 20. `docs/IMPLEMENTATION_STATUS.md` 형식

Phase 0에서 아래 형식으로 생성한다.

```md
# 구현 상태

- 마지막 갱신: YYYY-MM-DD
- 현재 Phase: Phase 0
- 전체 상태: 진행 중

## Phase 0

- [x] ARCH-001 npm workspaces
- [ ] ARCH-002 Node/npm 정책

## 검증 결과

| 명령 | 결과 | 비고 |
|---|---|---|
| npm run lint | PASS | |
| npm run typecheck | PASS | |

## 알려진 이슈

- 없음
```

Codex는 실제 통과하지 않은 항목을 체크하지 않는다.

---

# 21. Codex에 전달할 시작 프롬프트

## 첫 작업: Phase 0만

```text
루트 AGENTS.md와 docs/DESIGN_SYSTEM_IMPLEMENTATION_SPEC.md를 모두 읽어.
현재 저장소 상태를 먼저 확인한 뒤 Phase 0만 구현해.
npm만 사용하고, 명세에 없는 기술을 추가하지 마.
완료 후 실행한 검증 명령과 결과, 변경 파일, 남은 항목을 요구사항 ID 기준으로 보고해.
```

## 다음 Phase 진행

```text
AGENTS.md와 구현 명세서를 기준으로 docs/IMPLEMENTATION_STATUS.md를 확인해.
가장 앞의 미완료 Phase 하나만 구현하고 해당 Phase의 인수 조건을 실행해.
기존 사용자 변경을 되돌리지 말고, 실패한 검증은 숨기지 마.
```

## 전체 v0.1 구현

```text
AGENTS.md와 docs/DESIGN_SYSTEM_IMPLEMENTATION_SPEC.md를 구현의 source of truth로 사용해.
Phase 0부터 Phase 7까지 순서대로 구현하되, 각 Phase 인수 조건을 통과한 뒤 다음으로 이동해.
각 Phase 완료 시 docs/IMPLEMENTATION_STATUS.md를 갱신해.
npm publish, git commit, git push는 실행하지 마.
마지막에 npm ci와 npm run check 결과를 포함해 전체 요구사항 ID의 완료/미완료 상태를 보고해.
```

## 특정 컴포넌트 수정

```text
AGENTS.md와 구현 명세서의 CMP-XXX, UI-*, QA-*를 먼저 읽어.
해당 컴포넌트의 공개 API를 불필요하게 변경하지 말고 문제를 수정해.
관련 test와 story를 함께 수정하고 최소 npm run lint, npm run typecheck, npm run test, npm run build-storybook을 실행해.
```

---

# 22. 설계 결정 기록 초안

## ADR 0001 — SCSS와 CSS Custom Properties

### 결정

SCSS는 package 내부 authoring에 사용하고, CSS Custom Properties를 외부 theme API로 사용한다.

### 이유

- consumer가 Sass build 환경을 가질 필요가 없다.
- runtime theme와 nested theme scope가 가능하다.
- Tailwind, CSS Modules, plain CSS consumer가 같은 token을 공유한다.
- package build 결과가 일반 CSS라 bundler 호환성이 높다.

### 결과

- Sass variable 변경은 build-time 내부 구현이다.
- public token 이름 변경은 breaking change로 취급한다.

## ADR 0002 — Tailwind optional adapter

### 결정

Tailwind CSS는 UI package dependency가 아니며 별도 CSS adapter package로 제공한다.

### 이유

- UI package가 특정 styling framework에 잠기지 않는다.
- Tailwind v4 consumer는 `@theme inline`으로 semantic utility를 얻는다.
- Tailwind가 없는 소비자는 추가 비용이 없다.

### 결과

- adapter는 Tailwind major version과 호환 범위를 명확히 갖는다.
- component style은 SCSS Modules로 유지한다.

---

# 23. 공식 참고 문서

Codex는 API가 변경되었을 가능성이 있을 때 아래 공식 문서의 현재 stable 내용을 확인한다.

- Codex `AGENTS.md`: https://developers.openai.com/codex/agent-configuration/agents-md
- Codex best practices: https://developers.openai.com/codex/learn/best-practices
- npm workspaces: https://docs.npmjs.com/cli/using-npm/workspaces
- npm package.json: https://docs.npmjs.com/cli/configuring-npm/package-json
- npm ci: https://docs.npmjs.com/cli/commands/npm-ci
- Vite library mode: https://vite.dev/guide/build
- TypeScript declaration emit: https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html
- Sass documentation: https://sass-lang.com/documentation/
- Sass CSS variables: https://sass-lang.com/documentation/breaking-changes/css-vars/
- Storybook React Vite: https://storybook.js.org/docs/get-started/frameworks/react-vite
- Storybook accessibility: https://storybook.js.org/docs/writing-tests/accessibility-testing
- Storybook interaction tests: https://storybook.js.org/docs/writing-tests/interaction-testing
- Storybook Vitest addon: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
- Radix Primitives: https://www.radix-ui.com/primitives/docs/overview/introduction
- Tailwind theme variables: https://tailwindcss.com/docs/theme
- Tailwind compatibility: https://tailwindcss.com/docs/compatibility
- Tailwind custom styles/layers: https://tailwindcss.com/docs/adding-custom-styles
- Vitest: https://vitest.dev/guide/
- React: https://react.dev/

---

# 24. 최종 구현 보고 템플릿

```md
# 구현 결과

## 완료 범위

- Phase: Phase N
- 완료 요구사항: ARCH-..., TOK-..., CMP-...

## 핵심 변경

- ...

## 주요 파일

- `path/to/file`: 역할

## 검증

| 명령 | 결과 | 비고 |
|---|---|---|
| npm run lint | PASS | |
| npm run typecheck | PASS | |
| npm run test | PASS | |
| npm run build | PASS | |
| npm run build-storybook | PASS | |

## 남은 항목

- ...

## 위험 또는 결정 사항

- ...
```
