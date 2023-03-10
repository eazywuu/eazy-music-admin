import { computed, onMounted, ref } from 'vue'
import { search } from '../api/user'

export const useUserSearch = () => {
  const rows = ref([])
  const page = ref(0)
  const pagination = ref({
    page: 0,
    rowsPerPage: 0,
    rowsNumber: 0,
  })

  const fetchData = () => {
    search({ page: page.value }).then((data) => {
      rows.value = data.content
      pagination.value.page = data.number + 1
      pagination.value.rowsPerPage = data.size
      pagination.value.rowsNumber = data.totalElements
    })
  }
  const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage) + 1)

  onMounted(fetchData)

  return {
    rows,
    pagination,
    fetchData,
    pagesNumber,
  }
}
