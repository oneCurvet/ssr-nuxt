<template>
  <div class="searchForm">
    <div class="searchForm_top">
      <el-row
        type="flex"
        class="searchForm_top_oneway"
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active: index === currentNum}"
      >
        <div @click="handleChangeActive(item,index)">
          <i :class="item.icon"></i>
          <span>{{item.content}}</span>
        </div>
      </el-row>
    </div>

    <div class="searchForm_middle">
      <el-row>
        <span>出发城市</span>
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartAsync"
          placeholder="请搜索出发城市"
          @select="handleSelectDepart"
        ></el-autocomplete>
      </el-row>
      <el-row>
        <span>到达城市</span>
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestAsync"
          placeholder="请搜索到达城市"
          @select="handleSelectDest"
        ></el-autocomplete>
      </el-row>
      <el-row>
        <span>出发时间</span>
        <el-date-picker
          class="el-date-picker_date"
          v-model="form.departDate"
          type="date"
          placeholder="选择日期"
          @change="handleSelectDate"
        ></el-date-picker>
      </el-row>
      <el-row>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "el-icon-s-unfold", content: "单程" },
        { icon: "el-icon-finished", content: "往返" }
      ],
      currentNum: 0
    };
  },
  methods: {
    handleChangeActive(item, index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.currentNum = index;
    },
    queryDepartAsync(queryString, cb) {
      //   console.log(queryString);
      //   console.log(cb);
      if (!queryString) return;
      this.$axios({
        url: `/airs/city?name=${queryString}`,
        method: "GET"
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        // console.log(data);
        const newDate = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        cb(newDate);
        this.form.departCity = newDate[0].value;
        // console.log(newDate)
      });
    },
    handleSelectDepart(item) {
      // console.log(item);
      this.form.departCode = item.sort;
      this.form.departCity = item.value;
    },

    // 到达
    queryDestAsync(queryString, cb) {
      //   console.log(queryString);
      //   console.log(cb);
      if (!queryString) return;
      this.$axios({
        url: `/airs/city?name=${queryString}`,
        method: "GET"
      }).then(res => {
        // console.log(res);
        if (!this.form.destCity) return;
        const { data } = res.data;
        // console.log(data);
        const newDate = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        cb(newDate);
        this.form.destCity = newDate[0].value;
      });
    },
    handleSelectDest(item) {
      console.log(item);
      this.form.destCode = item.sort;
      this.form.destCity = item.value;
    },
    handleSelectDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    handleSearch() {
      // console.log(this.form.departDate)

      const historyItem = JSON.parse(localStorage.getItem("historyItem")) || [];

      historyItem.push(this.form);

      localStorage.setItem("historyItem", JSON.stringify(historyItem));

      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请输入出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请输入到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请输入出发时间"
        }
      };

      let flag = true;
      Object.keys(rules).forEach(v => {
        if (!rules[v].value) {
          if (!flag) return;
          this.$message.warning(rules[v].message);
          flag = false;
        }
      });

      if (!flag) return;
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    }
  }
};
</script>

<style lang="less" scoped>
.searchForm {
  width: 360px;
  height: 350px;
  border: 1px solid #eee;
  .searchForm_top {
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    line-height: 42px;
    .active {
      border-top: 3px solid orange !important;
      background: #fff !important;
    }
    .searchForm_top_oneway {
      border-top: 3px solid #eee;
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eee;
      > div {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      span {
        margin-left: 3px;
      }
    }
    // .searchForm_top_backandforth {
    //   flex: 1;
    //   border-top: 3px solid #eee;

    //   line-height: 42px;
    //   height: 100%;
    //   background: #eee;

    // }
  }
  .searchForm_middle {
    padding: 15px 50px 15px 25px;
    color: #333;
    font-size: 14px;
    > div {
      padding: 0 0 0 5px;
      margin-bottom: 22px;
      /deep/ .el-date-picker_date,
      .el-button {
        width: 202px;
      }
    }
  }
  .el-button {
    width: 202px;
    margin-left: 60px;
  }
}
</style>

