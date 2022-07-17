<template>
    <div class="common-layout">
        <el-container>
            <el-header></el-header>
            <el-container>
                <el-aside width = "500px">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                    >
                        <el-menu-item index="1">输入视频</el-menu-item>
                        <el-menu-item index="2">输出视频</el-menu-item>
                        <!-- <div class="flex-grow" /> -->
                        <!-- <el-menu-item index="3">Processing Center</el-menu-item> -->
                        <el-upload
                            v-model:file-list="fileList"
                            class="upload-demo"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            multiple
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="3"
                            :on-exceed="handleExceed"
                        >
                            <el-button type="primary">上传视频</el-button>
                        </el-upload>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div style="margin: 20px" />
                    <el-form
                        :label-position="labelPosition"
                        label-width="100px"
                        :model="formLabelAlign"
                        style="max-width: 860px"
                    >
                        <el-form-item label="描述语句">
                        <el-input v-model="formLabelAlign.name" />
                        </el-form-item>
                        <el-form-item label="阈值">
                        <el-input 
                            v-model="formLabelAlign.type"
                            placeholder="相似度阈值，默认0.1，越小越相似，结果越精确，视频片段越短" />
                        </el-form-item>
                        <!-- <el-button type="primary" @click="submitForm">搜索 -->
                        <el-button type="primary" size="large">
                            搜索
                        </el-button>
                    </el-form>
                    <div style="margin: 30px" />
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>silde down</span>
                                <el-cascader v-model="value" :options="options" @change="handleChange" />
                            </div>
                        </template>
                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const input = ref('')
const activeIndex = ref('1')
// const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const labelPosition = ref('right')
const formLabelAlign = reactive({
  name: '',
  type: '',
})
const value = ref([])
const options = []
const handleChange = (value) => {
  console.log(value)
}

import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}


// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log('submit!')
//     } else {
//       console.log('error submit!', fields)
//     }
//   })
// }

</script>

<style scoped>
.el-container {
    height: 100%;
    width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-grow {
  flex-grow: 1;
}
</style>
