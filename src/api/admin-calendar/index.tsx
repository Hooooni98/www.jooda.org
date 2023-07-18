import { instance } from '..'
import { showToast } from '../../component/toast'

export const getCalendar = async (year: number, month: number) => {
  try {
    const response = await instance.get('administrators/churchs/calendar/', {
      params: {
        year: year,
        month: month < 10 ? '0' + month.toString() : month,
      },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const createCalendar = async (
  title: string,
  content: string,
  start_date: string,
  end_date: string
) => {
  const formData = new FormData()
  title.length !== 0 && formData.append('title', title)
  content.length !== 0 && formData.append('content', content)
  start_date.length !== 0 && formData.append('start_date', start_date)
  end_date.length !== 0 && formData.append('end_date', end_date)
  try {
    const response = await instance.post(
      'administrators/churchs/calendar/',
      formData
    )
    response.data.success && showToast('create')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchCalendar = async (
  church_calendar_id: string,
  title: string,
  content: string,
  start_date: string,
  end_date: string
) => {
  const formData = new FormData()
  church_calendar_id.length !== 0 &&
    formData.append('church_calendar_id', church_calendar_id)
  title.length !== 0 && formData.append('title', title)
  content.length !== 0 && formData.append('content', content)
  start_date.length !== 0 && formData.append('start_date', start_date)
  end_date.length !== 0 &&
    start_date <= end_date &&
    formData.append('end_date', end_date)
  try {
    const response = await instance.patch(
      'administrators/churchs/calendar/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteCalendar = async (church_calendar_id: string) => {
  const formData = new FormData()
  church_calendar_id.length !== 0 &&
    formData.append('church_calendar_id', church_calendar_id)
  try {
    const response = await instance.post(
      'administrators/churchs/calendar/delete/',
      formData
    )
    response.data.success && showToast('delete')
    return response.data
  } catch (error) {
    return error
  }
}
