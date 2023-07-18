import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { setAuthToken } from '../../../../../api'
import { HistoryInputBox } from '../historyInputBox'
import { createChurchHistories } from '../../../../../api/admin-history'
import {
  InnerBoxHeader,
  InnerBoxTitle,
  Margin24,
  Margin36,
} from '../../../../../component/styledComponent'
import { useErrorNavigator } from '../../../../../error-pages/useErrorNavigator'

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

const ModalWrapper = styled.div`
  position: relative;
  width: 714px;
  background-color: #ffffff;
  border-radius: 20px;
`

const ButtonDataContainer = styled.div`
  padding: 0 36px 0 36px;
  gap: 48px;
  justify-content: space-between;
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

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`

const NoticeModalContent = styled.div`
  justify-content: center;
  max-height: 300px;
  overflow-y: auto;
`

const ButtonStyle = `
  width: 100%;
  height: 48px;
  border-radius: 16px;
  font-family: "Spoqa Han Sans Neo", 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
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

const WeeklyDateSelect = styled.div`
  width: 303px;
  height: 56px;
`

const Image = styled.div`
  margin-top: 24px;
  width: 40px;
  height: 60px;
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
  width: 200px;
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
  display: flex;
  flex-direction: 'row';
`

const DataContainer = styled.div`
  padding: 48px 0 0 48px;
  width: calc(100% - 96px);
  gap: 48px;
  justify-content: space-between;
`

const AddButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #5500dd;
  text-align: center;
  cursor: pointer;
`

interface HistoryModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
}

interface History {
  date: string
  content: string
}

export const CreateModal = (props: HistoryModalProps) => {
  const { refresh, setRefresh, onCloseModal } = props
  const historyInit = {
    date: '',
    content: '',
  }
  const errorNavigator = useErrorNavigator()

  const addButtonRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])
  const [render, setRender] = useState(false)
  const [historyList, setHistoryList] = useState<Array<History>>([historyInit])

  const changeDate = (index: number, date: string) => {
    historyList[index] = { ...historyList[index], date: date }
    setHistoryList(historyList)
    setRender(!render)
  }
  const changeContent = (index: number, content: string) => {
    historyList[index] = { ...historyList[index], content: content }
    setHistoryList(historyList)
    setRender(!render)
  }
  const deleteHistroy = (index: number) => {
    historyList.splice(index, 1)
    setHistoryList(historyList)
    setRender(!render)
  }

  const handleCloseModal = () => {
    onCloseModal()
  }
  console.log(historyList)

  const handleWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  const onClickSaveButton = async () => {
    const history_list = []
    for (let i = 0; i < historyList.length; i++) {
      if (historyList[i].content !== '' && historyList[i].date.length === 10) {
        var history = historyList[i]
        history_list.push({
          content: history.content,
          year: history.date.slice(0, 4),
          month: history.date.slice(5, 7),
          day: history.date.slice(8),
        })
      }
    }
    const response = await createChurchHistories(history_list)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>교회 연혁 추가</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>

        <Margin24 style={{ background: '#ffffff' }} />

        <NoticeModalContent ref={scrollRef}>
          {historyList &&
            historyList.map((history, index) => {
              return (
                <HistoryInputBox
                  index={index}
                  date={history.date}
                  content={history.content}
                  changeDate={changeDate}
                  changeContent={changeContent}
                  deleteHistroy={deleteHistroy}
                />
              )
            })}
          <div ref={addButtonRef}></div>
        </NoticeModalContent>

        <Margin24 style={{ background: '#ffffff' }} />

        <ButtonDataContainer>
          <AddButtonBox>
            <AddButton
              onClick={() => setHistoryList([...historyList, historyInit])}
              style={{
                background: '#ffffff',
                border: '1px solid #5500dd',
                color: '#5500dd',
              }}
            >
              <img
                src="/source/icon/add.svg"
                alt="information"
                style={{ marginRight: '8px' }}
              />
              교회 연혁 추가
            </AddButton>
          </AddButtonBox>

          <ButtonBox>
            <DeleteButton
              style={{
                background: '#ffffff',
                border: '1px solid #C1C2C3',
                color: '#797A7B',
              }}
              onClick={onCloseModal}
            >
              취소
            </DeleteButton>
            <UploadButton
              style={{
                background: '#5500DD',
                border: 'none',
                color: '#ffffff',
              }}
              onClick={onClickSaveButton}
            >
              저장
            </UploadButton>
          </ButtonBox>
        </ButtonDataContainer>
        <Margin36 />
      </ModalWrapper>
    </ModalOverlay>
  )
}
