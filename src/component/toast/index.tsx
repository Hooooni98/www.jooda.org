import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
    font-style: normal;
    font-weight: 550;
    font-size: 18px;
    line-height: 24px;
    border-radius: 16px;
    padding: 20px;
    padding-left: 16px;
    background: #17181a;
    margin-right: 12px;
  }

  .Toastify__toast-icon {
    width: 28px;
    height: 28px;
  }
  .Toastify__progress-bar-theme--dark {
    background: #8b47f0;
  }
  .Toastify__close-button {
    color: #17181a;
  }
`

export const showToast = (type: string) => {
  var toast_message =
    type === 'create'
      ? '등록이 완료되었어요❕'
      : type === 'patch'
        ? '수정이 완료되었어요❕'
        : type === 'delete'
          ? '삭제가 완료되었어요❕'
          : type
  toast_message.length !== 0 &&
    toast(toast_message, {
      icon: ({ theme, type }) => <img src="source/icon/check_P400.svg" />,
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
}
export const Toast = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <Container />
    </div>
  )
}
