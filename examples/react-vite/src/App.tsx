import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  DropdownMenu,
  IconButton,
  Input,
  Textarea,
  Tooltip,
} from "@ddoni-ds/ui";
import "./App.css";

const themeOptions = ["light", "dark", "system"] as const;

type Theme = (typeof themeOptions)[number];

export function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [projectName, setProjectName] = useState("디자인 시스템 예제");
  const [description, setDescription] = useState("CSS 변수만 바꿔 브랜드를 적용합니다.");
  const [receivesDigest, setReceivesDigest] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.ddsTheme = theme;

    return () => {
      delete document.documentElement.dataset.ddsTheme;
    };
  }, [theme]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(`“${projectName}” 설정을 저장했습니다.`);
  }

  return (
    <Tooltip.Provider delayDuration={250}>
      <main className="app">
        <div className="container">
          <header className="hero">
            <div className="heroCopy">
              <Badge tone="primary">React Vite</Badge>
              <h1>일반 CSS 소비자 예제</h1>
              <p>
                토큰 CSS와 컴포넌트 CSS만 import해 light, dark, system 테마와 브랜드 커스터마이징을
                확인합니다.
              </p>
            </div>
            <label className="themeControl" htmlFor="theme-select">
              <span>테마</span>
              <select
                id="theme-select"
                value={theme}
                onChange={(event) => setTheme(event.target.value as Theme)}
              >
                {themeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </header>

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
              <Button onClick={() => setStatusMessage("Primary 버튼을 눌렀습니다.")}>
                Primary
              </Button>
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
                    <DropdownMenu.Item
                      onSelect={() => setStatusMessage("프로젝트를 복제했습니다.")}
                    >
                      복제
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onSelect={() => setStatusMessage("초대 링크를 복사했습니다.")}
                    >
                      링크 복사
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      tone="danger"
                      onSelect={() => setStatusMessage("삭제는 예제에서 실행되지 않습니다.")}
                    >
                      삭제
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </section>

          <div className="contentGrid">
            <Card.Root>
              <Card.Header>
                <Card.Title asChild>
                  <h2>프로젝트 설정</h2>
                </Card.Title>
                <Card.Description>
                  native form 흐름을 유지하는 Input, Textarea, Checkbox 예시입니다.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <form className="form" onSubmit={handleSubmit}>
                  <label className="field" htmlFor="project-name">
                    <span>프로젝트 이름</span>
                    <Input
                      id="project-name"
                      name="projectName"
                      value={projectName}
                      onChange={(event) => setProjectName(event.target.value)}
                    />
                  </label>
                  <label className="field" htmlFor="project-description">
                    <span>설명</span>
                    <Textarea
                      id="project-description"
                      name="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </label>
                  <div className="checkboxRow">
                    <Checkbox
                      checked={receivesDigest}
                      id="weekly-digest"
                      name="weeklyDigest"
                      onCheckedChange={(checked) => setReceivesDigest(checked === true)}
                    />
                    <label htmlFor="weekly-digest">주간 요약 메일 받기</label>
                  </div>
                  <Button type="submit">설정 저장</Button>
                </form>
              </Card.Content>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Card.Title asChild>
                  <h2>Overlay components</h2>
                </Card.Title>
                <Card.Description>
                  Portal을 사용하는 컴포넌트도 html 테마 선택을 따릅니다.
                </Card.Description>
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
                          <Button onClick={() => setStatusMessage("공유 링크를 만들었습니다.")}>
                            공유 링크 만들기
                          </Button>
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <p className="statusMessage" role="status">
                  {statusMessage}
                </p>
              </Card.Content>
            </Card.Root>
          </div>

          <section aria-labelledby="override-title" className="overrideTheme">
            <div>
              <p className="eyebrow">Theme override</p>
              <h2 id="override-title">CSS 변수로 브랜드 교체</h2>
              <p>
                이 영역은 <code>--dds-color-brand-600</code>, <code>--dds-color-brand-700</code>,
                <code>--dds-control-radius</code>만 재정의합니다.
              </p>
            </div>
            <Button>Violet primary</Button>
          </section>
        </div>
      </main>
    </Tooltip.Provider>
  );
}
