import { useState } from "react";
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "../../components/Accordion/Accordion";
import { Alert } from "../../components/Alert/Alert";
import { Avatar } from "../../components/Avatar/Avatar";
import { Badge } from "../../components/Badge/Badge";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Dialog } from "../../components/Dialog/Dialog";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Field } from "../../components/Field/Field";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { IconButton } from "../../components/IconButton/IconButton";
import { Input } from "../../components/Input/Input";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Pagination } from "../../components/Pagination/Pagination";
import { Popover } from "../../components/Popover/Popover";
import { Progress } from "../../components/Progress/Progress";
import { RadioGroup } from "../../components/RadioGroup/RadioGroup";
import { Select } from "../../components/Select/Select";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { Spinner } from "../../components/Spinner/Spinner";
import { Switch } from "../../components/Switch/Switch";
import { Table } from "../../components/Table/Table";
import { Tabs } from "../../components/Tabs/Tabs";
import { Textarea } from "../../components/Textarea/Textarea";
import { Toast } from "../../components/Toast/Toast";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import styles from "./ComponentGallery.module.scss";

type ComponentCardProps = {
  children: ReactNode;
  description: string;
  href: string;
  title: string;
  wide?: boolean;
};

function ComponentCard({ children, description, href, title, wide = false }: ComponentCardProps) {
  const headingId = `gallery-${title.toLowerCase()}`;

  return (
    <article className={styles.card} data-wide={wide || undefined}>
      <div className={styles["card-header"]}>
        <div>
          <h3 id={headingId}>{title}</h3>
          <p>{description}</p>
        </div>
        <a aria-label={`${title} 상세 Story로 이동`} href={href}>
          상세 보기
        </a>
      </div>
      <div aria-labelledby={headingId} className={styles.preview}>
        {children}
      </div>
    </article>
  );
}

function GalleryToast() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider duration={8_000} label="컴포넌트 갤러리 알림">
      <Button onClick={() => setOpen(true)} size="sm">
        Toast 표시
      </Button>
      <Toast.Root open={open} onOpenChange={setOpen} tone="success" type="background">
        <Toast.Title>저장했습니다</Toast.Title>
        <Toast.Description>변경사항이 반영되었습니다.</Toast.Description>
        <Toast.Close aria-label="Toast 닫기">닫기</Toast.Close>
      </Toast.Root>
      <Toast.Viewport label="컴포넌트 갤러리 알림 ({hotkey})" />
    </Toast.Provider>
  );
}

