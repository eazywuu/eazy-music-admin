<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const name = ref(null)
const age = ref(null)
const accept = ref(false)

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: '请同意许可和条款！',
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: '登陆成功！',
    })
  }
}

const onReset = () => {
  name.value = null
  age.value = null
  accept.value = false
}
</script>

<template>
  <div class="login-page">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="login-form-content">
        <div class="title">
          原力音乐后台
        </div>
        <q-form
          class="q-gutter-md form"
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-input
            v-model="name"
            filled
            label="用户名："
            hint="电话或邮箱"
            lazy-rules
            :rules="[val => val && val.length > 0 || '请输入用户名']"
          />

          <q-input
            v-model="age"
            filled
            type="password"
            label="密码："
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '请输入密码',
              val => val > 0 && val < 100 || '请输入正确的密码',
            ]"
          />

          <q-toggle v-model="accept" label="我接受许可和条款" />

          <div>
            <q-btn class="full-width" label="登录" type="submit" color="primary" />
            <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm reset" />
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      text-align: center;
      font-size: 40px;
      margin-bottom: 50px;
    }
    .login-form-content {
      width: 400px;
      padding: 10px;
    }
  }
  .reset {
    position: relative;
    left: 300px;
  }
</style>

