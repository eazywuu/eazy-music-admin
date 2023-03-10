<script setup>
import { reactive, ref } from 'vue'
import { create } from '../../api/music'
import notify from '../../utils/notify'

// TODO bug
const emit = defineEmits(['createSuccess'])
// 提示
const prompt = ref(true)

const music = reactive({
  name: '',
  description: '',
})

const createMusic = () => create(music).then((createdMusic) => {
  notify.success(`音乐《${createdMusic.name}》创建成功！`)
  emit('createSuccess')
})
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
      <q-form class="q-gutter-md" @submit="createMusic">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="music.name"
            label="音乐名"
            :rules="[val => val && val.length > 0 || '请填写音乐名！']"
            dense
            autofocus
            @keyup.enter="prompt.value = false"
          />
          <q-input
            v-model="music.description"
            label="音乐简介"
            dense
            autofocus
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
