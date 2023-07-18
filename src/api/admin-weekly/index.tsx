import { instance } from '..'
import { showToast } from '../../component/toast'

export const getWeekly = async (offset: number) => {
  try {
    const response = await instance.get('administrators/churchs/weekly/', {
      params: { offset },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const createChurchWeekly = async (
  image: any,
  title: string | undefined,
  year: string | undefined,
  month: string | undefined
) => {
  const formData = new FormData()
  image.length !== 0 && formData.append('image', image)
  title !== undefined && formData.append('title', title)
  year !== undefined && formData.append('year', year)
  month !== undefined && formData.append('month', month)
  try {
    const response = await instance.post(
      'administrators/churchs/weekly/',
      formData
    )
    response.data.success && showToast('create')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchChurchWeekly = async (
  image: any,
  church_weekly_id: string | undefined,
  title: string | undefined,
  year: string | undefined,
  month: string | undefined
) => {
  const formData = new FormData()
  image.length !== 0 && formData.append('image', image)
  church_weekly_id !== undefined &&
    formData.append('church_weekly_id', church_weekly_id)
  title !== undefined && formData.append('title', title)
  year !== undefined && formData.append('year', year)
  month !== undefined && formData.append('month', month)

  try {
    const response = await instance.patch(
      'administrators/churchs/weekly/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteChurchWeekly = async (
  church_weekly_id: string | undefined
) => {
  const formData = new FormData()
  church_weekly_id !== undefined &&
    formData.append('church_weekly_id', church_weekly_id)
  try {
    const response = await instance.post(
      'administrators/churchs/weekly/delete/',
      formData
    )
    response.data.success && showToast('delete')
    return response.data
  } catch (error) {
    return error
  }
}
