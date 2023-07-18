import { useCallback, useEffect, useState } from 'react'

export const useFormatTime = () => {
  const [time, setTime] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const formatTime = useCallback(() => {
    setTime(curTime =>
      curTime
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,2})(\d{0,2})$/g, '$1:$2')
        // .replace(/(\-{1,2})$/g, ''),
        .replace(/(:{1,2})$/g, '')
    )
  }, [])

  useEffect(() => {
    formatTime()
    if (
      time.length === 5 &&
      parseInt(time.slice(0, 2)) <= 24 &&
      parseInt(time.slice(3)) <= 60
    ) {
      var hour = parseInt(time.slice(0, 2)) === 24 ? '00' : time.slice(0, 2)
      var minute = parseInt(time.slice(3)) === 60 ? '00' : time.slice(3)
      setTime(hour + ':' + minute)
      setIsError(false)
      setIsValid(true)
    } else if (time.length === 5) {
      setIsError(true)
    } else {
      setIsValid(false)
      setIsError(false)
    }
  }, [time, formatTime])

  return { time, setTime, isValid, isError }
}
