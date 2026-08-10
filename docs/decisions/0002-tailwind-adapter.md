# ADR 0002: Tailwind CSS 선택형 어댑터 분리

- 상태: 승인
- 결정일: 2026-08-10

## 배경

일부 소비자는 Tailwind CSS v4 utility를 사용하지만, UI 패키지를 특정 styling framework에 종속시키면 Tailwind를 사용하지 않는 프로젝트에도 불필요한 의존성과 빌드 제약이 생깁니다.

## 결정

Tailwind CSS는 `@ddoni-ds/ui`의 dependency가 아닙니다. 별도 패키지인 `@ddoni-ds/tailwind`가 `@theme inline`을 통해 `--dds-*` semantic token을 Tailwind namespace에 연결합니다.

- UI 컴포넌트 스타일은 SCSS Modules로 유지합니다.
- 어댑터는 plain `theme.css`만 배포하고 런타임 JavaScript를 포함하지 않습니다.
- 어댑터는 UI 컴포넌트를 Tailwind utility로 다시 구현하지 않습니다.
- Tailwind major 호환 범위는 peer dependency로 명시합니다.

## 결과

- Tailwind를 사용하지 않는 소비자는 추가 의존성이나 비용이 없습니다.
- Tailwind v4 소비자는 `bg-dds-canvas`, `text-dds-text` 같은 semantic utility를 사용할 수 있습니다.
- UI component token과 Tailwind utility가 동일한 `--dds-*` 값을 공유합니다.
- Tailwind major 변경 시 어댑터 호환성만 독립적으로 검토할 수 있습니다.
