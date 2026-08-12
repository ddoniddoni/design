# 구현 상태

- 마지막 갱신: 2026-08-13
- 현재 Phase: Storybook 문서 사이트 Day 7~8 정적 품질 검토와 배포 준비 완료
- 전체 상태: Storybook GitHub Pages 배포 완료, v0.5 패키지 릴리즈 승인 대기

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

## Phase 6

- [x] ARCH-030 일반 React Vite example
- [x] ARCH-031 Tailwind CSS v4 Vite example
- [x] ARCH-032 workspace package import와 CSS subpath export contract 검증
- [x] CSS variable brand color와 control radius override 예시

## Phase 7

- [x] QA-010 GitHub Actions CI
- [x] QA-011 format, lint, typecheck, test, build, Storybook, pack fail gates
- [x] REL-010 UI ESM/CJS/CSS/declaration build output와 dependency externalization
- [x] REL-011 CSS package side effects
- [x] REL-012 package tarball content 검사
- [x] REL-014 root/package README 소비자 예시
- [x] SCSS/CSS Custom Properties와 Tailwind adapter architecture decision records

## Phase 8

- [x] CMP-012 Field compound API
- [x] Field native props, ref, label/description/error 접근성 연결 테스트
- [x] Field Storybook states, interaction, docs, dark theme
- [x] 일반 React와 Tailwind 예제 앱 통합
- [x] public named export, declaration, package tarball 검증
- [x] clean typecheck을 위한 example workspace source type mapping

## Phase 9

- [x] CMP-013 Radix 기반 Switch
- [x] pointer/Space, controlled/uncontrolled, label, disabled, form/ref 테스트
- [x] Switch Storybook states, interaction, docs, dark theme
- [x] 일반 React와 Tailwind notification 설정 예제 통합
- [x] `@radix-ui/react-switch` stable runtime dependency 선언
- [x] public named export, dependency externalization, declaration, package tarball 검증

## Phase 10

- [x] CMP-014 semantic PageHeader compound API
- [x] Root/Content/Title/Description/Actions native props, ref, className 전달
- [x] semantic header, h1, description, optional actions 테스트
- [x] PageHeader Storybook 기본, actions 없음, 긴 콘텐츠, 좁은 영역, dark theme
- [x] 일반 React와 Tailwind 예제 앱의 중복 page header 교체
- [x] public named export, declaration, package tarball 검증

## Phase 11

- [x] CMP-015 Radix 기반 RadioGroup
- [x] role, accessible name, pointer/Arrow key, controlled/uncontrolled, disabled item 테스트
- [x] form name/required/value, Root와 Item native props/ref/className 전달 테스트
- [x] RadioGroup Storybook states, interaction, docs, dark theme
- [x] 일반 React와 Tailwind 예제 앱의 단일 선택 form 사례 통합
- [x] `@radix-ui/react-radio-group` stable runtime dependency 선언
- [x] public named export, declaration, package tarball 검증

## Phase 12

- [x] CMP-016 Radix 기반 Tabs
- [x] tablist/tab/tabpanel, accessible name, pointer/Arrow key, controlled/uncontrolled, disabled Trigger 테스트
- [x] Root/List/Trigger/Content native props, ref, className 전달 테스트
- [x] Tabs Storybook states, interaction, 긴 label, dark theme, docs
- [x] 일반 React와 Tailwind 예제 앱의 콘텐츠 전환 사례 통합
- [x] `@radix-ui/react-tabs` stable runtime dependency 선언
- [x] public named export, declaration, package tarball 검증

## Phase 13

- [x] CMP-017 Radix 기반 Accordion
- [x] Trigger semantics, pointer/Arrow key, controlled single, uncontrolled multiple, disabled Item 테스트
- [x] Root/Item/Header/Trigger/Content native props, ref, className 전달 테스트
- [x] Accordion Storybook states, interaction, 긴 content, dark theme, docs
- [x] 일반 React와 Tailwind 예제 앱의 disclosure 사례 통합
- [x] `@radix-ui/react-accordion` stable runtime dependency 선언
- [x] public named export, declaration, package tarball 검증

## Phase 14

