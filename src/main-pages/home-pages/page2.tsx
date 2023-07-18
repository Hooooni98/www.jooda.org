import React from 'react'

import styled from 'styled-components'
import { Margin24 } from '../../component/styledComponent'
const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 445px;
  align-items: center;
  min-width: 1200px;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 445px;
  align-items: center;
  min-width: 1200px;
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
const CategoryContainer = styled.div`
  width: 368px;
  height: 148px;
`
const CategoryTitle = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  margin-left: 32px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  color: #000000;
  text-align: left;
`
const CategoryDescription = styled.div`
  margin-left: 32px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #656667;
  text-align: left;
`
export const Page2 = () => {
  return (
    <>
      <div
        style={{ width: '100vw', height: '445px', backgroundColor: '#F5F4F7' }}
      >
        <FirstContainer>
          <Title>
            <text style={{ fontWeight: 700, color: '#5500dd' }}>교회 관리</text>
          </Title>
          <Title>어떻게 하고 계신가요?</Title>
          <Margin24 style={{ backgroundColor: '#ffffff' }} />
          <Description>
            주다는 효율적인 교회 관리 서비스를 제공하는 교회 통합 플랫폼입니다.
          </Description>
          <Description>보다 나은 교회 생활에 주다가 함께합니다.</Description>
        </FirstContainer>
      </div>
      <div
        style={{
          width: '100vw',
          height: '445px',
          backgroundColor: '#ffffff',
        }}
      >
        <Container>
          <CategoryContainer>
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#000000',
              }}
            />
            <CategoryTitle>예배</CategoryTitle>
            <CategoryDescription>편리하게 실시간으로</CategoryDescription>
            <CategoryDescription>예배 정보 공유</CategoryDescription>
          </CategoryContainer>
          <div style={{ marginLeft: '48px' }} />
          <CategoryContainer>
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#000000',
              }}
            />
            <CategoryTitle>행사</CategoryTitle>

            <CategoryDescription>실시간 알림을 통한</CategoryDescription>
            <CategoryDescription>교회 일정 공유</CategoryDescription>
          </CategoryContainer>
          <div style={{ marginLeft: '48px' }} />
          <CategoryContainer>
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#000000',
              }}
            />
            <CategoryTitle>신도</CategoryTitle>
            <CategoryDescription>다양한 신도들을</CategoryDescription>
            <CategoryDescription>하나의 시스템으로 관리</CategoryDescription>
          </CategoryContainer>
        </Container>
      </div>
    </>
  )
}
