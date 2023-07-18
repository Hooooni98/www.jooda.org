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
import { setAuthToken } from '../../../../../api'
import { useFormatDate } from '../../../../../hooks/useFormatDate'
import { createCalendar } from '../../../../../api/admin-calendar'
import { useToday } from '../../../../../hooks/useToday'
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
  width: 120px;
  background: #ffffff;
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

const Date = styled.div`
  width: calc(50% - 18px);
`
const DateDivider = styled.div`
  width: 36px;
  margin-top: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`
const InputSubBox = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 92px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  padding: 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  resize: none;
  overflow: auto;
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`

interface InnerCalendarProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

export const InnerCalendarRegist = (props: InnerCalendarProps) => {
  const today = useToday()
  const errorNavigator = useErrorNavigator()
  const { refresh, setRefresh } = props
  const [isActive, setIsActive] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const {
    date: startDate,
    setDate: setStartDate,
    isValid: isStartValid,
    isError: isStartError,
  } = useFormatDate()
  const {
    date: endDate,
    setDate: setEndDate,
    isValid: isEndValid,
    isError: isEndError,
  } = useFormatDate()

  const onClickRegisterButton = async () => {
    var end_date = isEndValid ? (startDate < endDate ? endDate : '') : ''
    const response = await createCalendar(title, content, startDate, end_date)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    setTitle('')
    setContent('')
    setStartDate(today)
    setEndDate(today)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  useEffect(() => {
    if (title !== '' && content !== '' && isStartValid) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [title, content, isStartValid])
  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>일정 등록</InnerBoxTitle>
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

        <SubTitle>
          제목<SubTitleColorText> *</SubTitleColorText>
        </SubTitle>
        <InputBoxWithCount>
          <InputBox
            type="text"
            maxLength={15}
            value={title}
            placeholder="제목 입력"
            onChange={e => setTitle(e.target.value)}
          />
          <InputCount>({title.length}/15)</InputCount>
        </InputBoxWithCount>
        <Margin36 />
        <FlexRowContainer>
          <Date>
            <SubTitle>
              날짜<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <InputBoxWithError
              type="text"
              maxLength={10}
              value={startDate}
              error={isStartError}
              placeholder="2023-05-05"
              onChange={e => setStartDate(e.target.value)}
            />
          </Date>
          <DateDivider>~</DateDivider>
          <Date>
            <div style={{ paddingTop: '24px' }} />
            <InputBoxWithError
              type="text"
              maxLength={10}
              value={endDate}
              error={isEndError}
              placeholder="2023-05-15"
              onChange={e => setEndDate(e.target.value)}
            />
          </Date>
        </FlexRowContainer>
        <Margin36 />

        <SubTitle>
          내용<SubTitleColorText> *</SubTitleColorText>
        </SubTitle>
        <InputBoxWithCount>
          <InputSubBox
            maxLength={200}
            value={content}
            placeholder="내용 입력"
            onChange={e => {
              setContent(e.target.value)
            }}
          />
          <InputCount>({content.length}/200)</InputCount>
        </InputBoxWithCount>
        <Margin36 />

        <Margin36 />
      </InnerBoxContainer>
      <div style={{ paddingTop: '24px' }} />
    </MainContainer>
  )
}
