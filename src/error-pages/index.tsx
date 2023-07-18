import React from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { Header } from '../main-pages/header'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 100px);
  background-color: #f0f1f3;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: #000000;
  margin-top: 24px;
`

const SubTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #797a7b;
  margin-top: 8px;
`

const Button = styled.div`
  width: 168px;
  height: 36px;
  background: #5500dd;
  border-radius: 16px;
  margin-top: 48px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  padding-top: 12px;
  cursor: pointer;
`
const ErrorPage = () => {
  const error_code = useLocation().state
  const navigate = useNavigate()
  const title =
    403 === error_code
      ? '로그인 정보가 만료되었어요'
      : 500 === error_code
      ? '알수없는 에러가 발생했어요'
      : '잘못된 접근이에요'
  const subTitle =
    403 === error_code
      ? '로그인 페이지에서 다시 로그인해주세요.'
      : 500 === error_code
      ? '이전 화면으로 돌아가 다시 시도해주세요.'
      : '홈 화면으로 돌아가 다시 시도해주세요.'
  const buttonText =
    403 === error_code
      ? '로그인'
      : 500 === error_code
      ? '돌아가기'
      : '홈으로 가기'

  const onClickButton = () => {
    if (403 === error_code) {
      navigate('/AdminLogin')
    } else if (500 === error_code) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <Container>
        <img
          style={{ width: '100px', height: '100px' }}
          src="source/icon/exclamation_triangle.svg"
        />
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <Button onClick={onClickButton}>{buttonText}</Button>
      </Container>
    </div>
  )
}

export default ErrorPage
