import React, { Dispatch, SetStateAction, useRef } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { useState } from 'react'
import { createChurchWeekly } from '../../../../api/admin-weekly'
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

const ButtonBox = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`

const WeeklyImage = styled.div`
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
`

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const WeeklyDateSelect = styled.div`
  width: calc(50% - 18px);
  height: 56px;
`

interface WeeklyPropType {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

export const InnerRegistPage = (props: WeeklyPropType) => {
  const { setRefresh, refresh } = props
  const errorNavigator = useErrorNavigator()
  var today = new Date()
  const monthForm = (month: string) => {
    if (month.length === 2) {
      return month
    }
    return '0' + month
  }
  var year = today.getFullYear()
  const yearOptions = [
    { value: (year - 1).toString(), label: (year - 1).toString() + '년' },
    { value: year.toString(), label: year.toString() + '년' },
    { value: (year + 1).toString(), label: (year + 1).toString() + '년' },
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

  const [weeklyTitle, setWeeklyTitle] = useState('')
  const [weeklyImage, setWeeklyImage] = useState('')
  const [weeklyYear, setWeeklyYear] = useState(today.getFullYear().toString())
  const [weeklyMonth, setWeeklyMonth] = useState(
    monthForm((today.getMonth() + 1).toString())
  )
  const [weeklyTitleCount, setWeeklyTitleCount] = useState(0)
  const [uploadImage, setUploadImage] = useState<any>([])
  const imageFile = useRef<HTMLInputElement>(null)
  const openImageFile = () => {
    if (imageFile.current) imageFile.current.click()
  }
  const saveImageFile = (event: any) => {
    if (event.target.files !== null && event.target.files[0] !== undefined) {
      setUploadImage(event.target.files[0])
      setWeeklyImage(URL.createObjectURL(event.target.files[0]))
    }
  }
  const deleteImageFile = () => {
    setWeeklyImage('')
    setUploadImage([false])
  }
  const handleEdit = async () => {
    const response = await createChurchWeekly(
      uploadImage,
      weeklyTitle,
      weeklyYear,
      weeklyMonth
    )
    errorNavigator.navigate(response)
    response?.success === true && setRefresh(!refresh)
    response?.success === true && setWeeklyTitle('')
    response?.success === true && setWeeklyImage('')
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>주보 등록</InnerBoxTitle>
        <ModifyButtonBox>
          <ModifyButton
            active={weeklyTitle !== '' && weeklyImage !== ''}
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
                value={weeklyTitle}
                placeholder="제목 입력"
                onChange={e => {
                  setWeeklyTitle(e.target.value)
                  setWeeklyTitleCount(e.target.value.length)
                }}
              />
              <InputCount>({weeklyTitleCount}/20)</InputCount>
            </InputBoxWithCount>
            <Margin36 />
            <SubTitle>
              날짜<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <Margin16 />
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
                      // change color
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
                    defaultValue={monthOptions[today.getMonth()]}
                    onChange={e => e && setWeeklyMonth(e?.value)}
                    isSearchable={false}
                    theme={theme => ({
                      // change color
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
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>
              주보 이미지<SubTitleColorText> *</SubTitleColorText>
            </SubTitle>
            <Margin16 />
            <InfoBox text="주보 이미지를 스캔하거나 촬영하여 등록해주세요." />

            <WeeklyImage>
              <img
                src={weeklyImage || 'source/no_image.svg'}
                alt="공지 이미지"
              />
            </WeeklyImage>
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
