<template>
  <div class="registerForm">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="username" class="registerForm_item">
        <el-input placeholder="用户名/手机号" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="ruleForm.captcha">
          <template slot="append">
            <span @click="handleSendCaptchas" class="handleSendCaptchas">发送验证码</span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input placeholder="用户昵称" v-model="ruleForm.nickname"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        nickname: "",
        username: "",
        captcha: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { checkPass, ...props } = this.ruleForm;
          this.$store.dispatch("user/register", props).then(res => {
            this.$message.success("注册成功，正在帮你跳转首页");
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
          //   this.$axios({
          //     url: "/accounts/register",
          //     method: "POST",
          //     data: props
          //   }).then(res => {
          //       console.log(res)
          //   })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSendCaptchas() {
      if (this.ruleForm.username === "") {
        this.$message.warning("手机号不能为空");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.ruleForm.username
        }
      }).then(res => {
        console.log(res);
        const data = res.data;
        this.$message.success("发送验证码成功");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.registerForm {
  .demo-ruleForm {
    padding: 20px;
    .el-form-item {
      /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }
      .handleSendCaptchas {
        cursor: pointer;
      }
    }
  }
}
</style>

