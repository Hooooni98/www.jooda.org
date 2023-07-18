import { instance } from '..'
import { showToast } from '../../component/toast'

export const getNotice = async (offset: number) => {
  try {
    const response = await instance.get('administrators/churchs/notice/', {
      params: { offset },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const createChurchNotification = async (
  image: any,
  title: string | undefined,
  content: string | undefined
) => {
  const formData = new FormData()
  image.length !== 0 && formData.append('image', image)
  title !== undefined && formData.append('title', title)
  content !== undefined && formData.append('content', content)
  try {
    const response = await instance.post(
      'administrators/churchs/notice/',
      formData
    )
    response.data.success && showToast('create')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchChurchNotification = async (
  image: any,
  church_notice_id: string | undefined,
  title: string | undefined,
  content: string | undefined
) => {
  const formData = new FormData()
  image.length !== 0 && typeof image[0] === typeof true
    ? formData.append('is_delete_image', 'false')
    : formData.append('image', image)
  church_notice_id !== undefined &&
    formData.append('church_notice_id', church_notice_id)
  title !== undefined && formData.append('title', title)
  content !== undefined && formData.append('content', content)

  try {
    const response = await instance.patch(
      'administrators/churchs/notice/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteChurchNotification = async (
  church_notice_id: string | undefined
) => {
  const formData = new FormData()
  church_notice_id !== undefined &&
    formData.append('church_notice_id', church_notice_id)
  try {
    const response = await instance.post(
      'administrators/churchs/notice/delete/',
      formData
    )
    response.data.success && showToast('delete')
    return response.data
  } catch (error) {
    return error
  }
}
