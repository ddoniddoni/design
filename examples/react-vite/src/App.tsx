import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Toast, Tooltip } from "@ddoni-ds/ui";
import {
  AccordionSection,
  ActionSection,
  AppHeader,
  OverlayComponentsCard,
  ProjectSettingsCard,
  TabsSection,
  ThemeOverride,
} from "./AppSections";
import type { Theme } from "./AppSections";
import "./App.css";

export function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [projectName, setProjectName] = useState("디자인 시스템 예제");
  const [description, setDescription] = useState("CSS 변수만 바꿔 브랜드를 적용합니다.");
  const [receivesDigest, setReceivesDigest] = useState(true);
  const [projectVisibility, setProjectVisibility] = useState("team");
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.ddsTheme = theme;

    return () => {
      delete document.documentElement.dataset.ddsTheme;
    };
  }, [theme]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showToast(`“${projectName}” 설정을 저장했습니다.`);
  }

  function showToast(message: string) {
    setToastMessage(message);
    setToastOpen(true);
  }

  return (
    <Tooltip.Provider delayDuration={250}>
      <Toast.Provider duration={5_000} label="프로젝트 알림">
        <main className="app">
          <div className="container">
            <AppHeader theme={theme} onThemeChange={setTheme} />
            <ActionSection onStatusMessageChange={showToast} />

            <div className="contentGrid">
              <ProjectSettingsCard
                description={description}
                projectName={projectName}
                projectVisibility={projectVisibility}
                receivesDigest={receivesDigest}
                onDescriptionChange={setDescription}
                onProjectNameChange={setProjectName}
                onProjectVisibilityChange={setProjectVisibility}
                onReceivesDigestChange={setReceivesDigest}
                onSubmit={handleSubmit}
              />
              <OverlayComponentsCard onStatusMessageChange={showToast} />
            </div>
            <TabsSection />
            <AccordionSection />
            <ThemeOverride />
          </div>
        </main>
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen} tone="success" type="background">
          <Toast.Title>작업 완료</Toast.Title>
          <Toast.Description>{toastMessage}</Toast.Description>
          <Toast.Close aria-label="프로젝트 알림 닫기">닫기</Toast.Close>
        </Toast.Root>
        <Toast.Viewport label="프로젝트 알림 ({hotkey})" />
      </Toast.Provider>
    </Tooltip.Provider>
  );
}
