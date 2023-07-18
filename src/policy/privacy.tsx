import React, { useState } from 'react'
import styled from 'styled-components'
import { Header } from '../main-pages/header'
import { Margin24, Margin36 } from '../component/styledComponent'
import { TermBox } from './termBox'
import Select from 'react-select'
import { LocationText, PrivacyText } from './text'
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
const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  text-align: left;
  margin-top: 36px;
`
export const Privacy = () => {
  const DateOptions = [{ value: '0', label: '2023.05.15' }]
  const [Date, setDate] = useState('0')
  return (
    <Container>
      <Header />
      <BodyContainer>
        <TitleContainer>
          <Title>개인정보처리방침</Title>
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
        <SubText>
          주식회사 업텐(이하 "회사")는 「개인정보 보호법」 제30조에 따라
          정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게
          처리할 수 있도록 하기 위해 다음과 같은 개인정보처리방침에 따라
          처리하고 있습니다. 회사의 개인정보처리방침은 관련 법률 및 지침에 따라
          변경될 수 있고, 회사가 개인정보처리방침을 개정하는 경우에는 홈페이지
          또는 애플리케이션에 게시하거나 개별적으로 고시할 것입니다.
        </SubText>
      </BodyContainer>
      <Margin24 style={{ backgroundColor: '#ffffff' }} />
      <BodyContainer>
        {PrivacyText.map(privacy => {
          return <TermBox title={privacy.title} contents={privacy.contents} />
        })}
        <div style={{ marginTop: '80px' }} />
      </BodyContainer>
      <Footer />
    </Container>
  )
}
