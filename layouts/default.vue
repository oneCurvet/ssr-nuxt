<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from "@/components/header.vue"
export default {
  components:{
    Header
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color: #333;
}
</style>
