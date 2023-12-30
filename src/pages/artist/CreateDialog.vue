<script setup>
import { reactive, ref } from 'vue'
import { create, update } from '../../api/artist'
import notify from '../../utils/notify'
import Uploader from '../../components/Uploader.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => null,
  },
})
// TODO bug
const $emit = defineEmits(['createSuccess', 'editSuccess'])
// 提示
const prompt = ref(true)

const artist = reactive(props.data || {
  name: '',
  remark: '',
  photo: null,
})

const isEdit = ref(Boolean(props.data))

const createArtist = () => create({ name: artist.name, remark: artist.remark, photoId: artist.photo.id }).then((createdArtist) => {
  notify.success(`音乐《${createdArtist.name}》创建成功！`)
  $emit('createSuccess')
})

const editArtist = () => update(artist.id, { name: artist.name, remark: artist.remark, photoId: artist.photo.id }).then((updatedArtist) => {
  notify.success(`音乐《${updatedArtist.name}》更新成功！`)
  $emit('editSuccess')
})
</script>

<template>
  <q-dialog v-model="prompt" persistent>
    <!-- 编辑窗口 -->
    <q-card style="min-width: 350px; padding: 20px 10px;">
      <!-- 标题 -->
      <q-card-section>
        <div class="text-h6">
          添加歌手
        </div>
      </q-card-section>

      <!-- 表单输入 -->
      <q-form class="q-gutter-md" @submit="isEdit ? editArtist() : createArtist()">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="artist.name"
            label="歌手名"
            :rules="[val => val && val.length > 0 || '请填写歌手名！']"
            dense
            autofocus
            @keyup.enter="prompt.value = false"
          />
          <q-input
            v-model="artist.remark"
            label="歌手备注"
            dense
            autofocus
            @keyup.enter="prompt.value = false"
          />
        </q-card-section>
        <q-card-section>
          <Uploader v-model:file="artist.photo" label="上传歌手图片" />
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
