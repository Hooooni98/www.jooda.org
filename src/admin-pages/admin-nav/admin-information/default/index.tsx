import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import { setAuthToken } from '../../../../api'
import {
  getChurchInfo,
  patchChurchInfo,
} from '../../../../api/admin-information'
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

declare const daum: any

const ModifyButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
`

const ButtonStyle = `
  width: 100%;
  height: 40px;
  border-radius: 16px;
  font-family: "Spoqa Han Sans Neo", 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
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

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`

const LogoImage = styled.div`
  margin-top: 16px;
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

const ThumbnailImage = styled.div`
  margin-top: 16px;
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

const InputBox = styled.input`
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

interface ChurchInfo {
  church_id: string
  name: string
  contact_number: string
  denomination: string
  denomination_list: string[]
  introduction_title: string
  introduction_content: string
  is_exposure: boolean
  address: string
  detail_address: string
  thumbnail: string
  logo: string
  directions_parking: string
  directions_own_car: string
  directions_public_transport: string
  directions_shuttle_bus: string
}

export const InnerDefaultPage: React.FC = () => {
  const [churchInfo, setChurchInfo] = useState<ChurchInfo | null>(null)
  const errorNavigator = useErrorNavigator()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }

    const fetchData = async () => {
      const response = await getChurchInfo()
      errorNavigator.navigate(response)
      setChurchInfo(response.payload.church_info)
    }

    fetchData()
  }, [])

  const [editState, setEditState] = useState(false)
  const [logo, setLogo] = useState(churchInfo?.logo)
  const [thumbnail, setThumbnail] = useState(churchInfo?.thumbnail)
  const [churchName, setChruchName] = useState(churchInfo?.name)
  const [denominationName, setDenominationName] = useState(
    churchInfo?.denomination
  )
  const [denominationList, setDenominationList] = useState(
    churchInfo?.denomination_list
  )
  const [contackNumber, setContackNumber] = useState(churchInfo?.contact_number)
  const [introductionTitle, setIntroductionTitle] = useState(
    churchInfo?.introduction_title
  )
  const [introductionContent, setIntroductionContent] = useState(
    churchInfo?.introduction_content
  )
  const [address, setAddress] = useState(churchInfo?.address)
  const [detailAddress, setDetailAddress] = useState('')

  const [uploadLogo, setUploadLogo] = useState<any>([])
  const [uploadThumbnail, setUploadThumbnail] = useState<any>([])
  const logoFile = useRef<HTMLInputElement>(null)
  const openLogoFile = () => {
    if (editState && logoFile.current) logoFile.current.click()
  }
  const saveLogoFile = (event: any) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      setUploadLogo(event.target.files[0])
      setLogo(URL.createObjectURL(event.target.files[0]))
    }
  }
  const deleteLogoFile = () => {
    if (editState) {
      setLogo('')
      setUploadLogo([false])
    }
  }
  const thumbnailFile = useRef<HTMLInputElement>(null)
  const openThumbnailFile = () => {
    if (editState && thumbnailFile.current) thumbnailFile.current.click()
  }
  const saveThumbnailFile = (event: any) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      setUploadThumbnail(event.target.files[0])
      setThumbnail(URL.createObjectURL(event.target.files[0]))
    }
  }
  const deleteThumbnailFile = () => {
    if (editState) {
      setThumbnail('')
      setUploadThumbnail([false])
    }
  }

  useEffect(() => {
    setLogo(churchInfo?.logo)
    setThumbnail(churchInfo?.thumbnail)
    setChruchName(churchInfo?.name)
    setDenominationName(churchInfo?.denomination)
    setDenominationList(churchInfo?.denomination_list)
    setContackNumber(churchInfo?.contact_number)
    setIntroductionTitle(churchInfo?.introduction_title)
    setIntroductionContent(churchInfo?.introduction_content)
    setAddress(churchInfo?.address)
    setDetailAddress(churchInfo ? churchInfo.detail_address : '')
  }, [churchInfo])

  const handleEdit = async () => {
    if (editState) {
      const response = await patchChurchInfo(
        uploadLogo,
        uploadThumbnail,
        churchName,
        denominationName,
        contackNumber,
        introductionTitle,
        introductionContent,
        address,
        detailAddress
      )

      errorNavigator.navigate(response)
      setEditState(false)
    } else {
      setEditState(true)
    }
  }

  const addressRef = useRef<HTMLInputElement>(null)

  const handleAddressSearch = () => {
    if (!editState) {
      return
    }
    const popupWidth = 500
    const popupHeight = 600
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    const popupLeft = (windowWidth - popupWidth) / 2
    const popupTop = (windowHeight - popupHeight) / 2

    new daum.Postcode({
      left: popupLeft,
      top: popupTop,
      width: '100%',
      height: '100%',
      oncomplete: function (data: any) {
        setAddress(data.roadAddress)
        if (addressRef.current) {
          addressRef.current.focus()
        }
      },
    }).open()
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>기본정보</InnerBoxTitle>
        <ModifyButton
          onClick={handleEdit}
          style={{
            background: editState ? '#5500DD' : '#ffffff',
            border: editState ? 'none' : '1px solid #5500dd',
            color: editState ? '#ffffff' : '#5500dd',
          }}
        >
          {editState ? '저장' : '수정'}
        </ModifyButton>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <Margin36 />
        <FlexRowContainer>
          <FlexRowInnerLeft>
            <SubTitle>로고 이미지</SubTitle>
            <Margin16 />
            <InfoBox text="교회 프로필 이미지에 등록돼요." />
            <LogoImage>
              <img src={logo || 'source/no_image.svg'} alt="교회 로고" />
            </LogoImage>
            <ButtonBox>
              <UploadButton
                style={{
                  background: editState ? '#ffffff' : '#E3E4E6',
                  border: editState ? '1px solid #5500DD' : 'none',
                  color: editState ? '#5500DD' : '#A2A3A5',
                }}
                onClick={openLogoFile}
              >
                <input
                  type="file"
                  id="file"
                  ref={logoFile}
                  style={{ display: 'none' }}
                  onChange={saveLogoFile}
                />
                업로드
              </UploadButton>
              <DeleteButton
                style={{
                  background: editState ? '#ffffff' : '#E3E4E6',
                  border: editState ? '1px solid #D40030' : 'none',
                  color: editState ? '#D40030' : '#A2A3A5',
                }}
                onClick={deleteLogoFile}
              >
                삭제
              </DeleteButton>
            </ButtonBox>
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>배경 이미지</SubTitle>
            <Margin16 />
            <InfoBox text="교회 소개 배경 이미지에 등록돼요." />
            <ThumbnailImage>
              <img src={thumbnail || 'source/no_image.svg'} alt="배경 이미지" />
            </ThumbnailImage>
            <ButtonBox>
              <UploadButton
                style={{
                  background: editState ? '#ffffff' : '#E3E4E6',
                  border: editState ? '1px solid #5500DD' : 'none',
                  color: editState ? '#5500DD' : '#A2A3A5',
                }}
                onClick={openThumbnailFile}
              >
                <input
                  type="file"
                  id="file"
                  ref={thumbnailFile}
                  style={{ display: 'none' }}
                  onChange={saveThumbnailFile}
                />
                업로드
              </UploadButton>
              <DeleteButton
                style={{
                  background: editState ? '#ffffff' : '#E3E4E6',
                  border: editState ? '1px solid #D40030' : 'none',
                  color: editState ? '#D40030' : '#A2A3A5',
                }}
                onClick={deleteThumbnailFile}
              >
                삭제
              </DeleteButton>
            </ButtonBox>
          </FlexRowInnerRight>
        </FlexRowContainer>
        <Margin36 />
        <FlexRowContainer>
          <FlexRowInnerLeft>
            <SubTitle>교회명</SubTitle>
            <InputBox
              type="text"
              value={churchName}
              disabled={!editState}
              placeholder={'교회명 입력'}
              onChange={e => setChruchName(e.target.value)}
            />
            <Margin36 />

            <SubTitle>연락처</SubTitle>
            <Margin16 />
            <InfoBox text="'-'를 포함해서 입력해주세요." />
            <InputBox
              type="text"
              value={contackNumber}
              disabled={!editState}
              placeholder="연락처 입력"
              onChange={e => setContackNumber(e.target.value)}
            />
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>종파</SubTitle>
            <InputBox
              type="text"
              value={denominationName}
              disabled={!editState}
              placeholder="종파를 선택해주세요"
              onChange={e => setDenominationName(e.target.value)}
            />
            <Margin36 />
            <SubTitle>교회 위치</SubTitle>
            <InputBox
              ref={addressRef}
              type="text"
              value={address}
              disabled={!editState}
              placeholder="도로명 주소 입력"
              onClick={handleAddressSearch}
            />
            <InputBoxWithCount>
              <InputBox
                type="text"
                maxLength={40}
                value={detailAddress}
                disabled={!editState}
                placeholder="상세주소 입력"
                onChange={e => {
                  setDetailAddress(e.target.value)
                }}
              />
              <InputCount>({detailAddress.length}/40)</InputCount>
            </InputBoxWithCount>
          </FlexRowInnerRight>
        </FlexRowContainer>
        <Margin36 />
        <SubTitle>교회 소개</SubTitle>
        <InputBoxWithCount>
          <InputBox
            type="text"
            maxLength={30}
            value={introductionTitle}
            disabled={!editState}
            placeholder="제목 입력"
            onChange={e => {
              setIntroductionTitle(e.target.value)
            }}
          />
          <InputCount>
            ({introductionTitle ? introductionTitle.length : 0}/30)
          </InputCount>
        </InputBoxWithCount>

        <InputBoxWithCount>
          <InputSubBox
            maxLength={200}
            value={introductionContent}
            disabled={!editState}
            placeholder="설명 입력"
            onChange={e => {
              setIntroductionContent(e.target.value)
            }}
          />
          <InputCount>
            ({introductionContent ? introductionContent.length : 0}/200)
          </InputCount>
        </InputBoxWithCount>
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
