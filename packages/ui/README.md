# @ddoni-ds/ui

DDoni Design System의 React 컴포넌트와 컴포넌트 CSS를 제공합니다. 모든 공개 API는 named export이며 React와 React DOM은 peer dependency입니다.

```bash
npm install @ddoni-ds/ui @ddoni-ds/tokens
```

토큰 CSS를 컴포넌트 CSS보다 먼저 import합니다.

```tsx
import "@ddoni-ds/tokens/tokens.css";
import "@ddoni-ds/ui/styles.css";
import { Button, Field, Input } from "@ddoni-ds/ui";

export function ProfileForm() {
  return (
    <form>
      <Field.Root>
        <Field.Label htmlFor="display-name">이름</Field.Label>
        <Input aria-describedby="display-name-description" id="display-name" name="displayName" />
        <Field.Description id="display-name-description">
          다른 사용자에게 표시할 이름입니다.
        </Field.Description>
      </Field.Root>
      <Button type="submit">저장</Button>
    </form>
  );
}
```

## 공개 컴포넌트

- Button, IconButton
- Spinner, Badge
- Field, Input, Textarea, Checkbox, Switch
- Card, PageHeader
- Dialog, Tooltip, DropdownMenu

컴포넌트는 native prop과 `className`을 전달하며, 해당하는 DOM 요소로 ref를 전달합니다. Dialog, Tooltip, DropdownMenu, Checkbox, Switch의 복합 접근성 동작은 Radix Primitives를 기반으로 합니다.

Switch는 변경 즉시 적용되는 boolean 설정에 사용하고, form 제출 시 확정되는 선택이나 약관 동의에는 Checkbox를 사용합니다.

```tsx
<Switch id="project-notifications" defaultChecked />
<label htmlFor="project-notifications">새 프로젝트 알림 받기</label>
```

PageHeader는 페이지의 주 제목과 설명, 대표 action을 semantic header로 묶습니다.

```tsx
<PageHeader.Root>
  <PageHeader.Content>
    <PageHeader.Title>프로젝트</PageHeader.Title>
    <PageHeader.Description>프로젝트 설정과 상태를 관리합니다.</PageHeader.Description>
  </PageHeader.Content>
  <PageHeader.Actions>
    <Button>새 프로젝트</Button>
  </PageHeader.Actions>
</PageHeader.Root>
```

## 테마 커스터마이징

브랜드 변경에는 component class override보다 `--dds-*` token override를 우선합니다.

```css
[data-dds-brand="violet"] {
  --dds-color-brand-600: #7c3aed;
  --dds-color-brand-700: #6d28d9;
  --dds-control-radius: 12px;
}
```

Tailwind CSS v4 프로젝트에서는 선택형 `@ddoni-ds/tailwind` 패키지를 추가할 수 있습니다. UI 패키지 자체는 Tailwind에 의존하지 않습니다.
