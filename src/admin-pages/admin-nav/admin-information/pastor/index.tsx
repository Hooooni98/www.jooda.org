import React, { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import { PastorInfoModal } from './patch-modal/info/modal'
import { usePage } from '../../../../hooks/usePage'
import { setAuthToken } from '../../../../api'
import { getPastor } from '../../../../api/admin-pastor'
import { PastorCreateModal } from './create-modal/modal'
import { PatchOrderModal } from './patch-modal/order/modal'
import { Page } from '../../../../component/page'
import {
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
  Margin36,
} from '../../../../component/styledComponent'
import { useErrorNavigator } from '../../../../error-pages/useErrorNavigator'

const ModifyButtonBox = styled.div`
  display: flex;
  gap: 16px;
`

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
  font-size: 16px;
  color: #454648;
  line-height: 24px;
`

const WeeklyImage = styled.div`
  width: 58px;
  height: 78px;
  border-radius: 9px;
  border: none;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const NoticeBox = styled.button`
  align-items: center;
  width: 100%;
  height: 110px;
  display: flex;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  border: 1px solid #c1c2c3;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    border: 2px solid #000000;
  }
`
const IndexIndicator = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #5500dd;
  width: 62px;
`

const NoticeInfo = styled.div``

const NoticeTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  text-align: left;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  padding: 4px 0 0 24px;
  color: #000000;
`

const NoticeSubTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #797a7b;
  padding: 4px 0 0 24px;
`

const BodyTitleBold = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #454648;
`
interface PastorData {
  church_pastor_id: string
  order: string
  name: string
  role: string
  image: string
}
const pagePerLimit = 6
export const InnerPastorPage = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  const errorNavigator = useErrorNavigator()
  const [pastorData, setPastorData] = useState<Array<PastorData>>([
    {
      church_pastor_id: '',
      order: '',
      name: '',
      role: '',
      image: '',
    },
  ])
  const [currentIndex, setIndex] = useState(0)

  const {
    pageList,
    currentPage,
    maxPage,
    getPrevPage,
    getNextPage,
    clickPage,
    setMaxPage,
  } = usePage()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }

    const fetchData = async () => {
      const response = await getPastor((currentPage - 1) * pagePerLimit)
      errorNavigator.navigate(response)
      setPastorData(response.payload.church_pastor_list.results)
      setMaxPage(
        Math.ceil(
          response.payload.church_pastor_list.total_count / pagePerLimit
        )
      )
      // console.log(response.payload.church_pastor_list.total_count)
    }
    fetchData()
  }, [refresh])

  const getPastorPage = async (page: number) => {
    const response = await getPastor((page - 1) * pagePerLimit)
    errorNavigator.navigate(response)
    setPastorData(response.payload.church_pastor_list.results)
  }

  useEffect(() => {
    getPastorPage(currentPage)
  }, [currentPage])

  // Modal
  const [showPatchInfoModal, setShowPatchInfoModal] = useState(false)
  const [showPatchOrderModal, setShowPatchOrderModal] = useState(false)
  const [showCreateModal, setShowCreateInfoModal] = useState(false)

  const handleButtonClick = (index: number) => {
    setShowPatchInfoModal(true)
    setIndex(index)
  }

  const handleCloseModal = () => {
    setShowPatchInfoModal(false)
  }

  const handleCreateButtonClick = () => {
    setShowCreateInfoModal(true)
  }
  const handleCloseCreateModal = () => {
    setShowCreateInfoModal(false)
  }
  const handleOrderButtonClick = () => {
    setShowPatchOrderModal(true)
  }
  const handleCloseOrderModal = () => {
    setShowPatchOrderModal(false)
    setRefresh(!refresh)
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>섬기는 이</InnerBoxTitle>
        <ModifyButtonBox>
          <ModifyButton
            style={{
              background: '#ffffff',
              border: '1px solid #5500dd',
              color: '#5500dd',
            }}
            onClick={handleOrderButtonClick}
          >
            순서 변경
          </ModifyButton>
        </ModifyButtonBox>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <Margin36 />
        <InfoBox>
          <img
            src="/source/icon/information.svg"
            alt="information"
            style={{ marginTop: '-24px' }}
          />
          <InfoTitle>
            화면에 보이는 순서대로 어플리케이션에 보여져요.
            <br />
            만약 순서를 변경하고 싶다면{' '}
            <BodyTitleBold>[순서 변경]</BodyTitleBold>에서 순서를 변경해주세요.
          </InfoTitle>
        </InfoBox>
        <div style={{ paddingTop: '20px' }} />
        {pastorData &&
          pastorData.map((pastor, index) => {
            const itemIndex = (currentPage - 1) * pagePerLimit + index
            return (
              <NoticeBox onClick={() => handleButtonClick(index)}>
                <IndexIndicator>{itemIndex + 1}</IndexIndicator>
                <WeeklyImage>
                  <img
                    src={pastor.image || '/source/no_pastor_image.svg'}
                    alt=""
                  />
                </WeeklyImage>
                <NoticeInfo>
                  <NoticeTitle>{pastor.name}</NoticeTitle>
                  <NoticeSubTitle>{pastor.role}</NoticeSubTitle>
                </NoticeInfo>
              </NoticeBox>
            )
          })}

        <div style={{ paddingTop: '20px' }} />
        <AddButtonBox>
          <AddButton
            onClick={handleCreateButtonClick}
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
        <Page
          pageList={pageList}
          currentPage={currentPage}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
          clickPage={clickPage}
          lastPage={maxPage}
        />
        {showPatchInfoModal && (
          <PastorInfoModal
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={handleCloseModal}
            church_pastor_id={pastorData[currentIndex].church_pastor_id}
            pastor_index={currentIndex + (currentPage - 1) * pagePerLimit}
            pastor_name={pastorData[currentIndex].name}
            pastor_role={pastorData[currentIndex].role}
            pastor_image={
              pastorData[currentIndex].image || '/source/pastor_upload.svg'
            }
          />
        )}
        {showCreateModal && (
          <PastorCreateModal
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={handleCloseCreateModal}
          />
        )}
        {showPatchOrderModal && (
          <PatchOrderModal onCloseModal={handleCloseOrderModal} />
        )}
      </InnerBoxContainer>
      <div
        style={{
          height: '24px',
        }}
      />
    </MainContainer>
  )
}
