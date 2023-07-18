import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Margin16, Margin24 } from '../component/styledComponent'

const Title = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #000000;
  text-align: left;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Tab = styled.div`
  margin-left: 28px;
`
const Dot = styled.div`
  margin-top: 7px;
  margin-right: 7px;
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background-color: #000000;
`
const WhiteDot = styled.div`
  box-sizing: border-box;
  margin-top: 7px;
  margin-right: 7px;
  width: 5px;
  height: 5px;
  border-radius: 100px;
  border: 1px solid #000000;
  background-color: #ffffff;
`

const ContentText = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  color: #000000;
`
interface ContentProps {
  content: string
}
interface TermBoxProps {
  title: string
  contents: Array<string>
}
const Text = (props: ContentProps) => {
  const { content } = props
  const [text, setText] = useState(content)
  const [tab, setTab] = useState(-1)
  useEffect(() => {
    if (content.slice(0, 5) === '    -') {
      setTab(1)
      setText(content.slice(5))
    } else if (content.slice(0, 9) === '        -') {
      setTab(2)
      setText(content.slice(9))
    } else if (content.slice(0, 2) === '- ') {
      setTab(0)
      setText(content.slice(2))
    }
  }, [content])

  return (
    <ContentContainer>
      {tab >= 1 ? (
        tab === 1 ? (
          <>
            <Tab />
            <Dot />
          </>
        ) : (
          <>
            <Tab />
            <Tab />
            <WhiteDot />
          </>
        )
      ) : (
        tab === 0 && <Dot />
      )}
      <ContentText>{text}</ContentText>
    </ContentContainer>
  )
}
export const TermBox = (props: TermBoxProps) => {
  const { title, contents } = props

  return (
    <div>
      <Title>{title}</Title>
      <Margin16 />
      {contents &&
        contents.map(content => {
          return <Text content={content} />
        })}

      <Margin24 style={{ backgroundColor: '#ffffff' }} />
    </div>
  )
}
