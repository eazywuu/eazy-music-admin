<script setup>
import { onMounted, ref } from 'vue'
import { search } from '../../api/music'
import CreateDialog from './CreateDialog.vue'
import UpdateDialog from './UpdateDialog.vue'

const columns = [
  {
    field: 'name',
    label: '音乐名',
    align: 'center',
  },
  {
    field: 'description',
    label: '简介',
    align: 'center',
  },
  {
    field: 'status',
    label: '上架状态',
    align: 'center',
  },
  {
    name: 'opertation',
    field: row => row.opertation,
    label: '操作',
    align: 'center',
  },
]

const isShowDialog = ref(false)

const rows = ref([])

const showDialog = () => isShowDialog.value = true
const hideDialog = () => isShowDialog.value = false

const fetchData = () => {
  search().then((musicList) => {
    rows.value = musicList.content
  })
}

const edit = (id, data) => {
  console.table(id, data)
}

onMounted(fetchData)
</script>

<template>
  <div class="page">
    <div class="q-pa-md">
      <q-btn color="primary" label="添加歌曲" @click="showDialog" />
    </div>

    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="id">
        <template #body-cell-opertation="props">
          <q-td :props="props">
            <div>
              <q-btn flat color="primary" label="编辑" @click="edit(props.key, props.row)" />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <CreateDialog v-if="isShowDialog" @hide="hideDialog" @create-success="fetchData" />
    <!-- <UpdateDialog /> -->
  </div>
</template>

<style scoped>
</style>
