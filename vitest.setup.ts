import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  configurable: true,
  value: ResizeObserverMock,
  writable: true,
});

if (!Element.prototype.hasPointerCapture) {
  const pointerCaptures = new WeakMap<Element, Set<number>>();

  function setPointerCapture(this: Element, pointerId: number) {
    const captures = pointerCaptures.get(this) ?? new Set<number>();

    captures.add(pointerId);
    pointerCaptures.set(this, captures);
  }

  function hasPointerCapture(this: Element, pointerId: number) {
    return pointerCaptures.get(this)?.has(pointerId) ?? false;
  }

  function releasePointerCapture(this: Element, pointerId: number) {
    pointerCaptures.get(this)?.delete(pointerId);
  }

  Object.defineProperties(Element.prototype, {
    hasPointerCapture: {
      configurable: true,
      value: hasPointerCapture,
      writable: true,
    },
    releasePointerCapture: {
      configurable: true,
      value: releasePointerCapture,
      writable: true,
    },
    setPointerCapture: {
      configurable: true,
      value: setPointerCapture,
      writable: true,
    },
  });
}

afterEach(() => {
  cleanup();
});
