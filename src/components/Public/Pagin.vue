<template>
    <n-pagination v-model:page="page" v-model:page-size="pageSize" :page-count="100" show-size-picker
        :page-sizes="[10, 20, 30, 40]" />
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
let page = ref<number>(1);
let pageSize = ref<number>(20)
</script>