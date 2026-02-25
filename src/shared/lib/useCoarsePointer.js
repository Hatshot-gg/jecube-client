import { useEffect, useState } from "react";

export function useCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarse(mq.matches);

    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isCoarse;
}
