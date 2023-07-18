import { useCallback, useEffect, useRef, useState } from 'react'

export interface Date {
  date: number
  month: number
  year: number
}

export const useMonth = () => {
  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [weekList, setWeekList] = useState<any>()

  const getWeekList = useCallback(() => {
    let weekList: Date[][] = []
    var firstDay = new Date(year, month - 1, 1).getDay()
    var lastDay = new Date(year, month, 0).getDate()
    var beforeMonthLastDay = new Date(year, month - 1, 0).getDate()
    var weekCount = Math.ceil((lastDay + firstDay) / 7)
    var lastDate = 0

    for (let week = 0; week < weekCount; week++) {
      var week_list = []
      if (week === 0) {
        for (let date = firstDay - 1; date >= 0; date--) {
          week_list.push({
            date: beforeMonthLastDay - date,
            month: month === 1 ? 12 : month - 1,
            year: month === 1 ? year - 1 : year,
          })
        }
        for (let date = 1; date <= 7 - firstDay; date++) {
          week_list.push({
            date: date,
            month: month,
            year: year,
          })
        }
        lastDate = 7 - firstDay
      } else {
        for (let date = 1; date <= 7; date++) {
          var isCurrentMonth = date + lastDate <= lastDay
          week_list.push({
            date: isCurrentMonth ? date + lastDate : date + lastDate - lastDay,
            month: isCurrentMonth ? month : month === 12 ? 1 : month + 1,
            year: isCurrentMonth ? year : month === 12 ? year + 1 : year,
          })
        }
        lastDate = 7 + lastDate
      }
      weekList[week] = week_list
    }
    setWeekList(weekList)
  }, [year, month])

  useEffect(() => {
    getWeekList()
  }, [year, month, getWeekList])

  return { weekList, year, month, setYear, setMonth }
}
