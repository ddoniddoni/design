import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface ThemedPortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment | null | undefined;
  render: (children: ReactNode) => ReactNode;
}

// Keep overlays outside clipping/stacking ancestors while preserving local tokens.
export function ThemedPortal({ children, container, render }: ThemedPortalProps) {
  const [anchor, setAnchor] = useState<HTMLSpanElement | null>(null);
  const [theme, setTheme] = useState<CSSProperties>();

  useEffect(() => {
    if (!anchor || container) return;

    const view = anchor.ownerDocument.defaultView;
    if (!view) return;

    function updateTheme() {
      if (!anchor || !view) return;
      const computed = view.getComputedStyle(anchor);
      const tokens: Record<string, string> = {};
      for (let index = 0; index < computed.length; index += 1) {
        const property = computed.item(index);
        if (property.startsWith("--dds-")) {
          tokens[property] = computed.getPropertyValue(property);
        }
      }
      const next = { ...tokens, colorScheme: computed.colorScheme, display: "contents" };
      setTheme((previous) => (JSON.stringify(previous) === JSON.stringify(next) ? previous : next));
    }

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    for (
      let element: Element | null = anchor.parentElement;
      element;
      element = element.parentElement
    ) {
      observer.observe(element, {
        attributes: true,
        attributeFilter: ["class", "style", "data-dds-theme", "data-dds-brand"],
      });
    }
    const preference = view.matchMedia?.("(prefers-color-scheme: dark)");
    preference?.addEventListener("change", updateTheme);
    return () => {
      observer.disconnect();
      preference?.removeEventListener("change", updateTheme);
    };
  }, [anchor, container]);

  // Explicit containers retain Radix's native inheritance contract.
  if (container) return render(children);

  return (
    <>
      <span ref={setAnchor} hidden />
      {theme ? render(<div style={theme}>{children}</div>) : null}
    </>
  );
}
