import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { setAuthToken } from '../../../../../../api'
import {
  FlexRowContainer,
  FlexRowInnerRight,
  InnerBoxHeader,
  InnerBoxTitle,
  InputBoxWithCount,
  InputBoxWithError,
  InputCount,
  Margin16,
  Margin24,
  Margin36,
  SubTitle,
  SubTitleColorText,
} from '../../../../../../component/styledComponent'
import { useFormatTime } from '../../../../../../hooks/useFormatTime'
import {
  deleteSchedule,
  patchSchedule,
} from '../../../../../../api/admin-schedule'
import { useErrorNavigator } from '../../../../../../error-pages/useErrorNavigator'

const ModalOverlay = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 0 36px 0 36px;
`

const ModalWrapper = styled.div`
  // position: relative;
  width: 714px;
  background-color: #ffffff;
  border-radius: 20px;
`

const ModalCloseButton = styled.button`
  top: 10px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`
export const FlexRowInnerLeft = styled.div`
  width: 50%;
  margin-right: 16px;
`

const ButtonStyle = `
    width: 100%;
    height: 48px;
    border-radius: 16px;
    font-family: "Spoqa Han Sans Neo", 'Apple SD Gothic Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
  `

const UploadButton = styled.button`
  ${ButtonStyle}
`

const DeleteButton = styled.button`
  ${ButtonStyle}
`
const ModalContentContainer = styled.div`
  margin-left: 36px;
  margin-right: 36px;
`

const InputBox = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  padding: 0 78px 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`

const Time = styled.div`
  width: calc(50% - 10.5px);
`
const TimeDivider = styled.div`
  width: 21px;
  margin-top: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`
const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const DayContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  background: #ffffff;
  margin-right: 36px;
`
const ClickedDayText = styled.text`
  color: #5500dd;
`
const Check = styled.image`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`
const LeftTimeContainer = styled.div`
  width: calc(50% - 8px);
  display: flex;
  flex-direction: row;
`
const RightDaysContainer = styled.div`
  width: calc(50% - 12px);
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
const daysValue = ['월', '화', '수', '목', '금', '토', '일']
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
        <ClickedDayText>{daysValue[index]}</ClickedDayText>
      ) : (
        daysValue[index]
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
interface Schedule {
  church_worship_schedule_id: string
  title: string
  subtitle: string
  weekday: string
  place: string
  mc: string
  target: string
  reference: string
  time: string
}

interface ScheduleModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
  schedule: Schedule
}

export const ScheduleModal = (props: ScheduleModalProps) => {
  const { refresh, setRefresh, onCloseModal, schedule } = props
  const errorNavigator = useErrorNavigator()
  const [title, setTitle] = useState<string>(schedule.title)
  const [subtitle, setSubtitle] = useState<string>(
    schedule.subtitle ? schedule.subtitle : ''
  )
  const [weekday, setWeekday] = useState<string>(
    days.findIndex(day => day === schedule.weekday).toString()
  )
  const [place, setPlace] = useState<string>(
    schedule.place ? schedule.place : ''
  )
  const [mc, setMc] = useState<string>(schedule.mc ? schedule.mc : '')
  const [target, setTarget] = useState<string>(
    schedule.target ? schedule.target : ''
  )
  const [reference, setReference] = useState<string>(
    schedule.reference ? schedule.reference : ''
  )
  console.log(
    schedule.weekday,
    typeof schedule.weekday,
    days.findIndex(day => day === schedule.weekday).toString()
  )
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
  useEffect(() => {
    setStartTime(schedule.time.slice(0, 5))
    schedule.time.length === 11 && setEndTime(schedule.time.slice(6))
  }, [schedule])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  const onClickSaveButton = async () => {
    const response = await patchSchedule(
      schedule.church_worship_schedule_id,
      title,
      subtitle,
      weekday,
      place,
      mc,
      target,
      reference,
      isStartValid ? startTime : '',
      isEndValid ? endTime : ''
    )
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }
  const onClickDeleteButton = async () => {
    const response = await deleteSchedule(schedule.church_worship_schedule_id)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>예배 일정 수정</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <Margin24 style={{ background: '#ffffff' }} />
        <ModalContentContainer>
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
          <RowContainer>
            <LeftTimeContainer>
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
            </LeftTimeContainer>
            <RightDaysContainer>
              <SubTitle>
                요일<SubTitleColorText> *</SubTitleColorText>
              </SubTitle>

              <Margin16 />
              <DaysContainer>
                <Day
                  setWeekday={() => setWeekday('0')}
                  weekday={weekday}
                  index={0}
                />
                <Day
                  setWeekday={() => setWeekday('1')}
                  weekday={weekday}
                  index={1}
                />
                <Day
                  setWeekday={() => setWeekday('2')}
                  weekday={weekday}
                  index={2}
                />
                <Day
                  setWeekday={() => setWeekday('3')}
                  weekday={weekday}
                  index={3}
                />
              </DaysContainer>
              <div style={{ paddingTop: '8px' }} />
              <DaysContainer>
                <Day
                  setWeekday={() => setWeekday('4')}
                  weekday={weekday}
                  index={4}
                />
                <Day
                  setWeekday={() => setWeekday('5')}
                  weekday={weekday}
                  index={5}
                />
                <Day
                  setWeekday={() => setWeekday('6')}
                  weekday={weekday}
                  index={6}
                />
              </DaysContainer>
            </RightDaysContainer>
          </RowContainer>
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
                <InputCount>({place ? place.length : 0}/15)</InputCount>
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
                <InputCount>({target ? target.length : 0}/15)</InputCount>
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
                <InputCount>({mc ? mc.length : 0}/15)</InputCount>
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
                <InputCount>({reference ? reference.length : 0}/15)</InputCount>
              </InputBoxWithCount>
            </FlexRowInnerRight>
          </FlexRowContainer>
          <Margin24 style={{ background: '#ffffff' }} />
        </ModalContentContainer>
        <ButtonBox>
          <DeleteButton
            style={{
              background: '#ffffff',
              border: '1px solid #D40030',
              color: '#D40030',
            }}
            onClick={onClickDeleteButton}
          >
            삭제
          </DeleteButton>
          <UploadButton
            style={{
              background: '#ffffff',
              border: '1px solid #5500DD',
              color: '#5500DD',
            }}
            onClick={onClickSaveButton}
          >
            저장
          </UploadButton>
        </ButtonBox>

        <Margin36 />
      </ModalWrapper>
    </ModalOverlay>
  )
}
