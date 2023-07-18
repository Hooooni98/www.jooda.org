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
import {
  deleteChurchWeekly,
  patchChurchWeekly,
} from '../../../../../api/admin-weekly'
import {
  InnerBoxHeader,
  InnerBoxTitle,
  Margin24,
  Margin36,
  SubTitle,
  SubTitleColorText,
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
  padding: 0 36px 0 36px;
  // display: flex;

  flex-direction: column;
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

const Image = styled.div`
  width: 423px;
  height: 258px;
  padding: 16px;
  background: #f0f1f3;
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`

const InputBox = styled.input`
  width: 100%;
  box-sizing: border-box;
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

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const WeeklyDateSelect = styled.div`
  width: 171px;
  margin-top: 16px;
  flex-direction: row;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const DataBox = styled.div`
  width: 100%;
  margin-top: 16px;
`

interface WeeklyModalProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  onCloseModal: () => void
  church_weekly_id: string
  weekly_title: string
  weekly_image: string
  weekly_year: string
  weekly_month: string
}

export const WeeklyModal = (props: WeeklyModalProps) => {
  const {
    refresh,
    setRefresh,
    onCloseModal,
    church_weekly_id,
    weekly_title,
    weekly_image,
    weekly_year,
    weekly_month,
  } = props
  const errorNavigator = useErrorNavigator()

  var year = Number(weekly_year)
  const yearOptions = [
    {
      value: (year - 1).toString(),
      label: '20' + (year - 1).toString() + '년',
    },
    { value: year.toString(), label: '20' + year.toString() + '년' },
    {
      value: (year + 1).toString(),
      label: '20' + (year + 1).toString() + '년',
    },
  ]
  const monthOptions = [
    { value: '01', label: '01월' },
    { value: '02', label: '02월' },
    { value: '03', label: '03월' },
    { value: '04', label: '04월' },
    { value: '05', label: '05월' },
    { value: '06', label: '06월' },
    { value: '07', label: '07월' },
    { value: '08', label: '08월' },
    { value: '09', label: '09월' },
    { value: '10', label: '10월' },
    { value: '11', label: '11월' },
    { value: '12', label: '12월' },
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])
  const [image, setImage] = useState(weekly_image)
  const [title, setTitle] = useState(weekly_title)
  const [weeklyYear, setWeeklyYear] = useState(weekly_year)
  const [weeklyMonth, setWeeklyMonth] = useState(weekly_month)
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
    const response = await patchChurchWeekly(
      uploadImage,
      church_weekly_id,
      title,
      weeklyYear,
      weeklyMonth
    )
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }
  const onClickDeleteButton = async () => {
    const response = await deleteChurchWeekly(church_weekly_id)
    errorNavigator.navigate(response)
    setRefresh(!refresh)
    onCloseModal()
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>주보 수정</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <Margin24 style={{ background: '#ffffff' }} />

        <NoticeModalContent>
          <SubTitle>
            제목<SubTitleColorText> *</SubTitleColorText>
          </SubTitle>
          <DataBox>
            <InputBox
              type="text"
              value={title}
              placeholder={'제목 입력'}
              onChange={e => setTitle(e.target.value)}
            />
          </DataBox>
          <Margin24 style={{ background: '#ffffff' }} />
          <RowContainer>
            <div>
              <SubTitle>
                날짜<SubTitleColorText> *</SubTitleColorText>
              </SubTitle>

              <DatePickerContainer>
                <WeeklyDateSelect>
                  <div
                    style={{
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <Select
                      options={yearOptions}
                      defaultValue={yearOptions[1]}
                      onChange={e => e && setWeeklyYear(e?.value)}
                      isSearchable={false}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                          ...theme.colors,
                          primary25: '#F0E6FD',
                          primary: '#5500DD',
                          neutral20: '#C1C2C3',
                        },
                      })}
                    />
                  </div>
                </WeeklyDateSelect>
                <WeeklyDateSelect>
                  <div
                    style={{
                      float: 'right',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <Select
                      options={monthOptions}
                      defaultValue={monthOptions[Number(weeklyMonth) - 1]}
                      onChange={e => e && setWeeklyMonth(e?.value)}
                      isSearchable={false}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                          ...theme.colors,
                          primary25: '#F0E6FD',
                          primary: '#5500DD',
                          neutral20: '#C1C2C3',
                        },
                      })}
                    />
                  </div>
                </WeeklyDateSelect>
              </DatePickerContainer>
            </div>
            <Image>
              <img src={image || 'source/no_image.svg'} alt="교회 로고" />
            </Image>
          </RowContainer>

          <Margin24 style={{ background: '#ffffff' }} />

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
                border: 'NONE',
                color: '#FFFFFF',
              }}
              onClick={onClickSaveButton}
            >
              저장
            </UploadButton>
          </ButtonBox>
        </NoticeModalContent>
        <Margin36 />
      </ModalWrapper>
    </ModalOverlay>
  )
}
