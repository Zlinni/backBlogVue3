<template>
    <div class="h-screen">
        <template v-if="!isEditor">
            <div>
                <div class="pl-5 border-b-2 border-gray-50 dark:border-dim-300 h-14 min-w-max flex items-center">
                    <n-h1 prefix="bar" class="mb-0" align-text type="info">
                        <n-text type="primary" class="text-black text-2xl font-semibold
                dark:text-white">
                            草稿管理
                        </n-text>
                    </n-h1>
                    <div class="ml-auto flex gap-2">
                        <n-button type="primary" size="large" class="text-black dark:text-white" @click="newPost">新建草稿
                        </n-button>
                        <n-button type="primary" size="large" class="text-black dark:text-white" @click="importPost">导入
                        </n-button>
                        <n-button type="default" size="large" class="text-black dark:text-white" @click="expandFn">
                            {{expandSearch?'收起':'展开'}}</n-button>
                    </div>
                </div>
                <!-- 展开折叠动画的一个小方案 -->
                <div class="overflow-hidden opacity-100 transition-all h-full p-5"
                    :class="{'opacity-0 h-0 p-0':!expandSearch}">
                    <div class="grid grid-cols-8 items-center mb-2 xs:gap-2">
                        <div class="xs:col-span-1 md:col-span-1 flex items-center ml-auto min-w-max pr-4 gap-2">
                            <n-icon size="20" class="dark:text-white">
                                <BookOpenIcon />
                            </n-icon>
                            <div class="text-lg dark:text-white">文章</div>
                        </div>
                        <div class="xs:col-span-7 md:col-span-3 ml-8">
                            <n-input type="text" placeholder="请输入内容" v-model:value="formValue.title" clearable />
                        </div>
                        <div class="xs:col-span-1 md:col-span-1 flex items-center ml-auto min-w-max pr-4 gap-2">
                            <n-icon size="20" class="dark:text-white">
                                <TagIcon />
                            </n-icon>
                            <div class="text-lg dark:text-white">标签</div>
                        </div>
                        <div class="xs:col-span-7 md:col-span-3 ml-8">
                            <n-select placeholder="请输入内容" v-model:value="formValue.tags" :options="tagOptions"
                                clearable />
                        </div>
                    </div>
                    <div class="grid grid-cols-8 items-center mb-2 xs:gap-2">
                        <div class="xs:col-span-1 md:col-span-1 flex items-center ml-auto min-w-max pr-4 gap-2">
                            <n-icon size="20" class="dark:text-white">
                                <ListBulletIcon />
                            </n-icon>
                            <div class="text-lg dark:text-white">目录</div>
                        </div>
                        <div class="xs:col-span-7 md:col-span-3 ml-8">
                            <n-select placeholder="请输入内容" v-model:value="formValue.categories"
                                :options="categoryOptions" clearable />
                        </div>
                        <div class="xs:col-span-1 md:col-span-1 flex items-center ml-auto min-w-max pr-4 gap-2">
                            <n-icon size="20" class="dark:text-white">
                                <ClockIcon />
                            </n-icon>
                            <div class="text-lg dark:text-white">时间</div>
                        </div>
                        <div class="xs:col-span-7 md:col-span-3 ml-8">
                            <n-date-picker v-model:value="formValue.date" type="daterange" clearable format="yyyy/MM/dd"
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
                    :page-count="paginationReactive.pageCount" :show-size-picker="activePagin"
                    :page-sizes="[10, 20, 30, 40]" :on-update:page="paginationReactive.onChange"
                    :on-update:page-size="paginationReactive.onUpdatePageSize" size="large" />
            </div>
        </template>
        <template v-else>
            <div class="pl-5 border-b-2 border-gray-50 dark:border-dim-300 h-14 min-w-max flex items-center">
                <!-- <div class="text-black text-2xl font-semibold
                dark:text-white">文章管理</div> -->
                <n-h1 prefix="bar" class="mb-0" align-text type="info">
                    <n-text type="primary" class="text-black text-2xl font-semibold
                dark:text-white" contenteditable @blur="setTitle">
                        {{textTitle}}
                    </n-text>
                </n-h1>
                <div class="ml-auto flex gap-2">
                    <n-button type="primary" size="large" class="text-black dark:text-white" @click="beforeSaveArticle">
                        保存
                    </n-button>
                    <n-button type="primary" size="large" class="text-black dark:text-white" @click="goBack">
                        返回</n-button>
                    <n-dropdown :options="dropdownOptions" placement="bottom-start" trigger="click">
                        <n-button type="primary" size="large" class="text-black dark:text-white">
                            操作</n-button>
                    </n-dropdown>
                    <n-button @click="testModify"></n-button>
                </div>
            </div>
            <MdEditor :textValue="textValue" @setMdText="setMdText"></MdEditor>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon, ArrowPathIcon, BookOpenIcon, TagIcon, ListBulletIcon, ClockIcon } from '@heroicons/vue/24/outline/index'
