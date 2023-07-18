import { showToast } from '../../component/toast'
import { instance } from '../index'

export const getHistory = async (offset: number) => {
  try {
    const response = await instance.get('administrators/churchs/history/', {
      params: { offset },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const createChurchHistories = async (history_list: Array<any>) => {
  const formData = new FormData()
  history_list.forEach(history => {
    formData.append('history_list', JSON.stringify(history))
  })
  try {
    if (history_list.length !== 0) {
      const response = await instance.post(
        'administrators/churchs/history/',
        formData
      )
      response.data.success && showToast('create')
      return response.data
    }
    return
  } catch (error) {
    return error
  }
}

export const patchChurchHistories = async (history_list: Array<any>) => {
  const formData = new FormData()
  history_list.forEach(history => {
    formData.append('history_list', JSON.stringify(history))
  })
  try {
    if (history_list.length !== 0) {
      const response = await instance.patch(
        'administrators/churchs/history/',
        formData
      )
      response.data.success && showToast('patch')
      return response.data
    }
    return
  } catch (error) {
    return error
  }
}

export const deleteChurchHistories = async (history_id_list: Array<string>) => {
  const formData = new FormData()
  history_id_list.forEach(history => {
    formData.append('history_list', JSON.stringify(history))
  })
  try {
    if (history_id_list.length !== 0) {
      const response = await instance.post(
        'administrators/churchs/history/delete/',
        formData
      )
      response.data.success && showToast('delete')
      return response.data
    }
    return
  } catch (error) {
    return error
  }
}
