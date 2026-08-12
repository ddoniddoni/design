import type { FormEvent, MouseEvent } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  DropdownMenu,
  EmptyState,
  Field,
  FilterBar,
  IconButton,
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
  Textarea,
  Tooltip,
} from "@ddoni-ds/ui";

const themeOptions = ["light", "dark", "system"] as const;

export type Theme = (typeof themeOptions)[number];

interface AppHeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface ActionSectionProps {
  onStatusMessageChange: (message: string) => void;
}

interface ProjectSettingsCardProps {
  description: string;
  projectName: string;
  projectTemplate: string;
  projectVisibility: string;
  receivesDigest: boolean;
  onDescriptionChange: (description: string) => void;
  onProjectNameChange: (projectName: string) => void;
  onProjectTemplateChange: (projectTemplate: string) => void;
  onProjectVisibilityChange: (projectVisibility: string) => void;
  onReceivesDigestChange: (receivesDigest: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

interface OverlayComponentsCardProps {
  onStatusMessageChange: (message: string) => void;
}

interface PaginationSectionProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface EmptyStateSectionProps {
  onStatusMessageChange: (message: string) => void;
}

interface FilterBarSectionProps {
  projectQuery: string;
  onProjectQueryChange: (query: string) => void;
  onStatusMessageChange: (message: string) => void;
}

export function AppHeader({ theme, onThemeChange }: AppHeaderProps) {
  return (
    <PageHeader.Root className="pageHeader">
      <PageHeader.Content>
        <Badge tone="primary">React Vite</Badge>
        <PageHeader.Title>일반 CSS 소비자 예제</PageHeader.Title>
        <PageHeader.Description>
          토큰 CSS와 컴포넌트 CSS만 import해 light, dark, system 테마와 브랜드 커스터마이징을
          확인합니다.
        </PageHeader.Description>
      </PageHeader.Content>
      <PageHeader.Actions className="themeActions">
        <label className="themeControl" htmlFor="theme-select">
          <span>테마</span>
          <select
            id="theme-select"
            value={theme}
            onChange={(event) => onThemeChange(event.target.value as Theme)}
          >
            {themeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </PageHeader.Actions>
    </PageHeader.Root>
  );
}

export function ActionSection({ onStatusMessageChange }: ActionSectionProps) {
  return (
    <section aria-labelledby="button-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Actions</p>
          <h2 id="button-title">Button variants</h2>
        </div>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <IconButton
              aria-label="버튼 사용 도움말"
              icon={<span>i</span>}
              tone="neutral"
              variant="ghost"
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content>
              브랜드 표현은 className 대신 CSS 변수 override를 우선하세요.
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
      <div className="buttonRow">
        <Button onClick={() => onStatusMessageChange("Primary 버튼을 눌렀습니다.")}>Primary</Button>
        <Button tone="neutral" variant="outline">
          Outline
        </Button>
        <Button tone="neutral" variant="ghost">
          Ghost
        </Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button tone="neutral" variant="outline">
              작업 메뉴
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>프로젝트</DropdownMenu.Label>
              <DropdownMenu.Item onSelect={() => onStatusMessageChange("프로젝트를 복제했습니다.")}>
                복제
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => onStatusMessageChange("초대 링크를 복사했습니다.")}
              >
                링크 복사
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                tone="danger"
                onSelect={() => onStatusMessageChange("삭제는 예제에서 실행되지 않습니다.")}
              >
                삭제
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button tone="neutral" variant="outline">
              공유 옵션
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content aria-label="공유 옵션">
              <div>프로젝트 링크를 복사해 팀원에게 공유할 수 있습니다.</div>
              <Popover.Close asChild>
                <Button
                  onClick={() => onStatusMessageChange("공유 링크를 복사했습니다.")}
                  size="sm"
                >
                  링크 복사
                </Button>
              </Popover.Close>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </section>
  );
}

export function ProjectSettingsCard({
  description,
  projectName,
  projectTemplate,
  projectVisibility,
  receivesDigest,
  onDescriptionChange,
  onProjectNameChange,
  onProjectTemplateChange,
  onProjectVisibilityChange,
  onReceivesDigestChange,
  onSubmit,
}: ProjectSettingsCardProps) {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title asChild>
          <h2>프로젝트 설정</h2>
        </Card.Title>
        <Card.Description>
          native form 흐름을 유지하는 Input, Select, Textarea, Checkbox, RadioGroup 예시입니다.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form className="form" onSubmit={onSubmit}>
          <Field.Root>
            <Field.Label htmlFor="project-name">프로젝트 이름</Field.Label>
            <Input
              aria-describedby="project-name-description"
              id="project-name"
              name="projectName"
              value={projectName}
              onChange={(event) => onProjectNameChange(event.target.value)}
            />
            <Field.Description id="project-name-description">
              여러 예제 화면에서 표시할 이름입니다.
            </Field.Description>
          </Field.Root>
          <Field.Root>
            <Field.Label htmlFor="project-description">설명</Field.Label>
            <Textarea
              id="project-description"
              name="description"
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label htmlFor="project-template">프로젝트 템플릿</Field.Label>
            <Select.Root
              name="projectTemplate"
              value={projectTemplate}
              onValueChange={onProjectTemplateChange}
            >
              <Select.Trigger aria-describedby="project-template-description" id="project-template">
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
            <Field.Description id="project-template-description">
              선택한 템플릿의 기본 상태와 작업 항목을 준비합니다.
            </Field.Description>
          </Field.Root>
          <div className="checkboxRow">
            <Checkbox defaultChecked id="confirm-settings" name="confirmSettings" />
            <label htmlFor="confirm-settings">설정 변경사항 확인</label>
          </div>
          <Field.Root>
            <Field.Label id="project-visibility-label">프로젝트 공개 범위</Field.Label>
            <RadioGroup.Root
              aria-describedby="project-visibility-description"
              aria-labelledby="project-visibility-label"
              name="projectVisibility"
              value={projectVisibility}
              onValueChange={onProjectVisibilityChange}
            >
              <div className="radioRow">
                <RadioGroup.Item id="project-visibility-team" value="team" />
                <label htmlFor="project-visibility-team">팀 전용</label>
              </div>
              <div className="radioRow">
                <RadioGroup.Item id="project-visibility-public" value="public" />
                <label htmlFor="project-visibility-public">공개</label>
              </div>
            </RadioGroup.Root>
            <Field.Description id="project-visibility-description">
              공개로 설정하면 링크를 아는 누구나 프로젝트를 볼 수 있습니다.
            </Field.Description>
          </Field.Root>
          <div className="switchRow">
            <Switch
              checked={receivesDigest}
              id="weekly-digest"
              name="weeklyDigest"
              onCheckedChange={onReceivesDigestChange}
            />
            <label htmlFor="weekly-digest">주간 요약 메일 받기</label>
          </div>
          <Button type="submit">설정 저장</Button>
        </form>
      </Card.Content>
    </Card.Root>
  );
}

export function OverlayComponentsCard({ onStatusMessageChange }: OverlayComponentsCardProps) {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title asChild>
          <h2>Overlay components</h2>
        </Card.Title>
        <Card.Description>Portal을 사용하는 컴포넌트도 html 테마 선택을 따릅니다.</Card.Description>
      </Card.Header>
      <Card.Content className="stack">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button tone="neutral" variant="outline">
              Dialog 열기
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>공유 전 확인</Dialog.Title>
                <Dialog.Description>
                  Portal content도 선택한 테마와 token을 그대로 상속합니다.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button tone="neutral" variant="ghost">
                    닫기
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button onClick={() => onStatusMessageChange("공유 링크를 만들었습니다.")}>
                    공유 링크 만들기
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Card.Content>
    </Card.Root>
  );
}

