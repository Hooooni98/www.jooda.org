import { useCallback, useEffect, useState } from 'react'
import { useToday } from './useToday'

export const useFormatDate = () => {
  const today = useToday()
  const [date, setDate] = useState<string>(today)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const formatTime = useCallback(() => {
    setDate(curTime =>
      curTime
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
        // .replace(/(\-{1,2})$/g, ''),
        .replace(/(-{1,2})$/g, '')
    )
  }, [])

  useEffect(() => {
    formatTime()
    if (
      date.length === 10 &&
      parseInt(date.slice(5, 7)) <= 12 &&
      parseInt(date.slice(5, 7)) > 0 &&
      parseInt(date.slice(8)) <= 31
    ) {
      var year = parseInt(date.slice(0, 4))
      var month = parseInt(date.slice(5, 7))
      if (parseInt(date.slice(6)) > new Date(year, month, 0).getDate()) {
        setIsError(true)
      } else {
        setIsError(false)
        setIsValid(true)
      }
    } else if (date.length === 10) {
      setIsError(true)
    } else {
      setIsValid(false)
      setIsError(false)
    }
  }, [date, formatTime])

  return { date, setDate, isValid, isError }
}
