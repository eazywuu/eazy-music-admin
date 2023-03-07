export const useToggleDialog = (isShowDialog) => {
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
