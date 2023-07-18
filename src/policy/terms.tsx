import React, { useState } from 'react'
import styled from 'styled-components'
import { Header } from '../main-pages/header'
import { Margin36 } from '../component/styledComponent'
import { TermBox } from './termBox'
import Select from 'react-select'
import { LocationText, PrivacyText, TermsText } from './text'
import { Footer } from '../main-pages/footer'

const Container = styled.div`
  width: 100%;
`
const BodyContainer = styled.div`
  margin: 0 auto;
  width: 1280px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 56px;
  align-items: center;
`

const Title = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #000000;
  text-align: left;
`

export const Terms = () => {
  const DateOptions = [{ value: '0', label: '2023.05.15' }]
  const [Date, setDate] = useState('0')
  return (
    <Container>
      <Header />
      <BodyContainer>
        <TitleContainer>
          <Title>서비스 이용약관</Title>
          <Select
            options={DateOptions}
            defaultValue={DateOptions[0]}
            onChange={e => e && setDate(e?.value)}
            isSearchable={false}
            theme={theme => ({
              ...theme,
              borderRadius: 12,
              colors: {
                ...theme.colors,
                primary25: '#F0E6FD',
                primary: '#5500DD',
                neutral20: '#C1C2C3',
              },
            })}
          />
        </TitleContainer>
      </BodyContainer>
      <Margin36 />
      <BodyContainer>
        {TermsText.map(terms => {
          return <TermBox title={terms.title} contents={terms.contents} />
        })}
        <div style={{ marginTop: '80px' }} />
      </BodyContainer>
      <Footer />
    </Container>
  )
}
