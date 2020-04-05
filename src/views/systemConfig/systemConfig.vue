<template>
  <div id="dictionaryTable">
    <div class="top">
      <el-button size="small" type="primary" @click="handleAddItem">新增</el-button>
      <el-button size="small" type="danger" @click="handleDelete">删除</el-button>
    </div>
    <div class="Domain">
      <p class='bigTitle'>充值折扣</p>
      <el-checkbox-group v-model="DomainCheckList">
        <!-- <el-checkbox class="width170" v-for="item in Domain" :key="item.id" :label="item.id"  :title="item.i18nValue" >{{item.i18nValue}}</el-checkbox> -->
        <el-checkbox class="width170">1000元(八五折)</el-checkbox>
        <el-checkbox class="width170">2000元(八折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
        <el-checkbox class="width170">5000元(七折)</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="Domain">
      <p class='bigTitle'>服务项目</p>
      <el-checkbox-group v-model="DomainCheckList">
        <!-- <el-checkbox class="width170" v-for="item in Domain" :key="item.id" :label="item.id"  :title="item.i18nValue" >{{item.i18nValue}}</el-checkbox> -->
        <el-checkbox class="width170">头部按摩(50元)</el-checkbox>
        <el-checkbox class="width170">拔罐(30元)</el-checkbox>
        <el-checkbox class="width170">针灸(50元)</el-checkbox>
        <el-checkbox class="width170">头部按摩(50元)</el-checkbox>
        <el-checkbox class="width170">头部按摩(50元)</el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog class="dictdialog" :close-on-click-modal='false' :close-on-press-escape='false' title="新增" :visible.sync="addVisible" width="420px" :before-close="handleClose">
      <span class="reWidth" style="margin-right:15px;width:55px">类型</span>
      <el-select class="reInput" v-model="typeValue" placeholder="请选择" @change="typeChange">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
import { get, postForm, post } from "../../utils/fetch";
export default {
  name: "dictionaryTable",
  components: {
  },
  data () {
    return {
      headers: {
        token: sessionStorage.getItem('token')
      },
      url: ip,
      icon: {
        name: '',
        fileType: 'icon'
      },
      isIcon: false,
      positionGrade: '',
      isPosition: false,
      // 名称
      params: '',
      // 类型下拉
      typeOptions: [{
        value: '选项1',
        label: '充值折扣'
      }, {
        value: '选项2',
        label: '服务项目'
      }],
      typeValue: '',
      options: [],
      sortValue: '',
      // 新增选项弹窗
      addVisible: false,
      // 域选中
      DomainCheckList: [],
      // 域数据
      Domain: [],
      // 连接方式
      ConnectionCheckList: [],
      Connection: [],
      // 负载策略
      LoadBalancingCheckList: [],
      LoadBalancing: [],
      // 职位名称
      PositionCheckList: [],
      Position: [],
      // 资源类型
      ResourceTypeCheckList: [],
      ResourceType: [],
      // 品牌
      BrandCheckList: [],
      Brand: [],
      // 软件类型
      SoftwareTypeCheckList: [],
      SoftwareType: [],
      // 许可分类
      ClassificationOfLicenseCheckList: [],
      ClassificationOfLicense: [],
      // 软件图标
      SoftwareIconsCheckList: [],
      SoftwareIcons: [],
      // 操作系统
      OperatingSystemCheckList: [],
      OperatingSystem: [],
      fileList: [],

      //知识问题类型
      knowledgeproblemsList: [],
      knowledgeproblems: [],

      TrainingMaterialsList: [],
      TrainingMaterials: [],
    };
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    // 重置
    resetData () {
      this.typeOptions = []
      this.typeValue = ''
      this.options = []
      this.sortValue = ''
      this.params = ''
      this.positionGrade = ''
      this.isPosition = false
      this.isIcon = false
      this.icon.name = ''
    },
    success (res, file) {
      console.log(res)
      if (res.code == 200) {
        this.$message.success(res.message);
        this.getData()
      } else {
        this.$message.error(res.message);
      }
    },
    // 添加
    add () {
      if (this.isIcon) {
        console.log(this.isIcon)
        this.submitUpload()
        this.getData()
        this.resetData()
      } else {
        postForm(':9001/dictionary/saveDictionary', { rank: this.positionGrade, typeKey: this.sortValue, value: this.params }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message.success(res.data.message);
            this.getData()
            this.resetData()
          } else {
            this.$message.error(res.data.message);
          }
        })
      }
      this.addVisible = false
      this.resetData()
    },
    handleCloses () {
      this.resetData()
      this.addVisible = false
    },
    // 分类change
    sortChange (val) {
      console.log(val)
      val == 'application_icon' ? this.isIcon = true : this.isIcon = false
    },
    // 类型change
    typeChange (val) {
      val == 'position' ? this.isPosition = true : this.isPosition = false
      postForm(':9001/dictionary/getNodes', { typeKey: val }).then(res => {
        console.log(res)
        this.options = []
        this.sortValue = ''
        this.options = res.data.data
      })
    },
    clear () {
      this.DomainCheckList = []
      this.ConnectionCheckList = []
      this.LoadBalancingCheckList = []
      this.PositionCheckList = []
      this.ResourceTypeCheckList = []
      this.BrandCheckList = []
      this.SoftwareTypeCheckList = []
      this.ClassificationOfLicenseCheckList = []
      this.OperatingSystemCheckList = []
      this.knowledgeproblemsList = []
      this.TrainingMaterialsList = []
    },
    // 删除
    handleDelete () {





      var arr = this.DomainCheckList.concat(this.ConnectionCheckList,
        this.LoadBalancingCheckList,
        this.PositionCheckList,
        this.ResourceTypeCheckList,
        this.BrandCheckList,
        this.SoftwareTypeCheckList,
        this.ClassificationOfLicenseCheckList,
        this.OperatingSystemCheckList,
        this.knowledgeproblemsList,
        this.TrainingMaterialsList)
      var img = this.SoftwareIconsCheckList.join(',')
      console.log(this.SoftwareIconsCheckList)
      if (arr.length == 0 && this.SoftwareIconsCheckList.length == 0) {
        //  this.$message.error(this.$t('message.PleaseSelectAtLeastOneItem'));
      } else {
        postForm(':9001/dictionary/deleteDictionary', { ids: arr.join(','), iconIds: img }).then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.message);
            this.getData()
            this.clear()
          } else {
            this.$message.error(res.data.message);
          }
        })
      }

      // post(':9001/icon/deleteImg', { ids: img }).then(res => {
      //   this.$message(res.data.message);
      //   this.getData()
      // })
    },
    // 增加
    handleAddItem () {
      this.addVisible = true
      post(':9001/dictionary/getNodes').then(res => {
        console.log(res)
        this.typeOptions = res.data.data
        this.options = []
        this.getData()
      })
    },
    // 关闭弹窗
    handleClose (done) {
      this.resetData()
      done();
    },
    //   加载
    init () {
      this.getData()
    },
    //   获取数据
    getData () {
      post(':9001/dictionary/dataList').then(res => {
        var data = res.data.data
        this.Domain = data.domainTypeList
        this.Connection = data.appConnectionTypeList
        this.LoadBalancing = data.loadLevelingList
        this.Position = data.positionTypeList
        this.ResourceType = data.hardwareTypeList
        this.Brand = data.hardwareBrandList
        this.SoftwareType = data.appTypeList
        this.ClassificationOfLicense = data.licensePatternList
        this.OperatingSystem = data.osTypeList
        this.knowledgeproblems = data.knowledgeProblemTypeList
        this.TrainingMaterials = data.trainingMaterials
      })
      postForm(':9001/resourceFile/getFileListByFileType', { fileType: 'icon' }).then(res => {
        console.log(res)
        this.SoftwareIcons = res.data.data
      })
    }
  }
};
</script>

<style scoped lang="stylus">
.hou {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 40px;
  margin-right 5px
}

#dictionaryTable {
  padding: 20px;
}

.bigTitle {
  font-size: 16px;
  font-weight: 600;
  padding: 21px 0 0 0;
}

.littleTitle {
  font-size: 14px;
  font-weight: 600;
  padding: 6px 0px;
  color: #409EFF;
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

.reWidth {
  text-align: right;
  display: inline-block;
  width: 70px;
}

.upload-demo {
  margin-left: 90px;
}
</style>
