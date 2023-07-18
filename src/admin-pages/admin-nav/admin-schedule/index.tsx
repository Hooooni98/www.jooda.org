import React from 'react'
import styled from 'styled-components'
import { InnerSchedulePage } from './schedule'
import { InnerCalendarPage } from './calendar'
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f0f1f3;
`

export const SchedulePage: React.FC = () => {
  return (
    <Container>
      <InnerCalendarPage />
      <InnerSchedulePage />
    </Container>
  )
}
