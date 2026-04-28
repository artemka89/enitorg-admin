'use client';

import { useRef, useState } from 'react';

export function useDebounce<T>(
  initialValue: T,
  delay: number = 500,
): [T, T, (value: T) => void] {
  const [inputValue, setInputValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const setValue = (value: T) => {
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  };

  return [inputValue, debouncedValue, setValue];
}
