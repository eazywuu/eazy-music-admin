import COS from 'cos-js-sdk-v5'
import { createUploaderComponent } from 'quasar'
import { ref } from 'vue'
import md5 from 'md5'
import { useStore } from 'vuex'
import { finishUpload, initUpload } from '../api/file.js'

export default createUploaderComponent({
  // defining the QUploader plugin here

  name: 'CosUploader', // your component's name

  props: {
    // ...your custom props
  },

  emits: ['file-uploaded'],

  injectPlugin({ emit, helpers }) {
    const fileId = ref('')

    /**
     * 初始化Cos客户端
     */
    const initCosClient = () => {
      return new COS({
        getAuthorization: (options, callback) => {
          const file = helpers.queuedFiles.value[0]

          const uploadFile = {
            name: file.name.substring(0, file.name.lastIndexOf('.')),
            size: file.size,
            key: md5(file.__key),
            ext: file.name.substring(file.name.lastIndexOf('.')),
          }
          /**
           * 文件上传起步，获取文件信息
           */
          initUpload(uploadFile).then((res) => {
            fileId.value = res.fileId
            /**
             * TODO 搞清楚
             */
            callback({
              TmpSecretId: res.secretId,
              TmpSecretKey: res.secretKey,
              SecurityToken: res.sessionToken,
              StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: res.expiredTime,
              ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            })
          })
        },
      })
    }

    const cos = initCosClient()
    const store = useStore()
    const bucket = store.getters['setting/bucket']
    const region = store.getters['setting/region']
    // can call any other composables here
    // as this function will run in the component's setup()

    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = ref(false)
    const isBusy = ref(false)

    const taskId = ref('')

    const uploadFiles = () => {
      const file = helpers.queuedFiles.value[0]

      /**
       * 准备就绪，真实的上传文件到对象存储
       */
      cos.uploadFile({
        Bucket: bucket,
        Region: region,
        Key: md5(file.__key),
        Body: file,
        SliceSize: 1024 * 1024 * 10,
        onTaskReady(id) {
          taskId.value = id
        },

        onProgress(progressData) {
          isBusy.value = false
          isUploading.value = true
          helpers.updateFileStatus(file, 'uploading', progressData.loaded)
        },

        /**
         * 上传完成，后续工作
         */
        onFileFinish: () => {
          finishUpload(fileId.value).then((uploadedFile) => {
            helpers.updateFileStatus(file, 'uploaded', file.size)
            helpers.uploadedFiles.value = [file]
            helpers.uploadedSize.value = file.size
            helpers.queuedFiles.value = []
            isUploading.value = false
            helpers.updateFileStatus(file, 'uploaded')
            emit('file-uploaded', uploadedFile)
          })
        },
      })
    }
    /**
     * 启动文件上传
     */
    const upload = () => {
      // cos 上传
      uploadFiles()
      isUploading.value = true
    }

    return {
      isUploading,
      upload,
    }
  },
})
