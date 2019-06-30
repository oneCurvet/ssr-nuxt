<template>
  <!-- 其他代码... -->

  <!-- 特价机票 -->
  <el-row type="flex" class="air_sale">
    <el-col :span="6" v-for="(item,index) in saleList" :key="index">
      <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
        <img :src="item.cover" alt>
        <el-row type="flex" justify="space-bewteen">
          <span>{{item.departCity}}-{{item.destCity}}</span>
          <span>￥{{item.price}}</span>
        </el-row>
      </nuxt-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      saleList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      //   console.log(res);
      this.saleList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.air_sale {
  width: 100%;
  .el-col {
    width: 225px;
    height: 140px;
    margin: 0 15px;
  }
  a {
    position: absolute;
    img {
      width: 225px;
      height: 140px;
    }
    > div {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 8px;
      width: 100%;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>

