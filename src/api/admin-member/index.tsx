import { instance } from '..'
import { showToast } from '../../component/toast'

export const getMember = async (offset: number, keyword: string) => {
  try {
    const response = await instance.get('administrators/churchs/member/', {
      params: { offset, keyword },
    })

    return response.data
  } catch (error) {
    return error
  }
}

export const kickOffMember = async (member_list: Array<string>) => {
  const formData = new FormData()
  member_list.forEach(member_id => {
    formData.append('member_list', member_id)
  })
  if (member_list.length !== 0) {
    try {
      const response = await instance.patch(
        'administrators/churchs/member/kick_out/',
        formData
      )
      response.data.success && showToast('정상 처리 되었어요.')
      return response.data
    } catch (error) {
      return error
    }
  }
  return
}

export const getConfirmMember = async (offset: number, keyword: string) => {
  try {
    const response = await instance.get(
      'administrators/churchs/confirm/member/',
      {
        params: { offset, keyword },
      }
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const patchConfirmMember = async (
  member_list: Array<string>,
  member_state: string
) => {
  const formData = new FormData()
  member_list.forEach(member_id => {
    formData.append('member_list', member_id)
  })
  member_state && formData.append('member_state', member_state)
  if (member_list.length !== 0 && member_state !== '') {
    try {
      const response = await instance.patch(
        'administrators/churchs/confirm/member/',
        formData
      )
      response.data.success &&
        showToast(member_state ? '신도를 승인했어요.' : '신도를 거절했어요.')
      return response.data
    } catch (error) {
      return error
    }
  }
  return
}
