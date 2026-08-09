# AGENTS.md

## 저장소 목적

이 저장소는 여러 React 프로젝트에서 재사용할 수 있는 npm 기반 디자인 시스템을 구축한다.
상세 요구사항과 구현 순서는 반드시 `docs/DESIGN_SYSTEM_IMPLEMENTATION_SPEC.md`를 기준으로 한다.

## 작업 시작 전 필수 절차

1. `docs/DESIGN_SYSTEM_IMPLEMENTATION_SPEC.md`를 처음부터 끝까지 읽는다.
2. 저장소의 현재 파일, `package.json`, `package-lock.json`, Git 변경 사항을 확인한다.
3. 사용자가 지정한 Phase가 있으면 해당 Phase만 수행한다.
4. Phase가 지정되지 않았다면 가장 앞의 미완료 Phase 하나만 수행한다.
5. 기존 구현이 명세와 다르면 임의로 전면 재작성하지 말고, 차이를 먼저 정리한 뒤 최소 범위로 수정한다.

## 고정 기술 원칙

- 패키지 매니저는 **npm만** 사용한다.
- `pnpm`, `yarn`, `bun`, `workspace:*` 전용 문법을 사용하지 않는다.
- 모노레포는 npm workspaces로 구성한다.
- React와 React DOM은 `@ddoni-ds/ui`의 `peerDependencies`로 둔다.
- 디자인 시스템 내부 스타일은 SCSS Modules로 작성한다.
- 외부 커스터마이징 API는 `--dds-*` CSS Custom Properties로 제공한다.
- Sass 변수는 외부 테마 API로 사용하지 않는다.
- Tailwind CSS는 UI 패키지의 의존성이 아니다. `@ddoni-ds/tailwind`는 선택형 어댑터다.
- 접근성이 복잡한 오버레이/메뉴/체크박스 동작은 Radix Primitives를 기반으로 구현한다.
- 전역 reset을 자동으로 주입하지 않는다.
- 공개 컴포넌트는 named export만 사용한다.
- 공개 API 변경은 명세와 테스트를 함께 수정한다.

## 코드 작성 규칙

- TypeScript `strict`를 유지한다.
- 공개 코드에 `any`를 사용하지 않는다.
- `@ts-ignore`, 광범위한 ESLint disable, `!important`는 원칙적으로 금지한다.
- 컴포넌트는 native props를 전달하고, ref를 올바른 DOM 요소로 전달한다.
- 내부에서 같은 패키지의 root barrel을 다시 import하지 않는다.
- 색상, 간격, radius, shadow, typography 값은 대응 토큰이 있으면 하드코딩하지 않는다.
- `className`은 허용하되 핵심 브랜드 변경은 토큰을 우선한다.
- 테스트는 role, accessible name, label 등 사용자 관점의 query를 우선한다.
- 단순 구현을 우선하며, 명세에 없는 범용 추상화나 신규 패키지를 선제적으로 추가하지 않는다.

## 의존성 규칙

- 새 의존성을 추가하기 전에 기존 의존성이나 Web Platform으로 해결 가능한지 확인한다.
- 설치 시 stable 버전만 사용하고 prerelease는 사용하지 않는다.
- `--force`, `--legacy-peer-deps`로 충돌을 숨기지 않는다.
- `package-lock.json`을 항상 함께 갱신한다.
- 실제 런타임 import가 있는 패키지는 반드시 해당 workspace의 `dependencies`에 선언한다.

## 검증 규칙

관련 스크립트가 생성된 뒤에는 작업 범위에 맞춰 다음을 실행한다.

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run build-storybook
```

Phase 완료 시에는 가능한 한 다음 통합 명령을 실행한다.

```bash
npm run check
```

실패를 무시하거나 테스트를 삭제해서 통과시키지 않는다. 환경 문제로 실행하지 못한 명령은 정확한 이유와 재현 명령을 최종 보고에 남긴다.

## Git 및 파일 변경 원칙

- 사용자가 요청하지 않으면 `git commit`, `git push`, npm publish를 실행하지 않는다.
- 사용자 변경 사항을 되돌리지 않는다.
- 생성물인 `dist`, `storybook-static`, coverage, 임시 tarball은 Git에 커밋하지 않는다.
- 비밀값, npm token, 개인 인증 정보를 파일에 기록하지 않는다.

## 작업 완료 보고 형식

최종 응답은 아래 순서로 작성한다.

1. 완료한 Phase와 요구사항 ID
2. 핵심 구현 내용
3. 변경한 주요 파일
4. 실행한 검증 명령과 결과
5. 남은 미완료 항목 또는 확인이 필요한 위험 요소

단순히 “완료”라고만 말하지 않는다.
