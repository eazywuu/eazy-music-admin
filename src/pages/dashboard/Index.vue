<script setup>
import { computed } from 'vue'
import store from '../../store'

const nickname = computed(() => store.state.user.nickname)
const logout = () => store.dispatch('user/logout').then(() => window.location.reload())
</script>

<template>
  <div>{{ nickname }}</div>
  <div>
    <q-btn @click="logout">
      退出
    </q-btn>
  </div>
</template>
