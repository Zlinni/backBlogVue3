<template>
    <div class="h-screen">
        <!-- <Search /> -->
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
                    <n-button type="primary" size="large" class="text-black dark:text-white">导入</n-button>
                    <n-button type="default" size="large" class="text-black dark:text-white" @click="expandFn">
                        {{expandSearch?'收起':'展开'}}</n-button>
                </div>
            </div>
            <!-- 展开折叠动画的一个小方案 -->
            <div class="overflow-hidden opacity-100 transition-all h-full p-5"
                :class="{'opacity-0 h-0 p-0':!expandSearch}">
                <div class="grid grid-cols-8 items-center mb-2 xs:gap-2">
                    <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                        <n-icon size="20" class="dark:text-white">
                            <BookOpenIcon />
                        </n-icon>
                        <div class="text-lg dark:text-white">文章</div>
                    </div>
                    <div class="xs:col-span-6 md:col-span-3">
                        <n-input type="text" placeholder="请输入内容" v-model:value="formValue.postName" clearable />
                    </div>
                    <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                        <n-icon size="20" class="dark:text-white">
                            <TagIcon />
                        </n-icon>
                        <div class="text-lg dark:text-white">标签</div>
                    </div>
                    <div class="xs:col-span-6 md:col-span-3">
                        <n-select placeholder="请输入内容" v-model:value="formValue.tagName" :options="tagOptions"
                            clearable />
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
                        <n-select placeholder="请输入内容" v-model:value="formValue.categoryName" :options="categoryOptions"
                            clearable />
                    </div>
                    <div class="xs:col-span-2 md:col-span-1 flex items-center pr-4 gap-2">
                        <n-icon size="20" class="dark:text-white">
                            <ClockIcon />
                        </n-icon>
                        <div class="text-lg dark:text-white">时间</div>
                    </div>
                    <div class="xs:col-span-6 md:col-span-3">
                        <n-date-picker v-model:value="formValue.range" type="daterange" clearable format="yyyy/MM/dd"
                            start-placeholder="开始时间" end-placeholder="结束时间" />
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
                        <n-button type="default" class="text-black dark:text-white" @click="resetForm">
                            <template #icon>
                                <ArrowPathIcon />
                            </template>
                            重置
                        </n-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 这个组件带了分页器，需要设置row-key 异步的时候需要设置remote -->
        <n-data-table class="mb-2" :min-height="300" :max-height="calHeightTable" striped :columns="columns"
            :data="postData" size="large" :row-key="rowKey" :loading="loading" remote />
        <div class="ml-auto w-max">
            <n-pagination v-model:page="paginationReactive.page" v-model:page-size="paginationReactive.pageSize"
                :page-count="paginationReactive.pageCount" show-size-picker :page-sizes="[10, 20, 30, 40]"
                :on-update:page="paginationReactive.onChange" :on-update:page-size="paginationReactive.onUpdatePageSize"
                size="large" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon, ArrowPathIcon, BookOpenIcon, TagIcon, ListBulletIcon, ClockIcon } from '@heroicons/vue/24/outline/index'
