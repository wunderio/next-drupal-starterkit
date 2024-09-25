import { EffectCallback, useEffect } from "react";

/**
 * Runs an effect only once, on mount.
 */
export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
