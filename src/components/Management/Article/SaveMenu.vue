<template>
    <div class="transition-all h-full p-5">
        <div class="grid grid-cols-8 items-center mb-2 gap-2">
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <BookOpenIcon />
                </n-icon>
                <div class="text-lg dark:text-white">文章</div>
            </div>
            <div class="col-span-6">
                <n-input type="text" placeholder="请输入内容" v-model:value="formValue.title" clearable />
            </div>
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <TagIcon />
                </n-icon>
                <div class="text-lg dark:text-white">标签</div>
            </div>
            <div class="col-span-6">
                <n-select placeholder="请输入内容" v-model:value="formValue.tags" multiple :options="tagOptions" clearable />
            </div>
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <ListBulletIcon />
                </n-icon>
                <div class="text-lg dark:text-white">目录</div>
            </div>
            <div class="col-span-6">
                <n-select placeholder="请输入内容" v-model:value="formValue.categories" multiple :options="categoryOptions"
                    clearable />
            </div>
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <ClockIcon />
                </n-icon>
                <div class="text-lg dark:text-white">时间</div>
            </div>
            <div class="col-span-6">
                <n-date-picker v-model:formatted-value="formValue.date" value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime" placeholder="开始时间"  />
            </div>
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <LinkIcon />
                </n-icon>
                <div class="text-lg dark:text-white">链接</div>
            </div>
            <div class="col-span-6">
                <n-input type="text" v-model:value="formValue.abbrlink" readonly />
            </div>
            <div class="col-span-2 flex items-center pr-4 gap-2">
                <n-icon size="20" class="dark:text-white">
                    <PhotoIcon />
                </n-icon>
                <div class="text-lg dark:text-white">图片</div>
            </div>
            <div class="col-span-6">
                <n-input type="text" placeholder="请输入内容" v-model:value="formValue.cover" readonly />
            </div>
        </div>
        <div class="flex">
            <n-button type="default" @click="sendData" class="ml-auto">提交</n-button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { BookOpenIcon, TagIcon, ListBulletIcon, ClockIcon,LinkIcon,PhotoIcon } from '@heroicons/vue/24/outline/index'
import { onMounted, reactive, ref } from 'vue';
import { stringify } from 'yaml';
import { getCategories, getTags } from '../../../api/article';
import { isEmptyArray } from '../../../utils/Array';
// 挂载后做的事
onMounted(() => {
    const { title, categories, tags, date, abbrlink, cover } = props
    formValue.title = title;
    if (Array.isArray(categories)) {
        formValue.categories = [...categories]
    }
    if (Array.isArray(tags)) {
        formValue.tags = [...tags]
    }
    formValue.date = date;
    formValue.abbrlink = abbrlink;
    formValue.cover = cover;
})
// 定义接收触发的方法
const emits = defineEmits(['SaveData']);
const sendData = async () => {
    if(isEmptyArray(formValue.categories)){
        delete formValue.categories
    }
    if(isEmptyArray(formValue.tags)){
        delete formValue.tags
    }
    const text = stringify(formValue)
    emits('SaveData', text, formValue)
}
// 定义Props
interface Props {
    title: string;
    tags?: Array<string>;
    categories?: Array<string>;
    cover?: string;
    abbrlink?: number | string;
    date?: string | null;
    top?: number;
}
const props = withDefaults(defineProps<Props>(), {

})
// 因为有修改的操作所以多加了一层formValue实体
const formValue = reactive<Props>({
    title: '',
    categories: [],
    tags: [],
    date: null,
    abbrlink: '',
    cover: ''
})
interface Options {
    label?: string,
    value?: string,
    disabled?: boolean
}
let categoryOptions = ref<Options[]>([]);
let tagOptions = ref<Options[]>([]);
// 填充category和tag的option内容
const getDatas = async () => {
    try {
        let { data: categoryOptionsData } = await getCategories()
        categoryOptions.value = categoryOptionsData.data.map((item) => {
            return {
                label: item.name,
                value: item.name,
                disabled: false
            }
        })
        let { data: tagOptionsData } = await getTags()
        tagOptions.value = tagOptionsData.data.map((item) => {
            return {
                label: item.name,
                value: item.name,
                disabled: false
            }
        })
    } catch (error: any) {
        window.$message.warning(error.response.data.msg)
    }
}
getDatas()
</script>