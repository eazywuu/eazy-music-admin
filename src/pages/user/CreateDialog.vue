<script setup>
import { useCreateUser } from '../../composables/useCreateUser'

const emit = defineEmits(['createSuccess'])

const { createUser, username, password, prompt } = useCreateUser()
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

      <!-- 表单输入 -->
      <q-form class="q-gutter-md" @submit="createUser(emit)">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="username"
            label="用户名"
            dense
            autofocus
            lazy-rules
            :rules="[val => val && val.length > 0 || '请填写用户名！']"
            @keyup.enter="prompt.value = false"
          />
          <q-input
            v-model="password"
            label="密码"
            dense
            autofocus
            lazy-rules
            :rules="[val => val && val.length > 0 || '请填写密码！']"
            @keyup.enter="prompt.value = false"
          />
        </q-card-section>

        <!-- 按钮 -->
        <q-card-actions align="right" class="text-primary">
          <q-btn label="添加" type="submit" color="primary" />
          <q-btn v-close-popup flat label="取消" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
