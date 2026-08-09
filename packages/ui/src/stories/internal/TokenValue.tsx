export function TokenValue({ name, theme }: { name: string; theme: string }) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  return <code data-dds-theme-value={theme}>{value || "계산 중"}</code>;
}
