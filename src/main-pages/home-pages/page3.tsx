import React from 'react'
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from 'react-scroll-motion'
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
  width: 436px;
  margin-right: 164px;
  padding-top: 180px;
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
`
const MainPageImage = styled.img`
  width: 600px;
  height: 600px;
`

export const Page3 = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '890px',
        backgroundColor: '#F5F4F7',
      }}
    >
      <Container>
        <TextContainer>
          <Title>교회 관리를</Title>
          <Title>
            <text style={{ fontWeight: 700, color: '#5500dd' }}>10초</text>
            만에
          </Title>
          <Margin24 style={{ backgroundColor: '#f5f4f7' }} />
          <Description>주다와 함께라면 간단한 등록 한 번에</Description>
          <Description>
            모든 교인들이 앱으로 빠르게 확인할 수 있어요.
          </Description>
        </TextContainer>
        <MainPageImage src="/source/main_page_3.png" />
      </Container>
    </div>
  )
}
