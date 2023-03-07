import { ref } from 'vue'
import { Notify } from 'quasar'
import { create } from '../api/user.js'

export const useCreateUser = () => {
  const username = ref('')
  const password = ref('')

  const createUser = (emit) => {
    create({ username: username.value, password: password.value }).then(() => {
      Notify.create({
        type: 'positive',
        message: '添加用户成功！',
        position: 'top',
      })
      emit('create-success')
    })
  }
  return {
    username,
    password,
    createUser,
  }
}
