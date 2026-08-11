# @ddoni-ds/tokens

DDoni Design System의 CSS Custom Properties 토큰 패키지입니다. light, dark, system 테마와 `--dds-*` 공개 토큰을 제공합니다.

```bash
npm install @ddoni-ds/tokens
```

애플리케이션 전역 CSS 또는 JavaScript 엔트리에서 한 번 import합니다.

```tsx
import "@ddoni-ds/tokens/tokens.css";
```

루트나 하위 컨테이너에 테마 속성을 설정할 수 있습니다. 속성이 없으면 light 테마가 기본입니다.

```html
<html data-dds-theme="system">
  <!-- application -->
</html>
```

브랜드와 컴포넌트 표현은 Sass 변수가 아니라 공개 CSS Custom Property로 재정의합니다.
기본 signature palette는 cobalt blue입니다. Checkbox와 RadioGroup의 선택 표시는 각각 `--dds-checkbox-indicator`, `--dds-radio-indicator`로, Switch thumb는 `--dds-switch-thumb-bg`로 조정할 수 있습니다. Tabs의 구분선과 활성 상태는 `--dds-tabs-border`, `--dds-tabs-active-border`, `--dds-tabs-active-text`로 조정합니다. Accordion의 구분선과 Trigger 상태 배경은 `--dds-accordion-border`, `--dds-accordion-trigger-hover-bg`, `--dds-accordion-trigger-open-bg`로 조정합니다. Popover의 surface는 `--dds-popover-bg`, `--dds-popover-border`, `--dds-popover-radius`, `--dds-popover-shadow`로 조정합니다. Toast의 surface와 tone accent는 `--dds-toast-*` token으로 조정합니다. Skeleton의 shimmer는 `--dds-skeleton-bg`, `--dds-skeleton-highlight`, `--dds-skeleton-radius`로 조정합니다.

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

기본 sans-serif 토큰은 Pretendard를 우선합니다. UI 패키지는 폰트 파일을 포함하지 않으므로, 소비자 앱에서는 Pretendard를 직접 호스팅하거나 공식 CDN을 로드해야 합니다.

이 패키지는 compiled `dist/tokens.css`만 배포하며 소비자에게 Sass 처리를 요구하지 않습니다.
