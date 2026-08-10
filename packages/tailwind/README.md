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
[data-dds-brand="violet"] {
  --dds-color-brand-600: #7c3aed;
  --dds-color-brand-700: #6d28d9;
  --dds-control-radius: 12px;
}
```

```tsx
<section className="bg-dds-canvas p-dds-6 text-dds-text" data-dds-brand="violet">
  <Button className="w-full md:w-auto">저장</Button>
</section>
```

이 패키지는 UI 컴포넌트를 다시 구현하지 않으며 런타임 JavaScript를 포함하지 않습니다.
