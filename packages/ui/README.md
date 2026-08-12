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
- Spinner, Skeleton, EmptyState, Badge, Toast
- Field, FilterBar, Input, Textarea, Checkbox, RadioGroup, Select, Switch
- Card, PageHeader, Pagination, Table, Tabs, Accordion
- Dialog, Tooltip, Popover, DropdownMenu

컴포넌트는 native prop과 `className`을 전달하며, 해당하는 DOM 요소로 ref를 전달합니다. Dialog, Tooltip, Popover, DropdownMenu, Checkbox, RadioGroup, Select, Switch, Tabs, Accordion의 복합 접근성 동작은 Radix Primitives를 기반으로 합니다.

Dark theme에서도 선택 표시가 선명하도록 Checkbox·RadioGroup indicator와 Switch thumb는 기본적으로 흰색 component token을 사용합니다.

Skeleton은 카드나 목록의 구조를 유지하며 데이터를 불러올 때 사용하는 시각 전용 placeholder입니다. 로딩 상태와 이름은 Skeleton이 아닌 상위 컨테이너에 제공합니다.

```tsx
<section aria-busy="true" aria-label="프로필 정보를 불러오는 중">
  <Skeleton style={{ inlineSize: "12rem" }} />
  <Skeleton shape="rect" />
</section>
```

`shape`는 `text`, `circle`, `rect`를 지원하며, 크기와 배치는 native `style` 또는 `className`으로 조정합니다. 표현은 `--dds-skeleton-bg`, `--dds-skeleton-highlight`, `--dds-skeleton-radius` token으로 재정의합니다.

Checkbox와 label은 control 자체에 margin을 넣지 않고, 소비자 layout에서 중앙 정렬과 token gap을 함께 적용합니다.

```tsx
<div className="checkboxField">
  <Checkbox id="terms" />
  <label htmlFor="terms">이용약관에 동의합니다</label>
</div>
```

```css
.checkboxField {
  display: inline-flex;
  align-items: center;
  gap: var(--dds-space-2);
}
```

Switch는 변경 즉시 적용되는 boolean 설정에 사용하고, form 제출 시 확정되는 선택이나 약관 동의에는 Checkbox를 사용합니다.

```tsx
<Switch id="project-notifications" defaultChecked />
<label htmlFor="project-notifications">새 프로젝트 알림 받기</label>
```

RadioGroup은 여러 항목 중 하나를 선택하는 form 값에 사용합니다. 각 Item은 외부 label과 `--dds-space-2` gap으로 조합합니다.

```tsx
<RadioGroup.Root aria-label="프로젝트 공개 범위" defaultValue="team" name="visibility">
  <div className="radioOption">
    <RadioGroup.Item id="visibility-team" value="team" />
    <label htmlFor="visibility-team">팀 전용</label>
  </div>
</RadioGroup.Root>
```

```css
.radioOption {
  display: inline-flex;
  align-items: center;
  gap: var(--dds-space-2);
}
```

Select는 여러 옵션 중 하나를 compact한 trigger와 listbox로 선택할 때 사용합니다. 검색, 다중 선택, 새 값 생성이 필요하다면 전용 Combobox를 사용합니다.

```tsx
<Field.Root>
  <Field.Label htmlFor="project-template">프로젝트 템플릿</Field.Label>
  <Select.Root defaultValue="product" name="template">
    <Select.Trigger id="project-template">
      <Select.Value placeholder="템플릿을 선택하세요" />
      <Select.Icon />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="product">제품 개발</Select.Item>
          <Select.Item value="marketing">마케팅 캠페인</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</Field.Root>
```

`Root`의 `value`, `defaultValue`, `onValueChange`, `name`, `required`, `disabled`를 사용합니다. `Content`는 trigger 폭과 사용 가능한 viewport 높이를 따르며, `--dds-select-*` token으로 surface와 상태를 재정의합니다.

FilterBar는 목록 검색과 filter control을 form landmark로 묶습니다. 검색 결과, URL 동기화, debounce, reset 동작은 consumer가 관리합니다.

```tsx
<FilterBar.Root aria-label="프로젝트 필터" onSubmit={handleSubmit}>
  <FilterBar.Controls>
    <Field.Root>
      <Field.Label htmlFor="project-query">프로젝트 검색</Field.Label>
      <Input id="project-query" name="query" />
    </Field.Root>
  </FilterBar.Controls>
  <FilterBar.Actions>
    <Button type="submit">검색</Button>
    <Button type="reset" tone="neutral" variant="outline">
      초기화
    </Button>
  </FilterBar.Actions>
</FilterBar.Root>
```

Root는 이름 있는 `search` landmark를 렌더링하며, `--dds-filter-bar-*` token으로 surface를 재정의합니다.

