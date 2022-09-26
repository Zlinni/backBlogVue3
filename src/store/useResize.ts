// import { throttle } from "lodash-es";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
export const useResize = defineStore("resize", () => {
  let activeDrawer = ref<boolean>(false);
  let calHeightTable = ref<number>(
    +`${document.documentElement.clientHeight}` - 200
  );
  let expandSearch = ref<boolean>(false);
  window.onresize = function () {
    if (window.innerWidth > 768) {
      activeDrawer.value = false;
    }
    //这里继续赋值不然获取不到
    calHeightTable.value = +`${document.documentElement.clientHeight}` - 200;
  };
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
  };
});
