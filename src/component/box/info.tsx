import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
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
  font-size: 14px;
  color: #454648;
  line-height: 24px;
`
export const infoBoxTexts = {
  default: '박스를 클릭하면 수정할 수 있어요.',
}
interface InfoBoxProps {
  text: string
}
export const InfoBox = (props: InfoBoxProps) => {
  const { text } = props
  return (
    <Container>
      <img src="/source/icon/information.svg" alt="information" />
      <InfoTitle>{text}</InfoTitle>
    </Container>
  )
}
