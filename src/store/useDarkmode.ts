import { ref } from "vue";
import { defineStore } from "pinia";
// 关于黑暗模式的一个hook
export const useDarkmode = defineStore("darkMode", () => {
  let darkMode = ref<boolean>(false);
  try {
    darkMode.value = localStorage.getItem("darkMode")==='dark'?true:false;
  } catch (error) {
    darkMode.value = false;
  }
  const toggleDarkMode = (): void => {
    darkMode.value = !darkMode.value;
    localStorage.setItem("darkMode", darkMode.value ? "dark" : "light");
  };
  return {
    darkMode,
    toggleDarkMode,
  };
});
