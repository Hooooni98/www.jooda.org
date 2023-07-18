import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #000000;
  width: 100%;
  display: flex;
  justify-content: center;
`

const FooterWrapper = styled.div`
  height: 250px;
  width: 1280px;
  display: flex;
  flex-direction: column;
`

const NavigatorContainer = styled.div`
  margin-top: 56px;
  display: flex;
  flex-direction: row;
`
const NavigatorText = styled.div`
font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #a2a3a5;
  margin-right: 24px;
  cursor: pointer;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 160px;
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 34px;
`
const CompanyText = styled.div`
font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
  margin-bottom: 8px;
`
const AddressText = styled.div`
font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #e3e4e6;
  margin-bottom: 8px;
`
const CopyRightText = styled.div`
font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #a2a3a5;
`
const RightTitleTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const RightTitle = styled.div`
font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  width: 63px;
  margin-right: 24px;
  text-align: left;
`
const RightContent = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #e3e4e6;
`

export const Footer = () => {
  const navigate = useNavigate()
  const onClickPolicyTerms = () => {
    navigate('/policy/terms')
  }
  const onClickPolicyLocation = () => {
    navigate('/policy/location')
  }
  const onClickPolicyPrivacy = () => {
    navigate('/policy/privacy')
  }
  return (
    <Container>
      <FooterWrapper>
        <NavigatorContainer>
          <NavigatorText onClick={onClickPolicyTerms}>
            서비스 이용약관
          </NavigatorText>
          <NavigatorText onClick={onClickPolicyLocation}>
            위치기반 이용약관
          </NavigatorText>
          <NavigatorText onClick={onClickPolicyPrivacy}>
            개인정보처리방침
          </NavigatorText>
        </NavigatorContainer>
        <InfoContainer>
          <LeftContainer>
            <CompanyText>업텐</CompanyText>
            <AddressText>
              경기 안산시 상록구 한양대학로 55, 제5공학관 지하1층
            </AddressText>
            <CopyRightText>Copyright ⓒ 2023 UPTEN Inc.</CopyRightText>
          </LeftContainer>
          <RightContainer>
            <RightTitleTextContainer>
              <RightTitle>대표</RightTitle>
              <RightContent>권영훈</RightContent>
            </RightTitleTextContainer>
            <RightTitleTextContainer>
              <RightTitle>고객 문의</RightTitle>
              <RightContent>uptenofficial@gmail.com</RightContent>
            </RightTitleTextContainer>
          </RightContainer>
        </InfoContainer>
      </FooterWrapper>
    </Container>
  )
}
