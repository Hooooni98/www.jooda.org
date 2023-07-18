import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
  Margin36,
  SubTitle,
} from '../../../../../component/styledComponent'
import { Date, useMonth } from '../../../../../hooks/useMonth'
import { WeekView } from './week'
import styled from 'styled-components'
import { setAuthToken } from '../../../../../api'
import { getCalendar } from '../../../../../api/admin-calendar'
import { useErrorNavigator } from '../../../../../error-pages/useErrorNavigator'

const WeekHeader = styled.div`
  height: 48px;
  display: flex;
  flex-direction: row;
`
const WeekHeaderText = styled.text`
  width: 128px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`
const Calendar = styled.div`
  margin-left: calc(50% - 448px);
`

export const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row
  min-width: 884px;
`
const ArrowImage = styled.image`
  width: 24px;
  height: 24px;
  margin-bottom: 36px;
  margin-left: 8px;
`

interface InnerCalendarProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const weekHeader = ['일', '월', '화', '수', '목', '금', '토']
export const CalendarView = (props: InnerCalendarProps) => {
  const { refresh, setRefresh } = props
  const errorNavigator = useErrorNavigator()
  const { weekList, year, month, setYear, setMonth } = useMonth()
  const [calendarList, setCalendarList] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
    const fetchData = async () => {
      const response = await getCalendar(year, month)
      errorNavigator.navigate(response)
      setCalendarList(response.payload.church_calendar_list)
    }

    fetchData()
  }, [year, month, refresh])

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>달력</InnerBoxTitle>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <Margin36 />
        <Calendar>
          <CalendarHeader>
            <SubTitle>
              {year}년 {month}월
            </SubTitle>
            <div style={{ marginLeft: '730px' }}>
              <ArrowImage>
                <img
                  onClick={() => setMonth(month - 1)}
                  src={'/source/icon/arrow_left_dark.svg'}
                  alt="information"
                />
              </ArrowImage>
              <ArrowImage>
                <img
                  onClick={() => setMonth(month + 1)}
                  src={'/source/icon/arrow_right_dark.svg'}
                  alt="information"
                />
              </ArrowImage>
            </div>
          </CalendarHeader>

          <Margin36 />
          <WeekHeader>
            {weekHeader.map((haederText, index) => {
              return <WeekHeaderText key={index}>{haederText}</WeekHeaderText>
            })}
          </WeekHeader>
          {weekList &&
            weekList.map((week: Date[], index: number) => {
              return (
                <WeekView
                  key={index}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  week={week}
                  year={year}
                  month={month}
                  calendar_list={calendarList}
                />
              )
            })}
        </Calendar>
      </InnerBoxContainer>
      <div style={{ paddingTop: '24px' }} />
    </MainContainer>
  )
}
