import React, { useState } from 'react'
import { InnerScheduleList } from './list'
import { InnerScheduleRegist } from './regist'
import { Margin24 } from '../../../../component/styledComponent'

export const InnerSchedulePage = () => {
  const [refresh, setRefresh] = useState(false)
  return (
    <>
      <InnerScheduleList
        refresh={refresh}
        setRefresh={setRefresh}
      ></InnerScheduleList>

      <InnerScheduleRegist
        refresh={refresh}
        setRefresh={setRefresh}
      ></InnerScheduleRegist>
    </>
  )
}
