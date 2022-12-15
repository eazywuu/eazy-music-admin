<script setup>
import { computed, ref } from 'vue'
import store from '../../store'
const columns = [
  {
    name: 'id',
    label: 'ID',
    style: 'width: 100px',
  },
  {
    name: 'username',
    label: '用户名',
  },
  {
    name: 'nickname',
    label: '昵称',
  },
  {
    name: 'gender',
    label: '性别',
  },
]
const rows = []
const page = ref(1)
const fetchData = () => store.dispatch('user/search', { page })
fetchData()
const pagination = ref({
  page: 2,
  rowsPerPage: 3,
})
const pagesNumber = computed(() => Math.ceil(rows.length, pagination.value.rowsPerPage))
</script>

<template>
  <div class="page">
    <div class="q-pa-md">
      <q-btn color="primary" label="添加用户" />
    </div>

    <div class="q-pa-md">
      <q-table
        :columns="columns"
        row-key="name"
        hide-pagination
      />
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
        :max-pages="5"
      />
    </div>
  </div>
</template>

<style scoped>
  /* @import url(); 引入公共css类 */
</style>
