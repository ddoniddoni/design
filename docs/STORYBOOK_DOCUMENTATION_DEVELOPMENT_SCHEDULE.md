# Storybook 문서 사이트 개발 일정

> 기준일: 2026-08-12
> 예상 기간: **8영업일** (1인 개발, 문서 내용 검토 시간 제외)
> 범위: 현재 Storybook을 DDoni Design System의 공개 컴포넌트 문서 사이트로 확장한다.

## 진행 현황

- [x] Day 0 — Docs 도입 방식과 문서 source of truth 확정
- [x] Day 1 — Autodocs, sidebar 브랜딩, 고정 navigation hierarchy
- [x] Day 2 — 공통 3열 문서 레이아웃과 우측 목차
- [x] Day 3 — Button 파일럿 문서
- [x] Day 4 — Actions와 Forms 문서 확장
- [x] Day 5 — Layout, Navigation, Data Display 문서 확장
- [x] Day 6 — Feedback과 Overlays 문서 확장
- [ ] Day 7~8 — 품질 검토와 배포 준비
  - [x] Day 7 — 26개 문서의 정적 계약, 공개 export, sidebar 순서 자동 검증
  - [ ] Day 7 — 브라우저 수동 시각·키보드 점검 (현재 세션에 연결 가능한 브라우저 없음)
  - [x] Day 8 — 통합 정적 검증과 릴리즈 영향 범위 정리
  - [x] Day 8 — GitHub Pages hosting workflow 구성 및 첫 배포 성공
  - [ ] Day 8 — 배포된 Storybook 수동 확인 (첫 배포 후 확인)

## 1. 목표와 범위

현재 Storybook을 별도 문서 앱 없이 다음 구조의 문서 사이트로 만든다.

```text
┌────────────────────┬────────────────────────────────────────┬──────────────────┐
│ 좌측 네비게이션     │ 컴포넌트 문서 본문                      │ On this page     │
│ Foundations         │ 제목 · 목적 · 사용 기준                 │ 사용 예제        │
│ Components          │ 라이브 예제 · 코드 · 주요 Props         │ Variants         │
│   Actions           │ 접근성 · token 커스터마이징             │ 접근성           │
│   Forms             │                                        │ Props            │
└────────────────────┴────────────────────────────────────────┴──────────────────┘
```

### 포함

- Storybook 좌측 sidebar의 DDoni 브랜딩과 고정된 navigation 순서
- Docs 페이지의 공통 3열 레이아웃과 우측 목차
- 26개 공개 컴포넌트의 상세 문서
- 라이브 Story, 코드, 주요 Props, 접근성, `--dds-*` 토큰 안내
- `light`, `dark`, `system` theme toolbar에서의 문서 렌더링 확인
- 정적 Storybook build 검증

### 제외

- 새 Vite/Next.js 문서 앱 또는 npm workspace 추가
- 제품 소개용 랜딩 페이지와 SEO 작업
- GitHub Pages, Vercel 등 외부 배포 설정 및 실제 배포
- 컴포넌트 API 변경 또는 신규 컴포넌트 추가
- README 컴포넌트 카탈로그의 구조 변경

## 2. 구현 원칙

- Storybook Docs를 문서의 단일 source of truth로 사용한다. README는 설치와 카탈로그에 집중한다.
- 현재 Story는 Canvas와 Docs에서 모두 재사용한다. 스크린샷을 상세 문서의 주된 예제로 복제하지 않는다.
- CSS는 SCSS Modules를 사용하며, 공개 색상·간격 API는 기존 `--dds-*` token만 사용한다.
- 각 컴포넌트 문서는 명세 `SB-007`의 목적, 사용/비사용 기준, 기본 예제, 주요 props, 접근성, token 커스터마이징을 충족한다.
- Docs에 필요한 패키지는 현재 Storybook과 동일한 stable 버전으로만 추가하고 `package-lock.json`을 함께 갱신한다.
- 화면 폭이 좁아지면 우측 목차를 숨기고 본문을 우선한다. Storybook의 좌측 manager sidebar 동작은 유지한다.

## 3. 완료 기준

문서 사이트 작업은 아래 조건을 모두 만족하면 완료로 본다.

