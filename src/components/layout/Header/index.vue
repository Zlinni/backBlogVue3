<template>
    <div class="xs:flex sm:hidden min-w-full h-12 items-center border-b-2 border-gray-200 dark:border-dim-300">
        <div class="p-2 my-2 hover:bg-red-50 rounded-full w-min
            dark:hover:bg-white/20 d-transistion
        ">
            <a href="/">
                <div class="w-8 h-8">
                    <Logo />
                </div>
            </a>
        </div>
        <ArrowsRightLeftIcon class="w-6 h-6 cursor-pointer dark:text-white" 
            @click="openDrawer"
        />
        <div class="ml-auto flex items-center">
            <n-icon size="20" class="cursor-pointer" @click="toggleDarkMode">
                <template v-if="!darkMode">
                    <SunIcon />
                </template>
                <template v-else>
                    <MoonIcon class="text-white" />
                </template>
            </n-icon>
            <n-button type="text" size="large" class="dark:text-white">
                <template #icon>
                    <ArrowRightOnRectangleIcon />
                </template>
                登出
            </n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Logo from '../../Logo/Logo.vue';
import { SunIcon, ArrowRightOnRectangleIcon, MoonIcon, ArrowsRightLeftIcon } from '@heroicons/vue/20/solid';
import { useDarkmode } from '../../../store/useDarkmode';
import { storeToRefs } from 'pinia';
const hookDarkmode = useDarkmode();
const { toggleDarkMode } = hookDarkmode;
const { darkMode } = storeToRefs(hookDarkmode)
const emits = defineEmits(['openDrawer'])
const openDrawer = ():void=>{
    console.log('11')
    emits("openDrawer")
}
</script>