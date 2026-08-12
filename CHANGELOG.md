# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/)을 따릅니다.

## [0.5.0] - 2026-08-12

### Added

- `@ddoni-ds/ui`: Select, Pagination, Table, EmptyState, FilterBar component API
- 일반 React와 Tailwind CSS v4 예제의 form, data display, empty state, filtering 사례
- 각 신규 component의 Storybook docs, dark theme story, interaction/component test
- 25개 공개 component를 탐색할 수 있는 Storybook 문서 사이트와 공통 3열 Docs 레이아웃
- 문서·공개 export·sidebar 순서·Story 연결·공개 token을 검사하는 `npm run check:storybook-docs` 품질 게이트
- `develop` push로 Storybook을 [GitHub Pages](https://ddoniddoni.github.io/design/)에 배포하는 workflow

### Changed

- 기본 signature palette를 cobalt blue로 정리하고, checkbox·radio indicator와 switch thumb의 foreground를 light/dark에서 흰색으로 통일
- component token을 nested theme scope마다 다시 emit하도록 해 하위 dark theme도 안전하게 적용
- non-solid primary accent foreground를 `--dds-color-text-link`로 통일해 dark surface 대비를 개선

### Fixed

- dark theme Accordion open state의 surface와 text 대비
- primary outline/ghost Button·IconButton, primary Badge, Tabs, Select, EmptyState의 dark theme accent 대비
