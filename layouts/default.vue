<template>
  <div>
    <Header />
    <nuxt />
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/header.vue"
import Footer from "@/components/footer.vue"
export default {
  components:{
    Header,
    Footer
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
