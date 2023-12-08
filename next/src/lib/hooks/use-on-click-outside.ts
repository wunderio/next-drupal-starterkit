import { useRef } from "react";

import { useEventListener } from "./use-event-listener";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
) {
  const ref = useRef<T>(null);

  useEventListener({
    eventName: "mousedown",
    handler: (event: MouseEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    },
  });

  return ref;
}
