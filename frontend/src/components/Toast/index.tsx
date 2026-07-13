import { ToastContainer as _ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ToastContainer() {
  return (
    <_ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover={false}
      theme="dark"
    />
  )
}
