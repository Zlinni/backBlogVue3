<script lang="ts" setup>
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { storeToRefs } from 'pinia';
import { useDarkmode } from './store/useDarkmode';
const hookDarkmode = useDarkmode();
const { darkMode } = storeToRefs(hookDarkmode)
const lightThemeOverrides = {
  common: {
    primaryColor: '#58aef5',
    primaryColorHover: "#58aef5",
    primaryColorPressed: "#58aef5",
  },
  Button: {
    textColor: '#2080f0',
    borderHover: "1px solid #58aef5"
  },
  Pagination: {
    textColorHover: '#000',
  }
  // ...
}

const darkThemeOverrides = {
  common: {
    primaryColor: '#323f48',
    primaryColorHover: "#323f48",
    primaryColorPressed: "#323f48",
  },
  Button: {
    textColor: '#2080f0',
    borderHover: "1px solid #323f48"
  },
  Pagination: {
    textColorHover: '#000',
  }
  // ...
}
</script>
    
<template>
  <n-config-provider :theme="darkMode?darkTheme:lightTheme"
    :theme-overrides="darkMode ? darkThemeOverrides : lightThemeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #f1f1f1;
}

/* 滚动槽 */

::-webkit-scrollbar-track {

  -webkit-box-shadow: inset 0 0 6px #f1f1f1;

  border-radius: 10px;

  background: #f1f1f1;

}

/* 滚动条滑块 */

::-webkit-scrollbar-thumb {

  border-radius: 10px;

  background: #a8a8a8;

  -webkit-box-shadow: inset 0 0 6px #a8a8a8;

}

::-webkit-scrollbar-thumb:window-inactive {

  background: #a8a8a8;

}
</style>