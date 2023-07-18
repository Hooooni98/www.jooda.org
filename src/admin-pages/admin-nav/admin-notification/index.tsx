import React, { useState } from 'react'
import styled from 'styled-components'
import { InnerListPage } from './list'
import { InnerRegistPage } from './regist'
const Container = styled.div`
  min-height: 100vh;
  background: #f0f1f3;
  width: 100%;
`

export const NotificationPage: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  return (
    <Container>
      <InnerListPage setRefresh={setRefresh} refresh={refresh} />
      <InnerRegistPage setRefresh={setRefresh} refresh={refresh} />
    </Container>
  )
}
