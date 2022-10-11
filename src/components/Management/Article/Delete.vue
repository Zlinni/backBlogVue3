<template>
    <n-tooltip placement="bottom" :show="showPopover">
        <template #trigger>
            <n-button quaternary size="small" @click="showPopover = true">删除</n-button>
        </template>
        <div class="flex flex-col w-30 gap-y-3">
            <span>{{props.infoMsg}}</span>
            <div class="ml-auto">
                <n-button type="error" strong secondary size="small" @click="deletePostBtn"> 确认 </n-button>
            </div>
        </div>
    </n-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// 定义接收触发事件
const emit = defineEmits(['delete'])
// 定义关闭按钮
let showPopover = ref<boolean>(false);
// 删除按钮
const deletePostBtn = async () => {
    emit('delete');
    showPopover.value = false
}
interface Props {
    infoMsg?:string
}
const props = withDefaults(defineProps<Props>(),{
    infoMsg:'确认删除？？'
})
</script>