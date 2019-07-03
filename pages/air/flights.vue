<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <!-- 航班头部布局 -->
        <FightListFiter :data="cloneFightAllData" @setData="setData" />

        <FightListHead />

        <!-- 航班信息 -->

        <FightListItem :data="item" v-for="(item,index) in dataList" :key="index" />

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fightAllData.total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FightAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FightListHead from "@/components/air/fightListHead.vue";
import FightListFiter from "@/components/air/fightListFiter.vue";
import FightListItem from "@/components/air/fightListItem.vue";
import FightAside from "@/components/air/fightAside.vue";
export default {
  data() {
    return {
      //  改变
      fightAllData: {
        flights: [],
        info: {},
        options: {},
        total: ""
      },
      //  不改变
      cloneFightAllData: {
        flights: [],
        info: {},
        options: {},
        total: ""
      },
      currentPage1: 1,
      pageSize: 5,
      pageIndex: 1,
      dataList: [],
      selectedCompany: []
    };
  },
  components: {
    FightListHead,
    FightListFiter,
    FightListItem,
    FightAside
  },
  methods: {
    getAllData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.fightAllData = res.data;
        this.cloneFightAllData = {...res.data}
        this.dataList = this.fightAllData.flights.slice(0, 5);
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.setData();
      // this.dataList = this.fightAllData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageSize * this.pageIndex
      // );
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.setData()
      // this.dataList = this.fightAllData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageSize * this.pageIndex
      // );
      // console.log(this.dataList)
    },
    setData(data) {
      // console.log(data);
      if (data) {
        this.fightAllData.flights = data;
        this.fightAllData.total = data.length;
        this.pageIndex = 1;
      }
      this.dataList = this.fightAllData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  },
  watch:{
    $route(){
      this.getAllData()
    }
  },
  mounted() {
    this.getAllData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>