import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ddoni-ds/tokens/tokens.css";
import "@ddoni-ds/ui/styles.css";
import "./main.css";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("#root 요소를 찾을 수 없습니다.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
