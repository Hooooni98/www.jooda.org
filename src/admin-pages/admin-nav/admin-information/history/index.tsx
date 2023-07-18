import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import { CreateModal } from './create-modal/modal'
import { PatchModal } from './patch-modal/modal'
import { setAuthToken } from '../../../../api'
import { getHistory } from '../../../../api/admin-history'

import { usePage } from '../../../../hooks/usePage'
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
  margin-top: 36px;
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

const buttonStyle = `
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

const HistoryBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 36px;
  width: 100%;
  align-items: center;
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

const HistoryBoxDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background: #5500dd;
  margin-right: 24px;
`
const HistoryBoxEmptyDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background: #ffffff;
  margin-right: 24px;
`
const HistoryBoxDate = styled.text`
  width: 108px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  text-align: left;
`
const HistoryBoxContent = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #454648;
  text-align: left;
`

interface HistoryBoxProps {
  prevDate: string
  date: string
  content: string
}
const HistoryBox = (props: HistoryBoxProps) => {
  const { prevDate, date, content } = props
  return (
    <HistoryBoxContainer>
      {prevDate === date ? <HistoryBoxEmptyDot /> : <HistoryBoxDot />}
      <HistoryBoxDate>{prevDate === date ? '' : date}</HistoryBoxDate>
      <HistoryBoxContent>{content}</HistoryBoxContent>
    </HistoryBoxContainer>
  )
}

interface History {
  church_history_id: string
  date: string
  content: string
}
const pagePerLimit = 14
export const InnerHistoryPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false)
  const [showPatchModal, setShowPatchModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
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

  const [historyData, setHistoryData] = useState<Array<History>>([
    {
      church_history_id: '',
      date: '',
      content: '',
    },
  ])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }

    const fetchData = async () => {
      const response = await getHistory((currentPage - 1) * pagePerLimit)
      errorNavigator.navigate(response)
      setHistoryData(response.payload.church_history_list.results)
      setMaxPage(
        Math.ceil(
          response.payload.church_history_list.total_count / pagePerLimit
        )
      )
    }
    fetchData()
  }, [refresh])
  const getHistoryPage = async (page: number) => {
    const response = await getHistory((page - 1) * pagePerLimit)
    errorNavigator.navigate(response)
    setHistoryData(response.payload.church_history_list.results)
  }

  useEffect(() => {
    getHistoryPage(currentPage)
  }, [currentPage])

  const onClosePatchModal = () => {
    setShowPatchModal(false)
  }
  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>교회 연혁</InnerBoxTitle>
        <ModifyButtonBox>
          <ModifyButton
            onClick={() => setShowPatchModal(true)}
            style={{
              background: '#ffffff',
              border: '1px solid #5500dd',
              color: '#5500dd',
            }}
          >
            수정
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
            해당 페이지에 보이는 연혁만 수정할 수 있어요.
            <br />
            다른 페이지 연혁을 수정하려면 페이지를 이동해서 수정해주세요.
          </InfoTitle>
        </InfoBox>
        <Margin36 />
        {historyData &&
          historyData.map((history, index) => {
            return (
              <HistoryBox
                prevDate={index !== 0 ? historyData[index - 1].date : ''}
                date={history.date}
                content={history.content}
              />
            )
          })}
        <AddButtonBox>
          <AddButton
            onClick={() => setShowCreateModal(true)}
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
            교회 연혁 추가
          </AddButton>
        </AddButtonBox>
        {showPatchModal && (
          <PatchModal
            historyData={historyData}
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={onClosePatchModal}
          />
        )}
        {showCreateModal && (
          <CreateModal
            refresh={refresh}
            setRefresh={setRefresh}
            onCloseModal={() => setShowCreateModal(false)}
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
