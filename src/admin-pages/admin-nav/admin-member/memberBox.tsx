import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Check = styled.image`
  width: 24px;
  height: 24px;
  margin-left: 24px;
  margin-right: 24px;
`

const Text = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`
const SmallBox = styled.div`
  width: 130px;
  height: 100%;
  display: flex;
  align-items: center;
`
const LargeBox = styled.div`
  width: 282px;
  height: 100%;
  display: flex;
  align-items: center;
`
interface MemberBoxProps {
  clickedAccountList: Array<string>
  account_id: string
  birth_date: string
  gender: string
  name: string
  phone_number: string
  onClickMemberBox: (account_id: string) => void
}

export const MemberBox = (props: MemberBoxProps) => {
  const {
    clickedAccountList,
    account_id,
    birth_date,
    gender,
    name,
    phone_number,
    onClickMemberBox,
  } = props
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    if (clickedAccountList.indexOf(account_id) > -1) {
      setClicked(true)
    } else {
      setClicked(false)
    }
  }, [clickedAccountList])
  return (
    <div
      style={{
        background: clicked ? '#F0F1F3' : '#ffffff',
        display: 'flex',
        width: '100%',
        marginTop: '8px',
        height: '56px',
        alignItems: 'center',
      }}
      onClick={() => onClickMemberBox(account_id)}
    >
      <Check>
        <img
          src={clicked ? '/source/icon/check.svg' : '/source/icon/no_check.svg'}
          alt=""
        />
      </Check>
      <SmallBox>
        <Text>{name}</Text>
      </SmallBox>
      <SmallBox>
        <Text>{gender}</Text>
      </SmallBox>
      <LargeBox>
        <Text>{birth_date}</Text>
      </LargeBox>
      <LargeBox>
        <Text>{phone_number}</Text>
      </LargeBox>
    </div>
  )
}
