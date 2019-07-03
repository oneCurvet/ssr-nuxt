<template>
  <div class="main">
    <div class="air-column">
      <h2>剩鸡人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          class="insurance-item"
          v-for="(item, index) in data.insurances"
          :key="index"
          @change="handleChooseIns(item.id)"
        >
          <el-checkbox
            label="：￥30/份×1  最高赔付260万"
            border
            :checked="isChecked"
          >{{item.type}}：￥{{item.price}}/份×1 最高赔付{{item.compensation}}</el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    {{totalPrice}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      form: {
        users: [{ username: "", id: "" }],
        insurances: [],
        contactName: "",
        contactPhone: "13800138000",
        invoice: false,
        seat_xid: "",
        air: "",
        captcha: "000000"
      }
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    //选择保险

    handleChooseIns(id) {
      // const index = this.form.insurances.indexOf(id)
      // if(index === -1){
      //   this.form.insurances.push(id);
      // }else{
      //   this.form.insurances.splice(index,1);
      // }
      this.form.insurances.indexOf(id) === -1
        ? this.form.insurances.push(id)
        : this.form.insurances.splice(this.form.insurances.indexOf(id), 1);
    },
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.form.contactPhone }
      }).then(res => {
        this.$message.success(res.data.code);
      });
    },

    // 提交订单
    handleSubmit() {
      console.log(this.form);
      this.$axios({
        url: "/airorders",
        method: "POST",
        data: this.form,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        const { message, status } = res.data;
        if (status === 0) {
          this.$message.success(message + "！  马上为你跳转支付页！");
        }
      });
    }
  },
  mounted() {
    // console.log(this.$store.state.user.userInfo.token);
    this.form.seat_xid = this.$route.query.seat_xid;
    this.form.air = this.$route.query.id;
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      totalPrice += this.data.base_price;
      totalPrice += this.data.airport_tax_audlet;
      totalPrice += this.form.insurances.length * 30;
      totalPrice *= this.form.users.length;
      this.$emit("handleRecept", totalPrice,this.form.users.length);
      return totalPrice;
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>