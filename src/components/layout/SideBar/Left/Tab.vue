<template>
    <div @click="clickEvent" class="d-transistion flex items-center p-3 rounded-full hover:bg-gray-200
        dark:hover:bg-dim-200 dark:text-white
    ">
        <div class="w-6 h-6 d-transistion text-dark">
            <slot name="icon"></slot>
        </div>
        <div class="xs:block sm:hidden ml-4 text-xl xl:block" :class="textClasses">
            <slot name="name"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, Ref } from 'vue';
import router from '../../../../router';
interface Props {
    active?:boolean,
    clickEvent?:() => void
}
const props = withDefaults(defineProps<Props>(), {
    active: false,
    clickEvent:()=>{router.push({path:'/'})}
})
const textClasses:Ref<string> = computed(()=>props.active?'font-semibold':'font-normal')

</script>