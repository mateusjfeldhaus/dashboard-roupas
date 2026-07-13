import { toast as _toast } from 'react-toastify'

type ToastType = 'success' | 'error'

export function toast(msg: string, type: ToastType = 'success') {
  if (type === 'error') {
    _toast.error(msg)
  } else {
    _toast.success(msg)
  }
}
