<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const leftDrawerOpen = ref(false)
const store = useStore

const nicknameFirstWord = computed(() => store.getters['user/nicknameFirstWord'])
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Title
        </q-toolbar-title>

        <q-avatar color="primary" text-color="white">
          {{ nicknameFirstWord }}
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container><router-view /></q-page-container>
  </q-layout>
</template>

<style scoped>
</style>
