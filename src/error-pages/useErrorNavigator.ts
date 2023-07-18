import { useNavigate } from 'react-router-dom'

export const useErrorNavigator = () => {
  const navigation = useNavigate()
  const navigate = (error_code: any) => {
    if (error_code === 403 || error_code === 404 || error_code === 500) {
      navigation('/Error', { state: error_code })
    }
  }

  return { navigate }
}
