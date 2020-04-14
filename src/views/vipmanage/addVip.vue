<template>
  <div class="vip">
    <el-col :span="24" style="margin-bottom: 20px">
      <el-button type="primary" size="small" @click="handleAddVip">添加会员</el-button>
      <el-button style="float: right;" type="primary" size="small" @click="backupInformation">备份信息</el-button>
    </el-col>
    <el-col :span="24" style="margin-bottom: 20px">
      <el-input clearable placeholder="请输入会员电话" v-model="searchKey" class="input-with-select" @clear="handleClear">
        <el-button type="primary" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="24">
      <el-table :data="tableData" border style="width: 100%" height="650">
        <el-table-column show-overflow-tooltip prop="id" label="会员编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="vipname" label="会员姓名">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="phone" label="会员电话">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="discount" label="会员折扣">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="money" label="剩余金额">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">消费</el-button>
            <el-button size="mini" type="success" @click="handleRecharge(scope.$index, scope.row)">充值</el-button>
            <el-button size="mini" type="info" @click="handleRecord(scope.$index, scope.row)">记录</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin: 0!important; padding: 20px 0!important;" background layout="total,sizes,prev, pager, next, jumper" :total="totalSize || tableData.length" @size-change="siziChange" @current-change="currentChange" :page-sizes=[10,20,50,100]>
      </el-pagination>
    </el-col>

    <!-- 添加会员 -->
    <el-dialog class="dictdialog" :close-on-click-modal='false' :close-on-press-escape='false' title="添加会员" :visible.sync="vipVisible" width="420px" :before-close="handleClose">
      <span class="reWidth" style="margin-right:15px;width:55px">姓名</span>
      <el-input class="reInput" v-model="params.name" placeholder="请输入"><i slot="suffix" class="hou">姓名</i></el-input>
      <span style="font-size: 16px; color: red">*</span>
      <br>
      <span class="reWidth" style="margin-right:15px;width:55px">电话</span>
      <el-input class="reInput" v-model="params.phone" placeholder="请输入"><i slot="suffix" class="hou">电话</i></el-input>
      <span style="font-size: 16px; color: red">*</span>
      <br>
      <span class="reWidth" style="margin-right:15px;width:55px">金额</span>
      <el-input class="reInput" v-model="params.money" placeholder="请输入"><i slot="suffix" class="hou">元</i></el-input>
      <span style="font-size: 16px; color: red">*</span>
      <br>
      <span class="reWidth" style="margin-right:15px;width:55px">折扣</span>
      <el-input class="reInput" v-model="params.discount" placeholder="请输入"><i slot="suffix" class="hou">折</i></el-input>
      <span style="font-size: 16px; color: red">*</span>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="handleCloses">取消</el-button> -->
        <el-button type="primary" @click="add">确定</el-button>
      </span>
    </el-dialog>
    <!-- 消费情况 -->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" title="消费信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-row class="vipinfo">
        <el-col :span="12">
          <div style="text-align: center; width: 100%">会员姓名: {{vipInfo.vipname}}</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center; width: 100%">会员折扣: {{vipInfo.discount}}折</div>
        </el-col>
      </el-row>
      <el-col :span="24"><span style="font-size: 22px">消费项目: </span><i class="el-icon-plus" style="font-size: 24px" @click="addPoject"></i><i class="el-icon-video-play" style="font-size: 24px; margin-left: 20px;" @click="calculator"></i></el-col>
      <div v-for="(item, index) in consumptionItem" :key="index">
        <!-- <el-row> -->
        <el-col :span="12">
          <span class="retWidth" style="margin-right:15px;width:55px">项目{{index + 1}}</span>
          <el-input class="retInput" v-model="item.project" placeholder="请输入"><i slot="suffix" class="hou">项目</i></el-input>
          <span style="font-size: 16px; color: red">*</span>
        </el-col>
        <el-col :span="12">
          <span class="retWidth" style="margin-right:15px;width:55px">金额</span>
          <el-input class="retInput" v-model="item.money" placeholder="请输入"><i slot="suffix" class="hou">金额</i></el-input>
          <span style="font-size: 16px; color: red">*</span>
        </el-col>
        <!-- </el-row> -->
      </div>
      <div><span>消费总额: {{consumptionMoney}}</span><span>余额: {{balance}}</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleProjectConsumption">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 充值信息 -->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" title="充值信息" :visible.sync="rechargeVisible" width="30%" :before-close="handleClose">
      <el-row class="vipinfo">
        <el-col :span="12">
          <div style="text-align: center; width: 100%">会员姓名: {{vipInfo.vipname}}</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center; width: 100%">会员电话: {{vipInfo.phone}}</div>
        </el-col>
      </el-row>
      <el-col :span="12">
        <span class="retWidth" style="margin-right:15px;width:80px">充值金额</span>
        <el-input class="retInput" v-model="rechargeInfo.money" placeholder="请输入" @blur="addMoney"><i slot="suffix" class="hou">金额</i></el-input>
        <span style="font-size: 16px; color: red">*</span>
      </el-col>
      <el-col :span="12">
        <span class="retWidth" style="margin-right:15px;width:80px">会员折扣</span>
        <el-input class="retInput" v-model="rechargeInfo.discount" placeholder="请输入"><i slot="suffix" class="hou">折扣</i></el-input>
        <span style="font-size: 16px; color: red">*</span>
      </el-col>
      <el-col :span="24">
        <span class="retWidth" style="margin-right:15px;width:80px">剩余金额</span>
        <el-input class="retInput" v-model="rechargeInfo.surplusMoney" placeholder="请输入" disabled><i slot="suffix" class="hou">金额</i></el-input>
      </el-col>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="rechargeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 记录信息 -->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" title="会员记录" :visible.sync="historicalRecord" width="60%" :before-close="handleClose">
      <el-row class="vipinfo">
        <el-col :span="12">
          <div style="text-align: center; width: 100%">会员姓名: {{vipInfo.vipname}}</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center; width: 100%">会员电话: {{vipInfo.phone}}</div>
        </el-col>
      </el-row>
      <el-table :data="tableRecord" border style="width: 100%" height="500">
        <el-table-column show-overflow-tooltip prop="date" label="消费日期">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="project" label="消费项目">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="money" label="消费金额">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="rechargeMoney" label="充值金额">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="remarks" label="备注信息">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="historicalRecord= false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { postForm, get, post } from '../../utils/fetch'
