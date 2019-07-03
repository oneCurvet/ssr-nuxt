<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm 
        :data="DataFromAirsId" 
        @handleRecept="handleRecept"
        />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="DataFromAirsId" 
        :totalPrice="totalPrice"
        :userLength="userLength"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";

export default {
  data() {
    return {
      DataFromAirsId: {},
      totalPrice:0,
      userLength:0
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  methods:{
    handleRecept(data,userLength){
      console.log(data)
      this.totalPrice = data;
      this.userLength = userLength;
    }
  },
  mounted() {
    this.$axios({
      url: `/airs/${this.$route.query.id}`,
      parmas: { seat_xid: this.$route.query.seat_xid }
    }).then(res => {
      this.DataFromAirsId = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>