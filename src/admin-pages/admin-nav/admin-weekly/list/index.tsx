import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { setAuthToken } from '../../../../api'
import { getWeekly } from '../../../../api/admin-weekly'
import { EmptyText } from '../../../../component/empty_text'
import { Page } from '../../../../component/page'
import { usePage } from '../../../../hooks/usePage'
import { WeeklyModal } from './patch-modal/modal'
import {
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
} from '../../../../component/styledComponent'
import { InfoBox, infoBoxTexts } from '../../../../component/box/info'
import { useErrorNavigator } from '../../../../error-pages/useErrorNavigator'

const WeeklyContainer = styled.div`
  margin-bottom: 16px;
`
const WeeklyBox = styled.div`
  border-radius: 16px;
  height: 110px;
  border: 1px solid #c1c2c3;
  display: flex;
  cursor: pointer;

  &:hover {
    border: 1px solid #000000
`

const WeeklyImage = styled.div`
  width: 58px;
  height: 78px;
  border-radius: 9px;
  background: #000000;
  margin-left: 24px;
  margin-top: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const WeeklyInnerBox = styled.div`
  margin-top: 15px;
`

const WeeklyTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  text-align: left;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 16px 0 0 24px;
  color: #000000;
`

const WeeklySubTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #797a7b;
  padding: 0 0 0 24px;
`

interface WeeklyData {
  church_weekly_id: string
  title: string
  image: string
  created_at: string
  year: string
  month: string
}

interface WeeklyPropType {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}
const pagePerLimit = 6
export const InnerListPage = (props: WeeklyPropType) => {
  const { refresh, setRefresh } = props
  const errorNavigator = useErrorNavigator()
  const [weeklyData, setWeeklyData] = useState<Array<WeeklyData>>([])
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
      const response = await getWeekly((currentPage - 1) * pagePerLimit)
      errorNavigator.navigate(response)
      setWeeklyData(response.payload.church_weekly_list.results)
      setMaxPage(
        Math.ceil(
          response.payload.church_weekly_list.total_count / pagePerLimit
        )
      )
    }
    fetchData()
  }, [refresh])

  const getWeeklyPage = async (page: number) => {
    const response = await getWeekly((page - 1) * pagePerLimit)
    errorNavigator.navigate(response)
    setWeeklyData(response.payload.church_weekly_list.results)
  }

  useEffect(() => {
    getWeeklyPage(currentPage)
  }, [currentPage])

  // Modal
  const [showModal, setShowModal] = useState(false)

  const handleButtonClick = (index: number) => {
    setShowModal(true)
    setIndex(index)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>주보 목록</InnerBoxTitle>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <div style={{ paddingTop: 36 }} />
        <InfoBox text={infoBoxTexts.default} />
        {weeklyData.length !== 0 && <div style={{ marginTop: '36px' }} />}
        {weeklyData.length !== 0 ? (
          weeklyData[0].title !== '' &&
          weeklyData.map((weekly, index) => {
            return (
              <WeeklyContainer>
                <WeeklyBox onClick={() => handleButtonClick(index)}>
                  <WeeklyImage>
                    <img src={weekly.image} alt="" />
                  </WeeklyImage>
                  <WeeklyInnerBox>
                    <WeeklyTitle>{weekly.title}</WeeklyTitle>
                    <WeeklySubTitle>
                      {weekly.created_at.substring(0, 10).replace(/-/gi, '.')}
                    </WeeklySubTitle>
                  </WeeklyInnerBox>
                </WeeklyBox>
              </WeeklyContainer>
            )
          })
        ) : (
          <EmptyText text="등록된 주보가 없어요." />
        )}
        {showModal && (
          <WeeklyModal
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={handleCloseModal}
            church_weekly_id={weeklyData[currentIndex].church_weekly_id}
            weekly_title={weeklyData[currentIndex].title}
            weekly_image={weeklyData[currentIndex].image}
            weekly_year={weeklyData[currentIndex].year}
            weekly_month={weeklyData[currentIndex].month}
          />
        )}

        <Page
          pageList={pageList}
          currentPage={currentPage}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
          clickPage={clickPage}
          lastPage={maxPage}
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
