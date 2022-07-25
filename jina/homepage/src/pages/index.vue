<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="500px">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :limit="3"
            :on-exceed="handleExceed"
            :show-file-list="false"
            multiple
          >
            <el-button type="primary">上传视频</el-button>
          </el-upload>
          <el-tabs
            v-model="activeIndex"
            class="demo-tabs"
            @tab-click="handleSelect"
          >
            <el-tab-pane label="原视频" name="1">
              <el-table
                :data="fileList"
                :show-header="false"
                style="width: 100%"
              >
                <el-table-column prop="name" label="Name" />
                <el-table-column align="right" label="Operations">
                  <template #default="scope">
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="handleDownload(scope.row.name)"
                      >下载</el-button
                    >
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="handleView(scope.row.name)"
                      >预览</el-button
                    >
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="handleDelete(scope.row.name)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="输出视频" name="2"></el-tab-pane>
          </el-tabs>
          <!-- <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">输入视频</el-menu-item>
            <el-menu-item index="2">输出视频</el-menu-item>
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="uploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="3"
              :on-exceed="handleExceed"
              multiple
            >
              <el-button type="primary">上传视频</el-button>
            </el-upload>
          </el-menu>
           -->
        </el-aside>
        <el-main>
          <div style="margin: 20px" />
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 860px"
          >
            <!-- <el-form-item label="描述语句">
              <el-input v-model="formLabelAlign.name" />
            </el-form-item> -->
            <el-form-item label="描述语句">
              <el-select
                v-model="descList"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="请输入关键词"
                clearable
              >
              </el-select>
            </el-form-item>

            <el-form-item label="阈值">
              <el-input
                v-model="formLabelAlign.type"
                placeholder="相似度阈值，默认0.1，越小越相似，结果越精确，视频片段越短"
              />
            </el-form-item>
            <!-- <el-button type="primary" @click="submitForm">搜索 -->
            <el-button type="primary" size="large" @click="submitForm">
              搜索
            </el-button>
          </el-form>
          <div style="margin: 30px" />
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>silde down</span>
                <el-cascader
                  v-model="filteredVideo"
                  :options="options"
                  @change="handleChange"
                />
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance, ElSelect } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";

// el-tabs
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// el-form
const labelPosition = ref("right");
const formLabelAlign = reactive({
  name: "",
  type: "",
});

// el-cascader
const options = [];
const handleChange = (value) => {
  console.log(value);
};

// el-upload
const uploadUrl = ref<string>(""); // upload url
const fileList = ref<UploadUserFile[]>([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};
const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  fileList.value.forEach((item) => {
    if (item.name === rawFile.name) {
      ElMessage.warning("这个文件已经上传过了哦!");
    }
  });
};

// el-table TODO: 视频下载、预览、删除
const handleDownload = (item: string) => {
  const a = document.createElement("a");
  // a.href = `${baseURLHost}/videos/${getUid()}/${item}`;
  a.download = item;
  a.click();
};
const handleView = (item: string) => {
  // window.open("src/assets/xxx.mp4");
};
const handleDelete = (item: string) => {
  ElMessageBox.confirm("删除后不可恢复哦，您确定要删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    callback: (action) => {
      if (action === "confirm") {
        // axios.delete
        // descList中删除
        ElMessage({
          type: "success",
          message: "成功删除",
        });
      } else {
        ElMessage({
          type: "info",
          message: "取消删除",
        });
      }
    },
  });
};

// 表单提交
const descList = ref<Array<string>>([]);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  // 校验输入
  if (descList.value.length === 0) {
    ElMessage.warning("请先输入描述语句哦~");
    return;
  }
  if (formLabelAlign.type !== "") {
    const threshold = Number(formLabelAlign.type);
    if (isNaN(threshold) || threshold < 0 || threshold > 1) {
      ElMessage.warning("阈值必须是[0, 1]的小数哦~");
      return;
    }
  }
};

// el-card
const filteredVideo = ref("");
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
