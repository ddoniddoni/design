# @ddoni-ds/tailwind

Tailwind CSS v4에서 DDoni Design System token을 utility로 연결하는 선택형 adapter입니다. `@ddoni-ds/ui`는 Tailwind에 의존하지 않습니다.

```bash
npm install @ddoni-ds/ui @ddoni-ds/tokens @ddoni-ds/tailwind tailwindcss
```

소비자 앱의 CSS에 아래 순서로 import합니다.

```css
@import "tailwindcss";
@import "@ddoni-ds/tokens/tokens.css";
@import "@ddoni-ds/tailwind/theme.css";
@import "@ddoni-ds/ui/styles.css";
```

```tsx
<div className="bg-dds-canvas p-dds-4 text-dds-text">
  <Button className="w-full">저장</Button>
</div>
```

브랜드나 control radius는 `--dds-*` CSS Custom Property를 override해 변경합니다.

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

```tsx
<section
  className="bg-dds-canvas p-dds-6 text-dds-text"
  data-dds-brand="teal"
  data-dds-theme="system"
>
  <Button className="w-full md:w-auto">저장</Button>
</section>
```

이 패키지는 UI 컴포넌트를 다시 구현하지 않으며 런타임 JavaScript를 포함하지 않습니다.

## 하위 브랜드 영역과 Portal

브랜드 변수를 하위 영역에서 재정의할 때는 같은 요소에 `data-dds-theme="light"`, `"dark"` 또는 `"system"`을 함께 지정합니다. 테마 선택을 앱에서 관리하면 현재 선택값을 전달합니다. semantic/component 토큰은 이 경계에서 재계산됩니다. `data-dds-brand`만 지정하면 상위에서 계산된 색상이 상속됩니다.

```tsx
<section data-dds-brand="teal" data-dds-theme="system">
  {/* 브랜드 CSS와 컴포넌트 */}
</section>
```

Dialog, Select, Popover, DropdownMenu, Tooltip의 기본 Portal은 `body`에 렌더링하면서 원래 위치의 `--dds-*` 토큰과 색상 모드를 유지합니다. 조상 요소의 테마·브랜드 속성, class, inline style 및 시스템 색상 모드 변경을 반영합니다. 명시적인 `container`를 전달하면 해당 컨테이너의 CSS 상속을 사용합니다.
