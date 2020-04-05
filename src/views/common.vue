<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        XX系统管理
      </el-col>
      <!-- <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'"> -->
      <!-- <img src="../assets/img/logofff.png" alt=""> -->
      <!-- </el-col> -->
      <div :span="4" class="userinfo">
        <!-- 中英文切换开关 -->
        <!-- <el-switch class="disLeft" style="display: block; margin-top: 20px; margin-right: 15px" v-model="value2" active-color="#13ce66" inactive-color="#ff4949" active-text="EN" inactive-text="中" @change="languageClick">
        </el-switch> -->
        <!-- <el-badge class="disLeft item" :value="0" style="margin-right: 25px;" :is-dot="true" :hidden="isHidden">
          <div @click="mailVisible = true"  style="width: 100%; height: 100%;cursor: pointer;">{{$t('message.StandInsideLetter')}}</div>
        </el-badge> -->
        <el-dropdown class="disLeft" trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img style="float: left" src="../assets/user.jpg" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item> -->
            <el-dropdown-item @click.native="uploadPassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 消息 -->
      <el-col :span="4" class="look">
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :key="item.name" :index="index+''" v-if="item.children&&item.children.length > 0">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item :key="item.name" v-if="!item.children||item.children.length<0" :index="item.path"><i :class="item.iconCls"></i>{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section style="margin-top: 5px;" class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { postForm, get, post } from '../utils/fetch'
export default {
  data () {
    return {
      menu: [],
      // 是否显示标记
      isHidden: true,
      // 搜索内容
      searchData: '',
      // 发送记录
      sendOld: [],
      // 接收记录
      receive: [],
      meauhidden: false,
      meauvalue: 0,
      meetingmeauhidden: false,
      meetingmeauvalue: 0,
      meauworkvalue: 0,
      meauworkhidden: false,
      // 接收记录搜索值
      thirdData: '',
      addressData: [],
      defaultProps: {
        label: 'name'
      },
      transferData: [],
      transferValue: [],
      personnel: [],
      receiptId: '',
      receiptName: '',
      value2: false,
      input1: '',
      input2: '',
      input3: '',
      // 密码from
      formInline: {
        userId: '',
        oldPassword: '',
        newPassword: '',
        twicePassword: ''
      },
      addResseeVisi: false,
      dialogVisible: false,
      mailVisible: false,
      activeName: 'first',
      sysName: '云平台',
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: '',
      userId: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    // 站内信
    getmessage () {
      let id = this.userId
      post(":9006/Message/putMessage/" + id).then(res => {
        if (res.data.data && res.data.data.length != 0) {
          this.isHidden = false
        } else {
          this.isHidden = true
        }
      })
    },

    // 是否有未读消息
    isMessage () {
      postForm(':9001/examineAndApproveResource/unreadCount', { currentUserId: this.userId }).then(res => {
        console.log(res)
        // res.data.data == 0 ? this.isHidden = true : this.isHidden = false
        postForm(':9001/examineAndApproveResource/getUserInfo', { currentUserId: this.userId }).then(ret => {

          if (ret.data.data.professionalTitle == null) {
            if (res.data.data.adminWaitApprovalCount != 0) {
              this.meauhidden = true
              this.meauvalue = res.data.data.adminWaitApprovalCount
            } else {
            }
          } else {
            if (res.data.data.userWaitApprovalCount != 0) {
              this.meauhidden = true
              this.meauvalue = res.data.data.userWaitApprovalCount
            }
          }
        })
      })
    },
    // 会议室未读
    meetingmessage () {
      postForm(":9006/meeting/unReadCount", { localUserId: this.userId }).then(res => {
        if (res.data.data != 0) {
          this.meetingmeauhidden = true
        } else {
          this.meetingmeauhidden = false
        }
        this.meetingmeauvalue = res.data.data
      })
    },
    // 工单提示
    getUntreatedWorkOrderCount () {
      postForm(':9006/workOrder/wordOrderUnread', { currentUserId: this.userId }).then(res => {
        if (res.data.data == 0) {
          this.meauworkhidden = false
          this.meauworkvalue = res.data.data
        } else {
          this.meauworkhidden = true
          this.meauworkvalue = res.data.data
        }
      })
    },
    // 搜索按钮
    searchSecond () {
      post(':9006/Message/messageHistory', { searchInfo: this.searchData, userId: this.userId }).then(res => {
        console.log(res)
        this.sendOld = res.data.data
      })
    },
    // $t('message.HistoryOfReceipt')
    searchThird () {
      post(':9006/Message/putMessageHistory', { searchInfo: this.thirdData, userId: this.userId }).then(res => {
        console.log(res)
        this.receive = res.data.data
      })
    },
    closeddialog () {
      this.transferValue = []
      this.transferData = []
      this.receiptName = ""
      this.input2 = ""
      this.input3 = ""
      this.searchData = ""
      this.thirdData = ""
    },

    closeddia () {
      this.transferValue = []
      this.transferData = []
    },
    selectok () {
      let arr = [], arr1 = []
      this.transferValue.map(item => {
        console.log(item)
        arr.push(item.id)
        arr1.push(item.name)
      })
      this.receiptId = arr.join(',')
      this.receiptName = arr1.join(',')
      this.addResseeVisi = false
    },
    // 清空搜索框
    clearSecond () {
      if (this.activeName == 'second') {
        this.searchData = ''
        this.searchSecond()
      } else {
        this.thirdData = ''
        this.searchThird()
      }
    },
    // 添加收件人
    Addressee () {
      this.addResseeVisi = true
      get(':9006/AppConnection/departmentTree').then(res => {
        console.log(res)
        this.addressData = res.data.data
      })
    },
    handleNodeClick (data) {
      post(':9006/UserMonitorHistory/FindByOrgId', { orgId: data.pid == '0' ? '' : data.id }).then(res => {
        const data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push({
            key: {
              id: res.data.data[i].id,
              name: res.data.data[i].userName
            },
            label: res.data.data[i].realName + "(" + res.data.data[i].userName + ")"
            // label: res.data.data[i].userName+'('+res.data.data[i].realName + ')'
          });
        }
        this.transferData = data
      })
    },
    // changeRight (val, val1, val2) {
    //   var arr = []
    //   var arr1 = []
    //   val.map(item => {
    //     console.log(item)
    //     arr.push(item.id)
    //     arr1.push(item.name)
    //   })
    //   this.receiptId = arr.join(',')
    //   this.receiptName = arr1.join(',')
    // },
    // 发送消息
    sendMessage () {
      if (this.activeName == 'first' && this.receiptId && this.input3) {
        post(':9006/Message/sendMessage', { userId: this.userId, liveTime: this.input2 || 30, note: this.input3, putUserIds: this.receiptId }).then(res => {
          this.$message(res.data.message);
          this.input2 = ''
          this.input3 = ''
          this.receiptId = ''
          this.receiptName = ''
        })
      }
      this.mailVisible = false
    },
    defualtLang () {
      const lang = localStorage.getItem("lang")
      if (localStorage.getItem('lang') == 'en_US') {
        this.value2 = true
      } else {
        this.value2 = false
      }
    },
    // 切换语言
    languageClick (val) {
      console.log(val)
      if (val) {
        this.$i18n.locale = 'en_US'
        localStorage.setItem('lang', 'en_US')
      } else {
        this.$i18n.locale = 'zh_CN'
        localStorage.setItem('lang', 'zh_CN')
      }
      postForm(':9000/login/settingLangage', { userId: this.userId, lang: localStorage.getItem('lang') }).then(res => {
        console.log(res)
        this.handleRole()
        location.reload()
        // sessionStorage.setItem('isFirstLogin', res.data.data.isFirstLogin)
      })
    },
    // 切换标签
    handleClick (tab, event) {
      console.log(tab, event);
      if (this.activeName == 'second') {
        post(':9006/Message/messageHistory', { searchInfo: this.searchData, userId: this.userId }).then(res => {
          console.log(res)
          this.sendOld = res.data.data
        })
      } else if (this.activeName == 'third') {
        post(':9006/Message/putMessageHistory', { searchInfo: this.thirdData, userId: this.userId }).then(res => {
          console.log(res)
          this.receive = res.data.data
        })
      }
    },
    // 关闭
    closeDialog () {
      this.formInline.oldPassword = ''
      this.formInline.newPassword = ''
      this.formInline.twicePassword = ''
      this.formInline.userId = ''
    },
    // 确认修改密码
    upPassword () {
      if (!this.formInline.oldPassword) {
        this.$message.error(this.$t('message.Pleaseenteryourpassword'));
      } else if (!this.formInline.newPassword) {
        this.$message.error(this.$t('message.Pleaseenteryournewpassword'))
      } else if (!this.formInline.twicePassword) {
        this.$message.error(this.$t('message.Pleaseenteryournewpasswordagin'))
      } else if (this.formInline.newPassword != this.formInline.twicePassword) {
        this.$message.error(this.$t('message.TheTwoPasswordsAreInconsistent'))
      } else if (this.formInline.newPassword.length < 6 || this.formInline.twicePassword.length < 6) {
        this.$message.error(this.$t('message.Thenewpasswordisatleastsixbits'))
      } else {
        if (this.formInline.newPassword == this.formInline.twicePassword) {
          var user = sessionStorage.getItem('user')
          user = JSON.parse(user)
          this.formInline.userId = user.userId
          postForm(':9000/user/updatePassword', this.formInline).then(res => {
            var data = res.data
            if (data.code == 200 && data.data == 1) {
              this.$message({
                message: data.message,
                type: 'success'
              });
              this.dialogVisible = false
              // this.$router.push({ path: '/login' })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      }
    },
    // dialog
    uploadPassword () {
      this.dialogVisible = true
    },
    onSubmit () {
      console.log('submit!');
    },
    handleopen () {
      //console.log('handleopen');
    },
    handleclose () {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {
      console.log(a, b, "Asdasdasdasdsad")
      if (a == "/approve/approve") {
        this.meauvalue = 0
        this.meauhidden = false
      }
      if (a == "/meetingManage/localMeeting") {
        this.meetingmessage()
      }
    },
    //退出登录
    logout: function () {
      let _that = this
      console.log(JSON.parse(sessionStorage.getItem('user')).userId)
      postForm(
        ':9000/login/logout', {
        userId: JSON.parse(sessionStorage.getItem('user')).userId,
        token: sessionStorage.getItem('token'),
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('isFirstLogin');
          _that.$router.push('/login');
          _that.$message.success(res.data.message)
        } else {
          _that.$message.error(res.data.message)
        }
      })
      // }).catch(() => {

      // });


    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    // 获取权限
    handleRole () {
      var user = sessionStorage.getItem('user')
      postForm(':9000/login/loginPrivilege', { userId: this.userId }).then(res => {
        console.log(res)
        var role = res.data;
        sessionStorage.setItem('role', JSON.stringify(role.data[0].children))
        var routerMap = []
        routerMap = role.data[0].children
        routerMap.map(item => {
          if (!item.children) {
            item.component = () => import(`@/views${item.path}`)
          } else {
            item.path = "/"
            item.component = () => import(`@/views/routerContainer.vue`)
            item.children.map(lis => {
              lis.component = () => import(`@/views${lis.path}`)
            })
          }
        })
        this.menu = JSON.parse(sessionStorage.getItem('role'))
        this.$router.options.routes = routerMap
        this.$router.addRoutes(routerMap)
      })
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.realName || '';
      this.sysUserAvatar = user.avatar || '';
      this.userId = user.userId
    }
    this.handleRole()
    this.defualtLang()
    this.isMessage()
    this.getmessage()
    this.meetingmessage()
    this.getUntreatedWorkOrderCount()
  }
}

</script>
<style>
.chagrpd .el-dialog__body {
  padding: 10px 20px;
}
.chagrpd .el-tabs__header {
  margin: 0 0 25px;
}
</style>
<style scoped lang="stylus">
.searchInput {
  width: 250px;
  margin-bottom: 15px;
}

.el-dialog__headerbtn {
  top: 15px !important;
}

.el-dialog__header {
  padding: 10px 20px 10px !important;
}

.treeBox {
  width: 240px;
  height: 288px;
  border: 1px solid #ccc;
  float: left;
  margin-right: 30px;
  overflow: auto;
}

.el-icon-s-devops {
  // background-image: url('../assets/img/u7.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 18px !important;
  height: 18px;
  margin-left: 4px;
  margin-right: 7px !important;
}

.demo-input-suffix {
  display: flex;
  margin-bottom: 10px;

  .sendSpan {
    width: 30px;
  }

  .sendContent {
    border: 1px solid #ccc;
    width: calc(100% - 57px);
    height: 140px;
    overflow-y: auto;
    padding: 6px;
  }

  span {
    display: inline-block;
    line-height: 40px;
    width: 85px;
    text-align: right;
    margin-right: 17px;
  }

  .el-icon-circle-plus {
    line-height: 40px;
    font-size: 20px;
    color: #409EFF;
    margin-left: 13px;
  }

  .input {
    width: 250px;
  }

  .content {
    width: 400px;
  }
}

.disLeft {
  float: left;
  color: #000;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: #FFFFFF;
    color: #000;

    .look {
      height: 60px;
      float: right;
      text-align: right;
      font-size: 24px;
    }

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color: #000;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      // width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);

      // border-right-width: 1px;
      // border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: 230px;
    }

    .logo-collapse-width {
      width: 60px;
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    background: #f2f2f2;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    aside {
      flex: 0 0 230px;
      width: 230px;
      overflow: auto;
      padding-top: 5px;
      margin-top: 5px;

      .el-menu {
        height: auto;
        background: #e5f3ff;

        .el-menu-item.is-active {
          color: #fff;
          background: #409EFF;
        }

        .el-menu-item:focus, .el-menu-item:hover {
          background: #409EFF;
          color: #fff;
        }
      }

      .collapsed {
        width: 60px;

        .item {
          position: relative;
        }

        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }

    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }

    .menu-expanded {
      flex: 0 0 236px;
      width: 236px;
      background: #fff;
      margin-right: 5px;
    }

    .content-container {
      width: 100%;
      background: #fff;
      overflow-y: auto;

      .bg-purple-light {
        height: 100%;

        .content-wrapper {
          height: 100%;
        }
      }
    }
  }
}

.item {
  height: 30px;
}

.item >>> .is-dot {
  top: 20px;
  right: 0;
}

.el-icon-bell {
  position: absolute;
  top: 0;
  left: -24px;
}
</style>
