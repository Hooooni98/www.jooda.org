import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Page } from '../../../../component/page'
import { usePage } from '../../../../hooks/usePage'
import { useDebounce } from '../../../../hooks/useDebounce'
import { getMember, kickOffMember } from '../../../../api/admin-member'
import { MemberBox } from '../memberBox'
import { setAuthToken } from '../../../../api'
import { MemberHeader } from '../memberHeader'
import { Modal } from '../modal'
import { EmptyText } from '../../../../component/empty_text'
import {
  InnerBoxContainer,
  InnerBoxHeader,
  InnerBoxTitle,
  MainContainer,
} from '../../../../component/styledComponent'
import { useErrorNavigator } from '../../../../error-pages/useErrorNavigator'

const InputBox = styled.input`
  margin-top: 36px;
  margin-bottom: 36px;
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
  padding-left: 48px;
`
const KickOffButton = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`
const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const SearchImogi = styled.img`
  z-index: 100;
  position: absolute;
  width: 24px;
  height: 24px;
  margin-top: 52px;
  margin-left: 16px;
`

interface Member {
  account_id: string
  birth_date: string
  gender: string
  name: string
  phone_number: string
}
interface MemberPageProps {
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const pagePerLimit = 10
export const InnerMemberPage = (props: MemberPageProps) => {
  const { refresh, setRefresh } = props
  const errorNavigator = useErrorNavigator()
  const [memberData, setMemberData] = useState<Array<Member>>([])
  const [keyword, setKeyword] = useState('')

  const {
    pageList,
    currentPage,
    maxPage,
    getPrevPage,
    getNextPage,
    clickPage,
    setMaxPage,
  } = usePage()
  const { debounceCallback, isLoading } = useDebounce({ time: 700 })
  const [clickedAccountList, setClickedAccountList] = useState<Array<string>>(
    []
  )
  const [showModal, setShowModal] = useState(false)
  const [searchIconPath, setSearchIconPath] = useState('source/icon/search.svg')
  const getChurchMember = async (page: number, keyword: string) => {
    const response = await getMember((page - 1) * pagePerLimit, keyword)
    errorNavigator.navigate(response)
    setMemberData(response.payload.church_members.results)
    setMaxPage(
      Math.ceil(response.payload.church_members.total_count / pagePerLimit)
    )
  }
  useEffect(() => {
    if (memberData.length !== 0 || refresh) {
      getChurchMember(currentPage, keyword)
    }
  }, [refresh])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }

    getChurchMember(1, '')
  }, [])

  useEffect(() => {
    if (maxPage !== 0) {
      debounceCallback(() => {
        setMaxPage(0)
        getChurchMember(1, keyword)
      })
    }
  }, [keyword])

  const onClickMemberBox = (account_id: string) => {
    if (clickedAccountList.indexOf(account_id) > -1) {
      setClickedAccountList(clickedAccountList.filter(id => id !== account_id))
    } else {
      setClickedAccountList([...clickedAccountList, account_id])
    }
  }

  const onClickMemberHeader = () => {
    if (clickedAccountList.length === memberData.length) {
      setClickedAccountList([])
    } else {
      var allAccountList = memberData.map(member => member.account_id)
      setClickedAccountList([...allAccountList])
    }
  }

  const clickButton = async () => {
    const response = await kickOffMember(clickedAccountList)
    errorNavigator.navigate(response)
    setClickedAccountList([])
    setShowModal(false)
    setRefresh(!refresh)
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>신도 명단</InnerBoxTitle>
        <KickOffButton
          style={{
            backgroundColor:
              clickedAccountList.length === 0 ? '#E3E4E6' : '#d40030',
            color: clickedAccountList.length === 0 ? '#A2A3A5' : '#ffffff',
          }}
          onClick={() => {
            clickedAccountList.length !== 0 && setShowModal(true)
          }}
        >
          내보내기
        </KickOffButton>
      </InnerBoxHeader>

      <InnerBoxContainer>
        <SearchContainer>
          <SearchImogi src={searchIconPath} />
          <InputBox
            type="text"
            value={keyword}
            placeholder={'신도 검색'}
            onChange={e => setKeyword(e.target.value)}
            onFocus={() => setSearchIconPath('source/icon/search_focused.svg')}
            onBlur={() => setSearchIconPath('source/icon/search.svg')}
          ></InputBox>
        </SearchContainer>

        <MemberHeader onClickMemberHeader={onClickMemberHeader} />
        {memberData.length !== 0 ? (
          memberData.map(member => {
            return (
              <div key={member.account_id}>
                <MemberBox
                  clickedAccountList={clickedAccountList}
                  account_id={member.account_id}
                  birth_date={member.birth_date}
                  gender={member.gender}
                  name={member.name}
                  phone_number={member.phone_number}
                  onClickMemberBox={onClickMemberBox}
                />
              </div>
            )
          })
        ) : (
          <EmptyText text="등록된 신도가 없어요." />
        )}

        {showModal && (
          <Modal
            onCloseModal={() => setShowModal(false)}
            text={'신도를 내보내시겠어요?'}
            buttonText={'내보내기'}
            buttonColor={'#D40030'}
            clickButton={clickButton}
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
