import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { setAuthToken } from '../../../../api'
import {
  getChurchInfo,
  patchChurchAddress,
} from '../../../../api/admin-information'
import {
  FlexRowContainer,
  FlexRowInnerLeft,
  FlexRowInnerRight,
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
  Margin36,
  SubTitle,
} from '../../../../component/styledComponent'
import { useErrorNavigator } from '../../../../error-pages/useErrorNavigator'

const ModifyButton = styled.button`
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

export const InnerAddressPage: React.FC = () => {
  const [editState, setEditState] = useState(false)
  const [ownCar, setOwncar] = useState('')
  const [parking, setParking] = useState('')
  const [publicTransport, setPublicTransport] = useState('')
  const [shuttleBus, setShuttleBus] = useState('')
  const errorNavigator = useErrorNavigator()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)

      const fetchData = async () => {
        const response = await getChurchInfo()
        errorNavigator.navigate(response)
        setOwncar(response.payload.church_info.directions_own_car)
        setParking(response.payload.church_info.directions_parking)
        setPublicTransport(
          response.payload.church_info.directions_public_transport
        )
        setShuttleBus(response.payload.church_info.directions_shuttle_bus)
      }

      fetchData()
    }
  }, [])

  const handleEdit = async () => {
    if (editState) {
      const response = await patchChurchAddress(
        parking,
        ownCar,
        publicTransport,
        shuttleBus
      )
      errorNavigator.navigate(response)
      setEditState(false)
    } else {
      setEditState(true)
    }
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>오시는 길</InnerBoxTitle>
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
            <SubTitle>주차장</SubTitle>
            <InputBoxWithCount>
              <InputSubBox
                maxLength={100}
                value={parking}
                disabled={!editState}
                placeholder="주차장 안내 입력"
                onChange={e => {
                  setParking(e.target.value)
                }}
              />
              <InputCount>({parking ? parking.length : 0}/100)</InputCount>
            </InputBoxWithCount>
            <Margin36 />
            <SubTitle>대중교통</SubTitle>
            <InputBoxWithCount>
              <InputSubBox
                maxLength={100}
                value={publicTransport}
                disabled={!editState}
                placeholder="대중교통 안내 입력"
                onChange={e => {
                  setPublicTransport(e.target.value)
                }}
              />
              <InputCount>
                ({publicTransport ? publicTransport.length : 0}/100)
              </InputCount>
            </InputBoxWithCount>
          </FlexRowInnerLeft>
          <FlexRowInnerRight>
            <SubTitle>자가용</SubTitle>
            <InputBoxWithCount>
              <InputSubBox
                maxLength={100}
                value={ownCar}
                disabled={!editState}
                placeholder="자가용 안내 입력"
                onChange={e => {
                  setOwncar(e.target.value)
                }}
              />
              <InputCount>({ownCar ? ownCar.length : 0}/100)</InputCount>
            </InputBoxWithCount>
            <Margin36 />
            <SubTitle>셔틀버스</SubTitle>
            <InputBoxWithCount>
              <InputSubBox
                maxLength={100}
                value={shuttleBus}
                disabled={!editState}
                placeholder="셔틀버스 안내 입력"
                onChange={e => {
                  setShuttleBus(e.target.value)
                }}
              />
              <InputCount>
                ({shuttleBus ? shuttleBus.length : 0}/100)
              </InputCount>
            </InputBoxWithCount>
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
