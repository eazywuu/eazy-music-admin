<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()

const nickname = computed(() => store.state.user.nickname)
</script>

<template>
  <div>{{ nickname }}</div>
</template>
