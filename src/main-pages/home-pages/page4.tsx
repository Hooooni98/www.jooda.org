import React from 'react'

import styled from 'styled-components'
import { Margin24 } from '../../component/styledComponent'
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 890px;
  align-items: center;
  min-width: 1200px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 420px;
  width: 528px;
  margin-left: 72px;

  margin-top: 180px;
  justify-content: flex-start;
  text-align: left;
`
const Title = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  line-height: 72px;
  color: #000000;
  white-space: nowrap;
`
const Description = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 36px;
  color: #656667;
  white-space: nowrap;
`
const MainPageImage = styled.img`
  width: 600px;
  height: 600px;
`

export const Page4 = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '890px',
        backgroundColor: '#ffffff',
      }}
    >
      <Container>
        <MainPageImage src="/source/main_page_4.png" />
        <TextContainer>
          <Title>이제 신도들과</Title>
          <Title>
            <text style={{ fontWeight: 700, color: '#5500dd' }}>실시간</text>
            으로
            <text style={{ fontWeight: 700, color: '#5500dd' }}> 소통</text>
            하세요
          </Title>
          <Margin24 style={{ backgroundColor: '#ffffff' }} />
          <Description>
            갑자기 변경된 일정을 전달할 때 난감하지 않으셨나요?
          </Description>
          <Description>
            주다는 새로운 교회 소식을 앱으로 간편하게 확인할 수 있어요.
          </Description>
        </TextContainer>
      </Container>
    </div>
  )
}