import { DataTableColumns, NButton, NTag, NTooltip, useDialog, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia';
import { reactive, h, ref, computed, ComputedRef, onMounted } from 'vue';
import ArticleDelete from '../Management/Article/Delete.vue'
import { addPost, deletePost, getCategories, GetListParams, getPost, getTags, modifyPost, outputPost, readPost } from '../../api/article';
import { useResize } from '../../store/useResize';
// TODO 好像太大了
import { parse, stringify } from 'yaml';
import dayjs from 'dayjs';
import SaveMenuVue from './Article/SaveMenu.vue';
import UploadVue from './Article/Upload.vue';
const testModify = () => {
    console.log(editor.isModify);
}
// 定义全局的消息提醒
window.$message = useMessage();
// 定义全局的弹出框
const dialog = useDialog();
// 分页器需要的rowKey
const rowKey = (row: Post.PostNoUrlToc) => row._id;
// 标题
let textTitle = ref<string>('')
// 定义编辑器实体
interface Editor {
    textValue: string,
    isAdd: boolean,
    isModify: boolean,
    _id: string
}
// TODO 后续替换
const editor = reactive<Editor>({
    textValue: '',
    // 打开编辑器其实就是进行了新增或者修改操作，可以加一个computed表示状态
    isAdd: false,
    isModify: false,
    _id: '',
})
// 编辑器的内容
let textValue = ref<string>('');
// 编辑器是否打开
let isEditor: ComputedRef<boolean> = computed(() => {
    return editor.isAdd || editor.isModify
});
// 设置loading
let loading = ref<boolean>(false);
// 动态表格高度 展开搜索 动态分页器显示
let { calHeightTable, expandSearch, activePagin } = storeToRefs(useResize())
// 表格行数据,标题操作等
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
                            quaternary: true,
                            onClick: async () => {
                                const _id = row._id
                                if (typeof _id === 'string') {
                                    try {
                                        loading.value = true;
                                        const { data } = await readPost({ _id })
                                        textValue.value = data.postMd;
                                        textTitle.value = data.data.title;
                                        loading.value = false;
                                        editor.isModify = true;
                                        editor._id = _id;
                                    } catch (error: any) {
                                        window.$message.warning(error.response.data.msg)
                                    }
                                }
                            }
                        },
                        { default: () => '修改' }
                    ),
                    h(
                        ArticleDelete, {
                        onDelete() {
                            deletePostFn(row._id)
                        }
                    }
                    ),
                    h(
                        NButton,
                        {
                            size: 'small',
                            class: "mr-2",
                            quaternary: true,
                            onClick: async () => {
                                outputPostFn(row._id)
                            }
                        },
                        { default: () => '导出' }
                    ),
                ]
                return actions;
            },
            ellipsis: {
                tooltip: true
            }
        },
    ]
