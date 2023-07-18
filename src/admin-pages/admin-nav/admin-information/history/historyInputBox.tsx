import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useFormatDate } from '../../../../hooks/useFormatDate'
import { useDebounce } from '../../../../hooks/useDebounce'
import { InputBoxWithError } from '../../../../component/styledComponent'

const Container = styled.div`
  width: 642px;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  // padding-left: 24px;
  margin-bottom: 16px;
  margin-left: 36px;
  margin-right: 36px;
  margin-top: 1px;
`

const HistoryBoxDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background: #5500dd;
  margin-right: 24px;
`
interface InputBoxProps {
  error: boolean
  value: string
}
const InputDateBox = styled.input<InputBoxProps>`
  width: 126px;
  box-sizing: border-box;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  padding: 0 0 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  border: 1px solid ${({ error }) => (error ? '#D40030' : '#c1c2c3')};
  &:focus {
    outline: 2px solid ${({ error }) => (error ? '#D40030' : '#000000')};
    outline-offset: -1px;
  }
  margin-right: 24px;
`

const InputContentBox = styled.input`
  width: 412px;
  box-sizing: border-box;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  padding: 0 78px 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
  margin-right: 24px;
`

interface HistoryProps {
  index: number
  date: string
  content: string
  changeDate: Function
  changeContent: Function
  deleteHistroy: Function
}

export const HistoryInputBox = (props: HistoryProps) => {
  const { index, date, content, changeDate, changeContent, deleteHistroy } =
    props
  const { date: historyDate, setDate, isValid, isError } = useFormatDate()
  useEffect(() => {
    if (isValid) changeDate(index, historyDate)
  }, [historyDate, isValid])
  useEffect(() => {
    setDate(date ? date : historyDate + ' ')
  }, [date])

  return (
    <Container>
      <HistoryBoxDot />

      <InputDateBox
        type="text"
        value={historyDate}
        error={isError}
        maxLength={10}
        placeholder={'2023-10-01'}
        onChange={e => setDate(e.target.value)}
      />
      <InputContentBox
        type="text"
        value={content}
        placeholder={'내용 입력'}
        onChange={e => changeContent(index, e.target.value)}
      />
      <img
        onClick={() => deleteHistroy(index)}
        src="/source/icon/clear.svg"
        alt=""
        style={{ marginRight: '8px' }}
      />
    </Container>
  )
}
