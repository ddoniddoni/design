# v0.5.0 릴리즈 절차

## 준비 완료 상태

- public workspace package version은 모두 `0.5.0`이다.
- `@ddoni-ds/ui`는 `@ddoni-ds/tokens@0.5.0`을 runtime dependency로 사용한다.
- `npm run check`와 각 package tarball 검사가 통과한 상태에서만 배포한다.
- 실제 publish 전에는 작업 트리가 깨끗하고 `develop`이 원격과 동기화되어야 한다.

## 사전 확인

```bash
npm whoami
npm run check
git status --short --branch
git log -1 --oneline
```

`npm whoami`로 공개 npm registry의 계정과 `@ddoni-ds` scope publish 권한을 확인한다. package name과 version이 이미 배포된 경우에는 version을 새로 올린다.

## Storybook 문서 사전 점검

`npm run check`는 정적 Storybook build와 29개 공개 component 문서의 계약 검사를 함께 실행합니다. publish 또는 문서 hosting을 승인하기 전에는 build 결과에서 다음을 수동으로 확인합니다.

- light, dark, system theme의 Docs 본문·표·코드·Canvas 대비
- sidebar에서 각 Docs 진입점과 우측 목차 anchor 이동
- overlay 예제의 keyboard 동작과 focus 복귀

문서 hosting은 npm package publish와 별도 승인 항목입니다. GitHub Pages 배포는 [GitHub Pages Storybook 배포 안내](GITHUB_PAGES.md)를 따릅니다. `storybook-static`은 build 산출물이므로 커밋하거나 npm package에 포함하지 않습니다.

## 배포 순서

`@ddoni-ds/ui`가 tokens의 정확한 version을 의존하므로 아래 순서를 지킨다.

```bash
npm publish -w @ddoni-ds/tokens --access public
npm publish -w @ddoni-ds/ui --access public
npm publish -w @ddoni-ds/tailwind --access public
```

## 배포 후 확인

```bash
npm view @ddoni-ds/tokens@0.5.0 version
npm view @ddoni-ds/ui@0.5.0 version
npm view @ddoni-ds/tailwind@0.5.0 version
git tag -a v0.5.0 -m "v0.5.0"
git push origin v0.5.0
```

배포 결과를 [CHANGELOG.md](../CHANGELOG.md)와 함께 GitHub release에 기록한다. npm publish와 Git tag push는 외부 공개 작업이므로 별도 승인 후 실행한다.
