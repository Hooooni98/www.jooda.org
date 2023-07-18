import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  min-width: 1040px;
  background: #f0f1f3;
`

export const InnerBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 36px;
  margin-right: 36px;
`

export const InnerBoxTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  color: #000000;
`
export const SubTitle = styled.div`
  text-align: left;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
`
export const SubTitleColorText = styled.text`
  color: #5500dd;
`

export const InnerBoxContainer = styled.div`
  margin-top: 24px;
  margin-left: 36px;
  margin-right: 36px;
  width: calc(100% - 144px);
  min-width: 812px;
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.16);
  border-radius: 24px;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding-left: 36px;
  padding-right: 36px;
`

export const Margin36 = styled.div`
  padding-top: 36px;
`
export const Margin16 = styled.div`
  padding-top: 16px;
`

export const Margin24 = styled.div`
  padding-top: 24px;
  background: #f0f1f3;
`

export const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexRowInnerLeft = styled.div`
  width: 50%;
  margin-right: 36px;
`
export const FlexRowInnerRight = styled.div`
  width: 50%;
`

export const InnerBox = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid #c1c2c3;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const InputBox = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  padding: 0 78px 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
`
interface InputBoxProps {
  error: boolean
  value: string
}
export const InputBoxWithError = styled.input<InputBoxProps>`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;

  padding: 0 78px 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  border: 1px solid ${({ error }) => (error ? '#D40030' : '#c1c2c3')};
  &:focus {
    outline: 2px solid ${({ error }) => (error ? '#D40030' : '#000000')};
    outline-offset: -1px;
  }
`
export const InputBoxWithCount = styled.div`
  position: relative;
`

export const InputCount = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 14px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #c1c2c3;
`
