import { useRef, useState } from 'react'

export const useDebounce = (props: any) => {
  const { time } = props
  let timer = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const debounceCallback = async (func: Function) => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      setIsLoading(true)
      // Do something
      await func()
      setIsLoading(false)
      timer.current = undefined
    }, time)
  }

  return { debounceCallback, isLoading }
}
