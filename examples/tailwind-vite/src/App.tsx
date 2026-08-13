import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  FilterBar,
  Input,
  PageHeader,
  Pagination,
  Popover,
  RadioGroup,
  Select,
  Skeleton,
  Switch,
  Table,
  Tabs,
  Toast,
  Tooltip,
} from "@ddoni-ds/ui";

function ToastFeedback() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider duration={5_000} label="Tailwind 예제 알림">
      <section className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6">
        <div>
          <p className="text-dds-sm text-dds-text-muted">Feedback primitive</p>
          <h2 className="text-dds-lg font-semibold">Toast와 Tailwind layout utility</h2>
        </div>
        <Button className="justify-self-start" onClick={() => setOpen(true)}>
          저장 완료 알림 표시
        </Button>
      </section>
      <Toast.Root open={open} onOpenChange={setOpen} tone="success" type="background">
        <Toast.Title>프로젝트 설정을 저장했습니다.</Toast.Title>
        <Toast.Description>Toast surface도 동일한 token과 theme을 사용합니다.</Toast.Description>
        <Toast.Close aria-label="Tailwind 예제 알림 닫기">닫기</Toast.Close>
      </Toast.Root>
      <Toast.Viewport label="Tailwind 예제 알림 ({hotkey})" />
    </Toast.Provider>
  );
}

function AlertPreview() {
  return (
    <section
      aria-labelledby="alert-preview-title"
      className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6"
    >
      <div>
        <p className="text-dds-sm text-dds-text-muted">Inline feedback primitive</p>
        <h2 id="alert-preview-title" className="text-dds-lg font-semibold">
          Alert와 Tailwind layout utility
        </h2>
      </div>
      <Alert.Root tone="info">
        <Alert.Title>프로젝트 공개 범위가 변경되었습니다</Alert.Title>
        <Alert.Description>이제 링크를 아는 사용자가 프로젝트를 볼 수 있습니다.</Alert.Description>
        <Alert.Actions>
          <Button size="sm">공유 설정 보기</Button>
        </Alert.Actions>
      </Alert.Root>
    </section>
  );
}

function SkeletonPreview() {
  return (
    <section
      aria-labelledby="skeleton-title"
      className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6"
    >
      <div>
        <p className="text-dds-sm text-dds-text-muted">Loading primitive</p>
        <h2 id="skeleton-title" className="text-dds-lg font-semibold">
          Skeleton과 Tailwind layout utility
        </h2>
      </div>
      <div aria-busy="true" aria-label="프로젝트 정보를 불러오는 중" className="grid gap-dds-4">
        <div className="flex items-center gap-dds-3">
          <Skeleton shape="circle" className="size-10" />
          <div className="grid flex-1 gap-dds-2">
            <Skeleton className="max-w-[10rem]" />
            <Skeleton className="max-w-[18rem]" />
          </div>
        </div>
        <Skeleton shape="rect" className="min-h-24" />
      </div>
    </section>
  );
}

function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(2);

  function handlePageChange(event: MouseEvent<HTMLAnchorElement>, page: number) {
    event.preventDefault();
    setCurrentPage(page);
  }

  return (
    <section
      aria-labelledby="pagination-title"
      className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6"
    >
      <div>
        <p className="text-dds-sm text-dds-text-muted">Navigation primitive</p>
        <h2 id="pagination-title" className="text-dds-lg font-semibold">
          Pagination과 Tailwind layout utility
        </h2>
      </div>
      <p aria-live="polite" className="text-dds-sm text-dds-text-muted">
        최근 활동 {currentPage}페이지를 보고 있습니다.
      </p>
      <Pagination.Root aria-label="Tailwind 최근 활동 페이지" className="justify-self-start">
        <Pagination.List>
          {currentPage > 1 ? (
            <Pagination.Item>
              <Pagination.Previous
                href={`#tailwind-activity-page-${currentPage - 1}`}
                onClick={(event) => handlePageChange(event, currentPage - 1)}
              />
            </Pagination.Item>
          ) : null}
          {[1, 2, 3].map((page) => (
            <Pagination.Item key={page}>
              <Pagination.Link
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`최근 활동 ${page}페이지`}
                href={`#tailwind-activity-page-${page}`}
                onClick={(event) => handlePageChange(event, page)}
              >
                {page}
              </Pagination.Link>
            </Pagination.Item>
          ))}
          {currentPage < 3 ? (
            <Pagination.Item>
              <Pagination.Next
                href={`#tailwind-activity-page-${currentPage + 1}`}
                onClick={(event) => handlePageChange(event, currentPage + 1)}
              />
            </Pagination.Item>
          ) : null}
        </Pagination.List>
      </Pagination.Root>
    </section>
  );
}

