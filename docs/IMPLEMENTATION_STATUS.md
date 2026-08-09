# 구현 상태

- 마지막 갱신: 2026-08-10
- 현재 Phase: Phase 5 완료
- 전체 상태: 진행 중

## Phase 0

- [x] ARCH-001 npm workspaces
- [x] ARCH-002 Node/npm 정책
- [x] ARCH-010 기본 폴더 구조
- [x] ARCH-020 `.npmrc`
- [x] ARCH-021 root scripts skeleton
- [x] ARCH-022 TypeScript 설정
- [x] ARCH-023 ESLint/Prettier 설정
- [x] Storybook React Vite 초기화
- [x] Vitest/Testing Library 초기화
- [x] 구현 상태 문서
- [x] 초기 README

## Phase 1

- [x] TOK-001 토큰 계층
- [x] TOK-002 `--dds-` public prefix
- [x] TOK-003 primitive color
- [x] TOK-004 foundation scale
- [x] TOK-005 light semantic theme
- [x] TOK-006 dark semantic theme
- [x] TOK-007 component token
- [x] STYLE-001 Sass module system
- [x] STYLE-002 recursive CSS variable emit mixin
- [x] STYLE-003 light/dark/system theme selector
- [x] tokens package build와 export
- [x] token build smoke test

## Phase 2

- [x] REL-002 UI package Vite library build, declaration, export
- [x] UI-001 named public exports
- [x] UI-003 native props, ref, disabled/loading contract
- [x] UI-004 SCSS Module과 `data-*` variant
- [x] UI-008 focus-visible, motion, reduced motion CSS
- [x] STYLE-005 component CSS layer
- [x] CMP-001 Button
- [x] CMP-002 IconButton
- [x] CMP-003 Spinner
- [x] CMP-004 Badge
- [x] component tests와 Storybook stories

## Phase 3

- [x] CMP-005 Input
- [x] CMP-006 Textarea
- [x] CMP-007 Checkbox
- [x] CMP-008 Card
- [x] native/keyboard/controlled 상태 테스트
- [x] Storybook stories와 dark theme 예시

## Phase 4

- [x] CMP-009 Dialog
- [x] CMP-010 Tooltip
- [x] CMP-011 DropdownMenu
- [x] Radix runtime dependencies 선언
- [x] portal, Escape, focus restore, keyboard interaction 테스트
- [x] Storybook play scenario와 a11y error 설정

## Phase 5

- [x] SB-001~007 Storybook catalog, docs, interaction/a11y 설정
- [x] light/dark/system theme toolbar와 nested theme scope
- [x] color, typography, spacing, radius, shadow, motion foundation stories
- [x] TW-001~004 선택형 Tailwind v4 adapter
- [x] Tailwind package README와 실제 utility CSS smoke test

## 스타일 정책

- 디자인 토큰과 고정 크기 값은 px 단위를 사용한다.
- 스타일 규칙은 `stylelint.config.mjs`와 `npm run stylelint`로 검증한다.

## 검증 결과

| 명령                                                | 결과 | 비고                                          |
| --------------------------------------------------- | ---- | --------------------------------------------- |
| `npm install`                                       | PASS | 487 packages audited, 취약점 0건              |
| `npm run format:check`                              | PASS | 모든 대상 파일이 Prettier 형식 준수           |
| `npm run lint`                                      | PASS | ESLint warning/error 0건                      |
| `npm run stylelint`                                 | PASS | SCSS/CSS 선언 순서와 논리 속성 규칙 준수      |
| `npm run typecheck`                                 | PASS | 루트 설정 및 UI workspace strict 검사 통과    |
| `npm run test`                                      | PASS | 11개 파일, 31개 component test 통과           |
| `npm run test:tailwind`                             | PASS | Tailwind v4 utility CSS smoke test 통과       |
| `npm run build-storybook`                           | PASS | Phase 2~5 component/foundation story 포함     |
| `npm run build -w @ddoni-ds/tokens`                 | PASS | `dist/tokens.css` 생성                        |
| `npm run test:smoke -w @ddoni-ds/tokens`            | PASS | 필수 토큰과 theme selector 확인               |
| `npm pack --dry-run --json -w @ddoni-ds/tokens`     | PASS | README, package.json, compiled CSS만 포함     |
| `npm run build -w @ddoni-ds/ui`                     | PASS | ESM, CJS, CSS, declaration 생성               |
| `npm pack --dry-run --json -w @ddoni-ds/ui`         | PASS | README, build output, type declaration만 포함 |
| `npx react-doctor@latest --verbose --scope changed` | PASS | 100/100, issue 없음                           |

## 알려진 이슈

- Phase 6~7은 아직 구현하지 않았습니다.
