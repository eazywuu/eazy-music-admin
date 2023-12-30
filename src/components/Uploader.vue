<script  setup>
import CosUploader from '../composables/useCosUploader.js'

defineProps({
  label: {
    type: String,
    default: '',
  },
  file: {
    type: Object,
    default: () => null,
  },
})
const emit = defineEmits(['update:file'])

const onFileUploaded = (file) => {
  emit('update:file', file)
}

const reUpload = () => {
  emit('update:file', null)
}
</script>

<template>
  <div id="">
    <CosUploader v-if="!file" :label="label" @file-uploaded="onFileUploaded" />
    <div v-if="file">
      {{ `${file.name}${file.ext}` }}
      <q-btn @click="reUpload">
        重新上传
      </q-btn>
    </div>
  </div>
</template>

<style scoped>
  /* @import url(); 引入公共css类 */
</style>
