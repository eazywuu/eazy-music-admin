# eazy music admin service

## 2022-12-06 Step 3
> **登录执行流程**：permission -> Login.@click -> store/user -> api/user -> api/request

[`api`]

1. 引入vuex做user状态管理 store/
2. 添加用户api接口 api/user.js
3. axios添加请求拦截器，发送请求时判断是否存在token，存在则放入header中一起发送 api/request.js

[`view`]

1. router beforeEach时，通过判断cookie中的token信息，进行初始化前的路由 permission.js
2. 添加登录逻辑 Login.vue

[`other`]

1. 引入js-cookie实现cookie控制，封装成工具类 utils/auth.js

## 2022-12-11 Step 4
1. 构建侧边栏和用户管理界面