export function TabsSection() {
  return (
    <section aria-labelledby="tabs-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Navigation</p>
          <h2 id="tabs-title">Tabs</h2>
        </div>
      </div>
      <Tabs.Root defaultValue="overview">
        <Tabs.List aria-label="프로젝트 정보">
          <Tabs.Trigger value="overview">개요</Tabs.Trigger>
          <Tabs.Trigger value="activity">최근 활동</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabsContent" value="overview">
          프로젝트의 공개 범위와 기본 설정을 한곳에서 확인합니다.
        </Tabs.Content>
        <Tabs.Content className="tabsContent" value="activity">
          최근 설정 변경과 멤버 활동을 확인합니다.
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

export function PaginationSection({ currentPage, onPageChange }: PaginationSectionProps) {
  function handlePageChange(event: MouseEvent<HTMLAnchorElement>, page: number) {
    event.preventDefault();
    onPageChange(page);
  }

  return (
    <section aria-labelledby="pagination-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Navigation</p>
          <h2 id="pagination-title">Pagination</h2>
        </div>
      </div>
      <div className="paginationContent">
        <p aria-live="polite">최근 활동 {currentPage}페이지를 보고 있습니다.</p>
        <Pagination.Root aria-label="최근 활동 페이지">
          <Pagination.List>
            {currentPage > 1 ? (
              <Pagination.Item>
                <Pagination.Previous
                  href={`#activity-page-${currentPage - 1}`}
                  onClick={(event) => handlePageChange(event, currentPage - 1)}
                />
              </Pagination.Item>
            ) : null}
            {[1, 2, 3].map((page) => (
              <Pagination.Item key={page}>
                <Pagination.Link
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`최근 활동 ${page}페이지`}
                  href={`#activity-page-${page}`}
                  onClick={(event) => handlePageChange(event, page)}
                >
                  {page}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            {currentPage < 3 ? (
              <Pagination.Item>
                <Pagination.Next
                  href={`#activity-page-${currentPage + 1}`}
                  onClick={(event) => handlePageChange(event, currentPage + 1)}
                />
              </Pagination.Item>
            ) : null}
          </Pagination.List>
        </Pagination.Root>
      </div>
    </section>
  );
}

export function FilterBarSection({
  projectQuery,
  onProjectQueryChange,
  onStatusMessageChange,
}: FilterBarSectionProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onStatusMessageChange(
      projectQuery ? `“${projectQuery}” 프로젝트를 검색합니다.` : "전체 프로젝트를 표시합니다.",
    );
  }

  function handleReset() {
    onProjectQueryChange("");
    onStatusMessageChange("프로젝트 필터를 초기화했습니다.");
  }

  return (
    <section aria-labelledby="filter-bar-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Form layout</p>
          <h2 id="filter-bar-title">FilterBar</h2>
        </div>
      </div>
      <FilterBar.Root aria-label="프로젝트 필터" onSubmit={handleSubmit}>
        <FilterBar.Controls>
          <Field.Root className="filterField">
            <Field.Label htmlFor="project-query">프로젝트 검색</Field.Label>
            <Input
              id="project-query"
              name="query"
              placeholder="프로젝트 이름을 입력하세요"
              value={projectQuery}
              onChange={(event) => onProjectQueryChange(event.target.value)}
            />
          </Field.Root>
        </FilterBar.Controls>
        <FilterBar.Actions>
          <Button type="submit">검색</Button>
          <Button type="button" tone="neutral" variant="outline" onClick={handleReset}>
            초기화
          </Button>
        </FilterBar.Actions>
      </FilterBar.Root>
    </section>
  );
}

export function ProjectTableSection() {
  return (
    <section aria-labelledby="table-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Data display</p>
          <h2 id="table-title">Table</h2>
        </div>
      </div>
      <Table.Container>
        <Table.Root>
          <Table.Caption>최근 프로젝트</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head scope="col">프로젝트</Table.Head>
              <Table.Head scope="col">공개 범위</Table.Head>
              <Table.Head scope="col">상태</Table.Head>
              <Table.Head scope="col">최근 변경</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>디자인 시스템</Table.Cell>
              <Table.Cell>팀 전용</Table.Cell>
              <Table.Cell>
                <Badge tone="success">진행 중</Badge>
              </Table.Cell>
              <Table.Cell>방금 전</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>마케팅 캠페인</Table.Cell>
              <Table.Cell>공개</Table.Cell>
              <Table.Cell>
                <Badge tone="warning">검토 중</Badge>
              </Table.Cell>
              <Table.Cell>2시간 전</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.Container>
    </section>
  );
}

export function EmptyStateSection({ onStatusMessageChange }: EmptyStateSectionProps) {
  return (
    <section aria-labelledby="empty-state-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Feedback</p>
          <h2 id="empty-state-title">EmptyState</h2>
        </div>
      </div>
      <EmptyState.Root>
        <EmptyState.Icon>□</EmptyState.Icon>
        <EmptyState.Title>필터 조건에 맞는 프로젝트가 없습니다</EmptyState.Title>
        <EmptyState.Description>
          필터를 초기화하거나 새 프로젝트를 만들어 작업을 시작하세요.
        </EmptyState.Description>
        <EmptyState.Actions>
          <Button onClick={() => onStatusMessageChange("필터를 초기화했습니다.")}>
            필터 초기화
          </Button>
          <Button
            tone="neutral"
            variant="outline"
            onClick={() => onStatusMessageChange("새 프로젝트 만들기를 시작합니다.")}
          >
            새 프로젝트 만들기
          </Button>
        </EmptyState.Actions>
      </EmptyState.Root>
    </section>
  );
}

export function AccordionSection() {
  return (
    <section aria-labelledby="accordion-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Disclosure</p>
          <h2 id="accordion-title">Accordion</h2>
        </div>
      </div>
      <Accordion.Root collapsible defaultValue="theme" type="single">
        <Accordion.Item value="theme">
          <Accordion.Header>
            <Accordion.Trigger>테마는 어떻게 적용되나요?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            html의 data-dds-theme 값이 light, dark, system 테마를 전환합니다.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="customization">
          <Accordion.Header>
            <Accordion.Trigger>브랜드는 어떻게 바꾸나요?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            component className 대신 아래 영역처럼 CSS Custom Property를 override합니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
}

export function SkeletonSection() {
  return (
    <section aria-labelledby="skeleton-title" className="section">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Loading state</p>
          <h2 id="skeleton-title">Skeleton</h2>
        </div>
      </div>
      <div
        aria-busy="true"
        aria-label="최근 프로젝트 활동을 불러오는 중"
        className="skeletonPreview"
      >
        <div className="skeletonProfile">
          <Skeleton shape="circle" />
          <div className="skeletonText">
            <Skeleton className="skeletonShortLine" />
            <Skeleton />
          </div>
        </div>
        <Skeleton className="skeletonBlock" shape="rect" />
      </div>
    </section>
  );
}

export function ThemeOverride() {
  return (
    <section aria-labelledby="override-title" className="overrideTheme">
      <div>
        <p className="eyebrow">Theme override</p>
        <h2 id="override-title">CSS 변수로 브랜드 교체</h2>
        <p>
          이 영역은 <code>--dds-color-brand-300~800</code>과<code>--dds-control-radius</code>를 teal
          palette로 재정의합니다.
        </p>
      </div>
      <Button>Teal primary</Button>
    </section>
  );
}