import { DataTableColumns, NButton, NTag, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia';
import { reactive, h, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCategories, GetListParams, getPost, getTags, readPost } from '../../api/article';
import { useResize } from '../../store/useResize';
// import Search from '../Public/Search.vue'
const rowKey = (row: Post.PostNoUrlToc) => row._id;
const router = useRouter();
window.$message = useMessage();
interface Viewer {
    open:boolean,
    value:string
}
const viewer = reactive<Viewer>({
    open:false,
    value:''
})
// 表格数据
const columns: DataTableColumns<Post.PostNoUrlToc> =
    [
        {
            type: 'selection'
        },
        {
            title: '标题',
            key: 'title',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '标签',
            key: 'tags',
            render(row) {
                const tags = row.tags.map((tagKey) => {
                    return h(
                        NTag,
                        {
                            style: {
                                marginRight: '6px'
                            },
                            type: 'info',
                            bordered: false
                        },
                        {
                            default: () => tagKey.name
                        }
                    )
                })
                return tags
            },
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '目录',
            key: 'categories',
            render(row) {
                const categories = row.categories.map((categoriesKey) => {
                    return h(
                        NTag,
                        {
                            style: {
                                marginRight: '6px'
                            },
                            type: 'info',
                            bordered: false
                        },
                        {
                            default: () => categoriesKey.name
                        }
                    )
                })
                return categories
            },
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '创建时间',
            key: 'date',
            render(row) {
                return new Date(row.date).toLocaleString()
            },
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '操作',
            key: 'actions',
            render(row) {
                //修改和删除
                const actions = [
                    h(
                        NButton,
                        {

                            size: 'small',
                            class: "mr-2",
                            onClick: async() => {
                                debugger;
                                //打开Viewer预览
                                router.push({path:'/draft',query:{abbrlink:row.abbrlink}});
                             }
                        },
                        { default: () => '修改' }
                    ),
                    h(
                        NButton,
                        {

                            size: 'small',
                            class: "mr-2",
                            onClick: () => { alert(row.intro) }
                        },
                        { default: () => '删除' }
                    )
                ]
                return actions;
            },
            // ellipsis: {
            //     tooltip: true
            // }

        },
    ]
let postData = ref<Post.PostNoUrlToc[]>([])
interface Pagination {
    page: number,
    pageSize: number,
    showSizePicker: boolean,
    pageSizes: [number, number, number],
    pageCount: number,
    onChange: (page: number) => void,
    onUpdatePageSize: (pageSize: number) => void
}
const paginationReactive = reactive<Pagination>({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [5, 10, 20],
    pageCount: 12,
    onChange: (page: number) => {
        paginationReactive.page = page
        apiGetPost()
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
        apiGetPost()
    }
})
let { calHeightTable, expandSearch } = storeToRefs(useResize())
interface FormValue {
    postName?: string,
    categoryName?: string,
    tagName?: string,
    range?: [number, number] | null
}
const formValue = reactive<FormValue>({
    postName: '',
    categoryName: '',
    tagName: '',
    range: null
})

const resetForm = () => {
    let key: keyof FormValue
    for (key in formValue) {
        if (key !== 'range') {
            formValue[key] = ''
        } else {
            formValue[key] = null
        }
    }
    apiGetPost()
}
let loading = ref<boolean>(false);
const apiGetPost = async (resetPage?: number, resetPageSize?: number) => {
    try {
        loading.value = true;
        const params: GetListParams = {
            page: resetPage || paginationReactive.page,
            pageSize: resetPageSize || paginationReactive.pageSize,
            ...formValue,
            //细节去除空格
            postName: formValue.postName?.trim(),
            range: formValue.range?.toString()
        }
        const apiPost = await getPost(params);
        paginationReactive.pageCount = apiPost.data.totalPage;
        postData.value = apiPost.data.data
        loading.value = false;
    } catch (error: any) {
        window.$message.warning(error.response.data.msg)
        postData.value = []
        loading.value = false;
    }
}
apiGetPost()
//细节重置搜索
const doSearch = (): void => {
    apiGetPost(1, 10)
}
interface Options {
    label?: string,
    value?: string,
    disabled?: boolean
}
let categoryOptions = ref<Options[]>([]);
let tagOptions = ref<Options[]>([]);
// 控制展开收缩的function
const expandFn = async () => {
    // TODO 考虑是否需要返回data.data 
    expandSearch.value = !expandSearch.value;
    // 做个缓存优化 但是问题也是有的 如果资源发生了改变local通知不到
    if (localStorage.getItem('categoryOptionsData') && localStorage.getItem('tagOptionsData')) {
        categoryOptions.value = JSON.parse(localStorage.getItem('categoryOptionsData') as string)
        tagOptions.value = JSON.parse(localStorage.getItem('tagOptionsData') as string)
    } else {
        try {
            let { data: categoryOptionsData } = await getCategories()
            categoryOptions.value = categoryOptionsData.data.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                    disabled: false
                }
            })
            localStorage.setItem('categoryOptionsData', JSON.stringify(categoryOptions.value))
            let { data: tagOptionsData } = await getTags()
            tagOptions.value = tagOptionsData.data.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                    disabled: false
                }
            })
            localStorage.setItem('tagOptionsData', JSON.stringify(tagOptions.value))
        } catch (error: any) {
            window.$message.warning(error.response.data.msg)
        }
    }
    // for (const item of categoryOptionsData) {

    // }

    // let {data:tagOptionsData} = await getTags()
    // tagOptions = tagOptionsData;

}
</script>

<style scoped>
.tableHeight {
    height: calc(100% - 3.5rem - 50px);
    overflow-y: auto;
    overflow-x: hidden;
}
</style>