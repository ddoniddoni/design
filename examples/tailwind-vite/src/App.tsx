import { useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Field,
  Input,
  PageHeader,
  Popover,
  RadioGroup,
  Switch,
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
            <Field.Root className="gap-dds-3">
              <Field.Label htmlFor="project-search">프로젝트 검색</Field.Label>
              <div className="grid gap-dds-3 min-[720px]:grid-cols-[1fr_auto]">
                <Input
                  aria-describedby="project-search-description"
                  id="project-search"
                  placeholder="프로젝트 검색"
                />
                <Button className="w-full min-[720px]:w-auto">검색</Button>
              </div>
              <Field.Description id="project-search-description">
                Field의 구조와 Tailwind layout utility를 함께 사용합니다.
              </Field.Description>
            </Field.Root>
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

          <ToastFeedback />
        </div>
      </main>
    </Tooltip.Provider>
  );
}
