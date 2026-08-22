import { useEffect, useState } from "react";

function queryIsTouch() {
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(queryIsTouch);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setIsTouch(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isTouch;
}
