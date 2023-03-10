import { ref } from 'vue'
import { create } from '../api/user.js'
import notify from '../utils/notify.js'

export const useCreateUser = () => {
  const prompt = ref(true)
  const username = ref('')
  const password = ref('')

  const createUser = (emit) => {
    create({ username: username.value, password: password.value }).then(() => {
      prompt.value = false
      notify.success('添加用户成功！')
      emit('createSuccess')
    })
  }
  return {
    prompt,
    username,
    password,
    createUser,
  }
}
