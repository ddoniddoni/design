import { Badge, Button, Card, Checkbox, Input, Tooltip } from "@ddoni-ds/ui";

export function App() {
  return (
    <Tooltip.Provider delayDuration={250}>
      <main className="min-h-[100%] bg-dds-canvas p-dds-6 text-dds-text">
        <div className="mx-auto grid max-w-[1080px] gap-dds-6">
          <header className="grid gap-dds-3">
            <Badge tone="primary">Tailwind CSS v4</Badge>
            <div className="grid gap-dds-2">
              <h1 className="text-dds-lg font-bold">Tailwind adapter 소비자 예제</h1>
              <p className="max-w-[720px] text-dds-md text-dds-text-muted">
                semantic utility와 @ddoni-ds/ui 컴포넌트가 같은 CSS token을 참조합니다.
              </p>
            </div>
          </header>

          <section
            aria-labelledby="shared-theme-title"
            className="grid gap-dds-4 min-[800px]:grid-cols-2"
          >
            <div className="rounded-dds-control border border-dds-border bg-dds-surface p-dds-4 shadow-dds-md">
              <p className="text-dds-sm text-dds-text-muted">Tailwind utility</p>
              <h2 id="shared-theme-title" className="mt-dds-2 text-dds-lg font-semibold">
                같은 violet brand token
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
            </div>
            <div className="grid gap-dds-3 min-[720px]:grid-cols-[1fr_auto]">
              <Input aria-label="프로젝트 검색" placeholder="프로젝트 검색" />
              <Button className="w-full min-[720px]:w-auto">검색</Button>
            </div>
            <label className="flex items-center gap-dds-2 text-dds-sm text-dds-text-muted">
              <Checkbox defaultChecked />새 프로젝트 알림 받기
            </label>
          </section>
        </div>
      </main>
    </Tooltip.Provider>
  );
}
