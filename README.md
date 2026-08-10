# DDoni Design System

여러 React 프로젝트에서 재사용할 수 있는 npm workspaces 기반 디자인 시스템입니다. SCSS Modules로 컴포넌트 스타일을 작성하고, `--dds-*` CSS Custom Properties를 공개 테마 API로 제공합니다.

## 패키지

- `@ddoni-ds/tokens`: light, dark, system 테마를 포함한 CSS 토큰
- `@ddoni-ds/ui`: React 컴포넌트와 컴포넌트 CSS
- `@ddoni-ds/tailwind`: Tailwind CSS v4 선택형 테마 어댑터

Node.js 20.19 이상과 npm을 사용합니다. `@ddoni-ds/ui`는 React 18.2 이상 및 React 19를 지원합니다.

## 일반 React에서 사용하기

```bash
npm install @ddoni-ds/ui @ddoni-ds/tokens
```

애플리케이션 엔트리에서 토큰 CSS를 컴포넌트 CSS보다 먼저 불러옵니다.

```tsx
import "@ddoni-ds/tokens/tokens.css";
import "@ddoni-ds/ui/styles.css";
import { Button } from "@ddoni-ds/ui";

export function SaveButton() {
  return <Button>저장</Button>;
}
```

## Tailwind CSS v4에서 사용하기

```bash
npm install @ddoni-ds/ui @ddoni-ds/tokens @ddoni-ds/tailwind
```

```css
@import "tailwindcss";
@import "@ddoni-ds/tokens/tokens.css";
@import "@ddoni-ds/tailwind/theme.css";
@import "@ddoni-ds/ui/styles.css";
```

어댑터는 semantic token을 `bg-dds-canvas`, `text-dds-text`, `p-dds-4` 같은 Tailwind utility로 연결합니다. UI 패키지 자체는 Tailwind에 의존하지 않습니다.

## 테마와 브랜드 재정의

루트나 하위 컨테이너에 `data-dds-theme="light"`, `"dark"`, `"system"`을 설정할 수 있습니다. 속성이 없으면 light 테마가 기본입니다.

```css
[data-dds-brand="teal"] {
  --dds-color-brand-300: #5eead4;
  --dds-color-brand-400: #2dd4bf;
  --dds-color-brand-500: #0d8278;
  --dds-color-brand-600: #0f766e;
  --dds-color-brand-700: #115e59;
  --dds-color-brand-800: #134e4a;
  --dds-control-radius: 12px;
}
```

```tsx
<section data-dds-brand="teal" data-dds-theme="dark">
  <Button>청록색 브랜드 버튼</Button>
</section>
```

## 저장소 개발

```bash
npm ci
npm run check
```

`npm run check`는 format, lint, stylelint, typecheck, component test, package/example build, Storybook build와 package tarball 검사를 실행합니다. 구현 기준은 `docs/DESIGN_SYSTEM_IMPLEMENTATION_SPEC.md`, 진행 상태는 `docs/IMPLEMENTATION_STATUS.md`에서 확인할 수 있습니다.