Pagination은 여러 페이지로 나뉜 목록의 위치와 이동 링크를 표시합니다. 실제 URL, 라우터 이동, 데이터 상태는 소비자가 관리합니다.

```tsx
<Pagination.Root aria-label="프로젝트 목록 페이지">
  <Pagination.List>
    <Pagination.Item>
      <Pagination.Previous href="?page=1" />
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link aria-current="page" aria-label="2페이지" href="?page=2">
        2
      </Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Next href="?page=3" />
    </Pagination.Item>
  </Pagination.List>
</Pagination.Root>
```

현재 페이지에는 `aria-current="page"`를 지정하고, page link에는 목적지를 알 수 있는 accessible name을 제공합니다. `Ellipsis`는 시각 전용이며 `--dds-pagination-*` token으로 상태를 재정의합니다.

Table은 열 간 비교가 필요한 구조화된 목록을 native table semantics로 표시합니다. 데이터 정렬, 선택, 가상화는 consumer가 구성하거나 DataGrid를 사용합니다.

```tsx
<Table.Container>
  <Table.Root>
    <Table.Caption>프로젝트 목록</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head scope="col">프로젝트</Table.Head>
        <Table.Head scope="col">상태</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>디자인 시스템</Table.Cell>
        <Table.Cell>진행 중</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</Table.Container>
```

`Caption`으로 table의 이름을 제공하고, `Head`에는 적절한 `scope`를 설정합니다. `Container`는 좁은 화면의 가로 스크롤을 제공하며 `--dds-table-*` token으로 표현을 재정의합니다.

EmptyState는 목록이나 검색 결과가 비어 있을 때 이유와 다음 action을 안내합니다. Icon은 장식 전용이며 action은 consumer가 `Actions`에 조합합니다.

```tsx
<EmptyState.Root>
  <EmptyState.Icon>□</EmptyState.Icon>
  <EmptyState.Title>프로젝트가 없습니다</EmptyState.Title>
  <EmptyState.Description>새 프로젝트를 만들어 작업을 시작하세요.</EmptyState.Description>
  <EmptyState.Actions>
    <Button>새 프로젝트 만들기</Button>
  </EmptyState.Actions>
</EmptyState.Root>
```

제목은 `h2`로 렌더링되므로 페이지의 heading hierarchy에 맞게 사용합니다. `--dds-empty-state-*` token으로 표면과 icon 표현을 재정의합니다.

Tabs는 연관된 콘텐츠 영역을 전환할 때 사용합니다. List에는 접근 가능한 이름을 제공합니다.

```tsx
<Tabs.Root defaultValue="overview">
  <Tabs.List aria-label="프로젝트 설정">
    <Tabs.Trigger value="overview">개요</Tabs.Trigger>
    <Tabs.Trigger value="members">멤버</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">프로젝트 기본 정보</Tabs.Content>
  <Tabs.Content value="members">프로젝트 멤버</Tabs.Content>
</Tabs.Root>
```

Accordion은 FAQ나 보조 안내처럼 독립적인 여러 콘텐츠를 접고 펼칠 때 사용합니다.

```tsx
<Accordion.Root defaultValue="usage" type="single">
  <Accordion.Item value="usage">
    <Accordion.Header>
      <Accordion.Trigger>언제 사용하나요?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>연관된 보조 정보를 필요한 순간에 표시합니다.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

Popover는 trigger 또는 anchor 근처에 간단한 보조 설정과 action을 표시할 때 사용합니다. Content에는 접근 가능한 이름을 제공합니다.

```tsx
<Popover.Root>
  <Popover.Trigger asChild>
    <Button tone="neutral" variant="outline">
      공유 옵션
    </Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content aria-label="공유 옵션">
      프로젝트 링크를 복사할 수 있습니다.
      <Popover.Close asChild>
        <Button size="sm">닫기</Button>
      </Popover.Close>
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
```

Toast는 저장 완료처럼 일시적인 피드백에 사용합니다. 비긴급 알림은 `type="background"`로 설정하고, Action에는 `altText`를 제공합니다.

```tsx
<Toast.Provider duration={5000}>
  <Toast.Root defaultOpen tone="success" type="background">
    <Toast.Title>저장 완료</Toast.Title>
    <Toast.Description>프로젝트 설정을 저장했습니다.</Toast.Description>
    <Toast.Action altText="저장 변경을 실행 취소합니다.">실행 취소</Toast.Action>
    <Toast.Close aria-label="알림 닫기">닫기</Toast.Close>
  </Toast.Root>
  <Toast.Viewport label="알림 ({hotkey})" />
</Toast.Provider>
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

Tailwind CSS v4 프로젝트에서는 선택형 `@ddoni-ds/tailwind` 패키지를 추가할 수 있습니다. UI 패키지 자체는 Tailwind에 의존하지 않습니다.
