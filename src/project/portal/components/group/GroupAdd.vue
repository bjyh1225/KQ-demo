<template>
  <div class="group-add">
    <div class="content">
      <el-form :model="addGroupInfo" :label-width="labelWidth" :rules="rules" ref="groupAddForm">
        <el-row class="title">
          <span>{{$t('myCenter.Basicinfo')}}</span>
        </el-row>
        <el-row class="form-area">
          <el-form-item :label="$t('management.picture')+'：'">
            <el-row class="profile-picture-area" v-if="status=='add'">
              <span class="profile-picture-btn" @click="dialogUploadFun">
                <i class="el-icon-portal-shangchuan"></i>
              </span>
              <span class="divider"></span>
              <el-image
                v-for="item in imgList"
                :src="item.src"
                :key="item.src"
                :class="{'is-active':item.checkStatus}"
                @click="checkedImg(item.src)"
              ></el-image>
            </el-row>
            <el-row class="profile-picture-area" v-else>
              <el-image
                :src="addGroupInfo.headImg"
                class="edit-headimg"
              ></el-image>
              <i class="edit-headimg-btn el-icon-plus" @click="dialogUploadFun"></i>
            </el-row>
          </el-form-item>
          <el-form-item :label="$t('group.Name')+'：'" prop="groupName">
            <el-input class="form-input" v-model="addGroupInfo.groupName" :disabled="editStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('service.label')+'：'" prop="groupTag">
            <el-input class="form-input" v-model="addGroupInfo.groupTag"></el-input>
            <span class="form-input-tips">（{{$t('group.Separatethelabelswithcommas6labelsatmost')}}）</span>
          </el-form-item>
          <el-form-item :label="$t('service.description')+'：'">
            <el-input type="textarea" class="form-textarea" v-model="addGroupInfo.describe"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="title">
          <span>{{$t('group.Whoisallowedtojointhegroup')}}？</span>
        </el-row>
        <el-row class="form-area">
          <el-form-item :label="$t('group.Waystojoingroup')+'：'">
            <el-radio-group v-model="addGroupInfo.groupEnterType">
              <el-radio :label="3">{{$t('group.Everyone')}}</el-radio>
              <el-radio :label="2">{{$t('group.NeedIDverification')}}</el-radio>
              <el-radio :label="1">{{$t('group.None')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="title">
          <span>{{$t('group.Whocanviewthedetailsofthegroup')}}？</span>
        </el-row>
        <el-row class="form-area">
          <el-form-item :label="$t('group.Publicgroup')+'：'">
            <el-checkbox v-model="addGroupInfo.groupType">{{$t('group.Allownongroupmemberstoviewthedetailsofthegroup')}}</el-checkbox>
          </el-form-item>
        </el-row>
        <el-row class="title">
          <span>{{$t('group.Whocancontributeresourcestothisgroup')}}？</span>
        </el-row>
        <el-row class="form-area">
          <el-form-item :label="$t('group.Resourcecontributor')+'：'">
            <el-radio-group v-model="addGroupInfo.groupContributeType">
              <el-radio :label="1">{{$t('webAppBuilder.Creator')}}</el-radio>
              <el-radio :label="2">{{$t('group.Allmembers')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="add-btn">
          <el-button
            class="base-white-btn"
            @click="cancel"
          >{{$t('myCenter.cancel')}}</el-button>
          <el-button
            class="base-btn"
            icon="el-icon-portal-qunzu"
            @click="saveAdd"
            v-if="status=='add'"
          >{{$t('group.Creategroup')}}</el-button>
          <el-button
            class="base-btn"
            type="primary"
            @click="saveAdd"
            v-else
          >{{$t('visualization.Save')}}</el-button>
        </el-row>
      </el-form>
    </div>
    <upload-clipping
      ref="dialogUpload"
      @UploadBlackFun="UploadBlackFun"
      :dialogTitleUpload="dialogTitleUpload"
      :recommendShow="false"
      :raduis="true"
      :autoCropWidth="52"
      :autoCropHeight="52"
      :fileRule="{
          tips: $t('service.OnlyJPGPNGFilesUploadedSizeLess1MB'),
          size: 300
        }"
    ></upload-clipping>
  </div>
</template>

<script>
import UploadClipping from "components/common/uploadClipping/UploadClipping";
export default {
  name: "GroupAdd",
  components: {
    UploadClipping
  },
  props: {
    addGroupInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    groupInfo:{
      type: Object,
      default: () => {
        return {};
      }  
    },
    status:{
      type:String,
      default:'add'
    },
    activeName:{
      type:String,
      default:''
    }
  },
  watch:{
    activeName(){
      if(this.activeName=='add'){
        this.imgList=[
          {
            src:
              "/config/imageConfig/system/defaultGroupProfilePicture/defaultGroup1.png",
            checkStatus: true
          },
          {
            src:
              "/config/imageConfig/system/defaultGroupProfilePicture/defaultGroup2.png",
            checkStatus: false
          },
          {
            src:
              "/config/imageConfig/system/defaultGroupProfilePicture/defaultGroup3.jpg",
            checkStatus: false
          }
        ];
        if(this.status=='edit'){
          this.editStatus=true;
          Object.keys(this.addGroupInfo).forEach(key=>{
            this.addGroupInfo[key]=this.groupInfo[key];
          })
          this.addGroupInfo.createBy=this.groupInfo.createBy;
          this.addGroupInfo.id=this.groupInfo.id;
          if(this.addGroupInfo.groupType==1){
            this.addGroupInfo.groupType=true;
          }
          else{
            this.addGroupInfo.groupType=false;
          }
        }
        else{
          this.editStatus=false;
        }
      }
    }
  },
  data() {
    var checkTag = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('group.Pleaseenterthelabel')));
      } else {
        if (value.length > 100) {
          return callback(new Error(this.$t('group.Thecharactersofthelabelexceedthelength')));
        }
        var nums = value.split(",");
        if (nums.length > 6) {
          return callback(new Error(this.$t('group.Sixlabelsareallowedatmost')));
        }
        return callback();
      }
    };
    var checkGroupName = (rule, value, callback) => {
      if(this.status=='edit'){
        return callback();
      }
      if (!value) {
        return callback(new Error(this.$t('group.Pleaseenterthenameofthegroup')));
      } else {
        if (value.length > 50) {
          return callback(new Error(this.$t('group.Thenameexceedsthelength')));
        }
        this.$api.groupApi
          .validateGroupName(
            {
              groupName: value
            },
            {
              loadingText: this.$t("service.searching")
            }
          )
          .then(res => {
            if (res.data.data) {
              return callback();
            } else {
              return callback(
                this.$t('group.Thegroupnamed')+'"' + value + '"'+this.$t('group.alreadyexistsYoucantcreateitrepeatedly')
              );
            }
          })
          .catch(() => {});
      }
    };
    return {
      editStatus:false,
      dialogTitleUpload: this.$t("management.AddPicture"),
      labelWidth: "120px",
      imgList: [],
      rules: {
        groupName: [
          {
            required: true,
            validator: checkGroupName,
            trigger: "blur"
          }
        ],
        groupTag: [{ required: true, validator: checkTag, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 头像上传
    dialogUploadFun() {
      this.$refs.dialogUpload.dialogUploadShow();
    },
    // 上传返回值
    UploadBlackFun(val) {
      this.imgList.forEach(item => {
        item.checkStatus = false;
      });
      this.imgList.push({
        src: `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`,
        checkStatus: true
      });
      this.addGroupInfo.headImg=`/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
    },
    goToList() {
      this.$emit("goToList");
      this.$refs.groupAddForm.clearValidate();
    },
    saveAdd() {
      this.$refs.groupAddForm.validate(valid => {
        if (valid) {
          if(!this.addGroupInfo.headImg){
            this.imgList.forEach(item => {
              if (item.checkStatus) {
                this.addGroupInfo.headImg = item.src;
              }
            });
          }
          this.$emit("saveAdd");
        } else {
          return false;
        }
      });
    },
    checkedImg(src) {
      this.imgList.forEach(item => {
        if (item.src == src) {
          item.checkStatus = true;
        } else {
          item.checkStatus = false;
        }
      });
    },
    cancel(){
      this.$emit('cancelEdit');
    }
  }
};
</script>

<style lang="scss" scoped>

.group-add {
  padding: 15px 2%;
  background: #f5f5f5;
  .content {
    border: 1px solid #dfdfdf;
    box-shadow: 0px 0px 3px #dfdfdf;
    padding: 0 70px;
    background: #fff;
    .title {
      margin-top: 15px;
      border-bottom: 1px solid #dfdfdf;
      height: 40px;
      line-height: 40px;
      @include base-color();
      font-size: 16px;
      span {
        @include dialog-title($width: 2px);
        padding: 0 10px 10px 10px;
      }
    }
    .form-area {
      margin-top: 15px;
      //头像区域
      .profile-picture-area {
        height: 52px;
        position: relative;
        .el-image {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          margin-right: 30px;
          cursor: pointer;
        }
        .edit-headimg-btn{
          opacity:0;
          display: block;
          width: 52px;
          height: 52px;
          line-height:52px;
          border-radius: 50%;
          background:#dee0e7;
          font-size:20px;
          color:#fff;
          text-align: center;
          position:absolute;
          top:0;
          left:0;
          cursor: pointer;
          &:hover{
            opacity:1;
          }
        }
        .el-image.is-active {
          border: 2px solid #19ffe7;
          box-shadow: 0px 1px 4px #ccc;
        }
        .profile-picture-btn {
          display: inline-block;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #b7b7b7;
          cursor: pointer;
          color: #fff;
          position: relative;
          i {
            position: absolute;
            font-size: 30px;
            display: inline-block;
            height: 30px;
            width: 30px;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
          }
        }
        .divider {
          display: inline-block;
          height: 52px;
          background: #ddd;
          width: 1px;
          margin-left: 40px;
          margin-right: 30px;
        }
      }
      .form-input {
        width: 400px;
      }
      .form-textarea {
        width: 700px;
      }
      .form-input-tips {
        color: #606266;
      }
    }
    .add-btn {
      margin-bottom: 15px;
      border-top: 1px solid #dfdfdf;
      padding-top: 15px;
    }
  }
}
</style>