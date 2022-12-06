<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
const back = () => {
  router.back()
}
const home = () => {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <div class="error-code">
      404
    </div>
    <div class="tips">
      抱歉，你访问的页面不存在！
    </div>
    <div class="action-area">
      <q-btn color="primary" label="返回" @click="back" />
      <q-btn color="primary" label="首页" outline @click="home" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error-code {
    font-size: 300px;
    line-height: 350px;
  }
  .tips {
    color:#999999;
    margin-bottom: 40px;
  }
  .action-area {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
