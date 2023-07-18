import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { setAuthToken } from '../../../../../api'
import {
  deleteChurchNotification,
  patchChurchNotification,
} from '../../../../../api/admin-notification'
import {
  InnerBoxHeader,
  InnerBoxTitle,
  Margin16,
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

interface NoticeModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
  church_notice_id: string
  notice_title: string
  notice_content: string
  notice_image: string
}

export const NoticeModal = (props: NoticeModalProps) => {
  const {
    refresh,
    setRefresh,
    onCloseModal,
    church_notice_id,
    notice_title,
    notice_content,
    notice_image,
  } = props
  const errorNavigator = useErrorNavigator()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  const [image, setImage] = useState(notice_image)
  const [title, setTitle] = useState(notice_title)
  const [content, setContent] = useState(notice_content)
  const [uploadImage, setUploadImage] = useState<any>([])
  const imageFile = useRef<HTMLInputElement>(null)
  const openImageFile = () => {
    if (imageFile.current) imageFile.current.click()
  }
  const saveImageFile = (event: any) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      setUploadImage(event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }
  const deleteImageFile = () => {
    setImage('')
    setUploadImage([false])
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
    const response = await patchChurchNotification(
      uploadImage,
      church_notice_id,
      title,
      content
    )
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }
  const onClickDeleteButton = async () => {
    const response = await deleteChurchNotification(church_notice_id)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>공지사항 수정</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <Margin24 style={{ background: '#ffffff' }} />
        <NoticeModalContent>
          <Image>
            <img src={image || 'source/no_image.svg'} alt="교회 로고" />
          </Image>
          <ButtonContainer>
            <UploadButton
              style={{
                background: '#ffffff',
                border: '1px solid #5500DD',
                color: '#5500DD',
              }}
              onClick={openImageFile}
            >
              <input
                type="file"
                id="file"
                ref={imageFile}
                style={{ display: 'none' }}
                onChange={saveImageFile}
              />
              이미지 변경
            </UploadButton>
            <Margin16 />
            <DeleteButton
              style={{
                background: '#ffffff',
                border: '1px solid #D40030',
                color: '#D40030',
              }}
              onClick={deleteImageFile}
            >
              이미지 삭제
            </DeleteButton>
          </ButtonContainer>
        </NoticeModalContent>

        <DataContainer>
          <DataBox>
            <InputBox
              type="text"
              value={title}
              placeholder={'제목 입력'}
              onChange={e => setTitle(e.target.value)}
            />
          </DataBox>
          <DataBox>
            <InputSubBox
              // type="text"
              value={content}
              placeholder={'내용 입력'}
              onChange={e => setContent(e.target.value)}
            />
          </DataBox>
        </DataContainer>
        <Margin24 style={{ background: '#ffffff' }} />
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
