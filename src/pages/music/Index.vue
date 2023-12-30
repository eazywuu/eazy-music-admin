<script setup>
import { onMounted, ref } from 'vue'
import { close, publish, search } from '../../api/music'
import { useToggleDialog } from '../../composables/useToggleDialog'
import { musicStatusColor, musicStatusType } from '../../utils/dict'
import notify from '../../utils/notify'
import CreateDialog from './CreateDialog.vue'

const columns = [
  {
    name: 'name',
    field: row => row.name,
    label: '音乐名',
    align: 'center',
  },
  {
    name: 'descrpiton',
    field: row => row.description,
    label: '简介',
    align: 'center',
  },
  {
    name: 'status',
    field: row => row.status,
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
  search(filter).then((musicList) => {
    rows.value = musicList.content
    pagination.value = {
      page: musicList.number + 1,
      rowsPerPage: musicList.size,
      rowsNumber: musicList.totalElements,
    }
  })
}

const rowData = ref(null)

const edit = (row) => {
  rowData.value = row
  showDialog()
}

const publishMusic = (id) => {
  publish(id).then(() => {
    notify.success('音乐上架成功！')
    fetchData()
  })
}

const closeMusic = (id) => {
  close(id).then(() => {
    notify.success('音乐下架成功！')
    fetchData()
  })
}

onMounted(() => fetchData({ pagination: pagination.value }))
</script>

<template>
  <div class="page">
    <div class="q-pa-md">
      <q-btn color="primary" label="添加歌曲" @click="showDialog" />
    </div>
    <div class="fit row no-warp justify-start items-center content-start q-pa-md">
      <q-input v-model="searchKey.name" dense label="音乐名" class="q-mr-md" />
      <q-btn color="primary" label="搜索" @click="fetchData" />
    </div>

    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        :rows="rows" :columns="columns" row-key="id"
        @request="fetchData"
      >
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="musicStatusColor[props.value]"
              :label="musicStatusType[props.value]"
              outline
            />
          </q-td>
        </template>
        <template #body-cell-opertation="data">
          <q-td :props="data">
            <div>
              <q-btn-dropdown size="sm" split color="primary" label="编辑" @click="edit(data.row)">
                <q-list>
                  <q-item v-if="data.row.status !== 'PUBLISHED'" v-close-popup clickable @click="publishMusic(data.row.id)">
                    <q-item-section>
                      <q-avatar icon="folder" text-color="green" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>上架</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="data.row.status === 'PUBLISHED'" v-close-popup clickable @click="closeMusic(data.row.id)">
                    <q-item-section avatar>
                      <q-avatar icon="assignment" color="secondary" text-color="red" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>下架</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
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
