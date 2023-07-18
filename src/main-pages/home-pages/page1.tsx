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
  height: 463px;
  width: 436px;
  margin-right: 164px;
  margin-top: 137px;
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
const Button = styled.div`
  // width: 203px;
  height: 40px;
  background: #5500dd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
  border-radius: 36px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  
  color: #ffffff;
  display: flex;
  text-align: center;
  align-item: center;
  padding-left: 95px;
  padding-top: 16px;
`
const LeftArrow = styled.div`
  margin-left: 47px;
`
const MainPageImage = styled.img`
  width: 600px;
  height: 600px;
`

export const Page1 = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '890px',
        backgroundColor: '#ffffff',
      }}
    >
      <Container>
        <TextContainer>
          <Title>교회 관리를</Title>
          <Title>
            <text style={{ fontWeight: 700, color: '#5500dd' }}>
              빠르고 효율적
            </text>
            으로,
          </Title>
          <Margin24 style={{ backgroundColor: '#ffffff' }} />
          <Description>
            복잡했던 예배 일정 공지, 주보 제작 및 인쇄, 신도 관리를
          </Description>
          <Description>
            쉽고편리하게 교회를 관리할 수 있는 통합 서비스입니다.
          </Description>
          <Margin24 style={{ backgroundColor: '#ffffff' }} />
          <Margin24 style={{ backgroundColor: '#ffffff' }} />
          <a href="https://forms.gle/RJB1F8aDL6RkFngk9" target="_blank" style={{ maxWidth: "298px", textDecoration: "None" }}>
            <Button>
              고객 제휴 문의
              <LeftArrow>
                <img src="/source/icon/arrow_right_white.svg" />
              </LeftArrow>
            </Button>
          </a>
        </TextContainer>
        <MainPageImage src="/source/main_page_1.png" />
      </Container>
    </div>
  )
}
