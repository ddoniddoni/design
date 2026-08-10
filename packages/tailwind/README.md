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
<section className="bg-dds-canvas p-dds-6 text-dds-text" data-dds-brand="teal">
  <Button className="w-full md:w-auto">저장</Button>
</section>
```

이 패키지는 UI 컴포넌트를 다시 구현하지 않으며 런타임 JavaScript를 포함하지 않습니다.
