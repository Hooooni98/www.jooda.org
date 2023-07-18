import React, { Dispatch, SetStateAction, useRef } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { createChurchNotification } from '../../../../api/admin-notification'
import {
  FlexRowContainer,
  FlexRowInnerLeft,
  FlexRowInnerRight,
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
  Margin16,
  Margin36,
  SubTitle,
} from '../../../../component/styledComponent'
import { InfoBox } from '../../../../component/box/info'
import { useErrorNavigator } from '../../../../error-pages/useErrorNavigator'

const SubTitleColorText = styled.text`
  color: #5500dd;
`

const ModifyButtonBox = styled.div`
  display: flex;
  gap: 16px;
`

interface ModifyButtonProps {
  active: boolean
}

const ModifyButton = styled.button<ModifyButtonProps>`
  width: 120px;
  height: 40px;
  cursor: pointer;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  background: ${({ active }) => (active ? '#5500DD' : '#ffffff')};
  border: ${({ active }) => (active ? 'none' : '1px solid #5500DD')};
  color: ${({ active }) => (active ? '#ffffff' : '#5500DD')};
`

const buttonStyle = `
  width: 100%;
  height: 40px;
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
  ${buttonStyle}
`

const DeleteButton = styled.button`
  ${buttonStyle}
`

const ErrorText = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #d40030;
  text-align: left;
  margin-top: 8px;
  margin-left: 16px;
`

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`

const NotificationImage = styled.div`
  margin-top: 24px;
  width: 430px;
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

const InputBoxWithCount = styled.div`
  position: relative;
`

const InputCount = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 14px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #c1c2c3;
`

interface InputBoxProps {
  error: boolean
  value: string
}
const InputBox = styled.input<InputBoxProps>`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${({ error }) => (error ? '#D40030' : '#c1c2c3')};
  padding: 0 78px 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`

const InputSubBox = styled.textarea<InputBoxProps>`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 148px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${({ error }) => (error ? '#D40030' : '#c1c2c3')};
  padding: 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  resize: none;
  overflow: auto;
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`

interface NoticePropType {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

export const InnerRegistPage = (props: NoticePropType) => {
  const { setRefresh, refresh } = props
  const errorNavigator = useErrorNavigator()
  const [notificationTitle, setNotoficationTitle] = useState('')
  const [notificationContent, setNotificationContent] = useState('')
  const [notificationImage, setNotificationImage] = useState('')

  const [notificationTitleCount, setNotificationTitleCount] = useState(0)

  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)

  const [uploadImage, setUploadImage] = useState<any>([])
  const imageFile = useRef<HTMLInputElement>(null)
  const openImageFile = () => {
    if (imageFile.current) imageFile.current.click()
  }

  const saveImageFile = (event: any) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      setUploadImage(event.target.files[0])
      setNotificationImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const deleteImageFile = () => {
    setNotificationImage('')
    setUploadImage([false])
  }

  const handleEdit = async () => {
    if (notificationTitle === '') {
      setTitleError(true)
    } else {
      setTitleError(false)
    }

    if (notificationContent === '') {
      setContentError(true)
    } else {
      setContentError(false)
    }

    if (notificationTitle !== '' && notificationContent !== '') {
      setNotoficationTitle('')
      setNotificationContent('')
      setNotificationImage('')
      const response = await createChurchNotification(
        uploadImage,
        notificationTitle,
        notificationContent
      )
      errorNavigator.navigate(response)
      response?.success === true && setRefresh(!refresh)
    }
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>공지사항 등록</InnerBoxTitle>
        <ModifyButtonBox>
          <ModifyButton
            active={notificationTitle !== '' && notificationContent !== ''}
            onClick={handleEdit}
          >
            등록
          </ModifyButton>
        </ModifyButtonBox>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <div style={{ paddingTop: 36 }} />
        <FlexRowContainer>
          <FlexRowInnerLeft>
            <SubTitle>
              제목<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <InputBoxWithCount>
              <InputBox
                type="text"
                maxLength={20}
                value={notificationTitle}
                placeholder="제목 입력"
                error={titleError}
                onChange={e => {
                  setNotoficationTitle(e.target.value)
                  setNotificationTitleCount(e.target.value.length)
                }}
              />
              <InputCount>({notificationTitleCount}/20)</InputCount>
            </InputBoxWithCount>
            <Margin36 />
            <SubTitle>
              내용<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <InputSubBox
              value={notificationContent}
              placeholder="내용 입력"
              error={contentError}
              onChange={e => setNotificationContent(e.target.value)}
            />
            {(contentError || titleError) && (
              <ErrorText>제목 또는 내용은 필수 항목이에요.</ErrorText>
            )}
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>공지사항 이미지</SubTitle>
            <Margin16 />
            <InfoBox
              text={'글과 함께 볼 수 있는 이미지가 있다면 등록해주세요.'}
            />
            <NotificationImage>
              <img
                src={notificationImage || 'source/no_image.svg'}
                alt="공지 이미지"
              />
            </NotificationImage>
            <ButtonBox>
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
                업로드
              </UploadButton>
              <DeleteButton
                style={{
                  background: '#ffffff',
                  border: '1px solid #D40030',
                  color: '#D40030',
                }}
                onClick={deleteImageFile}
              >
                삭제
              </DeleteButton>
            </ButtonBox>
          </FlexRowInnerRight>
        </FlexRowContainer>
        <div
          style={{
            height: '48px',
          }}
        />
      </InnerBoxContainer>
      <div
        style={{
          height: '24px',
        }}
      />
    </MainContainer>
  )
}
