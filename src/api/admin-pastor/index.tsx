import { instance } from '..'
import { showToast } from '../../component/toast'

export const getPastor = async (offset: number) => {
  try {
    const response = await instance.get('administrators/churchs/pastor/', {
      params: { offset },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const getPastorNoLimit = async () => {
  try {
    const response = await instance.get('administrators/churchs/pastor/', {
      params: { limit: 500 },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const createChurchPastors = async (
  pastor_list: Array<any>,
  image_list: Array<any>
) => {
  const formData = new FormData()
  pastor_list.forEach(pastor => {
    formData.append('pastor_list', JSON.stringify(pastor))
  })
  image_list.forEach(file => {
    formData.append('image_list', file)
  })

  try {
    const response = await instance.post(
      'administrators/churchs/pastor/',
      formData
    )
    response.data.success && showToast('create')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchChurchPastor = async (
  church_pastor_id: string | undefined,
  name: string | undefined,
  role: string | undefined,
  image: any
) => {
  const formData = new FormData()
  image.length !== 0 && typeof image[0] === typeof true
    ? formData.append('is_delete_image', 'false')
    : formData.append('image', image)
  church_pastor_id !== undefined &&
    formData.append('church_pastor_id', church_pastor_id)
  name !== undefined && formData.append('name', name)
  role !== undefined && formData.append('role', role)

  try {
    const response = await instance.patch(
      'administrators/churchs/pastor/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteChurchPastor = async (
  church_pastor_id: string | undefined
) => {
  const formData = new FormData()
  church_pastor_id !== undefined &&
    formData.append('church_pastor_id', church_pastor_id)
  try {
    const response = await instance.post(
      'administrators/churchs/pastor/delete/',
      formData
    )
    response.data.success && showToast('delete')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchChurchPastorOrder = async (
  church_pastor_id: string,
  index: number
) => {
  const formData = new FormData()
  formData.append('church_pastor_id', church_pastor_id)
  formData.append('index', index.toString())
  try {
    const response = await instance.post(
      'administrators/churchs/pastor/change_order/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}