// import pinyin from '../../utils/Convert_Pinyin'
export default {
  name: '',
  props: {

  },
  components: {

  },
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      rechargeVisible: false,
      vipVisible: false,
      params: {
        name: '',
        phone: '',
        discount: '',
        money: ''
      },
      vipInfo: {},
      consumptionItem: [],
      consumptionMoney: Number(),
      balance: Number(),
      rechargeInfo: {
        id: '',
        money: Number(),
        discount: Number(),
        surplusMoney: Number()
      },
      // 记录弹窗
      historicalRecord: false,
      // 当前页
      curPage: 1,
      pageSize: 10,
      totalSize: Number(),
      searchKey: '',
      tableRecord: [],
    };
  },
  mounted () {
    this.getVipInfo()
  },
  methods: {
    // 消费
    handleEdit (index, row) {
      this.dialogVisible = true
      this.vipInfo = row
    },
    // 添加消费项目
    addPoject () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var nowDate = year + '-' + month + '-' + day;
      this.consumptionItem.push({ project: '', money: Number(), date: nowDate, remarks: '普通消费' })
    },
    // 计算消费金额
    calculator () {
      var num = Number()
      var per = '0.' + this.vipInfo.discount
      for (var i = 0; i < this.consumptionItem.length; i++) {
        num += parseInt(this.consumptionItem[i].money)
      }
      // 取小数点后一位
      this.consumptionMoney = (num * parseFloat(per)).toFixed(1)
      this.balance = (this.vipInfo.money - this.consumptionMoney).toFixed(1)
    },
    // 传递剩余金额和消费信息
    handleProjectConsumption () {
      post(':3009/projectConsumption', { id: this.vipInfo.id, money: this.balance }).then(res => {
        this.getVipInfo()
        this.handleClose()
        this.dialogVisible = false
      })
      post(':3009/recordWriteData', { tableInfo: pinyin.getFullChars(this.vipInfo.vipname) + this.vipInfo.phone, recordInfo: this.consumptionItem }).then(res => {
      })
    },
    // 充值
    handleRecharge (index, row) {
      this.rechargeVisible = true
      this.vipInfo = row
      this.rechargeInfo.id = row.id
      this.rechargeInfo.surplusMoney = this.vipInfo.money
    },
    // 剩余金额计算
    addMoney () {
      this.rechargeInfo.surplusMoney = parseFloat(this.vipInfo.money) + parseFloat(this.rechargeInfo.money)
    },
    // 充值金额
    editData () {
      post(':3009/rechargeDiscount', this.rechargeInfo).then(res => {
        this.getVipInfo()
        this.handleClose()
      })
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var nowDate = year + '-' + month + '-' + day;
      post(':3009/rechargeAmount', { tableInfo: pinyin.getFullChars(this.vipInfo.vipname) + this.vipInfo.phone, rechargeInfo: this.rechargeInfo, date: nowDate, remarks: '充值金额' }).then(res => {
      })

    },
    // 记录
    handleRecord (index, row) {
      this.vipInfo = row
      this.historicalRecord = true
      post(':3009/tableRecord', { tableName: pinyin.getFullChars(row.vipname), phone: row.phone }).then(res => {
        this.tableRecord = res.data
      })
    },
    // 关闭dialog
    handleClose () {
      this.vipVisible = false
      this.dialogVisible = false
      this.rechargeVisible = false
      this.historicalRecord = false

      // 添加会员
      this.params.name = ''
      this.params.phone = ''
      this.params.discount = ''
      this.params.money = ''
      // 消费
      this.consumptionItem = []
      this.consumptionMoney = Number()
      this.balance = Number()
      // 充值
      this.rechargeInfo.id = ''
      this.rechargeInfo.money = Number()
      this.rechargeInfo.discount = Number()
      this.rechargeInfo.surplusMoney = Number()
    },
    // 添加vip
    handleAddVip () {
      this.vipVisible = true
    },
    // 添加新用户
    add () {
      if (this.params.name != '' && this.params.phone != '') {
        postForm(':3009/writeData', this.params).then(res => {
          this.vipVisible = false
          this.getVipInfo()
        })
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var nowDate = year + '-' + month + '-' + day;
        postForm(':3009/createRecordTable', { tableName: pinyin.getFullChars(this.params.name), phone: this.params.phone, money: this.params.money, date: nowDate, remarks: '新开用户' }).then(res => {
        })
        postForm(':3009/initUserRecord', { tableName: pinyin.getFullChars(this.params.name), phone: this.params.phone, money: this.params.money, date: nowDate, remarks: '新开用户' }).then(res => {
        })
      }
    },
    // 获取会员列表
    getVipInfo (curPage, pageSize, searchKey) {
      post(':3009/getvip', { curPage: curPage || 1, pageSize: pageSize || 10, searchKey: searchKey || '' }).then(res => {
        this.tableData = res.data.data
        this.totalSize = res.data.total
      })
    },
    // 分页
    siziChange (val) {
      this.pageSize = val
      this.getVipInfo(this.curPage, this.pageSize)
    },
    currentChange (val) {
      this.curPage = val
      this.getVipInfo(this.curPage, this.pageSize)
    },
    // 搜索
    handleSearch () {
      this.getVipInfo(this.curPage, this.pageSize, this.searchKey)
    },
    // 清空搜索
    handleClear () {
      this.getVipInfo(this.curPage, this.pageSize, this.searchKey)
    },
    // 备份信息
    backupInformation () {
      window.open("http://localhost/phpmyadmin/#PMAURL-2:db_export.php?db=nodesql&table=&server=1&target=&token=480e9bf281759f37d7014b526febcf5b", '_blank');
    }

  },
};
</script>

<style scoped lang="stylus">
.input-with-select {
  width: 300px;
}

.vip {
  // height: 100%;
  padding: 20px;
}

.vipinfo {
  font-size: 22px;
  margin-bottom: 20px;
}

.dictdialog {
  .el-dialog__body {
    padding: 30px 20px !important;
  }
}

.reInput {
  width: 250px;
  margin-bottom: 20px;
}

.hou {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 40px;
  margin-right: 5px;
}

.reWidth {
  text-align: right;
  display: inline-block;
  width: 70px;
}

.retWidth {
  text-align: right;
  display: inline-block;
  width: 50px;
}

.retInput {
  width: 150px;
  margin-bottom: 20px;
}
</style>
