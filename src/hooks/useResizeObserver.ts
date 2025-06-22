import { useEffect, useState, useRef, useCallback, RefObject } from "react";

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T | null>,
  fn: () => void
) {
  const callback = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (entry) {
      fn();
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(callback);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback]);
}
