<template>
    <div class="">
        <Editor :value="value" :plugins="plugins" :locale="zhHans" @change="handleChange" class=" h-screen" />
    </div>
</template>
  
<script setup lang="ts">
import 'bytemd/dist/index.min.css';
import 'juejin-markdown-themes/dist/channing-cyan.min.css'
import { Editor, Viewer } from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import { ref } from 'vue';

const plugins = [
    gfm(),
]
let value = ref<string>('');
const handleChange = (v: string) => {
    value.value = v
}
</script>

