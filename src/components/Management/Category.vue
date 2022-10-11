<template>
    <div class="h-screen">
        <div>
            <div class="pl-5 border-b-2 border-gray-50 dark:border-dim-300 h-14 min-w-max flex items-center">
                <n-h1 prefix="bar" class="mb-0" align-text type="info">
                    <n-text type="primary" class="text-black text-2xl font-semibold
                dark:text-white">
                        目录管理
                    </n-text>
                </n-h1>
                <div class="ml-auto flex gap-2">
                    <n-button type="primary" size="large" class="text-black dark:text-white"
                        @click="newCategory('add')">新建目录
                    </n-button>
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
                        <div class="text-lg dark:text-white">目录</div>
                    </div>
                    <div class="xs:col-span-7 md:col-span-auto ml-8">
                        <n-input type="text" placeholder="请输入内容" v-model:value="formValue.searchText" clearable />
                    </div>
                    <div class="flex gap-2 md:col-span-auto">
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
            :data="categoryData" size="large" :row-key="rowKey" :loading="loading" remote />
        <div class="ml-auto w-max">
            <n-pagination v-model:page="paginationReactive.page" v-model:page-size="paginationReactive.pageSize"
                :page-count="paginationReactive.pageCount" :show-size-picker="activePagin"
                :page-sizes="[10, 20, 30, 40]" :on-update:page="paginationReactive.onChange"
                :on-update:page-size="paginationReactive.onUpdatePageSize" size="large" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon, ArrowPathIcon, BookOpenIcon, TagIcon, ListBulletIcon, ClockIcon } from '@heroicons/vue/24/outline/index'
import { DataTableColumns, NButton, NTag, useDialog, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia';
import { reactive, h, ref, computed, ComputedRef, onMounted } from 'vue';
import ArticleDelete from '../Management/Article/Delete.vue'
import { addPost, deletePost, getTags, modifyPost, outputPost, readPost } from '../../api/article';
import { addCategories, AddCategoriesParams, deleteCategories, DeleteCategoriesParams, getCategories, GetCategoriesParams, modifyCategories, ModifyCategoriesParams } from '../../api/categories';
import { useResize } from '../../store/useResize';
// TODO 好像太大了
import dayjs from 'dayjs';
import SaveCategoryVue from './Category/SaveCategory.vue';
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
const columns: DataTableColumns<Category.Category> =
    [
        {
            type: 'selection'
        },
        {
            title: '标题',
            key: 'name',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '颜色',
            key: 'color',
            render(row) {
                return [
                    h(
                        NTag,
                        {
                            style: {
                                color: row.color
                            },
                            type: 'info',
                            bordered: false
                        },
                        {
                            default: () => row.color
                        }
                    )
                ]
            },
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '被引用数',
            key: 'count',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '创建时间',
            key: 'createTime',
            render(row) {
                // return new Date(row.createTime).toLocaleString()
                return row.createTime
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
                                const {name,color,_id} = row;
                                newCategory('modify',{name,color,_id})
                            }
                        },
                        { default: () => '修改' }
                    ),
                    h(
                        ArticleDelete, {
                        onDelete() {
                            deleteData({ _id: row._id })
                        },
                        infoMsg: '确认删除当前目录?'
                    }
                    ),
                ]
                return actions;
            },
            ellipsis: {
                tooltip: true
            }
        },
    ]
// 目录数据
let categoryData = ref<Category.Category[]>([])
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
        apiGetCategory()
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
        apiGetCategory()
    }
})
interface FormValue {
    searchText: string,
}
const formValue = reactive<FormValue>({
    searchText: ''
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
        formValue[key] = ''
    }
    doSearch()
}
const apiGetCategory = async () => {
    try {
        loading.value = true;
        const params: GetCategoriesParams = {
            page: paginationReactive.page,
            pageSize: paginationReactive.pageSize,
            //细节去除空格
            searchText: formValue.searchText?.trim(),
        }
        const apiCategory = await getCategories(params);
        paginationReactive.pageCount = apiCategory.data.totalPage;
        categoryData.value = apiCategory.data.data
        loading.value = false;
    } catch (error: any) {
        window.$message.warning(error.response.data.msg)
        categoryData.value = []
        loading.value = false;
    }
}
apiGetCategory()
//细节重置搜索
const doSearch = (): void => {
    paginationReactive.page = 1;
    paginationReactive.pageSize = 10
    apiGetCategory()
}
//添加目录
const newCategory = (commitType: string, modifyFormValue?: ModifyCategoriesParams): void => {
    dialog.info({
        title: '添加目录',
        content: () => {
            return [
                h(SaveCategoryVue, {
                    onSaveData(formValue: AddCategoriesParams) {
                        if (commitType === 'modify' && modifyFormValue) {
                            modifyData(formValue as ModifyCategoriesParams)
                        } else {
                            saveData(formValue)
                        }
                    },
                    ...modifyFormValue
                })
            ]
        },
        positiveText: '关闭',
        onPositiveClick: () => {
            doSearch()
        }
    })
};
//保存data 抽出来先后面说不定有用到
const saveData = async (formValue: AddCategoriesParams) => {
    try {
        loading.value = true;
        await addCategories(formValue);
        loading.value = false;
        window.$message.success('添加成功')
        doSearch()
    } catch (error) {
        window.$message.warning('添加失败')
    }
};
// 修改目录
const modifyData = async (formValue: ModifyCategoriesParams) => {
    try {
        loading.value = true;
        await modifyCategories(formValue);
        loading.value = false;
        window.$message.success('添加成功')
        doSearch()
    } catch (error) {
        window.$message.warning('添加失败')
    }
}
// 删除目录
const deleteData = async (formValue: DeleteCategoriesParams) => {
    try {
        loading.value = true;
        await deleteCategories(formValue);
        loading.value = false;
        window.$message.success('添加成功')
        doSearch()
    } catch (error) {
        window.$message.warning('添加失败')
    }
}
</script>

<style scoped>
.tableHeight {
    height: calc(100% - 3.5rem - 50px);
    overflow-y: auto;
    overflow-x: hidden;
}
</style>