// 文章数据
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
// 定义分页器实体
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
interface FormValue {
    title?: string,
    categories?: string,
    tags?: string,
    date?: [number, number] | null
}
const formValue = reactive<FormValue>({
    title: '',
    categories: '',
    tags: '',
    date: null
})
onMounted(() => {
    document.addEventListener('visibilitychange', function () {
        // 用户息屏、或者切到后台运行 （离开页面）
        // if (document.visibilityState === 'hidden') {
        //     console.log('hidden')
        // }
        // 用户打开或回到页面
        if (document.visibilityState === 'visible') {
            // console.log('visible');
            doSearch()
        }
    })
})
// 重置查询
const resetForm = () => {
    let key: keyof FormValue
    for (key in formValue) {
        if (key !== 'date') {
            formValue[key] = ''
        } else {
            formValue[key] = null
        }
    }
    doSearch()
}
// 回到文章管理
const goBack = (): void => {
    editor.isAdd = false
    editor.isModify = false
}
const apiGetPost = async () => {
    try {
        loading.value = true;
        const params: GetListParams = {
            page: paginationReactive.page,
            pageSize: paginationReactive.pageSize,
            ...formValue,
            //细节去除空格
            title: formValue.title?.trim(),
            date: formValue.date?.toString()
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
    paginationReactive.page = 1;
    paginationReactive.pageSize = 10
    apiGetPost()
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
    // TODO 直接在后续目录做好之后修改设置缓存是否过期
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
}
// 设置mdeditor的value 方法是暴露出去的
const setMdText = (val: any): void => {
    textValue.value = val;
}
//添加新文章
const newPost = (): void => {
    //重置id
    editor._id = '';
    //打开编辑器 打开状态栏
    textTitle.value = '请输入文章标题';
    textValue.value = `---
title: ${textTitle.value}
tags:
  - 面试
  - 前端
categories:
  - CSS系列
cover: ./img/css系列/flex布局.jpg
abbrlink: 1131280526
date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
---`;
    editor.isAdd = true;
};
//导入文章
const importPost = () => {
    // 导入是解析文本 相当于上传了一个文章
    // TODO
    dialog.info({
        title: '导入文章',
        content: () => {
            return [
                h(UploadVue)
            ]
        },
        positiveText: '关闭',
        onPositiveClick: () => {
            // goBack();
            doSearch()
        }
    })
};

//设置文章标题(最顶层) ts技巧
const setTitle = (e: Event) => {
    textTitle.value = (e.target as EventTarget)?.innerText;
}
//yaml转化正则
const yamlReg = /^(---)([\s\S]+?)(\1)$/gm;
//保存文章之前做的事情
const beforeSaveArticle = async () => {
    try {
        // TODO loading
        // setting是正则匹配了---之间的内容
        // setting需要用yaml转换为我们需要的对象数组
        const yamlText = yamlReg.exec(textValue.value)?.[2] || ''
        const setting = parse(yamlText)
        // 设置对话框
        dialog.info({
            title: '偏好设置',
            content: () => {
                return [
                    h(SaveMenuVue, {
                        async onSaveData(formValue: any) {
                            saveData(formValue)
                        },
                        // props数据
                        ...setting
                    })
                ]
            },
            positiveText: '关闭',
            onPositiveClick: () => {
                goBack();
                doSearch()
            }
        })
    } catch (error: any) {
        window.$message.warning(error.response.data.msg) || window.$message.warning(error)
    }
}
//删除文章
const deletePostFn = async (_id: string) => {
    try {
        loading.value = true;
        await deletePost({
            _id
        })
        loading.value = false;
        window.$message.success('删除成功')
        doSearch()
    } catch (error: any) {
        window.$message.warning(error.response.data.msg)
    }
}
// 导出文章
const outputPostFn = async (_id: string) => {
    if (typeof _id === 'string') {
        try {
            loading.value = true;
            // 写个踩坑记录好了
            // 获取到后端给来的数据 这里axios封装会踩坑
            const res = await outputPost({ _id })
            // 设置blobType
            const blobType = 'application/force-download'
            // 新建blob对象传入转换的数据
            const blobs = new Blob([res.data], { type: blobType })
            // 新建a标签
            const archor = document.createElement('a');
            // 创建a链接
            const href = window.URL.createObjectURL(blobs)
            // 解析content-disposition头 获取其中的已经编码的文件名
            const encodeFileName = res.headers['content-disposition'].replace(/[\s\S]+'([\s\S]+)/, (p0, p1) => p1);
            // 把文件名解码
            const fileName = decodeURIComponent(encodeFileName);
            // 设置a标签的href
            archor.setAttribute('href', href)
            // 设置文件名
            archor.setAttribute('download', fileName)//关键点4
            // 触发
            archor.click();
            // 释放掉href
            window.URL.revokeObjectURL(href);
            loading.value = false;
            window.$message.success('下载成功')
        } catch (error: any) {
            const errorMsg = error.response?.data?.msg ?? error
            window.$message.warning(errorMsg)
        }
    }
}
//是否禁止下拉
// let shouldShowDelete = computed<boolean>(() => {
//     console.log(!editor.isModify,'--------')
//     return !editor.isModify
// })

//操作下拉选项
const dropdownOptions = reactive([
    {
        label: '重置',
        key: 'reset',
        props: {
            onClick: () => {
                textValue.value = '';
            }
        }
    },
    {
        label: '导入文章',
        key: 'output',
        props: {
            onClick: () => {
                // dialog.info({

                // })
            }
        }
    },
    {
        label: '导出文章',
        key: 'output',
        props: {
            // 两个方案
            // 1. 直接导出当前文章，不保存到后台(√)
            // 2. 先保存后调用导出功能，但这样就会先弹出保存提示框，然后再导出 
            onClick: () => {
                let link = document.createElement('a')
                link.download = `${textTitle.value}.md`
                link.href = 'data:text/plain,' + textValue.value
                link.click()
            }
        }
    },
    {
        label: '删除文章',
        key: 'delete',
        props: {
            onClick: () => {
                deletePostFn(editor._id);
                goBack();
                doSearch();
            },
        },
        // disabled: shouldShowDelete.value
    }
])
//保存data 抽出来先后面说不定有用到
const saveData = async (formValue: any) => {
    const yamlForm = stringify(formValue);
    // 正则替换掉---中间内容
    textValue.value = textValue.value.replace(yamlReg, (p0, p1) => {
        return p1 + '\n' + yamlForm + p1
    })
    // 设置顶层文章标题
    textTitle.value = formValue.title;
    // 添加文章
    if (editor.isAdd) {
        try {
            loading.value = true;
            await addPost({
                textValue: textValue.value,
                textTitle: formValue.title,
                categories: formValue?.categories?.toString() ?? ''
            })
            loading.value = false;
            window.$message.success('添加成功')
        } catch (error: any) {
            console.log(error);
            window.$message.warning(error.response?.data.msg) || window.$message.warning(error)
        }
    } else {
        // 修改文章
        try {
            loading.value = true;
            await modifyPost({
                _id: editor._id,
                textValue: textValue.value,
                textTitle: formValue.title,
                categories: formValue?.categories?.toString() ?? ''
            })
            loading.value = false;
            window.$message.success('修改成功')
            editor._id = '';
        } catch (error: any) {
            window.$message.warning(error.response?.data.msg) || window.$message.warning(error)
        }
    }
};
</script>

<style scoped>
.tableHeight {
    height: calc(100% - 3.5rem - 50px);
    overflow-y: auto;
    overflow-x: hidden;
}
</style>