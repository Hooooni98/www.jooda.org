import { instance } from '../index'
import { showToast } from '../../component/toast'

export const getChurchInfo = async () => {
  try {
    const response = await instance.get('administrators/churchs/info/')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchChurchInfo = async (
  logo: any,
  thumbnail: any,
  churchName: string | undefined,
  denominationName: string | undefined,
  contackNumber: string | undefined,
  introductionTitle: string | undefined,
  introductionContent: string | undefined,
  address: string | undefined,
  detailAddress: string | undefined
) => {
  const formData = new FormData()
  churchName !== undefined && formData.append('church_name', churchName)
  denominationName !== undefined &&
    formData.append('denomination_name', denominationName)
  contackNumber !== undefined &&
    formData.append('contact_number', contackNumber)
  introductionTitle !== undefined &&
    formData.append('introduction_title', introductionTitle)
  introductionContent !== undefined &&
    formData.append('introduction_content', introductionContent)
  address !== undefined && formData.append('address', address)
  detailAddress !== undefined &&
    formData.append('detail_address', detailAddress)
  logo.length !== 0 && typeof logo[0] === typeof false
    ? formData.append('is_delete_logo', 'false')
    : formData.append('logo', logo)
  thumbnail.length !== 0 && typeof thumbnail[0] === typeof true
    ? formData.append('is_delete_thumbnail', 'false')
    : formData.append('thumbnail', thumbnail)
  try {
    const response = await instance.patch(
      'administrators/churchs/info/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error) {
    return error
  }
}

export const patchChurchAddress = async (
  parking: string,
  ownCar: string,
  publicTransport: string,
  shuttleBus: string
) => {
  try {
    const formData = new FormData()
    parking !== undefined && formData.append('parking', parking)
    ownCar !== undefined && formData.append('own_car', ownCar)
    publicTransport !== undefined &&
      formData.append('public_transport', publicTransport)
    shuttleBus !== undefined && formData.append('shuttle_bus', shuttleBus)
    const response = await instance.patch(
      'administrators/churchs/directions/',
      formData
    )
    response.data.success && showToast('patch')
    return response.data
  } catch (error: any) {
    return error
  }
}
