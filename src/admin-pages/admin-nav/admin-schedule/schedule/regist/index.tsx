import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  FlexRowContainer,
  FlexRowInnerLeft,
  FlexRowInnerRight,
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  InputBox,
  InputBoxWithCount,
  InputBoxWithError,
  InputCount,
  MainContainer,
  Margin16,
  Margin24,
  Margin36,
  SubTitle,
  SubTitleColorText,
} from '../../../../../component/styledComponent'
import styled from 'styled-components'
import { useFormatTime } from '../../../../../hooks/useFormatTime'
import { createSchedule } from '../../../../../api/admin-schedule'
import { setAuthToken } from '../../../../../api'
import { useErrorNavigator } from '../../../../../error-pages/useErrorNavigator'

const ActiveRegisterButton = styled.button`
  color: #ffffff;
  background-color: #5500dd;
  width: 120px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`
const DeActiveRegisterButton = styled.button`
  color: #5500dd;
  background: #ffffff;
  width: 120px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #5500dd;
`

const Time = styled.div`
  width: calc(50% - 18px);
`
const TimeDivider = styled.div`
  width: 36px;
  margin-top: 56px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`
const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const DayContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  background: #ffffff;
`
const ClickedDayText = styled.text`
  color: #5500dd;
`
const Check = styled.image`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`

const days = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
]
interface DayProps {
  weekday: string | undefined
  index: number
  setWeekday: Dispatch<SetStateAction<string>>
}
export const Day = (props: DayProps) => {
  const { weekday, index, setWeekday } = props

  return (
    <DayContainer
      onClick={() => {
        setWeekday(index.toString())
      }}
    >
      {weekday === index.toString() ? (
        <ClickedDayText>{days[index]}</ClickedDayText>
      ) : (
        days[index]
      )}

      <Check>
        <img
          src={
            weekday === index.toString()
              ? '/source/icon/check.svg'
              : '/source/icon/dark_check.svg'
          }
          alt=""
        />
      </Check>
    </DayContainer>
  )
}
interface InnerScheduleProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

export const InnerScheduleRegist = (props: InnerScheduleProps) => {
  const { refresh, setRefresh } = props
  const errorNavigator = useErrorNavigator()
  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')
  const [weekday, setWeekday] = useState<string>('')
  const [place, setPlace] = useState<string>('')
  const [mc, setMc] = useState<string>('')
  const [target, setTarget] = useState<string>('')
  const [reference, setReference] = useState<string>('')
  const [isActive, setIsActive] = useState(false)
  const {
    time: startTime,
    setTime: setStartTime,
    isValid: isStartValid,
    isError: isStartError,
  } = useFormatTime()
  const {
    time: endTime,
    setTime: setEndTime,
    isValid: isEndValid,
    isError: isEndError,
  } = useFormatTime()

  const onClickRegisterButton = async () => {
    const response = await createSchedule(
      title,
      subtitle,
      weekday,
      place,
      mc,
      target,
      reference,
      startTime,
      isEndValid ? endTime : ''
    )
    errorNavigator.navigate(response)
    setTitle('')
    setSubtitle('')
    setWeekday('')
    setPlace('')
    setMc('')
    setTarget('')
    setReference('')
    setIsActive(false)
    setStartTime('')
    setEndTime('')
    setRefresh(!refresh)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  useEffect(() => {
    if (title !== '' && weekday !== '' && isStartValid) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [title, weekday, isStartValid])
  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>예배 일정 등록</InnerBoxTitle>
        {isActive ? (
          <ActiveRegisterButton onClick={onClickRegisterButton}>
            등록
          </ActiveRegisterButton>
        ) : (
          <DeActiveRegisterButton>등록</DeActiveRegisterButton>
        )}
      </InnerBoxHeader>
      <InnerBoxContainer>
        <Margin36 />
        <FlexRowContainer>
          <FlexRowInnerLeft>
            <SubTitle>
              예배명<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <InputBox
              type="text"
              maxLength={20}
              value={title}
              placeholder="예배명 입력"
              onChange={e => setTitle(e.target.value)}
            />
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>소제목</SubTitle>
            <InputBox
              type="text"
              maxLength={20}
              value={subtitle}
              placeholder="소제목 입력"
              onChange={e => setSubtitle(e.target.value)}
            />
          </FlexRowInnerRight>
        </FlexRowContainer>
        <Margin36 />
        <FlexRowContainer>
          <Time>
            <SubTitle>
              시간<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <InputBoxWithError
              type="text"
              maxLength={5}
              value={startTime}
              error={isStartError}
              placeholder="05:00"
              onChange={e => setStartTime(e.target.value)}
            />
          </Time>
          <TimeDivider>~</TimeDivider>
          <Time>
            <div style={{ paddingTop: '24px' }} />
            <InputBoxWithError
              type="text"
              maxLength={5}
              value={endTime}
              error={isEndError}
              placeholder="06:30"
              onChange={e => setEndTime(e.target.value)}
            />
          </Time>
        </FlexRowContainer>
        <Margin36 />
        <SubTitle>
          요일<SubTitleColorText> *</SubTitleColorText>
        </SubTitle>

        <Margin16 />
        <DaysContainer>
          {days.map((day, index) => {
            return (
              <Day
                key={index}
                setWeekday={() => setWeekday(index.toString())}
                weekday={weekday}
                index={index}
              />
            )
          })}
        </DaysContainer>
        <Margin36 />
        <FlexRowContainer>
          <FlexRowInnerLeft>
            <SubTitle>장소</SubTitle>
            <InputBoxWithCount>
              <InputBox
                type="text"
                maxLength={15}
                value={place}
                placeholder="장소 입력"
                onChange={e => setPlace(e.target.value)}
              />
              <InputCount>({place.length}/15)</InputCount>
            </InputBoxWithCount>
            <Margin36 />
            <SubTitle>대상</SubTitle>
            <InputBoxWithCount>
              <InputBox
                type="text"
                maxLength={15}
                value={target}
                placeholder="대상 입력"
                onChange={e => setTarget(e.target.value)}
              />
              <InputCount>({target.length}/15)</InputCount>
            </InputBoxWithCount>
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>설교/진행</SubTitle>
            <InputBoxWithCount>
              <InputBox
                type="text"
                maxLength={15}
                value={mc}
                placeholder="설교/진행 입력"
                onChange={e => setMc(e.target.value)}
              />
              <InputCount>({mc.length}/15)</InputCount>
            </InputBoxWithCount>
            <Margin36 />
            <SubTitle>참고</SubTitle>
            <InputBoxWithCount>
              <InputBox
                type="text"
                maxLength={15}
                value={reference}
                placeholder="참고 입력"
                onChange={e => setReference(e.target.value)}
              />
              <InputCount>({reference.length}/15)</InputCount>
            </InputBoxWithCount>
          </FlexRowInnerRight>
        </FlexRowContainer>
        <Margin36 />
      </InnerBoxContainer>
      <div style={{ paddingTop: '24px' }} />
    </MainContainer>
  )
}
