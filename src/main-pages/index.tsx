import React from 'react'
import styled from 'styled-components'
import { Header } from './header'
import { Footer } from './footer'
import { Page1 } from './home-pages/page1'
import { Page3 } from './home-pages/page3'
import { Page4 } from './home-pages/page4'
import { Page5 } from './home-pages/page5'
import { Page2 } from './home-pages/page2'

const Container = styled.div`
  width: 100%;
`

const BodyContainer = styled.div`
  width: 100%;
  height: 4450px;
`

export const HomePage: React.FC = () => {
  return (
    <Container>
      <div style={{ width: "100%", position: "fixed" }}>
        <Header /></div>
      <BodyContainer>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
      </BodyContainer>
      <Footer />
    </Container>
  )
}
