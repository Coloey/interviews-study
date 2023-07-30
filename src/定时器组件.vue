<template>
    <div><p>{{ remainTime }}</p></div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
defineProps({
    start:{
        type:Number,
        required: true
    }
})
defineEmits('timeup')
const timer = ref(null)
const remainTime = ref(start)
const startTimer = () => {
    if(remainTime === 0) {
        clearInterval(timer)
        emits('timeup')
    }
    timer = setInterval(() => {
        remainTime--;
    },1000)
}
onMounted(() => {
    startTimer()
})
</script>