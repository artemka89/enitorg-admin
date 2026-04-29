'use client';

import { type Ref, useRef, useState } from 'react';

import { useClickAway } from './use-click-away';

export function useFocusElement(): [
  boolean,
  (value: boolean) => void,
  Ref<null>,
] {
  const [isFocus, setFocus] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocus(false);
  });

  return [isFocus, setFocus, ref];
}
