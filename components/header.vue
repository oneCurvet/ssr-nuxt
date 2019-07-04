<template>
  <div class="header">
    <el-row class="header_main" type="flex" justify="space-between">
      <el-row>
        <div class="logo">
          <nuxt-link to="https://www.mafengwo.cn/"></nuxt-link>
        </div>
      </el-row>

      <el-row class="menu-nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">订酒店</nuxt-link>
        <nuxt-link to="/air">机票</nuxt-link>
      </el-row>

      <el-row>
        <div class="login-status">
          <div class="logined" v-if="$store.state.user.userInfo.token">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon--right el-icon-user-solid"></i>
                <span class="logined_message">消息</span>
                <i class="el-icon--right el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>消息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown>
              <span class="el-dropdown-link">
                <img
                  :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                  alt
                />
                <span class="user_nickname">{{$store.state.user.userInfo.user.nickname}}</span>
                <i class="el-icon--right el-icon-caret-bottom"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item class="handleLogout">
                  <div @click="handleLogout">退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="nologin" v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon--right el-icon-user-solid"></i>
                <span class="logined_message">消息</span>
                <i class="el-icon--right el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>消息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <nuxt-link to="/user/login">登录 | 注册</nuxt-link>
          </div>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.commit("user/clearUserInfo");
      this.$message.success("已成功退出");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid rgba(0,0,0,.06);
  .header_main {
    width: 1000px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    .logo {
      width: 156px;
      height: 42px;
      background: url("https://css.mafengwo.net/images/header-small-sprites3.png")
        no-repeat 0 15px;
      
    }
    .menu-nav {
      display: flex;
      flex: 1;
      a {
        padding: 0 20px;
        display: block;
        height: 60px;
        box-sizing: border-box;
        font-size: 16px;
        color: black;
        &:hover {
          border-bottom: 5px solid #409eff;
          color: #409eff;
        }
      }
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }

    .login-status {
      .logined {
        display: flex;
        el-dropdown {
        }
        .el-dropdown-link {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .user_nickname,
        .logined_message {
          margin: 0 5px;
        }
        img {
          width: 40px;
          height: 40px;
          margin: 0 5px 0 20px;
          vertical-align: middle;
          border: 2px solid #fff;
          border-radius: 50%;

          &:hover {
            // outline: #409eff;
            border-color: #409eff;
          }
        }
      }
      .nologin {
        a {
          font-size: 14px;
          color: black;
          &:hover {
            text-decoration: underline;
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>

