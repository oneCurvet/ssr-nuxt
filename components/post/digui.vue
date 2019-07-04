<template>
    
    <div>
        <div v-for="(item,index) in list" :key="index">
            {{item.type}}
            <digui :list="item.children" v-if="item.children">

            </digui>
        </div>
    </div>
</template>

<script>
export default {
    props:["list"],
    name:"digui"
}
</script>

<style>

</style>