function TablePreview() {
  return (
    <section
      aria-labelledby="table-title"
      className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6"
    >
      <div>
        <p className="text-dds-sm text-dds-text-muted">Data display primitive</p>
        <h2 id="table-title" className="text-dds-lg font-semibold">
          Table과 Tailwind layout utility
        </h2>
      </div>
      <Table.Container className="max-w-full">
        <Table.Root>
          <Table.Caption>Tailwind 프로젝트 현황</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head scope="col">프로젝트</Table.Head>
              <Table.Head scope="col">상태</Table.Head>
              <Table.Head scope="col">담당 팀</Table.Head>
              <Table.Head scope="col">최근 변경</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>디자인 시스템</Table.Cell>
              <Table.Cell>
                <Badge tone="success">진행 중</Badge>
              </Table.Cell>
              <Table.Cell>Platform</Table.Cell>
              <Table.Cell>방금 전</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>콘텐츠 허브</Table.Cell>
              <Table.Cell>
                <Badge tone="warning">검토 중</Badge>
              </Table.Cell>
              <Table.Cell>Content</Table.Cell>
              <Table.Cell>어제</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.Container>
    </section>
  );
}

function EmptyStatePreview() {
  return (
    <section
      aria-labelledby="empty-state-title"
      className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6"
    >
      <div>
        <p className="text-dds-sm text-dds-text-muted">Feedback primitive</p>
        <h2 id="empty-state-title" className="text-dds-lg font-semibold">
          EmptyState와 Tailwind layout utility
        </h2>
      </div>
      <EmptyState.Root className="min-h-56">
        <EmptyState.Icon>□</EmptyState.Icon>
        <EmptyState.Title>검색 결과가 없습니다</EmptyState.Title>
        <EmptyState.Description>다른 검색어 또는 필터를 사용해 보세요.</EmptyState.Description>
        <EmptyState.Actions>
          <Button>필터 초기화</Button>
          <Button tone="neutral" variant="outline">
            새 프로젝트 만들기
          </Button>
        </EmptyState.Actions>
      </EmptyState.Root>
    </section>
  );
}

