import React, { useState } from 'react'
import styled from 'styled-components'
import { InnerListPage } from './list'
import { InnerRegistPage } from './regist'
import { Margin24, Margin36 } from '../../../component/styledComponent'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f0f1f3;
`

export const WeeklyPage: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  return (
    <Container>
      <InnerListPage setRefresh={setRefresh} refresh={refresh} />
      <InnerRegistPage setRefresh={setRefresh} refresh={refresh} />
    </Container>
  )
}
