# ADR 0001: SCSS와 CSS Custom Properties의 역할 분리

- 상태: 승인
- 결정일: 2026-08-10

## 배경

디자인 시스템은 일반 React, plain CSS, Tailwind CSS 프로젝트에서 같은 컴포넌트와 테마 토큰을 사용해야 합니다. 소비자에게 Sass 빌드 환경을 요구하지 않으면서 runtime 테마 전환과 하위 컨테이너 단위 테마도 지원해야 합니다.

## 결정

SCSS Modules는 디자인 시스템 내부의 컴포넌트 스타일 authoring 도구로만 사용합니다. 외부 테마 API는 `--dds-*` prefix를 가진 CSS Custom Properties로 제공합니다.

- primitive, semantic, component token은 SCSS source에서 관리합니다.
- 빌드 결과는 일반 CSS와 CSS Custom Properties입니다.
- 소비자는 Sass 변수나 내부 map이 아닌 CSS Custom Properties를 재정의합니다.
- 전역 reset은 자동으로 주입하지 않습니다.

## 결과

- 소비자는 Sass 설치나 별도 전처리 없이 compiled CSS를 사용할 수 있습니다.
- light, dark, system 테마와 nested theme scope를 JavaScript 없이 구성할 수 있습니다.
- plain CSS, CSS Modules, Tailwind CSS 프로젝트가 동일한 token contract를 공유합니다.
- 공개 CSS token 이름 변경은 breaking change로 취급합니다.
- Sass 변수와 내부 map은 공개 호환성 계약이 아닙니다.
