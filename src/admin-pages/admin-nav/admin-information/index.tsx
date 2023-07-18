import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerDefaultPage } from './default'
import { InnerAddressPage } from './address'
import { InnerPastorPage } from './pastor'
import { InnerHistoryPage } from './history'

const Container = styled.div`
  min-height: 100vh;
  background: #f0f1f3;
  width: 100%;
`

export const InformationPage: React.FC = () => {
  return (
    <Container>
      <InnerDefaultPage />
      <InnerAddressPage />
      <InnerPastorPage />
      <InnerHistoryPage />
    </Container>
  )
}