- 모든 공개 컴포넌트에 Docs 진입점이 있고, 좌측 메뉴에서 찾을 수 있다.
- Desktop에서 좌측 sidebar, 본문, 우측 목차가 함께 보인다.
- 우측 목차는 본문의 `h2` 섹션을 따라 이동하며, tablet/mobile에서는 레이아웃을 방해하지 않는다.
- Button 문서에는 `variant`, `tone`, `size`, icon, loading, disabled 예제와 접근성 안내가 포함된다.
- 나머지 24개 컴포넌트도 공통 문서 계약을 충족한다.
- `light`, `dark`, `system`에서 문서 텍스트, 표, 코드, Canvas 대비가 유지된다.
- `npm run check`와 `npm run build-storybook`이 통과한다.

## 4. 작업 일정

### Day 0 — 준비와 구조 확정 (0.5일)

#### 작업

- 현재 `.storybook/main.ts`, `.storybook/preview.ts`, story title hierarchy와 `componentDocs` 내용을 다시 점검한다.
- Storybook과 호환되는 Docs 패키지 버전을 확인하고, 필요 시 현재 Storybook과 같은 버전으로 추가한다.
- 문서의 source of truth를 확정한다.
  - 공통 문서 레이아웃: `.storybook/docs/`
  - 컴포넌트별 prose: component 옆의 `*.docs.mdx` 또는 type-safe 문서 메타데이터
  - 라이브 예제: 기존 `*.stories.tsx`
- 문서 section ID를 고정한다: `usage`, `variants`, `accessibility`, `props`, `tokens`.

#### 산출물

- 문서 파일 배치 결정
- dependency 추가가 필요할 때의 변경 목록
- 26개 컴포넌트 문서 inventory

#### 완료 기준

- Docs 기능과 Storybook 10.5.7의 호환 방식을 확인했다.
- component별 MDX를 전면 작성할지, 공통 template과 typed metadata를 조합할지 결정했다.

### Day 1 — Storybook Docs 기반 설정 (1일)

#### 작업

- `.storybook/main.ts`에 Docs/MDX discovery를 설정한다.
- 각 컴포넌트 meta에 Docs를 생성할 수 있는 `autodocs` 설정을 추가한다.
- `manager.ts`를 추가해 sidebar의 브랜드 색상, 타이포그래피, 선택 상태와 title을 DDoni 방향으로 맞춘다.
- `storySort`를 설정해 메뉴 순서를 아래처럼 고정한다.

```text
Foundations
  Colors, Typography, Spacing, Radius, Shadows, Motion
Components
  Actions: Button, IconButton
  Forms: Field, Input, Textarea, Checkbox, RadioGroup, Select, Switch, FilterBar
  Layout: Card, PageHeader
  Navigation: Accordion, Tabs, Pagination
  Data Display: Badge, Table
  Feedback: Alert, EmptyState, Skeleton, Spinner, Toast
  Overlays: Dialog, DropdownMenu, Popover, Tooltip
```

#### 산출물

- Docs entry가 sidebar에 표시되는 Storybook
- 고정된 navigation hierarchy

#### 완료 기준

- Canvas와 Docs를 모두 열 수 있다.
- 기존 Story URL과 play function이 깨지지 않는다.

### Day 2 — 공통 3열 문서 레이아웃 (1일)

#### 작업

- `.storybook/docs/DocsPage.tsx`와 대응 SCSS Module을 만든다.
- Docs Container를 확장해 본문 최대 폭, 읽기 좋은 typography, 코드 블록, 표 스타일을 적용한다.
- `TableOfContents` 기반 우측 목차를 추가한다.
- 반응형 동작을 구현한다.
  - desktop: 본문과 목차를 나란히 표시
  - tablet: 목차 폭 축소 또는 접기
  - mobile: 목차 숨김, 본문 단일 열
- docs iframe과 manager UI 모두에서 light/dark/system 대비를 확인한다.

#### 산출물

- 모든 Docs 페이지가 공유하는 3열 shell
- dark mode를 포함한 반응형 문서 레이아웃

#### 완료 기준

- 우측 목차가 `h2`를 올바르게 수집한다.
- 작은 화면에서 가로 스크롤과 겹침이 없다.

### Day 3 — Button 파일럿 문서 (1일)

#### 작업

- `Button`에 상세 Docs 페이지를 작성한다.
- 다음 순서로 섹션을 구성한다.
  1. 목적과 사용/비사용 기준
  2. 기본 사용 예제
  3. variant, tone, size
  4. icon, loading, disabled
  5. 주요 Props와 native props 전달 원칙
  6. 접근성: native button semantics, loading, icon-only label
  7. `--dds-button-*`, `--dds-control-*` 커스터마이징
