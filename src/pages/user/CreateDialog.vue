<script setup>
import { ref } from 'vue'
import { useCreateUser } from '../../composables/useCreateUser'

// TODO bug
const emit = defineEmits(['create-success'])
// 提示
const prompt = ref(true)
const { createUser, username, password } = useCreateUser()
</script>

<template>
  <q-dialog v-model="prompt" persistent>
    <!-- 添加用户窗口 -->
    <q-card style="min-width: 350px; padding: 20px 10px;">
      <!-- 标题 -->
      <q-card-section>
        <div class="text-h6">
          添加用户
        </div>
      </q-card-section>

      <!-- 输入 -->
      <q-card-section class="q-pt-none">
        <q-input v-model="username" label="用户名" dense autofocus @keyup.enter="prompt.value = false" />
        <q-input v-model="password" label="密码" dense autofocus @keyup.enter="prompt.value = false" />
      </q-card-section>

      <!-- 按钮 -->
      <q-card-actions align="right" class="text-primary">
        <q-btn label="添加" color="primary" @click="createUser(username, password, $emit)" />
        <q-btn v-close-popup flat label="取消" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
