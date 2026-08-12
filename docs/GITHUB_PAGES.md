# GitHub Pages Storybook 배포

Storybook 문서 사이트는 GitHub Pages에서 정적으로 제공합니다. npm package 배포와는 독립적입니다.

## 배포 주소

기본 GitHub Pages 주소는 다음과 같습니다.

```text
https://ddoniddoni.github.io/design/
```

프로젝트 Pages이므로 Storybook build는 GitHub Actions에서 repository 이름을 base path로 사용합니다. custom domain을 연결하기 전에는 이 주소를 README와 공유 링크에 사용합니다.

## 자동 배포

`.github/workflows/deploy-storybook.yml`은 다음 경우에 실행됩니다.

- `develop` 브랜치 push
- GitHub Actions의 수동 실행

workflow는 `npm ci`, `npm run build-storybook`, GitHub Pages artifact 업로드, Pages 배포 순서로 동작합니다. `storybook-static`은 workflow artifact일 뿐 Git에 커밋하지 않습니다.

## 최초 활성화

GitHub repository의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다. 이후 workflow를 실행하면 `github-pages` environment와 공개 URL이 생성됩니다.

workflow는 `pages: write`, `id-token: write` 권한만 사용하며 npm publish 권한이나 npm token을 요구하지 않습니다.

## 운영 확인

1. Actions에서 **Deploy Storybook** workflow의 Build와 Deploy job이 모두 성공했는지 확인합니다.
2. 배포 job이 출력한 URL에서 Docs, Canvas, theme toolbar를 확인합니다.
3. 문제가 있으면 Actions에서 이전 workflow run의 artifact와 log를 확인합니다.

Pages는 정적 공개 사이트입니다. package source나 비밀값, 인증이 필요한 콘텐츠를 artifact에 포함하지 않습니다.
