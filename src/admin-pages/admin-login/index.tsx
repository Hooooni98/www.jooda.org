import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAuthorization } from '../../redux/actions/authorization_action'
import { RootState } from '../../redux/reducer/index'
import styled from 'styled-components'
import { LogIn } from '../../api'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../main-pages/header'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toast, showToast } from '../../component/toast'

const Container = styled.div`
  width: 100%;
`

const LogoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 16px;
`

const Logo = styled.span``

const Title = styled.span`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
`

const Body = styled.div`
  width: auto;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
`

const LoginBox = styled.div`
  margin-top: 200px;
  width: 490px;
`
const LoginHeadText = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  display: flex;
  align-items: left;
`

const Logindata = styled.div`
  margin-top: 48px;
`

const LoginText = styled.div`
  margin-top: 24px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
`

const ErrorText = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #d40030;
  text-align: left;
  margin-top: 8px;
  margin-left: 16px;
`

const IDInput = styled.input`
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  width: 490px;
  height: 60px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 0 0 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`

const PWInput = styled.input`
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  width: 490px;
  height: 60px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 0 0 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`

const Login = styled.button`
  margin-top: 64px;
  width: 490px;
  height: 60px;
  background: #5500dd;
  border-radius: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
`

const Signup = styled.button`
  margin-top: 16px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  border: none;
  background: #ffffff;
  color: #454648;
  cursor: pointer;
  width: 490px;
  height: 56px;
`

export const AdminLoginPage: React.FC = e => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [loginState, setLoginState] = useState(false)
  const [loginFail, setLoginFail] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authorizationData = useSelector(
    (state: RootState) => state.authorizationReducer.authorization
  )
  useEffect(() => {
    // console.log(authorizationData);
  }, [authorizationData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin()
  }

  const handleLogin = useCallback(async () => {
    try {
      const response = await LogIn(id, password)

      // console.log(response.payload.admin_account_info.authorization_token);

      if (response.success) {
        setLoginState(true)
        dispatch(
          saveAuthorization(
            response.payload.admin_account_info.authorization_token
          )
        )
        navigate('/Admin', {
          state: response.payload.admin_account_info.authorization_token,
        })
      }
    } catch (error) {
      setLoginFail(true)
    }
  }, [dispatch, id, password])

  return (
    <Container>
      <Header />
      <Body>
        <LoginBox>
          <LoginHeadText>관리자 로그인</LoginHeadText>
          <Logindata>
            <form onSubmit={handleSubmit}>
              <LoginText>아이디</LoginText>
              <IDInput
                type="text"
                value={id}
                placeholder="아이디 입력"
                onChange={e => setId(e.target.value)}
                style={{
                  border: loginFail ? '1px solid #D40030' : '1px solid #c1c2c3',
                }}
              />
              <LoginText>비밀번호</LoginText>
              <PWInput
                type="password"
                value={password}
                placeholder="비밀번호 입력"
                onChange={e => setPassword(e.target.value)}
                style={{
                  border: loginFail ? '1px solid #D40030' : '1px solid #c1c2c3',
                }}
              />
              {loginFail && (
                <ErrorText>아이디 또는 비밀번호가 틀렸어요.</ErrorText>
              )}
              <Login type="submit">로그인</Login>
            </form>
            <a href="https://forms.gle/RJB1F8aDL6RkFngk9" target="_blank">
              <Signup onClick={() => showToast('delete')}>회원가입</Signup>
            </a>
          </Logindata>
        </LoginBox>
      </Body>
    </Container>
  )
}
