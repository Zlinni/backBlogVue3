<template>
    <div>
        <div class="px-5 border-b-2 border-gray-50 dark:border-dim-300 h-14 min-w-max flex items-center">
            <!-- <div class="text-black text-2xl font-semibold
        dark:text-white">文章管理</div> -->
            <n-h1 prefix="bar" class="mb-0" align-text type="info">
                <n-text type="primary" class="text-black text-2xl font-semibold
        dark:text-white">
                    文章管理
                </n-text>
            </n-h1>
            <div class="ml-auto flex gap-2">
                <n-button type="primary" size="large" class="text-black dark:text-white">新建文章</n-button>
                <n-button type="default" size="large" class="text-black dark:text-white"
                    @click="expandSearch=!expandSearch">{{expandSearch?'收起':'展开'}}</n-button>
            </div>
        </div>
        <!-- 展开折叠动画的一个小方案 -->
        <div class="overflow-hidden opacity-100 transition-all h-full p-5" :class="{'opacity-0 h-0 p-0':!expandSearch}">
            <div class="grid grid-cols-8 items-center mb-2 xs:gap-2">
                <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                    <n-icon size="20" class="dark:text-white">
                        <BookOpenIcon />
                    </n-icon>
                    <div class="text-lg dark:text-white">文章</div>
                </div>
                <div class="xs:col-span-6 md:col-span-3">
                    <n-input type="text" placeholder="请输入内容" v-model="formValue.title" />
                </div>
                <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                    <n-icon size="20" class="dark:text-white">
                        <TagIcon />
                    </n-icon>
                    <div class="text-lg dark:text-white">标签</div>
                </div>
                <div class="xs:col-span-6 md:col-span-3">
                    <n-input type="text" placeholder="请输入内容" v-model="formValue.tags" />
                </div>
            </div>
            <div class="grid grid-cols-8 items-center mb-2 xs:gap-2">
                <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                    <n-icon size="20" class="dark:text-white">
                        <ListBulletIcon />
                    </n-icon>
                    <div class="text-lg dark:text-white">目录</div>
                </div>
                <div class="xs:col-span-6 md:col-span-3">
                    <n-input type="text" placeholder="请输入内容" v-model="formValue.categories" />
                </div>
                <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                    <n-icon size="20" class="dark:text-white">
                        <ClockIcon />
                    </n-icon>
                    <div class="text-lg dark:text-white">时间</div>
                </div>
                <div class="xs:col-span-6 md:col-span-3">
                    <n-date-picker v-model:value="formValue.date" type="daterange" clearable />
                </div>
            </div>
            <div class="flex">
                <div class="flex gap-2 ml-auto">
                    <n-button type="primary" class="text-black dark:text-white" @click="doSearch">
                        <template #icon>
                            <MagnifyingGlassIcon />
                        </template>
                        查询
                    </n-button>
                    <n-button type="default" class="text-black dark:text-white">
                        <template #icon>
                            <ArrowPathIcon />
                        </template>
                        重置
                    </n-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon, ArrowPathIcon, BookOpenIcon, TagIcon, ListBulletIcon, ClockIcon } from '@heroicons/vue/24/outline/index'
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { useResize } from '../../store/useResize';
let { expandSearch } = storeToRefs(useResize());
interface FormValue {
    title: string,
    categories: string,
    tags: string,
    date: [number, number]
}
const formValue = reactive<FormValue>({
    title: '',
    categories: '',
    tags: '',
    date: [1183135260000, Date.now()]
})
const doSearch = () => {

}
</script>