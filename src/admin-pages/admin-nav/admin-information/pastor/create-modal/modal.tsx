import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { setAuthToken } from '../../../../../api'
import { Ref } from 'react'
import { PastorBox } from '../pastorBox'
import { createChurchPastors } from '../../../../../api/admin-pastor'
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
  justify-content: center;
  max-height: 300px;
  overflow-y: auto;
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
  padding: 24px 36px 0 36px;
  gap: 48px;
  justify-content: space-between;
`

const ButtonDataContainer = styled.div`
  padding: 0 36px 0 36px;
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

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`

const InfoBox = styled.div`
  align-items: center;
  display: flex;
  padding: 16px;
  text-align: left;
  background: #f7f0ff;
  border-radius: 16px;
`

const InfoTitle = styled.div`
  margin-left: 8px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #454648;
  line-height: 24px;
`

interface PastorModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
}

interface Pastor {
  name: string
  role: string
  image: string
  uploadImage: File | undefined
}

export const PastorCreateModal = (props: PastorModalProps) => {
  const { refresh, setRefresh, onCloseModal } = props
  const errorNavigator = useErrorNavigator()
  const pastorInit = {
    name: '',
    role: '',
    image: '',
    uploadImage: undefined,
  }

  const addButtonRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])
  const [render, setRender] = useState(false)
  const [pastorList, setPastorList] = useState<Array<Pastor>>([pastorInit])

  const saveImageFile = (event: any, index: number) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      pastorList[index] = {
        ...pastorList[index],
        uploadImage: event.target.files[0],
      }
      pastorList[index] = {
        ...pastorList[index],
        image: URL.createObjectURL(event.target.files[0]),
      }
      setPastorList(pastorList)
      setRender(!render)
    }
  }
  const changeName = (index: number, name: string) => {
    pastorList[index] = { ...pastorList[index], name: name }
    setPastorList(pastorList)
    setRender(!render)
  }
  const changeRole = (index: number, role: string) => {
    pastorList[index] = { ...pastorList[index], role: role }
    setPastorList(pastorList)
    setRender(!render)
  }

  const onClickSaveButton = async () => {
    const pastor_list = []
    const image_list = []
    for (let i = 0; i < pastorList.length; i++) {
      if (pastorList[i].name.length !== 0 && pastorList[i].role.length !== 0) {
        if (pastorList[i].image.length !== 0) {
          pastor_list.push({
            name: pastorList[i].name,
            role: pastorList[i].role,
            image_state: 'update',
          })
          image_list.push(pastorList[i].uploadImage)
        } else {
          pastor_list.push({
            name: pastorList[i].name,
            role: pastorList[i].role,
          })
        }
      }
    }
    const response = await createChurchPastors(pastor_list, image_list)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>섬기는 이 추가</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <DataContainer>
          <InfoBox>
            <img
              src="/source/icon/information.svg"
              alt="information"
              style={{ marginTop: '-24px' }}
            />
            <InfoTitle>
              등록한 순서대로 목록이 나열되니 먼저 보여질 인원을 가장 먼저
              등록해주세요.
              <br />
              만약 순서를 변경하고 싶다면 [순서 변경]에서 순서를 변경해주세요.
            </InfoTitle>
          </InfoBox>
        </DataContainer>
        <Margin24 style={{ background: '#ffffff' }} />
        <NoticeModalContent ref={scrollRef}>
          {pastorList.map((pastor, index) => (
            <div
              key={index}
              style={{
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '28px',
              }}
            >
              <DataBox>
                <PastorBox
                  index={index}
                  image={pastor.image || '/source/icon/pastor_upload_image.svg'}
                  name={pastor.name}
                  role={pastor.role}
                  saveImageFile={saveImageFile}
                  changeName={changeName}
                  changeRole={changeRole}
                />
              </DataBox>
            </div>
          ))}
          <div ref={addButtonRef}></div>
        </NoticeModalContent>

        <Margin24 style={{ background: '#ffffff' }} />

        <ButtonDataContainer>
          <AddButtonBox>
            <AddButton
              onClick={() => setPastorList([...pastorList, pastorInit])}
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
              섬기는 이 추가
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
