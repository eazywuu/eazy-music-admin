<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

const username = ref(null)
const password = ref(null)
const accept = ref(false)

const onSubmit = (username, password) =>
  store.dispatch('user/login', { username, password }).then(() => {
    store.dispatch('user/fetchCurrentUser')
      .then(() => router.push({ path: route.query.redirect || '/' }))
  })

const onReset = () => {
  username.value = null
  password.value = null
  accept.value = false
}
</script>

<template>
  <div class="login-page">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="login-form-content">
        <div class="title">
          音乐管理后台
        </div>
        <q-form
          class="q-gutter-md form"
          @submit="onSubmit(username, password)"
          @reset="onReset"
        >
          <q-input
            v-model="username"
            filled
            label="用户名："
            hint="电话或邮箱"
            lazy-rules
            :rules="[val => val && val.length > 0 || '请输入用户名']"
          />

          <q-input
            v-model="password"
            filled
            type="password"
            label="密码："
            lazy-rules
          />

          <q-toggle v-model="accept" label="记住我" />

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

