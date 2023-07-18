import React, { useState } from 'react'
import { CalendarView } from './view'
import { InnerCalendarRegist } from './regist'

export const InnerCalendarPage = () => {
  const [refresh, setRefresh] = useState(false)
  return (
    <>
      <CalendarView refresh={refresh} setRefresh={setRefresh} />
      <InnerCalendarRegist refresh={refresh} setRefresh={setRefresh} />
    </>
  )
}
