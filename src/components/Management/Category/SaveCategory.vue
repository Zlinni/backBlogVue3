<template>
    <div class="transition-all h-full p-5">
        <div class="grid grid-cols-8 items-center mb-2 gap-2">
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <BookOpenIcon />
                </n-icon>
                <div class="text-lg dark:text-white">目录</div>
            </div>
            <div class="col-span-6">
                <n-input type="text" placeholder="请输入内容" v-model:value="formValue.name" clearable />
            </div>
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <EyeDropperIcon />
                </n-icon>
                <div class="text-lg dark:text-white">颜色</div>
            </div>
            <div class="col-span-6">
                <n-color-picker v-model:value="formValue.color" :show-alpha="false" />
            </div>
        </div>
        <div class="flex">
            <n-button type="default" @click="emits('SaveData', formValue)" class="ml-auto">提交</n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { BookOpenIcon, EyeDropperIcon } from '@heroicons/vue/24/outline/index'
import { onMounted, reactive,defineEmits } from 'vue';
// 挂载后做的事
onMounted(() => {
    const { name,color } = props
    formValue.name = name;
    formValue.color = color;
})
// 定义接收触发的方法
const emits = defineEmits(['SaveData']);
// 定义Props
interface Props {
    name?:string,
    color?:string
}
const props = withDefaults(defineProps<Props>(), {
})
// 因为有修改的操作所以多加了一层formValue实体
const formValue = reactive<Props>({
    name:'',
    color:''
})
</script>