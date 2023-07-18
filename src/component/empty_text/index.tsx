import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 36px;
  width: 100%;
  align-items: center;
`
const Text = styled.text`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #454648;
`
interface EmptyTextProps {
  text: string
}

export const EmptyText = (props: EmptyTextProps) => {
  const { text } = props
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  )
}
