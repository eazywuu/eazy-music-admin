<script setup>
import { reactive, ref } from 'vue'
import { create, update } from '../../api/music'
import notify from '../../utils/notify'
import Uploader from '../../components/Uploader.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => null,
  },
})
// TODO bug
const emit = defineEmits(['createSuccess', 'editSuccess'])
// 提示
const prompt = ref(true)

const music = reactive(props.data || {
  name: '',
  description: '',
  file: null,
})

const isEdit = ref(Boolean(props.data))

const createMusic = () => create(music).then((createdMusic) => {
  notify.success(`音乐《${createdMusic.name}》创建成功！`)
  emit('createSuccess')
})

const editMusic = () => update(music.id, music).then((updatedMusic) => {
  notify.success(`音乐《${updatedMusic.name}》更新成功！`)
  emit('editSuccess')
})
</script>

<template>
  <q-dialog v-model="prompt" persistent>
    <!-- 编辑用户窗口 -->
    <q-card style="min-width: 350px; padding: 20px 10px;">
      <!-- 标题 -->
      <q-card-section>
        <div class="text-h6">
          添加音乐
        </div>
      </q-card-section>

      <!-- 表单输入 -->
      <q-form class="q-gutter-md" @submit="isEdit ? editMusic() : createMusic()">
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
        <q-card-section>
          <Uploader v-model:file="music.file" label="上传音乐" />
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
