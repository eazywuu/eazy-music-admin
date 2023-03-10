<script setup>
import { ref } from 'vue'
import { useUserSearch } from '../../composables/useUserSearch.js'
import { useToggleDialog } from '../../composables/useToggleDialog.js'
import CreateDialog from './CreateDialog.vue'

const columns = [
  {
    field: 'id',
    label: 'ID',
    style: 'width: 100px',
  },
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'nickname',
    label: '昵称',
  },
]
const isShowDialog = ref(false)

const { showDialog, hideDialog } = useToggleDialog(isShowDialog)
const {
  rows,
  fetchData,
} = useUserSearch()
</script>

<template>
  <div class="page">
    <div class="q-pa-md">
      <q-btn color="primary" label="添加用户" @click="showDialog" />
    </div>

    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
    <CreateDialog v-if="isShowDialog" @hide="hideDialog" @create-success="fetchData" />
  </div>
</template>

<style scoped>
  /* @import url(); 引入公共css类 */
</style>
