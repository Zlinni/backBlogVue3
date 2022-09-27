<template>
    <Editor :value="value" @change="handleChange" />
</template>
  
<script setup lang="ts">
import { Editor, Viewer } from '@bytemd/vue-next'
// import gfm from '@bytemd/vue-next/dist'

// const plugins = [
    // gfm(),
    // Add more plugins here
// ]
let value = '';
const handleChange = (v) => {
    value = v
}
</script>