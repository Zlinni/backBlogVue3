<template>
    <div class="h-screen flex flex-col ">
        <div class="p-2 my-2 hover:bg-red-50 rounded-full w-min
            dark:hover:bg-white/20 d-transistion
        ">
            <a href="/">
                <div class="w-6 h-6">
                    <Logo />
                </div>
            </a>
        </div>
        <div class="mt-2 space-y-3">
            <!-- 这里采用了函数式编程，因为要搞颜色切换 -->
            <SideBarLeftTab active>
                <template #icon>
                    <HomeIcon />
                </template>
                <template #name>
                    主页
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab :clickEvent="toRouterLink('article')">
                <template #icon>
                    <BookOpenIcon />
                </template>
                <template #name>
                    文章管理
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab :clickEvent="toRouterLink('draft')">
                <template #icon>
                    <PencilSquareIcon />
                </template>
                <template #name>
                    草稿管理
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab>
                <template #icon>
                    <InboxIcon />
                </template>
                <template #name>
                    评论管理
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab>
                <template #icon>
                    <BookmarkIcon />
                </template>
                <template #name>
                    收藏管理
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab>
                <template #icon>
                    <DocumentTextIcon />
                </template>
                <template #name>
                    数据清单
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab>
                <template #icon>
                    <UserIcon />
                </template>
                <template #name>
                    个人中心
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab>
                <template #icon>
                    <EllipsisHorizontalCircleIcon />
                </template>
                <template #name>
                    更多
                </template>
            </SideBarLeftTab>
            <SideBarLeftTab :click-event="toggleDarkMode">
                <template #icon>
                    <template v-if="!darkMode">
                        <SunIcon/>
                    </template>
                    <template v-else>
                        <MoonIcon/>
                    </template>
                </template>
                <template #name>
                    切换主题
                </template>
            </SideBarLeftTab>
        </div>

    </div>
</template>

<script setup lang="ts">
import Logo from '../../../Logo/logo.vue';
import { HomeIcon } from "@heroicons/vue/20/solid/index";
import { BookOpenIcon, PencilSquareIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, EllipsisHorizontalCircleIcon,SunIcon,MoonIcon } from "@heroicons/vue/24/outline/index"
import SideBarLeftTab from './Tab.vue';
import { useDarkmode } from '../../../../store/useDarkmode';
import { storeToRefs } from 'pinia';
import router from '../../../../router';
const hookDarkmode = useDarkmode();
const { toggleDarkMode } = hookDarkmode;
const { darkMode } = storeToRefs(hookDarkmode)
const toArticle = ():void=>{
    router.push({path:'/article'})
}
const toRouterLink = (link:string):()=>void=>{
    return function(){
        router.push({path:'/'+link})
    }
}
</script>