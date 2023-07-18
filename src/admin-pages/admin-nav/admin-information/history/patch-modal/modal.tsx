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
import {
  deleteChurchHistories,
  patchChurchHistories,
} from '../../../../../api/admin-history'
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

const NoticeModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
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

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
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
  height: 72px;
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
  historyData: Array<History>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
}

interface History {
  church_history_id: string
  date: string
  content: string
}

export const PatchModal = (props: HistoryModalProps) => {
  const { historyData, refresh, setRefresh, onCloseModal } = props
  const errorNavigator = useErrorNavigator()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])
  const [render, setRender] = useState(false)
  const [historyList, setHistoryList] = useState<Array<History>>([
    ...historyData,
  ])
  const [deleteHistoryList, setDeleteHistoryList] = useState<Array<string>>([])

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
    setDeleteHistoryList([
      ...deleteHistoryList,
      historyList[index].church_history_id,
    ])
    historyList.splice(index, 1)
    setHistoryList(historyList)
  }
  console.log(historyList)

  const handleCloseModal = () => {
    onCloseModal()
  }

  const addButtonRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  const onClickSaveButton = async () => {
    const history_list = []
    var deleteCount = 0
    for (let i = 0; i < historyList.length; i++) {
      if (deleteHistoryList.indexOf(historyData[i].church_history_id) > -1) {
        deleteCount = deleteCount + 1
      } else if (
        historyList[i - deleteCount].content !== historyData[i].content ||
        historyList[i - deleteCount].date !==
          historyData[i].date.replaceAll('.', '-')
      ) {
        var history = historyList[i - deleteCount]
        var historyObject: any = {}
        historyObject['church_history_id'] =
          history.church_history_id.toString()
        if (history.content !== historyData[i].content) {
          historyObject['content'] = history.content
        }
        if (history.date !== historyData[i].date.replaceAll('.', '-')) {
          historyObject['year'] = history.date.slice(0, 4)
          historyObject['month'] = history.date.slice(5, 7)
          historyObject['day'] = history.date.slice(8)
        }
        history_list.push(historyObject)
      }
    }
    const response_patch = await patchChurchHistories(history_list)
    errorNavigator.navigate(response_patch)
    const response_delete = await deleteChurchHistories(deleteHistoryList)
    errorNavigator.navigate(response_delete)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>교회 연혁 수정</InnerBoxTitle>
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

        <ButtonDataContainer>
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