- 각 예제는 기존 Story를 재사용하고 Source block으로 코드도 노출한다.
- Docs 탭과 Canvas 탭에서 theme toolbar 전환을 확인한다.

#### 산출물

- 이후 컴포넌트가 따를 Button 문서의 기준 페이지
- 재사용 가능한 section 구성과 문서 작성 규칙

#### 완료 기준

- `SB-007`의 모든 항목이 Button 문서에 존재한다.
- docs page에서 live example, source, Props가 서로 일치한다.

### Day 4 — Actions와 Forms 문서 확장 (1일)

#### 대상

- Actions: `IconButton`
- Forms: `Field`, `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Switch`, `FilterBar`

#### 작업

- Button 파일럿 template을 적용한다.
- 각 컴포넌트의 사용 구분을 명확히 한다.
  - Checkbox vs RadioGroup vs Switch
  - Input vs Textarea
  - Select vs RadioGroup
  - Field와 개별 control의 책임
- form label, error, disabled, controlled state, keyboard 조작 내용을 접근성 섹션에 반영한다.
- `componentDocs`의 기존 prose를 구조화된 section으로 옮기거나 확장한다.

#### 완료 기준

- 9개 대상 모두 기본 사용 예제와 접근성 주의점이 있다.
- dark theme에서 form control, label, error text의 대비를 확인했다.

### Day 5 — Layout, Navigation, Data Display 문서 확장 (1일)

#### 대상

- Layout: `Card`, `PageHeader`
- Navigation: `Accordion`, `Tabs`, `Pagination`
- Data Display: `Badge`, `Table`

#### 작업

- compound component의 조합 예제를 중심으로 문서화한다.
- 사용하지 않는 경우를 명확히 적는다.
  - Tabs vs Accordion
  - Pagination vs infinite scroll
  - Table vs DataGrid
  - Card의 product-specific layout 제한
- Table caption/scope, Pagination `aria-current`, Accordion과 Tabs keyboard navigation을 별도 접근성 항목으로 검토한다.

#### 완료 기준

- 대상 7개가 공통 문서 template을 충족한다.
- long-content와 dark theme story에서 문서의 예제가 정상 렌더링된다.

### Day 6 — Feedback과 Overlays 문서 확장 (1일)

#### 대상

- Feedback: `Alert`, `EmptyState`, `Skeleton`, `Spinner`, `Toast`
- Overlays: `Dialog`, `DropdownMenu`, `Popover`, `Tooltip`

#### 작업

- 비동기 피드백의 쓰임을 구분한다.
  - Alert vs Toast, EmptyState vs Skeleton vs Spinner
- overlay의 role, focus, Escape, trigger focus 복귀, modal 여부를 문서화한다.
- Tooltip이 essential information의 유일한 전달 수단이 되지 않도록 안내한다.
- Dialog, DropdownMenu, Popover, Tooltip의 interaction story를 docs 예제로 연결한다.

#### 완료 기준

- 대상 8개가 공통 문서 template을 충족한다.
- 오버레이 문서가 실제 keyboard/focus 동작과 충돌하지 않는다.

### Day 7 — 품질 점검과 문서 일관성 보정 (1일)

#### 작업

- 26개 문서의 제목, section ID, tone, code snippet, token 이름을 일괄 점검한다.
- 좌측 메뉴 순서와 component naming을 API export 이름과 대조한다.
- light/dark/system에서 다음을 수동 시각 검증한다.
  - sidebar 선택 상태
  - 본문/표/코드 텍스트 대비
  - Canvas 내부 컴포넌트 대비
  - 우측 목차 활성 상태
- 키보드로 sidebar, Docs tab, Canvas controls, overlay 예제를 점검한다.
- 필요 시 Storybook interaction test와 component test를 보완한다.

#### 완료 기준

- 문서의 link, anchor, live Story, Source block에 깨진 항목이 없다.
- Docs UI에서 새로운 console error/warning이 없다.

### Day 8 — 통합 검증과 배포 준비 (0.5~1일)

#### 작업

