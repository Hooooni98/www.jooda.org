import React, { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import { setAuthToken } from '../../../../api'
import { getNotice } from '../../../../api/admin-notification'
import { NoticeModal } from './patch-modal/modal'
import { usePage } from '../../../../hooks/usePage'
import { Page } from '../../../../component/page'
import {
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
} from '../../../../component/styledComponent'
import { InfoBox, infoBoxTexts } from '../../../../component/box/info'
import { EmptyText } from '../../../../component/empty_text'
import { useErrorNavigator } from '../../../../error-pages/useErrorNavigator'

const NoticeBox = styled.button`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 80px;
  border: 1px solid #c1c2c3;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    border: 2px solid #000000;
  }
`

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

interface NoticeData {
  church_notice_id: string
  title: string
  content: string
  image: string | ''
  created_at: string
}

interface NoticePropType {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}
const pagePerLimit = 7
export const InnerListPage = (props: NoticePropType) => {
  const { refresh, setRefresh } = props
  const errorNavigator = useErrorNavigator()
  const [noticeData, setNoticeData] = useState<Array<NoticeData>>([
    {
      church_notice_id: '',
      title: '',
      content: '',
      image: '',
      created_at: '',
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
      const response = await getNotice((currentPage - 1) * pagePerLimit)
      errorNavigator.navigate(response)
      setNoticeData(response.payload.church_notice_list.results)
      setMaxPage(
        Math.ceil(
          response.payload.church_notice_list.total_count / pagePerLimit
        )
      )
    }

    fetchData()
  }, [refresh])

  const getNoticePage = async (page: number) => {
    const response = await getNotice((page - 1) * pagePerLimit)
    errorNavigator.navigate(response)
    setNoticeData(response.payload.church_notice_list.results)
  }

  useEffect(() => {
    getNoticePage(currentPage)
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
        <InnerBoxTitle>공지사항 목록</InnerBoxTitle>
      </InnerBoxHeader>
      <InnerBoxContainer>
        <div style={{ paddingTop: 36 }} />
        <InfoBox text={infoBoxTexts.default} />
        <div style={{ paddingTop: 20 }} />
        {noticeData.length !== 0 ? (
          noticeData.map((notice, index) => {
            return (
              <NoticeBox onClick={() => handleButtonClick(index)}>
                <NoticeTitle>{notice.title}</NoticeTitle>
                <NoticeSubTitle>
                  {notice.created_at.substring(0, 10).replace(/-/gi, '.')}
                </NoticeSubTitle>
              </NoticeBox>
            )
          })
        ) : (
          <EmptyText text="등록된 공지사항이 없어요." />
        )}

        {showModal && (
          <NoticeModal
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={handleCloseModal}
            church_notice_id={noticeData[currentIndex].church_notice_id}
            notice_title={noticeData[currentIndex].title}
            notice_content={noticeData[currentIndex].content}
            notice_image={noticeData[currentIndex].image}
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
