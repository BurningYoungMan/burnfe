<template>
  <div class="vip">
    <el-col :span="24" style="margin-bottom: 20px">
      <el-button type="primary" size="small" @click="handleAddVip">添加会员</el-button>
      <!-- <el-button type="warning" size="small">修改会员</el-button> -->
      <!-- <el-button type="danger" size="small">删除会员</el-button> -->
    </el-col>
    <el-table :data="tableData" border style="width: 100%" height="700">
      <el-table-column type="index" width='48px'>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="date" label="加入日期" width="200">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="会员姓名" width="200">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="会员电话" width="200">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="discount" label="会员折扣" width="200">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="money" label="剩余金额" width="200">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">消费</el-button>
          <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">充值</el-button>
          <el-button size="mini" type="info" @click="handleDelete(scope.$index, scope.row)">记录</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column show-overflow-tooltip prop="address" label="备注">
      </el-table-column> -->
    </el-table>
    <el-pagination style="margin: 0!important; padding: 20px 0!important;" background layout="total,sizes,prev, pager, next, jumper" :total="1000">
    </el-pagination>

    <el-dialog title="消费信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>消费情况</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="充值信息" :visible.sync="rechargeVisible" width="30%" :before-close="handleClose">
      <span>充值情况</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="rechargeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="rechargeVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dictdialog" :close-on-click-modal='false' :close-on-press-escape='false' title="添加会员" :visible.sync="vipVisible" width="420px" :before-close="handleClose">
      <span class="reWidth" style="margin-right:15px;width:55px">姓名</span>
      <el-input class="reInput" v-model="params" placeholder="请输入"><i slot="suffix" class="hou">姓名</i></el-input>
      <span style="font-size: 16px; color: red">*</span>
      <br>
      <span class="reWidth" style="margin-right:15px;width:55px">电话</span>
      <el-input class="reInput" v-model="params" placeholder="请输入"><i slot="suffix" class="hou">电话</i></el-input>
      <span style="font-size: 16px; color: red">*</span>
      <br>
      <span class="reWidth" style="margin-right:15px;width:55px">金额</span>
      <el-input class="reInput" v-model="params" placeholder="请输入"><i slot="suffix" class="hou">元</i></el-input>
      <span style="font-size: 16px; color: red">*</span>
      <br>
      <span class="reWidth" style="margin-right:15px;width:55px">折扣</span>
      <el-input class="reInput" v-model="params" placeholder="请输入"><i slot="suffix" class="hou">折</i></el-input>
      <span style="font-size: 16px; color: red">*</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloses">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { postForm, get, post } from '../../utils/fetch'
export default {
  name: '',
  props: {

  },
  components: {

  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        discount: 8,
        money: 988
      }],
      dialogVisible: false,
      rechargeVisible: false,
      vipVisible: false,
    };
  },
  mounted () {

  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row);
      this.dialogVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.rechargeVisible = true
    },
    handleClose () {
      this.vipVisible = false
    },
    handleAddVip () {
      this.vipVisible = true
      postForm(':3009/writeData', {vipname: '天外荡流云', phone: '1863145'}).then(res => {
        console.log(res)
      })
    },
  },
};
</script>

<style scoped lang="stylus">
.vip {
  // height: 100%;
  padding: 20px;
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
</style>
