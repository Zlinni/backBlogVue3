// import { throttle } from "lodash-es";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
export const useResize = defineStore("resize", () => {
  let activeDrawer = ref<boolean>(false);
  let activePagin = ref<boolean>(true);
  let calHeightTable = ref<number>(
    +`${document.documentElement.clientHeight}` - 200
  );
  const initFunction = ()=>{
    if (window.innerWidth > 768) {
      activeDrawer.value = false;
      activePagin.value = true;
    } else if(window.innerWidth < 600){
      activePagin.value = false;
    } else{
      activePagin.value = true;
    }
    //这里继续赋值不然获取不到
    calHeightTable.value = +`${document.documentElement.clientHeight}` - 200;
  }
  initFunction();
  window.onresize = initFunction;
  let expandSearch = ref<boolean>(false);
  watch(expandSearch,(val)=>{
    if(val){
        calHeightTable.value-=200
    }else{
        calHeightTable.value+=200
    }
  })
  return {
    activeDrawer,
    calHeightTable,
    expandSearch,
    activePagin
  };
});
