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
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
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
interface MemberHeaderProps {
  onClickMemberHeader: () => void
}
export const MemberHeader = (props: MemberHeaderProps) => {
  const { onClickMemberHeader } = props
  return (
    <div
      style={{
        background: '#5500dd',
        display: 'flex',
        width: '100%',
        marginTop: '8px',
        height: '56px',
        alignItems: 'center',
        borderRadius: '16px',
        borderWidth: '0px',
      }}
      onClick={onClickMemberHeader}
    >
      <Check>
        <img src={'/source/icon/white_check.svg'} alt="" />
      </Check>
      <SmallBox>
        <Text>이름</Text>
      </SmallBox>
      <SmallBox>
        <Text>성별</Text>
      </SmallBox>
      <LargeBox>
        <Text>생년월일</Text>
      </LargeBox>
      <LargeBox>
        <Text>전화번호</Text>
      </LargeBox>
    </div>
  )
}