- [x] CMP-018 Radix 기반 Popover
- [x] Trigger semantics, pointer click, controlled/uncontrolled, Close, Escape, focus restore, portal rendering 테스트
- [x] Anchor/Trigger/Content/Close/Arrow native props, ref, className 전달 테스트
- [x] Popover Storybook states, interaction, Anchor, dark theme, docs
- [x] 일반 React와 Tailwind 예제 앱의 contextual action 사례 통합
- [x] `@radix-ui/react-popover` stable runtime dependency 선언
- [x] public named export, declaration, package tarball 검증

## Phase 15

- [x] CMP-019 Radix 기반 Toast
- [x] background notification, Action altText/click, Close, controlled/uncontrolled, viewport F8 shortcut 테스트
- [x] Viewport/Root/Title/Description/Action/Close native props, ref, className 전달 테스트
- [x] Toast Storybook states, interaction, tone, dark theme, docs
- [x] 일반 React와 Tailwind 예제 앱의 action feedback 사례 통합
- [x] `@radix-ui/react-toast` stable runtime dependency 선언
- [x] public named export, declaration, package tarball 검증

## Phase 16

- [x] CMP-020 Skeleton visual-only placeholder
- [x] text/circle/rect shape, ref, className, native props 전달 테스트
- [x] reduced motion, dark theme, content preview Storybook docs
- [x] 일반 React와 Tailwind 예제 앱의 loading placeholder 사례 통합
- [x] public named export, declaration, token, package tarball 검증

## Phase 17

- [x] CMP-021 Radix 기반 Select
- [x] combobox/listbox/option role, pointer/Arrow/Enter, controlled/uncontrolled, Escape focus restore, disabled state 테스트
- [x] Trigger/Value/Icon/Content/Viewport/Group/Label/Item/Separator native props, ref, className와 form name/required/value 전달 테스트
- [x] grouped item, controlled, disabled, form, dark theme, Storybook interaction과 docs
- [x] 일반 React와 Tailwind 예제 앱의 single value form 사례 통합
- [x] `@radix-ui/react-select` stable runtime dependency, public named export, declaration, token, package tarball 검증

## Phase 18

- [x] CMP-022 semantic Pagination compound API
- [x] navigation/list/link semantics, current page `aria-current`, Ellipsis, native link click 테스트
- [x] Root/List/Item/Link/Previous/Next/Ellipsis native props, ref, className 전달 테스트
- [x] Pagination Storybook current/first page, dark theme, interaction과 docs
- [x] 일반 React와 Tailwind 예제 앱의 paged activity 사례 통합
- [x] public named export, declaration, token, package tarball 검증

## Phase 19

- [x] CMP-023 native semantic Table compound API
- [x] table/caption/header/cell semantic과 `scope`, `colSpan`, `rowSpan` native prop 전달 테스트
- [x] Container/Root/Caption/Header/Body/Footer/Row/Head/Cell native props, ref, className 전달 테스트
- [x] Table Storybook footer, narrow long-content container, dark theme과 docs
- [x] 일반 React와 Tailwind 예제 앱의 project status table 사례 통합
- [x] public named export, declaration, token, package tarball 검증

## Phase 20

- [x] CMP-024 EmptyState compound API
- [x] title/description semantics, visual-only Icon, consumer action click 테스트
- [x] Root/Icon/Title/Description/Actions native props, ref, className 전달 테스트
- [x] EmptyState Storybook action 없음, dark theme과 docs
- [x] 일반 React와 Tailwind 예제 앱의 empty project/search result 사례 통합
- [x] public named export, declaration, token, package tarball 검증

## Phase 21

- [x] CMP-025 semantic FilterBar compound API
- [x] named search landmark, consumer submit handler, native form behavior 테스트
- [x] Root/Controls/Actions native props, ref, className 전달 테스트
- [x] responsive layout, dark theme, Storybook interaction과 docs
- [x] 일반 React와 Tailwind 예제 앱의 project search/filter 사례 통합
- [x] public named export, declaration, token, package tarball 검증

## Storybook 문서 사이트

