import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { setAuthToken } from '../../../../../../api'
import {
  FlexRowContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  InputBoxWithCount,
  InputBoxWithError,
  InputCount,
  Margin24,
  Margin36,
  SubTitle,
} from '../../../../../../component/styledComponent'
import { CalendarList } from '../../../../../../hooks/useWeek'
import { useFormatDate } from '../../../../../../hooks/useFormatDate'
import {
  deleteCalendar,
  patchCalendar,
} from '../../../../../../api/admin-calendar'
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

const DataContainer = styled.div`
  padding: 0 36px 0 36px;
`

const ButtonContainer = styled.div`
  width: 218px;
  height: 360px;
  display: flex;
  flex-direction: column;
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

const NoticeModalContent = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  height: 100%;
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

const Image = styled.div`
  width: 400px;
  height: 360px;
  background: #f0f1f3;
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const InputSubBox = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 140px;
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

const SubTitleText = styled.div`
  text-align: left;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`

const DataBox = styled.div`
  width: 100%;
`

interface CalendarModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
  schedule: CalendarList
}

export const CalendarModal = (props: CalendarModalProps) => {
  const { refresh, setRefresh, onCloseModal, schedule } = props
  const errorNavigator = useErrorNavigator()
  const [title, setTitle] = useState<string>(schedule.title)
  const [content, setContent] = useState<string>(schedule.content)
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
  useEffect(() => {
    setStartDate(schedule.start_date)
    setEndDate(schedule.end_date)
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
    const response = await patchCalendar(
      schedule.church_calendar_id,
      title,
      content,
      startDate,
      endDate
    )
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }
  const onClickDeleteButton = async () => {
    const response = await deleteCalendar(schedule.church_calendar_id)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>일정 수정</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <Margin24 style={{ background: '#ffffff' }} />
        <ModalContentContainer>
          <SubTitle>제목</SubTitle>
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
              <SubTitle>날짜</SubTitle>
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

          <SubTitle>내용</SubTitle>
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