function ComponentGallery() {
  return (
    <main className={styles.gallery} id="component-gallery">
      <div className={styles.container}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>DDoni Design System</p>
            <h1>컴포넌트 둘러보기</h1>
            <p className={styles["hero-description"]}>
              29개 공개 컴포넌트의 기본 표현과 상호작용을 한 페이지에서 빠르게 비교할 수 있습니다.
            </p>
          </div>
          <div aria-label="갤러리 요약" className={styles.summary}>
            <Badge tone="primary">29 components</Badge>
            <Badge tone="neutral" variant="outline">
              6 categories
            </Badge>
          </div>
        </header>

        <section aria-labelledby="gallery-actions" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Actions</p>
            <h2 id="gallery-actions">사용자 액션</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="주요 작업을 명확한 우선순위로 실행합니다."
              href="?path=/story/components-actions-button--playground"
              title="Button"
            >
              <div className={styles["inline-group"]}>
                <Button>저장</Button>
                <Button tone="neutral" variant="outline">
                  취소
                </Button>
              </div>
            </ComponentCard>
            <ComponentCard
              description="아이콘만으로 표현되는 간결한 액션입니다."
              href="?path=/story/components-actions-iconbutton--playground"
              title="IconButton"
            >
              <div className={styles["inline-group"]}>
                <IconButton aria-label="검색" icon={<span aria-hidden="true">⌕</span>} />
                <IconButton
                  aria-label="더 보기"
                  icon={<span aria-hidden="true">•••</span>}
                  tone="neutral"
                  variant="outline"
                />
              </div>
            </ComponentCard>
          </div>
        </section>

        <section aria-labelledby="gallery-forms" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Forms</p>
            <h2 id="gallery-forms">입력과 선택</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="label, control, 보조 설명을 조합합니다."
              href="?path=/story/components-forms-field--playground"
              title="Field"
            >
              <Field.Root>
                <Field.Label htmlFor="gallery-field-email">이메일</Field.Label>
                <Input id="gallery-field-email" placeholder="name@example.com" type="email" />
                <Field.Description>계정 관련 알림을 받을 주소입니다.</Field.Description>
              </Field.Root>
            </ComponentCard>
            <ComponentCard
              description="단일 줄 텍스트 값을 받는 기본 control입니다."
              href="?path=/story/components-forms-input--playground"
              title="Input"
            >
              <Input aria-label="프로젝트 이름" placeholder="프로젝트 이름" />
            </ComponentCard>
            <ComponentCard
              description="여러 줄의 자유 형식 텍스트를 입력합니다."
              href="?path=/story/components-forms-textarea--playground"
              title="Textarea"
            >
              <Textarea aria-label="프로젝트 설명" placeholder="프로젝트 설명을 입력하세요" />
            </ComponentCard>
            <ComponentCard
              description="제출 시 확정되는 다중 선택에 사용합니다."
              href="?path=/story/components-forms-checkbox--uncontrolled"
              title="Checkbox"
            >
              <label className={styles["control-label"]} htmlFor="gallery-checkbox">
                <Checkbox defaultChecked id="gallery-checkbox" />
                이용약관에 동의합니다
              </label>
            </ComponentCard>
            <ComponentCard
              description="상호 배타적인 여러 선택지 중 하나를 고릅니다."
              href="?path=/story/components-forms-radiogroup--playground"
              title="RadioGroup"
            >
              <RadioGroup.Root aria-label="프로젝트 공개 범위" defaultValue="team">
                <div className={styles["option-list"]}>
                  <label className={styles["control-label"]} htmlFor="gallery-radio-team">
                    <RadioGroup.Item id="gallery-radio-team" value="team" />팀 전용
                  </label>
                  <label className={styles["control-label"]} htmlFor="gallery-radio-public">
                    <RadioGroup.Item id="gallery-radio-public" value="public" />
                    공개
                  </label>
                </div>
              </RadioGroup.Root>
            </ComponentCard>
            <ComponentCard
              description="목록에서 하나의 값을 선택하는 compact control입니다."
              href="?path=/story/components-forms-select--playground"
              title="Select"
            >
              <Select.Root defaultValue="team">
                <label htmlFor="gallery-select">공개 범위</label>
                <Select.Trigger id="gallery-select">
                  <Select.Value placeholder="선택하세요" />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content>
                    <Select.Viewport>
                      <Select.Item value="team">팀 전용</Select.Item>
                      <Select.Item value="public">공개</Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </ComponentCard>
            <ComponentCard
              description="변경 즉시 적용되는 on/off 설정에 사용합니다."
              href="?path=/story/components-forms-switch--playground"
              title="Switch"
            >
              <label className={styles["control-label"]} htmlFor="gallery-switch">
                <Switch defaultChecked id="gallery-switch" />새 프로젝트 알림 받기
              </label>
            </ComponentCard>
            <ComponentCard
              description="검색과 필터 control, action을 semantic form으로 배치합니다."
              href="?path=/story/components-forms-filterbar--playground"
              title="FilterBar"
              wide
            >
              <FilterBar.Root
                aria-label="갤러리 프로젝트 필터"
                onSubmit={(event) => event.preventDefault()}
              >
                <FilterBar.Controls>
                  <Field.Root>
                    <Field.Label htmlFor="gallery-filter">프로젝트 검색</Field.Label>
                    <Input id="gallery-filter" placeholder="프로젝트 이름" />
                  </Field.Root>
                </FilterBar.Controls>
                <FilterBar.Actions>
                  <Button size="sm" type="submit">
                    검색
                  </Button>
                </FilterBar.Actions>
              </FilterBar.Root>
            </ComponentCard>
          </div>
        </section>

        <section aria-labelledby="gallery-layout" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Layout</p>
            <h2 id="gallery-layout">콘텐츠 구조</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="관련 콘텐츠를 surface 안에서 유연하게 그룹화합니다."
              href="?path=/story/components-layout-card--playground"
              title="Card"
            >
              <Card.Root>
                <Card.Header>
                  <Card.Title>프로젝트</Card.Title>
                  <Card.Description>다음 배포를 준비하고 있습니다.</Card.Description>
                </Card.Header>
                <Card.Content>카드 본문 콘텐츠를 자유롭게 구성할 수 있습니다.</Card.Content>
                <Card.Footer>
                  <Button size="sm">저장</Button>
                </Card.Footer>
              </Card.Root>
            </ComponentCard>
            <ComponentCard
              description="페이지의 제목, 설명, 대표 action을 정리합니다."
              href="?path=/story/components-layout-pageheader--playground"
              title="PageHeader"
              wide
            >
              <PageHeader.Root>
                <PageHeader.Content>
                  <PageHeader.Title>디자인 시스템</PageHeader.Title>
                  <PageHeader.Description>
                    토큰과 컴포넌트를 한곳에서 관리합니다.
                  </PageHeader.Description>
                </PageHeader.Content>
                <PageHeader.Actions>
                  <Button size="sm">새 프로젝트</Button>
                </PageHeader.Actions>
              </PageHeader.Root>
            </ComponentCard>
          </div>
        </section>

        <section aria-labelledby="gallery-navigation" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Navigation</p>
            <h2 id="gallery-navigation">탐색과 전환</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="현재 위치와 상위 화면으로 돌아가는 경로를 semantic navigation으로 표시합니다."
              href="?path=/story/components-navigation-breadcrumb--playground"
              title="Breadcrumb"
            >
              <Breadcrumb.Root aria-label="갤러리 현재 경로">
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#gallery-workspace">워크스페이스</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#gallery-projects">프로젝트</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.CurrentPage>디자인 시스템</Breadcrumb.CurrentPage>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </ComponentCard>
            <ComponentCard
              description="필요할 때만 보조 콘텐츠를 펼쳐 보여줍니다."
              href="?path=/story/components-navigation-accordion--playground"
              title="Accordion"
            >
              <Accordion.Root defaultValue="usage" type="single">
                <Accordion.Item value="usage">
                  <Accordion.Header>
                    <Accordion.Trigger>언제 사용하나요?</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>보조 정보를 간결하게 접어 둘 때 사용합니다.</Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </ComponentCard>
            <ComponentCard
              description="동등한 콘텐츠 영역을 빠르게 전환합니다."
              href="?path=/story/components-navigation-tabs--playground"
              title="Tabs"
            >
              <Tabs.Root defaultValue="overview">
                <Tabs.List aria-label="프로젝트 정보">
                  <Tabs.Trigger value="overview">개요</Tabs.Trigger>
                  <Tabs.Trigger value="activity">활동</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="overview">프로젝트의 기본 정보입니다.</Tabs.Content>
                <Tabs.Content value="activity">최근 활동을 확인합니다.</Tabs.Content>
              </Tabs.Root>
            </ComponentCard>
            <ComponentCard
              description="여러 페이지의 목록을 semantic link로 탐색합니다."
              href="?path=/story/components-navigation-pagination--playground"
              title="Pagination"
            >
              <Pagination.Root aria-label="갤러리 페이지 탐색">
                <Pagination.List>
                  <Pagination.Item>
                    <Pagination.Link aria-label="1페이지" href="#gallery-pagination-1">
                      1
                    </Pagination.Link>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Pagination.Link
                      aria-current="page"
                      aria-label="2페이지"
                      href="#gallery-pagination-2"
                    >
                      2
                    </Pagination.Link>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Pagination.Next href="#gallery-pagination-3" />
                  </Pagination.Item>
                </Pagination.List>
              </Pagination.Root>
            </ComponentCard>
          </div>
        </section>

        <section aria-labelledby="gallery-data-display" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Data Display</p>
            <h2 id="gallery-data-display">상태와 데이터</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="사진 또는 이니셜 fallback으로 사람과 계정 identity를 compact하게 표시합니다."
              href="?path=/story/components-data-display-avatar--playground"
              title="Avatar"
            >
              <div className={styles["inline-group"]}>
                <Avatar alt="김도니" size="sm" />
                <Avatar alt="DDoni" size="md" />
                <Avatar alt="김도니" size="lg" />
              </div>
            </ComponentCard>
            <ComponentCard
              description="짧은 상태나 분류 정보를 텍스트와 함께 표시합니다."
              href="?path=/story/components-data-display-badge--playground"
              title="Badge"
            >
              <div className={styles["inline-group"]}>
                <Badge tone="success">진행 중</Badge>
                <Badge tone="warning" variant="soft">
                  검토 중
                </Badge>
                <Badge tone="danger" variant="outline">
                  차단됨
                </Badge>
              </div>
            </ComponentCard>
            <ComponentCard
              description="비교 가능한 행과 열 데이터를 native table로 제공합니다."
              href="?path=/story/components-data-display-table--playground"
              title="Table"
              wide
            >
              <Table.Container>
                <Table.Root>
                  <Table.Caption>최근 프로젝트</Table.Caption>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head scope="col">프로젝트</Table.Head>
                      <Table.Head scope="col">상태</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>디자인 시스템</Table.Cell>
                      <Table.Cell>
                        <Badge tone="success">진행 중</Badge>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>마케팅 사이트</Table.Cell>
                      <Table.Cell>
                        <Badge tone="warning">검토 중</Badge>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Table.Container>
            </ComponentCard>
          </div>
        </section>

        <section aria-labelledby="gallery-feedback" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Feedback</p>
            <h2 id="gallery-feedback">상태 피드백</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="화면 안에 남아야 하는 안내와 상태를 text로 명확하게 전달합니다."
              href="?path=/story/components-feedback-alert--playground"
              title="Alert"
              wide
            >
              <Alert.Root tone="warning">
                <Alert.Title>저장하지 않은 변경사항이 있습니다</Alert.Title>
                <Alert.Description>페이지를 나가기 전에 변경사항을 저장하세요.</Alert.Description>
                <Alert.Actions>
                  <Button size="sm">저장하기</Button>
                </Alert.Actions>
              </Alert.Root>
            </ComponentCard>
            <ComponentCard
              description="업로드와 설정처럼 시간이 걸리는 작업의 현재 완료 상태를 명확히 표시합니다."
              href="?path=/story/components-feedback-progress--playground"
              title="Progress"
            >
              <Progress aria-label="프로젝트 설정 64% 완료" value={64} />
            </ComponentCard>
            <ComponentCard
              description="다음 행동을 안내하는 비어 있는 상태 표현입니다."
              href="?path=/story/components-feedback-emptystate--playground"
              title="EmptyState"
            >
              <EmptyState.Root>
                <EmptyState.Icon>□</EmptyState.Icon>
                <EmptyState.Title>프로젝트가 없습니다</EmptyState.Title>
                <EmptyState.Description>새 프로젝트를 만들어 시작하세요.</EmptyState.Description>
                <EmptyState.Actions>
                  <Button size="sm">새 프로젝트 만들기</Button>
                </EmptyState.Actions>
              </EmptyState.Root>
            </ComponentCard>
            <ComponentCard
              description="콘텐츠 구조를 유지한 채 로딩을 표현하는 visual placeholder입니다."
              href="?path=/story/components-feedback-skeleton--playground"
              title="Skeleton"
            >
              <div
                aria-busy="true"
                aria-label="프로필 정보를 불러오는 중"
                className={styles["skeleton-preview"]}
              >
                <Skeleton shape="circle" />
                <div>
                  <Skeleton style={{ inlineSize: "45%" }} />
                  <Skeleton style={{ inlineSize: "75%" }} />
                </div>
              </div>
            </ComponentCard>
            <ComponentCard
              description="독립적인 진행 상태를 접근 가능한 label과 함께 전달합니다."
              href="?path=/story/components-feedback-spinner--playground"
              title="Spinner"
            >
              <div className={styles["inline-group"]}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </ComponentCard>
            <ComponentCard
              description="작업 완료와 상태 변화를 잠시 알립니다."
              href="?path=/story/components-feedback-toast--playground"
              title="Toast"
            >
              <GalleryToast />
            </ComponentCard>
          </div>
        </section>

        <section aria-labelledby="gallery-overlays" className={styles.category}>
          <div className={styles["category-header"]}>
            <p>Overlays</p>
            <h2 id="gallery-overlays">컨텍스트 레이어</h2>
          </div>
          <div className={styles.grid}>
            <ComponentCard
              description="중요한 결정을 위해 focus를 관리하는 modal입니다."
              href="?path=/story/components-overlays-dialog--playground"
              title="Dialog"
            >
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button tone="danger" variant="outline">
                    프로젝트 삭제
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>프로젝트를 삭제할까요?</Dialog.Title>
                      <Dialog.Description>삭제한 데이터는 복구할 수 없습니다.</Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                      <Dialog.Close asChild>
                        <Button variant="ghost">취소</Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </ComponentCard>
            <ComponentCard
              description="trigger에서 시작하는 keyboard-friendly action menu입니다."
              href="?path=/story/components-overlays-dropdownmenu--playground"
              title="DropdownMenu"
            >
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button tone="neutral" variant="outline">
                    프로젝트 메뉴
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>프로젝트</DropdownMenu.Label>
                    <DropdownMenu.Item>편집</DropdownMenu.Item>
                    <DropdownMenu.Item>복제</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item tone="danger">삭제</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </ComponentCard>
            <ComponentCard
              description="trigger 근처에 짧은 보조 콘텐츠와 action을 표시합니다."
              href="?path=/story/components-overlays-popover--playground"
              title="Popover"
            >
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
            </ComponentCard>
            <ComponentCard
              description="pointer 또는 focus 시 짧은 보조 정보를 제공합니다."
              href="?path=/story/components-overlays-tooltip--playground"
              title="Tooltip"
            >
              <Tooltip.Provider delayDuration={0}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <IconButton
                      aria-label="도움말"
                      icon={<span aria-hidden="true">?</span>}
                      tone="neutral"
                      variant="outline"
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content>
                      이 설정은 다음 배포부터 적용됩니다.
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </ComponentCard>
          </div>
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: "Overview/Component Gallery",
  component: ComponentGallery,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["!autodocs"],
} satisfies Meta<typeof ComponentGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {};
