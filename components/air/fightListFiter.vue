<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{this.data.info.departCity}} - {{this.data.info.destCity}}
        /
        {{this.data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from}:00 - ${item.to}:00`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.name"
            :value="item.type"
            v-for="(item,index) in airSizeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小,
      airSizeList: [
        { name: "大", type: "L" },
        { name: "中", type: "M" },
        { name: "小", type: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      const selectedAirport = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      });
      // console.log(selectedCompany)
      this.$emit("setData",selectedAirport)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {},

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(value);
      // console.log(this.data.flights);
      // const { airline_name } = this.data.flights;
      // console.log(handleAcceptFiter);
      const selectedCompany = this.data.flights.filter(v => {
        return v.airline_name === value;
      });
      // console.log(selectedCompany)
      this.$emit("setData",selectedCompany)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const selectedAirSize = this.data.flights.filter(v => {
        return v.plane_size === value;
      });
      // console.log(selectedCompany)
      this.$emit("setData",selectedAirSize)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = "" // 机场
      this.flightTimes = ""// 出发时间
      this.company = "" // 航空公司
      this.airSize = "" // 机型大小,
      this.$emit("setData",this.data.flights)
    }
  },
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>