export function App() {
  return (
    <Tooltip.Provider delayDuration={250}>
      <main className="min-h-[100%] bg-dds-canvas p-dds-6 text-dds-text">
        <div className="mx-auto grid max-w-[1080px] gap-dds-6">
          <PageHeader.Root className="grid gap-dds-3">
            <PageHeader.Content className="items-start gap-dds-3">
              <Badge tone="primary">Tailwind CSS v4</Badge>
              <PageHeader.Title className="text-dds-lg">
                Tailwind adapter 소비자 예제
              </PageHeader.Title>
              <PageHeader.Description className="max-w-[720px] text-dds-text-muted">
                semantic utility와 @ddoni-ds/ui 컴포넌트가 같은 CSS token을 참조합니다.
              </PageHeader.Description>
            </PageHeader.Content>
          </PageHeader.Root>

          <section
            aria-labelledby="shared-theme-title"
            className="grid gap-dds-4 min-[800px]:grid-cols-2"
          >
            <div className="rounded-dds-control border border-dds-border bg-dds-surface p-dds-4 shadow-dds-md">
              <p className="text-dds-sm text-dds-text-muted">Tailwind utility</p>
              <h2 id="shared-theme-title" className="mt-dds-2 text-dds-lg font-semibold">
                같은 teal brand token
              </h2>
              <div className="mt-dds-4 rounded-dds-control bg-dds-primary p-dds-4 text-dds-sm text-white">
                bg-dds-primary + rounded-dds-control
              </div>
            </div>

            <Card.Root className="rounded-dds-control shadow-dds-md">
              <Card.Header>
                <Card.Title asChild>
                  <h2>UI component</h2>
                </Card.Title>
                <Card.Description>같은 브랜드 컬러와 control radius를 공유합니다.</Card.Description>
              </Card.Header>
              <Card.Content>
                <Button className="mt-dds-4 w-full min-[760px]:w-auto">
                  w-full responsive Button
                </Button>
              </Card.Content>
            </Card.Root>
          </section>

          <section
            aria-labelledby="layout-title"
            className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface-subtle p-dds-6"
          >
            <div className="flex items-center justify-between gap-dds-4">
              <div>
                <p className="text-dds-sm text-dds-text-muted">Layout utility</p>
                <h2 id="layout-title" className="text-dds-lg font-semibold">
                  Tailwind은 레이아웃, UI는 접근성 있는 primitive
                </h2>
              </div>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button size="sm" tone="neutral" variant="outline">
                    도움말
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    className으로 폭과 여백을 조절하고, 브랜드는 token으로 변경합니다.
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Button size="sm" tone="neutral" variant="outline">
                    공유 옵션
                  </Button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    aria-label="공유 옵션"
                    className="text-dds-sm text-dds-text-muted"
                  >
                    <div>Popover surface도 Tailwind layout utility와 token을 함께 사용합니다.</div>
                    <Popover.Close asChild>
                      <Button size="sm" tone="neutral" variant="ghost">
                        닫기
                      </Button>
                    </Popover.Close>
                    <Popover.Arrow />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
            <FilterBar.Root aria-label="프로젝트 필터" onSubmit={(event) => event.preventDefault()}>
              <FilterBar.Controls>
                <Field.Root className="flex-1 basis-[var(--dds-space-12)] gap-dds-3">
                  <Field.Label htmlFor="project-search">프로젝트 검색</Field.Label>
                  <Input
                    aria-describedby="project-search-description"
                    id="project-search"
                    name="query"
                    placeholder="프로젝트 검색"
                  />
                  <Field.Description id="project-search-description">
                    FilterBar와 Tailwind layout utility를 함께 사용합니다.
                  </Field.Description>
                </Field.Root>
              </FilterBar.Controls>
              <FilterBar.Actions>
                <Button type="submit">검색</Button>
                <Button type="reset" tone="neutral" variant="outline">
                  초기화
                </Button>
              </FilterBar.Actions>
            </FilterBar.Root>
            <div className="flex items-center gap-dds-2 text-dds-sm text-dds-text-muted">
              <Switch id="new-project-notifications" defaultChecked />
              <label htmlFor="new-project-notifications">새 프로젝트 알림 받기</label>
            </div>
            <Field.Root className="gap-dds-2">
              <Field.Label id="project-visibility-label">프로젝트 공개 범위</Field.Label>
              <RadioGroup.Root
                aria-labelledby="project-visibility-label"
                className="gap-dds-2"
                defaultValue="team"
                name="projectVisibility"
              >
                <div className="flex items-center gap-dds-2 text-dds-sm text-dds-text-muted">
                  <RadioGroup.Item id="tailwind-visibility-team" value="team" />
                  <label htmlFor="tailwind-visibility-team">팀 전용</label>
                </div>
                <div className="flex items-center gap-dds-2 text-dds-sm text-dds-text-muted">
                  <RadioGroup.Item id="tailwind-visibility-public" value="public" />
                  <label htmlFor="tailwind-visibility-public">공개</label>
                </div>
              </RadioGroup.Root>
            </Field.Root>
            <Field.Root className="gap-dds-2">
              <Field.Label htmlFor="project-template">프로젝트 템플릿</Field.Label>
              <Select.Root defaultValue="product" name="projectTemplate">
                <Select.Trigger id="project-template">
                  <Select.Value placeholder="템플릿을 선택하세요" />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content>
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>시작 템플릿</Select.Label>
                        <Select.Item value="product">제품 개발</Select.Item>
                        <Select.Item value="marketing">마케팅 캠페인</Select.Item>
                        <Select.Item value="research">리서치</Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              <Field.Description>
                Select surface는 같은 token을 사용하고, Tailwind utility는 field layout을
                조절합니다.
              </Field.Description>
            </Field.Root>
          </section>

          <section
            aria-labelledby="tabs-title"
            className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface p-dds-6"
          >
            <div>
              <p className="text-dds-sm text-dds-text-muted">Navigation primitive</p>
              <h2 id="tabs-title" className="text-dds-lg font-semibold">
                Tabs도 Tailwind layout utility와 함께 사용
              </h2>
            </div>
            <Tabs.Root defaultValue="overview" className="gap-dds-3">
              <Tabs.List aria-label="Tailwind 프로젝트 정보">
                <Tabs.Trigger value="overview">개요</Tabs.Trigger>
                <Tabs.Trigger value="activity">최근 활동</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content className="text-dds-sm text-dds-text-muted" value="overview">
                semantic token과 component token으로 활성 탭을 일관되게 표시합니다.
              </Tabs.Content>
              <Tabs.Content className="text-dds-sm text-dds-text-muted" value="activity">
                Tailwind utility는 패널의 typography와 layout을 조절합니다.
              </Tabs.Content>
            </Tabs.Root>
          </section>

          <section
            aria-labelledby="accordion-title"
            className="grid gap-dds-4 rounded-dds-control border border-dds-border bg-dds-surface-subtle p-dds-6"
          >
            <div>
              <p className="text-dds-sm text-dds-text-muted">Disclosure primitive</p>
              <h2 id="accordion-title" className="text-dds-lg font-semibold">
                Accordion과 Tailwind typography utility
              </h2>
            </div>
            <Accordion.Root defaultValue="usage" type="single">
              <Accordion.Item value="usage">
                <Accordion.Header>
                  <Accordion.Trigger>언제 사용하나요?</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="text-dds-sm text-dds-text-muted">
                  독립적인 보조 정보를 필요할 때 펼쳐 보일 때 사용합니다.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="theme">
                <Accordion.Header>
                  <Accordion.Trigger>어떻게 커스터마이즈하나요?</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="text-dds-sm text-dds-text-muted">
                  CSS token은 컴포넌트 상태와 Tailwind utility에 함께 반영됩니다.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </section>

          <PaginationPreview />
          <TablePreview />
          <AlertPreview />
          <EmptyStatePreview />
          <SkeletonPreview />
          <ToastFeedback />
        </div>
      </main>
    </Tooltip.Provider>
  );
}
