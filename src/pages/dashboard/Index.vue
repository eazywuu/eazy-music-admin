<script setup>
import { computed } from 'vue'
import store from '../../store'

const nickname = computed(() => store.state.user.nickname)
</script>

<template>
  <div>{{ nickname }}</div>
</template>
