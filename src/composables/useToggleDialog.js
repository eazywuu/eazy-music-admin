import { ref } from 'vue'

export const useToggleDialog = () => {
  const isShowDialog = ref(false)

  const showDialog = () => {
    isShowDialog.value = true
  }

  const hideDialog = () => {
    isShowDialog.value = false
  }
  return {
    isShowDialog,
    showDialog,
    hideDialog,
  }
}
