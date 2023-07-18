import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  FlexRowContainer,
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
  Margin24,
  Margin36,
} from '../../../../../component/styledComponent'
import { InfoBox } from '../../../../../component/box/info'
import { usePage } from '../../../../../hooks/usePage'
import { Page } from '../../../../../component/page'
import { getSchedule } from '../../../../../api/admin-schedule'
import { setAuthToken } from '../../../../../api'
import { EmptyText } from '../../../../../component/empty_text'
import styled from 'styled-components'
import { Margin16 } from '../../../../../component/styledComponent'
import { ScheduleModal } from './patch-modal'
import { useErrorNavigator } from '../../../../../error-pages/useErrorNavigator'

const ScheduleContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid #c1c2c3;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 2px solid #000000;
  }
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ScheduleIndex = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #5500dd;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 26px;
  margin-bottom: 26px;
`
const ScheduleTitle = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
`
const ScheduleText = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #797a7b;
  margin-right: 16px;
`

interface ScheduleBoxProps {
  index: number
  title: string
  subtitle: string
  time: string
}
const ScheduleBox = (props: ScheduleBoxProps) => {
  const { index, title, subtitle, time } = props
  return (
    <>
      <Margin16 />
      <ScheduleContainer>
        <FlexRowContainer>
          <ScheduleIndex>{index}</ScheduleIndex>
          <ContentContainer>
            <ScheduleTitle>{title}</ScheduleTitle>
            <FlexRowContainer>
              {subtitle && <ScheduleText>{subtitle}</ScheduleText>}
              <ScheduleText>{time}</ScheduleText>
            </FlexRowContainer>
          </ContentContainer>
        </FlexRowContainer>
      </ScheduleContainer>
    </>
  )
}
interface Schedule {
  church_worship_schedule_id: string
  title: string
  subtitle: string
  weekday: string
  place: string
  mc: string
  target: string
  reference: string
  time: string
}
interface InnerScheduleProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const pagePerLimit = 6
export const InnerScheduleList = (props: InnerScheduleProps) => {
  const { refresh, setRefresh } = props
  const errorNavigator = useErrorNavigator()
  const {
    pageList,
    currentPage,
    maxPage,
    getPrevPage,
    getNextPage,
    clickPage,
    setMaxPage,
  } = usePage()
  const [scheduleData, setScheduleData] = useState<Array<Schedule>>([])
  const [showModal, setShowModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const openModal = (index: number) => {
    setShowModal(true)
    setCurrentIndex((currentPage - 1) * pagePerLimit + index)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }

    const fetchData = async () => {
      const response = await getSchedule()
      errorNavigator.navigate(response)
      setScheduleData(response.payload.worship_schedule_list)
    }

    fetchData()
  }, [refresh])

  useEffect(() => {
    setMaxPage(Math.ceil(scheduleData.length / pagePerLimit))
  }, [scheduleData])

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>예배 일정 목록</InnerBoxTitle>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <Margin36 />
        <InfoBox text="박스를 클릭하면 수정 및 삭제를 할 수 있어요." />
        {scheduleData.length !== 0 && <div style={{ paddingTop: '20px' }} />}
        {scheduleData.length !== 0 ? (
          scheduleData
            .slice((currentPage - 1) * pagePerLimit, currentPage * pagePerLimit)
            .map((schedule, index) => {
              return (
                <div onClick={() => openModal(index)}>
                  <ScheduleBox
                    key={index}
                    index={index + pagePerLimit * (currentPage - 1) + 1}
                    title={schedule.title}
                    subtitle={schedule.subtitle}
                    time={schedule.time}
                  />
                </div>
              )
            })
        ) : (
          <EmptyText text="등록된 예배 일정이 없어요." />
        )}
        {/* <ScheduleBox index={0} /> */}
        <Page
          pageList={pageList}
          currentPage={currentPage}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
          clickPage={clickPage}
          lastPage={maxPage}
        />
        {showModal && (
          <ScheduleModal
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={() => setShowModal(false)}
            schedule={scheduleData[currentIndex]}
          />
        )}
      </InnerBoxContainer>
      <div style={{ paddingTop: '24px' }} />
    </MainContainer>
  )
}
