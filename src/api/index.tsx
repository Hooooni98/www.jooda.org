import axios from 'axios'

const baseURL = 'https://###########'

export const instance = axios.create({
  baseURL,
})

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data.error_code)
  }
)

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token)
  instance.defaults.headers.common['Authorization'] = token
}

export const LogIn = async (idData: string, pwData: string) => {
  try {
    const response = await instance.post('administrators/accounts/login/', {
      id: idData,
      password: pwData,
    })
    setAuthToken(response.data.payload.admin_account_info.authorization_token)

    return response.data
  } catch (error: any) {
    console.log(error.response.data.error_code)
  }
}
