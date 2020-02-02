import { useState, useEffect } from 'react'

export default function useDebounce(value: string, delay: number = 1000) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
