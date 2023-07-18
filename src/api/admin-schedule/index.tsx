import { instance } from '..'
import { showToast } from '../../component/toast'

export const getSchedule = async () => {
  try {
    const response = await instance.get(
      'administrators/churchs/worship_schedule/'
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const createSchedule = async (
  title: string,
  subtitle: string,
  weekday: string,
  place: string,
  mc: string,
  target: string,
  reference: string,
  start_time: string,
  end_time: string
) => {
  const formData = new FormData()
  title.length !== 0 && formData.append('title', title)
  subtitle.length !== 0 && formData.append('subtitle', subtitle)
  weekday.length !== 0 && formData.append('weekday', weekday)
  place.length !== 0 && formData.append('place', place)
  mc.length !== 0 && formData.append('mc', mc)
  target.length !== 0 && formData.append('target', target)
  reference.length !== 0 && formData.append('reference', reference)
  start_time.length !== 0 && formData.append('start_time', start_time)
  end_time.length !== 0 && formData.append('end_time', end_time)
  try {
    const response = await instance.post(
      'administrators/churchs/worship_schedule/',
      formData
    )
    response.data.success && showToast('create')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchSchedule = async (
  church_worship_schedule_id: string,
  title: string,
  subtitle: string,
  weekday: string,
  place: string,
  mc: string,
  target: string,
  reference: string,
  start_time: string,
  end_time: string
) => {
  const formData = new FormData()
  church_worship_schedule_id.length !== 0 &&
    formData.append('church_worship_schedule_id', church_worship_schedule_id)
  title.length !== 0 && formData.append('title', title)
  subtitle.length !== 0
    ? formData.append('subtitle', subtitle)
    : formData.append('subtitle', '')
  weekday.length !== 0 && formData.append('weekday', weekday)
  place.length !== 0
    ? formData.append('place', place)
    : formData.append('place', '')
  mc.length !== 0 ? formData.append('mc', mc) : formData.append('mc', '')
  target.length !== 0
    ? formData.append('target', target)
    : formData.append('target', '')
  reference.length !== 0
    ? formData.append('reference', reference)
    : formData.append('reference', '')
  start_time.length !== 0 && formData.append('start_time', start_time)
  end_time.length !== 0
    ? start_time < end_time && formData.append('end_time', end_time)
    : formData.append('end_time', end_time)
  try {
    const response = await instance.patch(
      'administrators/churchs/worship_schedule/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteSchedule = async (church_worship_schedule_id: string) => {
  const formData = new FormData()
  church_worship_schedule_id.length !== 0 &&
    formData.append('church_worship_schedule_id', church_worship_schedule_id)
  try {
    const response = await instance.post(
      'administrators/churchs/worship_schedule/delete/',
      formData
    )
    response.data.success && showToast('delete')
    return response.data
  } catch (error) {
    return error
  }
}
