<template>
  <div class="manage-dialog">
    <el-dialog :visible.sync="dialogVisible" width="620px" :modal="true" :before-close="handleClose">
      <template slot="title">
        <div class="dialog-title">
          <span>{{title}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <!-- <el-form :model="clusterform" ref="clusterform_ref" :rules="userRules" label-width="135px"> -->
        <el-form :model="clusterform" ref="clusterform_ref" :rules="clusterRules" label-width="135px">
          <el-row v-show="false">
            <el-col :span="24">
              <el-form-item label="节点类型：" style="width:100%">
                <el-select v-model="clusterform.nodeType" :disabled="isAdd" placeholder="请选择类型">
                  <el-option v-for="(item,index) in typeList" :key="index" :label="item.alias" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="节点名称：" prop="name">
                <el-input v-model="clusterform.name" v-show="!isAdd"></el-input>
                <span v-show="isAdd">{{clusterform.name}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>  
            <el-col :span='24'>
              <el-form-item :label="$t('clusterManager.nodeTag_label')" prop="tags">
                <el-select :showArrow="false" class="serviceKeyClass" popperClass="serviceKey_ips"  :disabled="isAdd" v-model="clusterform.tags" clearable multiple filterable allow-create default-first-option :placeholder="$t('clusterManager.nodeTag_placeholder_label')">
               </el-select>
            </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="24">
              <el-form-item label="节点标签：" prop="tags">

                <!-- <div v-show="!isAdd"> -->
                <el-input v-show="!isAdd" v-model="inputValue" ref="saveTagInput"
                  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="width: 284px"">
                </el-input>
                <el-button v-show=" !isAdd" class="base-btn" style="margin-left:10px" @click="handleInputConfirm">+
                  添加标签</el-button>
                  <el-tag v-for="(tag,index) in clusterformTags" :key="index" :closable="!isAdd"
                    :disable-transitions="false" @close="handleCloseTag(tag)">{{tag}}</el-tag>
                  <!-- </div> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="节点地址：" prop="adress">
                <el-input v-model="clusterform.adress" v-show="!isAdd" placeholder="输入地址(ip:端口)，如（172.168.0.1:8888）">
                </el-input>
                <span v-show="isAdd">{{clusterform.adress}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row v-show="clusterform.nodeType=='2'">   -->
          <el-row v-show="false">
            <el-col :span="24">
              <el-form-item label="集群地址：" prop="clasterAdress">
                <!-- <el-input v-model="clusterform.clasterAdress" ></el-input> -->
                <el-select v-model="clusterform.clusterAdress" :disabled="isAdd" placeholder="请选择集群节点地址">
                  <el-option v-for="(item,index) in clusterList" :key="index" :label="item.alias"
                    :value="item.instanceId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="base-btn" @click="nodesControl">确定
        </el-button>
        <el-button class="base-white-btn" @click="cancle">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //import { defaultProfilePicture1,defaultProfilePicture2,defaultProfilePicture_jpg} from "../img/";
  export default {
    name: "ClusterManageDialog",
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      formData: {
        nodeType: String,
        name: String,
        adress: String,
        clusterAdress: String,
        tags: []
      },
      type: String
    },
    methods: {
      handleClose() {
        this.$emit("dialogClose");
      },

      handleCloseTag(tag) {
        this.clusterformTags.splice(this.clusterformTags.indexOf(tag), 1);
      },

      showInput() {
        if (this.clusterformTags.length >= 3) {
          this.$message({
            type: "warning",
            message: "最多添加三个标签"
          });
          this.inputVisible = false;
          return;
        } else {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        }
      },

      handleInputConfirm() {
        if (!this.clusterformTags) {
          this.clusterformTags = [];
        }
        if (this.clusterformTags.length >= 3) {
          this.$message({
            type: "warning",
            message: "最多添加三个标签"
          });
          return;
        } else {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.clusterformTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = "";
        }
      },
      /*  handleItemChange(val)
      {
       //var labels =  this.$refs["cascaderAddr"].currentLabels;
       // alert(val);
      },
      //检查密码是否改动
      checkPs()
      {
        this.isWordChange = true;
      },*/
      //过滤超级管理员和游客
      filterSysAdmin: function (item) {
        if (item.id != "1" && item.id != "4") {
          return !!item;
        } else {
          item = null;
        }
      },
      //过滤游客
      filterGuestUser: function (item) {
        if (item.id != "4") {
          return !!item;
        } else {
          item = null;
        }
      },
      //获取网关列表
      getGateWayList() {
        /*if(!localStorage.getItem("userManagerUrl"))
        {
          return
        }*/
        let that = this;
        this.$api.clusterManageApi.getNodes({
          data: { nodeType: 1 }
        })
          .then(data => {
            if (data.data.code == "200") {
              that.clusterList = data.data.data;
              for (var i = 0; i < that.clusterList.length; i++) {
                //alias
                that.clusterList[i].alias =
                  that.clusterList[i].ipAddress + ":" + that.clusterList[i].port;
              }
            } else {
              if (data.data.msg) {
                this.$message({
                  type: "error",
                  message: "data.msg"
                })
              }
            }
          })
          .finally(() => { });
      },
      //添加节点(注册新节点)
      addNode() {
        let that = this;
        if (that.clusterform.nodeType == "1") {
          this.$message({
            type: "warning",
            message: "暂时不支持添加网关节点"
          });
          return;
        }
        let tags_string = "";
        if (that.clusterformTags.length == 0) {
          that.clusterformTags = [];
        }
        for (var i = 0; i < that.clusterformTags.length; i++) {
          tags_string = tags_string + that.clusterformTags[i] + ",";
        }
        tags_string = tags_string.substr(0, tags_string.length - 1);
        this.$api.clusterManageApi.registerNode({
          data: {
            nodeType: that.clusterform.nodeType,
            ipAddress: that.clusterform.adress.split(":")[0],
            port: that.clusterform.adress.split(":")[1],
            serviceAlias: that.clusterform.name,
            // serviceName:that.clusterform.name,
            //tags:that.clusterformTags
            tags: tags_string
          }
        })
          .then(data => {
            if (data.data.code == "200") {
              this.$emit("conform");
            } else {
              if (data.data.msg) {
                this.$message({
                  type: "error",
                  message: "data.msg"
                })
              } else {
                this.$message({
                  type: "error",
                  message: "连接远程服务器失败，请检查总服务是否启动"
                });
              }
            }
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: ""
            });
          });
      },
      //添加或者编辑用户(确定按钮的点击事件)
      nodesControl() {
        this.$refs["clusterform_ref"].validate(valid => {
          if (valid) {
            if (this.title == "添加节点") {
              this.addNode();
            } else {
              //  this.editNode();
              // this.$emit("conform");
              this.$emit("dialogClose");
              //this.dialogVisible = false;
            }
          } else {
            return false;
          }
        });
      },
      //取消按钮点击事件
      cancle() {
        // this.dialogVisible = false;
        this.$emit("dialogClose");
        // this.$emit("conform");
      }
    },
    data() {
      var checkAdress = (rule, value, callback) => {
        let p = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):\d{0,5}$/

        if (value === '') {
          callback(new Error('请输入地址'));
        } else if (!p.test(value)) {

          callback(new Error('请输入正确的节点地址'));
        } else {
          callback();
        }
      };
      return {
        addUserLabel: "添加节点", //新增用户
        isWordChange: false, //是否修改密码
        isDisable: false, //用户名是否可以输入
        checked: false,
        clusterList: [], //集群地址列表
        typeList: [], //节点类型列表
        oldPassword: "", //旧密码
        currenRole: "", //选中行角色
        title: "添加节点",
        //adressTestString:'^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):\d{0,5}$',
        clusterform: {
          nodeType: String,
          name: String,
          adress: String,
          clusterAdress: String,
          tags: []
          // tag:""       //标签
        },
        inputVisible: false,
        inputValue: "",
        clusterformTags: [],
        clusterRules: {
          name: [
            {
              required: true,
              message: "请输入节点名称",
              trigger: "blur"
            },
            {
              max: 20,
              message: "最多20个字符",
              trigger: "blur"
            }
          ],
          adress: [
            {
              required: true,
              message: "请输入地址",
              trigger: ["blur", "change"]
            }, { validator: checkAdress, trigger: 'blur' }
            // {validator:this.$isIPAndPortadress(this.$t('clusterManager.nodeAdress_rule_format_content')) , trigger: "blur" }
          ]
        },
        formLabelWidth: "120px"
      };
    },
    computed: {
      isAdd: function () {
        if (this.type == "add") {
          return false;
        } else if (this.type == "edit") {
          return true;
        }
      }
    },
    mounted: function () {
      // this.getRoleList();
      var option_clusterType = {
        id: 1,
        alias: "集群网关"
      };
      this.typeList.push(option_clusterType);
      var option_gisServerType = { id: 2, alias: "GISServer" };
      this.typeList.push(option_gisServerType);
    },
    created: function () {
      /* var modulePath = this.$store.getters.getModulName;
       var moduleName =  modulePath.split('/')[modulePath.split('/').length-1];
        if(sessionStorage.getItem("userManagerUrl") && moduleName=="manage")
        {
            this.getRoleList();
        }*/
      this.getGateWayList();
      if (this.type === "edit") {
        // this.clusterform = this.formData;
        //this.clusterform.nodeType = this.formData.data.type;
        this.clusterform.nodeType = "2";
        this.clusterform.name = !this.formData.data.serviceAlias
          ? this.formData.data.serviceName
          : this.formData.data.serviceAlias;
        this.clusterform.adress =
          this.formData.data.ipAddress + ":" + this.formData.data.port;
        this.clusterform.clusterAdress = this.formData.data.parentId;
        this.clusterform.tags = this.formData.data.tags;
        this.clusterformTags = this.formData.data.tags.slice();
        this.title = "节点详情";
        // this.isDisable = true;
        // this.isWordChange =true;
      } else if (this.type === "add") {
        this.clusterform = {};
        this.clusterformTags = [];
        this.title = "添加节点";
        // this.isDisable = false;
        // this.checked=false;
        // this.isWordChange = false;
      }
    },
    watch: {
      type: function (val) {
        if (val === "edit") {
          // this.clusterform.nodeType = this.formData.data.type;
          this.clusterform.nodeType = "2";
          this.clusterform.name = !this.formData.data.serviceAlias
            ? this.formData.data.serviceName
            : this.formData.data.serviceAlias;
          this.clusterform.adress =
            this.formData.data.ipAddress + ":" + this.formData.data.port;
          this.clusterform.clusterAdress = this.formData.data.parentId;
          this.clusterform.tags = this.formData.data.tags;
          this.clusterformTags = this.formData.data.tags.slice();
          this.title = "节点详情";
          //this.isDisable = true;
          //this.sWordChange =true;
        } else if (val === "add") {
          this.clusterform = {};
          this.clusterformTags = [];
          this.title = "节点详情";
          // this.isDisable = false;
          // this.checked=false;
          // this.isWordChange = false;
        }
      },
      "$i18n.locale": function () {
        this.typeList = [];
        var option_clusterType = {
          id: 1,
          alias: "集群网关"
        };
        this.typeList.push(option_clusterType);
        var option_gisServerType = { id: 2, alias: "GISServer" };
        this.typeList.push(option_gisServerType);
      },
      formData: function (val) {

        if (this.title === "节点详情") {
          //this.clusterform = val;
          // this.clusterform.nodeType = val.data.type;
          this.clusterform.nodeType = "2";
          this.clusterform.name = !val.data.serviceAlias
            ? val.data.serviceName
            : val.data.serviceAlias;
          this.clusterform.adress = val.data.ipAddress + ":" + val.data.port;
          this.clusterform.clusterAdress = val.data.parentId;
          this.clusterform.tags = val.data.tags;
          this.clusterformTags = val.data.tags.slice();
        }
      },
      dialogVisible: function (val) {
        this.addUserLabel = '添加节点';
        if (val) {
          ///   this.getRoleList();
        }
        if (this.type === "edit") {
          this.title = "节点详情";
        } else if (this.type === "add") {
          this.clusterform = {};
          this.clusterformTags = [];
          this.title = "添加节点";
        }
        this.$nextTick(() => {
          this.$refs["clusterform_ref"].clearValidate();
        });
      }
    }
  };
</script>

<style lang='scss' scoped>
  

  .manage-dialog {
    /deep/.el-dialog__body {
      padding: 30px 40px;
    }

    .dialog-body {
      // @include manage-border($types:('bottom'));
      border-bottom: 1px solid #ebeef5;

    }

    .dialog-title {
      padding-bottom: 20px;

      @include manage-border($types:('bottom'));

      span {
        @include dialog-title($width:2px);
        padding-bottom: 18px;

      }
    }

    .profile-picture {
      height: 50px;
      line-height: 50px;

      .profile-picture-add {
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #dee0e7;
        cursor: pointer;
      }

      .pic-checked {
        border: 2px solid #19ffe7;
        box-shadow: 0px 1px 4px #ccc;
      }

      .el-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 40px;
        cursor: pointer;
      }

      .el-col {
        height: 50px;
        line-height: 50px;
        padding: 0 28px;
      }

      .el-col:not(:last-child) {
        //  @include manage-border($types:('right'));
      }
    }

    /deep/ .el-select {
      width: 100%;
    }

    /deep/ .el-tag+.el-tag {
      margin-left: 10px;
    }



    /deep/ .el.dialog__footer {
      border-top: 1px solid #000 !important;
    }

    /deep/ .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
</style>