import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { setAuthToken } from '../../../../../../api'
import { PastorBox } from '../../pastorBox'
import {
  deleteChurchPastor,
  patchChurchPastor,
} from '../../../../../../api/admin-pastor'
import {
  InnerBoxHeader,
  InnerBoxTitle,
  Margin24,
  Margin36,
} from '../../../../../../component/styledComponent'
import { InfoBox } from '../../../../../../component/box/info'
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

const ModalWrapper = styled.div`
  position: relative;
  width: 714px;
  background-color: #ffffff;
  border-radius: 20px;
`

const DataContainer = styled.div`
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

const WeeklyDateSelect = styled.div`
  width: 303px;
  height: 56px;
`

const Image = styled.div`
  margin-top: 24px;
  width: 202px;
  height: 202px;
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

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`

const ButtonDataContainer = styled.div`
  padding: 0 36px 0 36px;
  gap: 48px;
  justify-content: space-between;
`

interface PastorModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
  church_pastor_id: string
  pastor_index: number
  pastor_name: string
  pastor_role: string
  pastor_image: string
}

export const PastorInfoModal = (props: PastorModalProps) => {
  const {
    refresh,
    setRefresh,
    onCloseModal,
    church_pastor_id,
    pastor_index,
    pastor_name,
    pastor_role,
    pastor_image,
  } = props
  const errorNavigator = useErrorNavigator()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])
  const [image, setImage] = useState(pastor_image)
  const [name, setName] = useState(pastor_name)
  const [role, setRole] = useState(pastor_role)
  const [uploadImage, setUploadImage] = useState<any>([])

  const saveImageFile = (event: any, index: number) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      setUploadImage(event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  const onClickSaveButton = async () => {
    const response = await patchChurchPastor(
      church_pastor_id,
      name,
      role,
      uploadImage
    )
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }
  const onClickDeleteButton = async () => {
    const response = await deleteChurchPastor(church_pastor_id)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }
  const changeName = (index: number, name: string) => {
    setName(name)
    // setRender(!render)
  }
  const changeRole = (index: number, role: string) => {
    setRole(role)
    // setRender(!render)
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>섬기는 이 수정</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <Margin24 style={{ background: '#ffffff' }} />
        <DataContainer>
          <InfoBox text="이미지를 클릭하면 이미지를 변경할 수 있어요." />
        </DataContainer>
        <Margin24 style={{ background: '#ffffff' }} />
        <NoticeModalContent>
          <PastorBox
            index={pastor_index}
            image={image || 'source/no_image.svg'}
            name={name}
            role={role}
            saveImageFile={saveImageFile}
            changeName={changeName}
            changeRole={changeRole}
          />
        </NoticeModalContent>
        <ButtonDataContainer>
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
