<template>
    <div class="h-screen">
        <!-- <Editor :value="value" :plugins="plugins" :locale="zhHans" @change="handleChange" /> -->
        <Viewer class="h-screen bg-white overflow-auto" :tabindex="2" :sanitize="23" :value="value" :plugins="plugins"
            :locale="zhHans"></Viewer>
    </div>
</template>
  
<script setup lang="ts">
import 'bytemd/dist/index.min.css';
import 'juejin-markdown-themes/dist/cyanosis.min.css'
import { Editor, Viewer } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import math from '@bytemd/plugin-math'
import breaks from '@bytemd/plugin-breaks'
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { readPost } from '../../api/article';
const route = useRoute();
onMounted(async () => {
    if (route.query) {
        const { abbrlink } = route.query;
        if (typeof abbrlink === 'string') {
            try {
                const { data } = await readPost({abbrlink})
                value.value = data.postMd;
            } catch (error:any) {
                window.$message.warning(error.response.data.msg)
            }
        }
    }
})
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
let value = ref<string>("");
const handleChange = (v: string) => {
    value.value = v
}
</script>

<style lang="scss">
.bytemd {
    height: 100vh
}
</style>

