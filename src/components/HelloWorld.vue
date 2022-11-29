<script setup>
import { ref } from 'vue'
import { sayHello } from '../api/hello'

const count = ref(0)
const message = ref('eazy-music backstage')

const hi = () => {
  sayHello().then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <h1>{{ message }}</h1>
  <div class="button-container">
    <q-btn color="primary" @click="count++">
      click {{ count }}
    </q-btn>
    <br>
    <br>
    <q-btn color="primary" @click="hi">
      发起请求！
    </q-btn>
  </div>
</template>

<style scoped>
/* .button-container{

} */
</style>
