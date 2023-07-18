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
  height: 600px;
  width: 436px;
  margin-right: 162px;
  padding-top: 24px;
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
const ButtonContanier = styled.div`
  width: 394px;
  height: 240px;
  background: #5500dd;
  border-radius: 24px;
  padding-top: 32px;
  padding-left: 48px;
`
const ButtonText = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 48px;
  color: #ffffff;
`
const Button = styled.div`
  width: 250px;
  height: 44px;
  background: #5500dd;
  border: 1px solid #ffffff;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.24));
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
  margin-top: 24px;
`
const LeftArrow = styled.div`
  margin-left: 47px;
`
const MainPageImage = styled.img`
  width: 600px;
  height: 600px;
`

export const Page5 = () => {
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
          <Title>손쉬운 사용을 위한</Title>
          <Title>
            <text style={{ fontWeight: 700, color: '#5500dd' }}>가이드북</text>
          </Title>
          <Margin24 style={{ backgroundColor: '#f5f4f7' }} />
          <Description>
            누구나 쉽게 이용할 수 있게 가이드라인을 제공해요.
          </Description>
          <Description>앞으로의 교회 생활을 주다와 함께해요.</Description>
          <Margin24 style={{ backgroundColor: '#f5f4f7' }} />
          <Margin24 style={{ backgroundColor: '#f5f4f7' }} />
          <ButtonContanier>
            <ButtonText>이제 교회 관리는</ButtonText>
            <ButtonText>주다와 함께하세요</ButtonText>
            <a href="https://forms.gle/RJB1F8aDL6RkFngk9" target="_blank" style={{ maxWidth: "298px", textDecoration: "None" }}>
              <Button>
                고객 제휴 문의
                <LeftArrow>
                  <img src="/source/icon/arrow_right_white.svg" />
                </LeftArrow>
              </Button>
            </a>
          </ButtonContanier>
        </TextContainer>
        <MainPageImage src="/source/main_page_5.png" />
      </Container >
    </div >
  )
}