- 아래 명령을 실행한다.

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run build-storybook
npm run pack:check
```

- Storybook static output을 로컬에서 열어 production build의 sidebar, Docs, theme와 anchor를 확인한다.
- 변경 파일, package lock, 문서 assets, release 영향 범위를 정리한다.
- 배포가 승인된 경우에만 hosting 대상과 public URL을 결정한다.

#### 완료 기준

- `npm run check` 통과
- 정적 Storybook build에서 26개 Docs 페이지를 탐색할 수 있음
- 배포 작업은 별도 승인 항목으로 분리됨

## 5. 마일스톤과 의사결정 지점

| 시점       | 마일스톤                      | 확인할 결정                                  |
| ---------- | ----------------------------- | -------------------------------------------- |
| Day 1 종료 | Docs entry와 좌측 메뉴 완성   | docs가 현재 Storybook 내에서 충분한지 확인   |
| Day 3 종료 | Button 파일럿 완성            | typography, 목차, 예제 밀도를 승인한 뒤 확장 |
| Day 6 종료 | 26개 component 문서 초안 완성 | 문서 내용의 제품/디자인 검토                 |
| Day 8 종료 | 정적 build 검증 완료          | hosting과 배포 시점 결정                     |

Button 파일럿이 승인되기 전에는 24개 컴포넌트로 대량 확장하지 않는다. 레이아웃과 문서 tone을 먼저 고정해 재작업을 줄인다.

## 6. 예상 파일 변경 범위

| 위치                                                | 변경 목적                                        |
| --------------------------------------------------- | ------------------------------------------------ |
| `.storybook/main.ts`                                | Docs/MDX discovery와 sidebar 순서 설정           |
| `.storybook/manager.ts`                             | Storybook manager branding과 sidebar theme       |
| `.storybook/preview.ts`                             | Docs Container, theme, 공통 parameter            |
| `.storybook/docs/DocsPage.tsx`                      | 문서 본문과 우측 목차를 감싸는 공통 layout       |
| `.storybook/docs/DocsPage.module.scss`              | 문서 layout의 SCSS Module 스타일                 |
| `packages/ui/src/components/*/*.stories.tsx`        | autodocs metadata와 docs parameter 보강          |
| `packages/ui/src/components/*/*.docs.mdx`           | 컴포넌트별 상세 prose가 필요한 경우              |
| `packages/ui/src/stories/internal/componentDocs.ts` | 기존 설명을 template에서 재사용할 수 있게 구조화 |
| `package.json`, `package-lock.json`                 | 공식 Docs 패키지가 필요한 경우에만 갱신          |

## 7. 위험 요소와 대응

| 위험 요소                                          | 영향                        | 대응                                                              |
| -------------------------------------------------- | --------------------------- | ----------------------------------------------------------------- |
| Docs addon과 Storybook 버전 불일치                 | build 실패 또는 Docs 미노출 | 현재 Storybook과 동일한 stable version 사용, 설치 직후 build 확인 |
| Docs layout이 manager sidebar까지 직접 제어하려 함 | Storybook UI와 충돌         | 좌측은 manager config, 본문/목차는 Docs Container로 책임 분리     |
| 26개 문서를 개별 MDX로 즉시 작성                   | 중복과 내용 불일치          | Button 파일럿 후 공통 template·metadata를 우선 확정               |
| 다크 모드에서 prose/코드 대비 저하                 | 문서 가독성 저하            | theme toolbar별 시각 검증을 Day 7 완료 기준에 포함                |
| Docs 예제와 실제 API 불일치                        | 사용자 신뢰 저하            | 정적 코드 대신 기존 Story와 Source block 재사용                   |
| 문서 작업이 API 변경으로 번짐                      | 범위 확대                   | API 변경은 별도 issue/phase로 분리                                |

## 8. 후속 배포 일정 (별도 승인)

문서 UI가 완료된 뒤 hosting이 승인되면 아래 작업을 별도 0.5~1일 범위로 진행한다.

1. `storybook-static`을 제공할 hosting을 결정한다.
2. repository public/private 설정, base path, custom domain 필요 여부를 확인한다.
3. CI에서 `npm run build-storybook`과 artifact 배포를 구성한다.
4. 배포 URL, 버전 정책, 변경 로그 연결을 README와 `docs/RELEASE.md`에 추가한다.

이 작업은 npm package publish와 분리한다. 패키지 릴리즈가 문서 배포를 자동으로 외부에 노출하지 않도록 한다.
