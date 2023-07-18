import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Date } from '../../../../../hooks/useMonth'
import styled from 'styled-components'
import { CalendarList, useWeek } from '../../../../../hooks/useWeek'
import { CalendarModal } from './patch-modal/modal'

const DayContainer = styled.div`
  width: 128px;
  height: 26px;
`

const WeekDateContainer = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
`
const WeekContentContainer = styled.div`
  height: 94px;
`
const DateText = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const ScheduleBox = styled.div`
  margin-top: 2px;
  border-radius: 8px;
  background: #5500dd;
  position: absolute;
  height: 26px;
  text-align: left;
  justify-content: center;
  align-item: center;
  color: #ffffff;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border: 1px solid;
  cursor: pointer;
`

interface DayProps {
  index: number
  date: Date
  currentYear: number
  currentMonth: number
}
interface WeekViewProps {
  week: Array<Date>
  year: number
  month: number
  calendar_list: Array<CalendarList>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const Day = (props: DayProps) => {
  const { index, date, currentYear, currentMonth } = props
  return (
    <DayContainer>
      <DateText
        style={{
          color:
            date.month !== currentMonth
              ? '#c1c2c3'
              : index === 0
              ? '#D40030'
              : '#000000',
        }}
      >
        {date.date}
      </DateText>
    </DayContainer>
  )
}

// const scheduleWidth = [0, 120, 248, 376, 504, 632, 760, 888]
const scheduleWidth = [0, 124, 252, 380, 508, 636, 764, 892]
export const WeekView = (props: WeekViewProps) => {
  const { week, year, month, calendar_list, refresh, setRefresh } = props
  const { weekData } = useWeek(week, calendar_list, year, month)
  const [showModal, setShowModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const openModal = (id: string) => {
    setShowModal(true)
    setCurrentIndex(
      calendar_list.findIndex(calendar => calendar.church_calendar_id === id)
    )
  }
  return (
    <>
      <WeekDateContainer>
        {week &&
          week.map((day, index) => {
            return (
              <Day
                key={index}
                index={index}
                date={day}
                currentYear={year}
                currentMonth={month}
              />
            )
          })}
      </WeekDateContainer>

      <WeekContentContainer>
        {weekData &&
          weekData.map((schedule, index) => {
            return (
              <ScheduleBox
                onClick={() => openModal(schedule.church_calendar_id)}
                style={{
                  marginLeft: schedule.x * 128 + 2,
                  marginTop: schedule.y * 26 + schedule.y * 2,
                  width: scheduleWidth[schedule.length],
                  height: 26,
                  backgroundColor:
                    schedule.end_date === ''
                      ? '#ffffff'
                      : schedule.is_current_month
                      ? '#5500dd'
                      : '#D8C2F9',
                  color:
                    schedule.end_date !== ''
                      ? '#ffffff'
                      : schedule.is_current_month
                      ? '#5500dd'
                      : '#D8C2F9',
                  borderColor: schedule.is_current_month
                    ? '#5500dd'
                    : '#D8C2F9',
                }}
              >
                {schedule.title}
              </ScheduleBox>
            )
          })}
      </WeekContentContainer>

      {showModal && (
        <CalendarModal
          refresh={refresh}
          setRefresh={setRefresh}
          onCloseModal={() => setShowModal(false)}
          schedule={calendar_list[currentIndex]}
        />
      )}
    </>
  )
}
