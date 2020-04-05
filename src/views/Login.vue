<template>
  <el-form class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="userInfo.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { get, postForm, post } from '../utils/fetch'
export default {
  data () {
    return {
      userInfo: {
        userName: '',
        password: ''
      },
      user: {
        userId: '',
        realName: "",
        username: "",
        loginPageAccess: '',
      }
    };
  },
  mounted () {

  },
  methods: {
    handleLogin () {
      post(':3009/login', this.userInfo).then(res => {
        console.log(res)
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>