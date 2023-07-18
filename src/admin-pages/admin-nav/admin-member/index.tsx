import React, { useState } from 'react'
import styled from 'styled-components'
import { InnerMemberPage } from './member'
import { InnerConfirmMemberPage } from './confirm'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f0f1f3;
`

export const MemberPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false)
  return (
    <Container>
      <InnerMemberPage refresh={refresh} setRefresh={setRefresh} />
      <InnerConfirmMemberPage refresh={refresh} setRefresh={setRefresh} />
    </Container>
  )
}
