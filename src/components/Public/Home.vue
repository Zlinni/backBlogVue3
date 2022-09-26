<template>
      <div :class="{'dark':darkMode}">
            <div class="bg-white dark:bg-dim-900">
                  <!-- 容器以及布局 -->
                  <div class="min-h-full">
                        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
                              <!-- LeftSideBar -->
                              <!-- <div class="sm:block sm:col-span-1 xl:col-span-2"> -->
                              <div class="hidden sm:block sm:static sm:col-span-1 xl:col-span-2">
                                    <div class="sticky top-0">
                                          <SideBarLeft />
                                    </div>
                              </div>
                              <n-drawer v-model:show="activeDrawer" :width="230" placement="left" class="px-2">
                                    <SideBarLeft />
                              </n-drawer>
                              <!-- MainContent -->
                              <div class="xs:col-span-12 sm:col-span-11 xl:col-span-10">
                                    <Header @openDrawer="openDrawer" />
                                    <div class="sm:border-x-2 sm:border-gray-50 sm:dark:border-dim-300">
                                          <RouterView />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>
<script setup lang="ts">
import SideBarLeft from '../layout/SideBar/Left/index.vue'
import Header from '../layout/Header/index.vue';
import { useDarkmode } from '../../store/useDarkmode';
import { storeToRefs } from 'pinia';
import { useResize } from '../../store/useResize';
const { darkMode } = storeToRefs(useDarkmode())
const {activeDrawer} = storeToRefs(useResize())
const openDrawer = (): void => {
      activeDrawer.value = !activeDrawer.value;
}
</script>