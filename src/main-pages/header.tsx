import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #c1c2c3;
  display: fixed;
  justify-content: center;
`

const HeaderWrapper = styled.div`
  height: 100px;
  width: 1280px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
`

const Logo = styled.span`
  width: 56px;
  height: 56px;
`

const Title = styled.span`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
`

const ButtonWrapper = styled.div`
  gap: 36px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Button = styled.div``

const Navigator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 48px;
  border: 1px solid #5500dd;
  background-color: #ffffff;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #5500dd;
  text-decoration: none;
  cursor: pointer;
`

export const Header = () => {
  const navigate = useNavigate()
  const onClickAdminLogin = () => {
    navigate('/AdminLogin')
  }
  const onClickLogo = () => {
    navigate('/')
  }

  return (
    <Container>
      <HeaderWrapper>
        <LogoWrapper onClick={onClickLogo}>
          <Logo>
            <img
              style={{ width: '56px', height: '56px' }}
              src="/source/main_logo.png"
              alt="jooda logo"
            />
          </Logo>
          <Title>주다</Title>
        </LogoWrapper>
        <ButtonWrapper>
          <Button>
            <a href="http://www.naver.com" target="_blank">
              <img src="/source/app_store.svg" alt="apple store" />
            </a>
          </Button>
          <Button>
            <a href="http://www.google.com" target="_blank">
              <img src="/source/play_store.svg" alt="play store" />
            </a>
          </Button>
          <Navigator onClick={onClickAdminLogin}>관리자 로그인</Navigator>
        </ButtonWrapper>
      </HeaderWrapper>
    </Container>
  )
}
