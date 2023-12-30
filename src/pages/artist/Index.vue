<script setup>
import { onMounted, ref } from 'vue'
import { search } from '../../api/artist'
import { useToggleDialog } from '../../composables/useToggleDialog'
import { artistStatusColor, artistStatusType } from '../../utils/dict'
import CreateDialog from './CreateDialog.vue'

const columns = [{
  name: 'name',
  field: row => row.name,
  label: '名称',
  align: 'center',
}, {
  name: 'remark',
  field: row => row.remark,
  label: '备注',
  align: 'center',
}, {
  name: 'photo',
  field: row => row.photo,
  label: '照片',
  align: 'center',
}, {
  name: 'status',
  field: row => row.status,
  label: '状态',
  align: 'center',
}, {
  name: 'opertation',
  field: row => row.opertation,
  label: '操作',
  align: 'center',
}]

const rows = ref([])

const { isShowDialog, showDialog, hideDialog } = useToggleDialog()

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
})

const searchKey = ref({ name: '' })

const fetchData = (props) => {
  const { page, rowsPerPage } = pagination.value || props.pagination
  const filter = {
    ...searchKey.value,
    page,
    size: rowsPerPage,
  }
  search(filter).then((artistList) => {
    rows.value = artistList.content
    pagination.value = {
      page: artistList.number + 1,
      rowsPerPage: artistList.size,
      rowsNumber: artistList.totalElements,
    }
  })
}

const rowData = ref(null)
const edit = (row) => {
  rowData.value = row
  showDialog()
}

onMounted(() => fetchData({ pagination: pagination.value }))
</script>

<template>
  <div class="page">
    <div class="q-pa-md">
      <q-btn color="primary" label="添加歌手" @click="showDialog" />
    </div>
    <div class="fit row no-warp justify-start items-center content-start q-pa-md">
      <q-input v-model="searchKey.name" dense label="歌手名" class="q-mr-md" />
      <q-btn color="primary" label="搜索" @click="fetchData" />
    </div>

    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="id">
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="artistStatusColor[props.value]"
              :label="artistStatusType[props.value]"
              outline
            />
          </q-td>
        </template>
        <template #body-cell-photo="data">
          <q-td :props="data">
            <q-avatar v-if="data.value" rounded>
              <img :src="data.value.url">
            </q-avatar>
          </q-td>
        </template>
        <template #body-cell-opertation="data">
          <q-td :props="data">
            <div>
              <q-btn-dropdown size="sm" split color="primary" label="编辑" @click="edit(data.row)" />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <CreateDialog
      v-if="isShowDialog"
      :data="rowData"
      @hide="hideDialog"
      @create-success="hideDialog(); fetchData()"
      @edit-success="hideDialog(); fetchData()"
    />
  </div>
</template>

<style scoped>
</style>
