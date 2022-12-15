<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import { menuRoutes } from '../router/index'

const route = useRoute()
const leftDrawerOpen = ref(false)
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

        <q-avatar color="teal" text-color="white">
          {{ nicknameFirstWord }}
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <div class="q-pa-md">
        <q-list padding class="rounded-borders text-primary">
          <q-item
            v-for="(menu, i) in menuRoutes"
            :key="i"
            v-ripple
            active-class="menu-active"
            :active="menu.name === route.name"
            :to="menu.path"
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="menu.meta.icon" />
            </q-item-section>

            <q-item-section>{{ menu.meta.title }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="less" scoped>
.menu-active{
  color: white;
  background: #2b88ec;
}
</style>