- [x] SB-007 25개 공개 component 상세 MDX Docs와 공통 3열 Docs 레이아웃
- [x] Docs·public export·sidebar 순서·Story 연결·public token 정적 계약 검사
- [x] `npm run check`에 `npm run check:storybook-docs` 통합
- [x] static Storybook build와 package tarball 검증
- [x] `develop` push 기반 GitHub Pages Storybook 배포 workflow와 project base path 구성
- [x] GitHub Pages 첫 배포 성공, HTTPS 공개 URL HTTP 200 응답 확인
- [ ] light/dark/system 시각 대비와 keyboard 수동 점검 (현재 세션에 연결 가능한 브라우저 없음)
- [ ] 배포된 Storybook의 수동 Docs 점검

## 브랜드 및 dark theme 품질 개선

- [x] TOK-003 기본 signature palette를 indigo에서 cobalt blue로 변경
- [x] TOK-006 dark primary action의 배경/foreground AA 대비 개선
- [x] TOK-007 `--dds-checkbox-indicator`, `--dds-switch-thumb-bg` component token 추가
- [x] CMP-007 checked/indeterminate indicator를 light/dark 모두 흰색으로 통일
- [x] CMP-007 label 조합을 center alignment와 `--dds-space-2` gap으로 통일
- [x] CMP-013 Switch thumb를 light/dark 모두 흰색으로 통일
- [x] 기존 brand override 예제를 AA 대비를 충족하는 teal palette로 교체
- [x] token smoke test에 brand 값과 foreground/control/focus contrast gate 추가
- [x] nested dark theme scope에서 component token을 다시 emit해 Accordion open background 대비 보장
- [x] non-solid primary accent foreground를 `--dds-color-text-link`로 통일해 dark surface 대비 보장

## v0.5 릴리즈 준비

- [x] public package와 workspace internal dependency version을 `0.5.0`으로 통일
- [x] CHANGELOG와 tokens → ui → tailwind publish 순서 문서화
- [x] release-ready `npm run check` 및 package tarball 검증
- [x] Storybook 문서 site release note와 사전 점검 절차 문서화
- [ ] npm registry publish, Git tag, GitHub release 생성 (별도 승인 필요)

## 스타일 정책

- 디자인 토큰과 고정 크기 값은 px 단위를 사용한다.
- 스타일 규칙은 `stylelint.config.mjs`와 `npm run stylelint`로 검증한다.

## 검증 결과

| 명령                                                | 결과 | 비고                                           |
| --------------------------------------------------- | ---- | ---------------------------------------------- |
| `npm ci`                                            | PASS | clean install로 641 packages 설치              |
| `npm run format:check`                              | PASS | 모든 대상 파일이 Prettier 형식 준수            |
| `npm run lint`                                      | PASS | ESLint warning/error 0건                       |
| `npm run stylelint`                                 | PASS | SCSS/CSS 선언 순서와 논리 속성 규칙 준수       |
| `npm run typecheck`                                 | PASS | 루트 설정 및 UI workspace strict 검사 통과     |
| `npm run test`                                      | PASS | 25개 파일, 72개 component test 통과            |
| `npm run test:tailwind`                             | PASS | Tailwind v4 utility CSS smoke test 통과        |
| `npm run build:examples`                            | PASS | React Vite와 Tailwind Vite consumer build 통과 |
| `npm run build-storybook`                           | PASS | Phase 2~21 component/foundation story 포함     |
| `npm run check:storybook-docs`                      | PASS | 25개 Docs, export, sidebar, Story, token 계약  |
| `npm run build -w @ddoni-ds/tokens`                 | PASS | `dist/tokens.css` 생성                         |
| `npm run test:smoke -w @ddoni-ds/tokens`            | PASS | 필수 토큰, theme selector, brand 대비 확인     |
| `npm pack --dry-run --json -w @ddoni-ds/tokens`     | PASS | README, package.json, compiled CSS만 포함      |
| `npm run build -w @ddoni-ds/ui`                     | PASS | ESM, CJS, CSS, declaration 생성                |
| `npm pack --dry-run --json -w @ddoni-ds/ui`         | PASS | README, build output, type declaration만 포함  |
| `npm run pack:check`                                | PASS | tokens 3, ui 113, tailwind 3 files 계약 통과   |
| `npm run check`                                     | PASS | Phase 0~21 전체 quality gate 통과              |
| `npx react-doctor@latest --verbose --scope changed` | PASS | full scan 100/100, issue 없음                  |

## 알려진 이슈

- 없음
