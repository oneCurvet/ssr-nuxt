<template>
  <div class="loginForm">
    <el-form :rules="rules" ref="loginForm" :model="form">
      <el-form-item prop="username" class="username">
        <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="password">
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="el-button" @click="handleSubmit">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login",this.form).then(res => {
            console.log(res);
            this.$message.success("登录成功，正在帮你跳转首页");
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.loginForm {
  padding: 20px;
  .el-button {
    width: 100%;
    display: block;
  }
}
</style>




