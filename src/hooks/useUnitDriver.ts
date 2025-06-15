import { useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

export function useUnitDriver({
  start,
  duration,
}: {
  start: boolean;
  duration: number;
}) {
  const progress = useMotionValue(0);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    if (!start || finish) return;

    const startTime = performance.now();
    let frameId: number = 0;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min(elapsed / (duration * 1000), 1);
      progress.set(newProgress);
      if (newProgress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setFinish(true);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [start, duration, progress]);
  return {
    progress,
  };
}
