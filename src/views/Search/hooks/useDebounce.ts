import { useState, useEffect } from 'react'

type DebouncedString = string | null

export default function useDebounce(
  value: string | null,
  delay: number = 800,
): DebouncedString {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
