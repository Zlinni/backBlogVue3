<template>
    <Editor :value="props.textValue" :plugins="plugins" :locale="zhHans" @change="handleChange" />
</template>
  
<script setup lang="ts">
import 'bytemd/dist/index.min.css';
import 'juejin-markdown-themes/dist/cyanosis.min.css'
import { Editor } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import math from '@bytemd/plugin-math'
import breaks from '@bytemd/plugin-breaks'
import { withDefaults } from 'vue';
import { useRoute } from 'vue-router';
// 定义接收触发的函数
const emits = defineEmits(['setMdText'])
// 定义editor接收的参数props
interface MdEditorProp {
    textValue: string;
}
const props = withDefaults(defineProps<MdEditorProp>(), {
    textValue: ''
});
// 定义editor的插件
const plugins = [
    gfm({
        locale: {
            strike: "删除线",
            strikeText: "文本",
            table: "表格",
            tableHeading: "标题",
            task: "任务列表",
            taskText: "待办事项",
        },
    }),
    highlight(),
    frontmatter(),
    math(),
    breaks()
]
// 更新内容触发回调
const handleChange = (v: string) => {
    emits('setMdText', v)
}
</script>

<style lang="scss">
.bytemd {
    height: calc(100vh - 65px)
}
</style>

