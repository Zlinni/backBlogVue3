<template>
    <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5"
        @before-upload="beforeUpload">
        <n-upload-dragger>
            <div class="mb-3">
                <n-icon size="48" :depth="3">
                    <ArchiveBoxArrowDownIcon />
                </n-icon>
            </div>
            <n-text>
                点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" class="ml-2">
                只能上传MarkDown格式文件
            </n-p>
        </n-upload-dragger>
    </n-upload>
</template>


<script lang="ts" setup>
import {ArchiveBoxArrowDownIcon} from '@heroicons/vue/20/solid'
import type { UploadFileInfo } from 'naive-ui'
// 限制上传
const beforeUpload = (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
}) => {
    console.log(data);
    if (data.file.file?.name.slice(-2) !== 'md') {
        // console.log('只能上传md格式的图片文件，请重新上传');
        window.$message.warning('只能上传md格式的图片文件，请重新上传');
        return false
    }
    return true
}
</script>