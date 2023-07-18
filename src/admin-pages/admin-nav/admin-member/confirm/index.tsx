import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { Page } from '../../../../component/page'
import { usePage } from '../../../../hooks/usePage'
import { useDebounce } from '../../../../hooks/useDebounce'
import {
  getConfirmMember,
  patchConfirmMember,
} from '../../../../api/admin-member'
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
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const RejectButton = styled.button`
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
const SuccessButton = styled.button`
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
  margin-right: 16px;
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
export const InnerConfirmMemberPage = (props: MemberPageProps) => {
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
  const { debounceCallback, isLoading } = useDebounce({ time: 1000 })
  const [clickedAccountList, setClickedAccountList] = useState<Array<string>>(
    []
  )
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [searchIconPath, setSearchIconPath] = useState('source/icon/search.svg')

  const firstLoading = useRef<boolean>(false)

  const getChurchMember = async (page: number, keyword: string) => {
    const response = await getConfirmMember((page - 1) * pagePerLimit, keyword)
    errorNavigator.navigate(response)
    setMemberData(response.payload.confirm_members.results)
    setMaxPage(
      Math.ceil(response.payload.confirm_members.total_count / pagePerLimit)
    )
    firstLoading.current = true
  }
  useEffect(() => {
    if (memberData.length !== 0) {
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

  const clickRejectButton = async () => {
    const response = await patchConfirmMember(clickedAccountList, 'reject')
    errorNavigator.navigate(response)
    setClickedAccountList([])
    setShowRejectModal(false)
    setRefresh(!refresh)
  }
  const clickSuccessButton = async () => {
    const response = await patchConfirmMember(clickedAccountList, 'success')
    errorNavigator.navigate(response)
    setClickedAccountList([])
    setShowSuccessModal(false)
    setRefresh(!refresh)
  }

  return (
    <MainContainer>
      <InnerBoxHeader>
        <InnerBoxTitle>등록 대기 명단</InnerBoxTitle>
        <ButtonContainer>
          <SuccessButton
            style={{
              backgroundColor:
                clickedAccountList.length === 0 ? '#E3E4E6' : '#5500dd',
              color: clickedAccountList.length === 0 ? '#A2A3A5' : '#ffffff',
            }}
            onClick={() => {
              clickedAccountList.length !== 0 && setShowSuccessModal(true)
            }}
          >
            승인
          </SuccessButton>
          <RejectButton
            style={{
              backgroundColor:
                clickedAccountList.length === 0 ? '#E3E4E6' : '#d40030',
              color: clickedAccountList.length === 0 ? '#A2A3A5' : '#ffffff',
            }}
            onClick={() => {
              clickedAccountList.length !== 0 && setShowRejectModal(true)
            }}
          >
            거절
          </RejectButton>
        </ButtonContainer>
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
          />
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
          <EmptyText text="등록 신청을 한 신도가 없어요." />
        )}

        {showRejectModal && (
          <Modal
            onCloseModal={() => setShowRejectModal(false)}
            text={'신도를 거절하시겠어요?'}
            buttonText={'거절'}
            buttonColor={'#D40030'}
            clickButton={clickRejectButton}
          />
        )}
        {showSuccessModal && (
          <Modal
            onCloseModal={() => setShowSuccessModal(false)}
            text={'신도를 승인하시겠어요?'}
            buttonText={'승인'}
            buttonColor={'#5500dd'}
            clickButton={clickSuccessButton}
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
          height: '48px',
        }}
      />
    </MainContainer>
  )
}
