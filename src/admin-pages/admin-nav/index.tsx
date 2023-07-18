import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Router, Route, useNavigate } from 'react-router-dom'
import { setAuthToken } from '../../api'

import { useLocation } from 'react-router'
import { InformationPage } from './admin-information'
import { NotificationPage } from './admin-notification'
import { WeeklyPage } from './admin-weekly'
import { SchedulePage } from './admin-schedule'
import { MemberPage } from './admin-member'
import ErrorPage from '../../error-pages'
import { getChurchInfo } from '../../api/admin-information'
import { Margin24 } from '../../component/styledComponent'
import { useErrorNavigator } from '../../error-pages/useErrorNavigator'

interface PageState {
  informationState: boolean
  notificationState: boolean
  weeklyState: boolean
  scheduleState: boolean
  memberState: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

const InnerContainer = styled.div`
  margin-left: 240px;
  height: 100%;
  width: 100%;
`

const Sideheader = styled.div`
  z-index: 1;
  width: 240px;
  height: 100%;
  background-color: #ffffff;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Mainlogo = styled.div`
  margin-top: 48px;
  border-radius: 50%;
  overflow: hidden;
  width: 64px;
  height: 64px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Maintitle = styled.div`
  margin-top: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 36px;
  text-align: center;
  color: #000000;
`

const Logout = styled.button`
  margin-top: 16px;
  width: 168px;
  height: 48px;
  top: 180px;
  background: #ffffff;
  border: 1px solid #5500dd;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #5500dd;
  cursor: pointer;
`

const SideButtonBox = styled.div`
  margin-top: 40px;
`

const SideButton = styled.button`
  display: flex;
  margin-top: 8px;
  gap: 16px;
  width: 208px;
  height: 56px;
  padding: 16px 24px 16px 24px;
  background: #5500dd;
  border-radius: 16px;
  cursor: pointer;
  ont-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  border: none;
  color: #ffffff;
`

const ButtonImage = styled.img`
  width: 24px;
  height: 24px;
`

// 페이지 상태를 가져오는 함수
const getPageState = (): PageState => {
  const pageState = localStorage.getItem('pageState')
  if (pageState) {
    return JSON.parse(pageState)
  } else {
    return {
      informationState: true,
      notificationState: false,
      weeklyState: false,
      scheduleState: false,
      memberState: false,
    }
  }
}

// 페이지 상태를 저장하는 함수
const savePageState = (state: PageState) => {
  localStorage.setItem('pageState', JSON.stringify(state))
}

export const AdminPage: React.FC = () => {
  const token = useLocation().state
  const navigate = useNavigate()
  const defaultLogo = '/source/main_logo.png'

  const [pageState, setPageState] = useState(getPageState())

  const setPage = (state: PageState) => {
    setPageState(state)
    savePageState(state)
  }

  if (!token) {
    navigate('/ErrorPage')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

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

  const [informationState, setInformationState] = useState(true)
  const [notificationState, setNotificationState] = useState(false)
  const [weeklyState, setWeeklyState] = useState(false)
  const [scheduleState, setScheduleState] = useState(false)
  const [memberState, setmemberState] = useState(false)

  const handleInformation = () => {
    setPage({
      informationState: true,
      notificationState: false,
      weeklyState: false,
      scheduleState: false,
      memberState: false,
    })
  }

  const handleNotification = () => {
    setPage({
      informationState: false,
      notificationState: true,
      weeklyState: false,
      scheduleState: false,
      memberState: false,
    })
  }
  const handleWeekly = () => {
    setPage({
      informationState: false,
      notificationState: false,
      weeklyState: true,
      scheduleState: false,
      memberState: false,
    })
  }
  const handleSchedule = () => {
    setPage({
      informationState: false,
      notificationState: false,
      weeklyState: false,
      scheduleState: true,
      memberState: false,
    })
  }
  const handlePastor = () => {
    setPage({
      informationState: false,
      notificationState: false,
      weeklyState: false,
      scheduleState: false,
      memberState: true,
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pageState])

  return (
    <Container>
      <Sideheader>
        <Mainlogo>
          <img src={churchInfo?.logo || defaultLogo} alt="church logo" />
        </Mainlogo>
        <Maintitle>{churchInfo?.name || '주다'}</Maintitle>
        <Logout onClick={handleLogout}>로그아웃</Logout>
        <SideButtonBox>
          <SideButton
            onClick={handleInformation}
            style={{
              background: pageState.informationState ? '#5500DD' : '#ffffff',
              color: pageState.informationState ? '#ffffff' : '#000000',
            }}
          >
            <ButtonImage
              src={
                pageState.informationState
                  ? '/source/icon/side_information_active.svg'
                  : '/source/icon/side_information_deactive.svg'
              }
            />
            정보 수정
          </SideButton>
          <SideButton
            onClick={handleNotification}
            style={{
              background: pageState.notificationState ? '#5500DD' : '#ffffff',
              color: pageState.notificationState ? '#ffffff' : '#000000',
            }}
          >
            <ButtonImage
              src={
                pageState.notificationState
                  ? '/source/icon/side_notice_active.svg'
                  : '/source/icon/side_notice_deactive.svg'
              }
            />
            공지사항
          </SideButton>
          <SideButton
            onClick={handleWeekly}
            style={{
              background: pageState.weeklyState ? '#5500DD' : '#ffffff',
              color: pageState.weeklyState ? '#ffffff' : '#000000',
            }}
          >
            <ButtonImage
              src={
                pageState.weeklyState
                  ? '/source/icon/side_weekly_active.svg'
                  : '/source/icon/side_weekly_deactive.svg'
              }
            />
            주보
          </SideButton>
          <SideButton
            onClick={handleSchedule}
            style={{
              background: pageState.scheduleState ? '#5500DD' : '#ffffff',
              color: pageState.scheduleState ? '#ffffff' : '#000000',
            }}
          >
            <ButtonImage
              src={
                pageState.scheduleState
                  ? '/source/icon/side_calendar_active.svg'
                  : '/source/icon/side_calendar_deactive.svg'
              }
            />
            일정
          </SideButton>
          <SideButton
            onClick={handlePastor}
            style={{
              background: pageState.memberState ? '#5500DD' : '#ffffff',
              color: pageState.memberState ? '#ffffff' : '#000000',
            }}
          >
            <ButtonImage
              src={
                pageState.memberState
                  ? '/source/icon/side_pastor_active.svg'
                  : '/source/icon/side_pastor_deactive.svg'
              }
            />
            신도 관리
          </SideButton>
        </SideButtonBox>
      </Sideheader>
      <InnerContainer>
        <Margin24 />
        {pageState.informationState && <InformationPage />}
        {pageState.notificationState && <NotificationPage />}
        {pageState.weeklyState && <WeeklyPage />}
        {pageState.scheduleState && <SchedulePage />}
        {pageState.memberState && <MemberPage />}
      </InnerContainer>
    </Container>
  )
}
