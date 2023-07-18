import { useCallback, useEffect, useRef, useState } from 'react'

interface Date {
  date: number
  month: number
  year: number
}
interface ReturnCalendarList {
  church_calendar_id: string
  title: string
  content: string
  start_date: string
  end_date: string
  is_current_month: boolean
  x: number
  y: number
  length: number
}

export interface CalendarList {
  church_calendar_id: string
  title: string
  content: string
  start_date: string
  end_date: string
  is_current_month: boolean
}
const numRows = 3
const ableMatrix = [
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
]
export const useWeek = (
  week: Array<Date>,
  calendarList: Array<CalendarList>,
  year: number,
  month: number
) => {
  const [weekStartDate, setWeekStartDate] = useState<string>('')
  const [weekEndDate, setWeekEndDate] = useState<string>('')
  const [weekSchedule, setWeekSchedule] = useState<ReturnCalendarList[]>([])
  const [weekData, setWeekData] = useState<ReturnCalendarList[]>([])

  const getScheduleLength = useCallback(
    (start_date: string, end_date: string) => {
      if (end_date.length === 0) {
        return 1
      } else {
        var startDate = new Date(start_date)
        var endDate = new Date(end_date)
        var diff = endDate.getTime() - startDate.getTime()
        return diff === 0 ? 1 : diff / (1000 * 60 * 60 * 24) + 1
      }
    },
    []
  )
  const getLocation = useCallback(
    (length: number, ableMatrix: boolean[][], startX: number) => {
      for (let y = 0; y < numRows; y++) {
        var count = 0
        for (let x = startX; x < startX + length; x++) {
          if (ableMatrix[y][x]) {
            count = count + 1
            if (count === length) {
              for (let i = 0; i < length; i++) {
                ableMatrix[y][startX + i] = false
              }
              return {
                y: y,
              }
            }
            continue
          }
        }
      }
      return {
        y: -1,
      }
    },
    []
  )

  const getWeekSchedule = useCallback(() => {
    const results: ReturnCalendarList[] = []
    calendarList &&
      calendarList.map(schedule => {
        if (weekStartDate.length !== 0 && weekEndDate.length !== 0) {
          if (
            (weekStartDate <= schedule.start_date &&
              schedule.start_date <= weekEndDate) ||
            (schedule.end_date.length !== 0 &&
              weekStartDate <= schedule.end_date &&
              schedule.end_date <= weekEndDate) ||
            (schedule.end_date.length !== 0 &&
              weekStartDate >= schedule.start_date &&
              weekEndDate <= schedule.end_date)
          ) {
            var start_date =
              weekStartDate > schedule.start_date
                ? weekStartDate
                : schedule.start_date
            results.push({
              church_calendar_id: schedule.church_calendar_id,
              title: schedule.title,
              content: schedule.content,
              start_date: start_date,
              end_date:
                weekEndDate < schedule.end_date
                  ? weekEndDate
                  : schedule.end_date,
              is_current_month: schedule.is_current_month,
              x: getScheduleLength(weekStartDate, start_date) - 1,
              y: 0,
              length: 0,
            })
          }
        }
      })

    setWeekSchedule(results)
  }, [calendarList, getScheduleLength, weekEndDate, weekStartDate])

  const findLocationSchedule = (ableMatrix: boolean[][]) => {
    const results: ReturnCalendarList[] = []
    weekSchedule.map(schedule => {
      const scheduleLength = getScheduleLength(
        schedule.start_date,
        schedule.end_date
      )
      const { y } = getLocation(scheduleLength, ableMatrix, schedule.x)
      if (y !== -1) {
        results.push({
          church_calendar_id: schedule.church_calendar_id,
          title: schedule.title,
          content: schedule.content,
          start_date: schedule.start_date,
          end_date: schedule.end_date,
          is_current_month: schedule.is_current_month,
          x: schedule.x,
          y: y,
          length: scheduleLength,
        })
      }
    })

    setWeekData(results)
  }

  useEffect(() => {
    var start_year = week[0].year.toString()
    var start_month = week[0].month.toString()
    start_month = start_month.length === 2 ? start_month : '0' + start_month
    var start_date = week[0].date.toString()
    start_date = start_date.length === 2 ? start_date : '0' + start_date
    setWeekStartDate(start_year + '-' + start_month + '-' + start_date)
    var end_year = week[6].year.toString()
    var end_month = week[6].month.toString()
    end_month = end_month.length === 2 ? end_month : '0' + end_month
    var end_date = week[6].date.toString()
    end_date = end_date.length === 2 ? end_date : '0' + end_date
    setWeekEndDate(end_year + '-' + end_month + '-' + end_date)
  }, [week, year, month])

  useEffect(() => {
    if (weekStartDate.length !== 0 && weekEndDate.length !== 0) {
      getWeekSchedule()
    }
  }, [weekStartDate, weekEndDate, getWeekSchedule])

  useEffect(() => {
    findLocationSchedule(JSON.parse(JSON.stringify(ableMatrix)))
  }, [weekSchedule])

  return { weekData }
}
