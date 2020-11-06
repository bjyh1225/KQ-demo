<template>
  <div style="top: 10px;left: 10px;position: absolute;" class="the-style" @click.stop="1===1">
    <el-popover width="300" trigger="click" placement="top" v-model="visible" :popper-class="identification?'button':''" :popper-options="{boundariesElement:'body'}">
      <el-table :data="collectionData" highlight-current-row @row-click="handleCurrentChange">
        <el-table-column width="300" property="date" :label="$t('service.addIntoTheFavorite')">
          <template slot-scope="scope">
            <i class="el-icon-portal-ic_folder"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <i class="el-icon-portal-duihao1" v-if="scope.row.id==selection"></i>
          </template>
        </el-table-column>
      </el-table>
      <div id="new-build">
        <el-input v-model="newFile" :placeholder="$t('service.newFavoriteFolder')" @focus="showAdd"></el-input>
        <el-button type="primary" @click="addFavoritesCategory()" v-show="showAddData">
          <span class="btn-text">{{$t('service.add')}}</span>
        </el-button>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "ServiceFunctionCollection",
  props: {
    resourceType: {
      type: String,
      default() {
        return 'mapService';
      }
    },
  },
  data() {
    return {
      newFile: "",
      showAddData: false,
      selection: "" ,//控制对勾图标的显示的id
      popoverLeft:0,
      popoverTop:0,
      serviceId:'',
      collectionClassification:[],
      visible:false,
      identification:false//标记弹框到浏览器边框
    };
  },
  computed: {
    collectionData() {
      var arr = [];
      this.collectionClassification.forEach(item => {
        // if (item.parentId != 0) {
        //   arr.push(item);
        // }
        arr.push(item);
      });
      return arr;
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.showAddData = false;
        this.selection = "";
      }
    }
  },
  methods: {
    //收藏
    showCollector() {
      this.visible = true;
      var collectorPop = () => {
        this.visible = false;
        document.body.removeEventListener("click", collectorPop);
      };
      document.body.addEventListener("click", collectorPop);
    },
    //获取收藏分类列表
    getFavoritesCategoryCodeKey(row,type) {
      if(row.event){
        this.serviceId = row.serviceId;//ID
        this.popoverTop =row.event.target.getBoundingClientRect().top;
        this.popoverLeft =row.event.target.getBoundingClientRect().left;
        // this.popoverTop = row.event.currentTarget.getBoundingClientRect().top;
        // this.popoverLeft = event.currentTarget.getBoundingClientRect().left;
        var scrollTop =document.body.scrollTop || document.documentElement.scrollTop;
        this.popoverTop = this.popoverTop + scrollTop + 68;
        var TheStyle = document.getElementsByClassName("the-style");
      if(type){
        this.showCollector();
        if(this.popoverLeft-320<=0){
          this.identification=true;
          TheStyle[0].style.top = (this.popoverTop - 730).toString() + "px"; 
          TheStyle[0].style.left = (this.popoverLeft - 75).toString() + "px";
        }else{
          TheStyle[0].style.top = (this.popoverTop - 730).toString() + "px";
          TheStyle[0].style.left = (this.popoverLeft - 418).toString() + "px";
        }
      }else{
        TheStyle[0].style.top = (this.popoverTop - 450).toString() + "px";
        TheStyle[0].style.left = (this.popoverLeft - 315).toString() + "px";
      }
     }
      this.identification=false;
     
      this.resourceType=row.resourceType;//类型
      // var codeKey='';
      var codeKey=this.resourceType;
      // if(this.resourceType=='mapService'){
      //   codeKey="favorites_mapService";
      // }else if(this.resourceType=='dataService'){
      //   codeKey="favorites_dataService";
      //  }else if(this.resourceType=='functionService'){
      //   codeKey="favorites_functionService";
      // }else if(this.resourceType=='sceneService'){
      //   codeKey="favorites_scene";
      // }else if(this.resourceType=='fileService'){
      //   codeKey="favorites_file";
      // }else if(this.resourceType=='mapbuilder'){
      //   codeKey="favorites_mapbuilder";
      // }else if(this.resourceType=='scenebuilder'){
      //   codeKey="favorites_scenebuilder";
      // }else if(this.resourceType=='bigbuilder'){
      //   codeKey="favorites_bigbuilder";
      // }else if(this.resourceType=='appbuilder'){
      //   codeKey="favorites_appbuilder";
      // }else if(this.resourceType=='data'){
      //   codeKey="favorites_data";
      // }
      this.$api.serviceFunctionApi
        .getFavoritesCategoryCodeKey(
          {
            codeKey: codeKey
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.collectionClassification = res.data.data;
          }
        })
        .catch(() => {});
    },
     //取消收藏
    deleteServiceCollection(row) {
      this.visible = false;
     if(this.resourceType=='mapService'){
         this.$api.serviceFunctionApi
        .deleteServiceCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='dataService'){
         this.$api.serviceDataApi
        .deleteDataServiceCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
       }else if(this.resourceType=='functionService'){
        this.$api.serviceFunctionApi
        .deleteServiceCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='sceneService'){
        this.$api.serviceSceneApi
        .deleteSceneServiceCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='fileService'){
        this.$api.serviceFileCenApi
        .deleteFileCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='data'){
        this.$api.serviceDatacenterApi
        .deletedataCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else{
        this.$api.serviceAppCenterApi
        .deleteAppCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }
       
        
    },
    //收藏
    handleCurrentChange(row) {
      this.selection = row.id;
      this.visible = !this.visible;
      if(this.resourceType=='mapService'){
        this.$api.serviceFunctionApi
        .saveServiceCollection(
          {
            serviceId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='dataService'){
        this.$api.serviceDataApi
        .saveDataServiceCollection(
          {
            serviceId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
       }else if(this.resourceType=='functionService'){
        this.$api.serviceFunctionApi
        .saveServiceCollection(
          {
            serviceId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='sceneService'){
        this.$api.serviceSceneApi
        .saveSceneServiceCollection(
          {
            serviceId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='fileService'){
        this.$api.serviceFileCenApi
        .saveFileCollection(
          {
            fileId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else if(this.resourceType=='data'){
        this.$api.serviceDatacenterApi
        .saveDataCollection(
          {
            dataId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }else{
        this.$api.serviceAppCenterApi
        .saveAppCollection(
          {
            appId: this.serviceId,
            resourceType: this.resourceType,
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.$emit('refreshList');
          }
        })
        .catch(() => {});
      }
      
    },
    showAdd() {
      this.showAddData = true;
    },
    //添加文件夹
    addFavoritesCategory() {
      if (this.newFile == "") {
        this.$message({
          message: this.$t("service.pleaseEnterANameForTheNewFavoriteFolder"),
          type: "warning"
        });
        return;
      }
      this.$api.personalCenterCollectionApi
        .getFavoritesCategoryOnly({
          name: this.newFile,
          codeKey: this.resourceType
        })
        .then(resData => {
          if (!resData.data.data) {
            this.$message({
              message: this.$t("service.Favoritesalreadyadded"),
              type: "warning"
            });
          } else {
            this.$api.personalCenterCollectionApi
              .saveFavoritesCategory(
                {
                  codeKey: this.resourceType,
                  name: this.newFile
                },
                { loadingText: this.$t("service.addingFavorite") }
              )
              .then(res => {      
                this.getFavoritesCategoryCodeKey({ resourceType: this.resourceType });
                if (res.data.status == 200) {
                  this.$message({
                    message: this.$t("service.addedFavoriteSuccessfully"),
                    type: "success"
                  });
                  this.newFile = "";
                }
              })
              .catch(() => {});
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>

/deep/.el-popover:after {
  content: "";
  border-left: solid 8px #ffffff;
  border-top: solid 6px #00800000;
  border-right: solid 0px #00800000;
  border-bottom: solid 6px #00800000;
  position: absolute;
  left: 100%;
  top: 90%;
}
/deep/.button.el-popover:after {
  content: "";
  border-left: solid 8px #ffffff;
  border-top: solid 6px #00800000;
  border-right: solid 0px #00800000;
  border-bottom: solid 6px #00800000;
  position: absolute;
  left: -2.5%;
  top: 90%;
  transform:rotate(180deg);
}
/deep/.el-popover {
  padding: 2px;
  .el-table__body-wrapper {
    overflow-y: auto;
    height: 184px;
    .cell {
      padding-left: 30px;
    }
  }
  .has-gutter {
    .is-leaf {
      text-align: center;
      color: #777778;
      font-size: 16px;
      font-weight: 400;
    }
    .el-table__row td {
      border: none;
    }
  }
  .el-table__row:hover {
    cursor: pointer;
    @include base-active-color();
    background-color: #ffffff;
  }
  .el-button.el-button--primary {
    float: right;
    width: 56px;
    height: 28px;
    padding: 6px 14px;
  }
  #new-build {
    padding: 18px 20px 18px 28px;
    .el-input {
      width: 70%;
      .el-input__inner:hover {
        cursor: pointer;
      }
      .el-input__inner {
        border: none;
        width: 70%;
        height: 28px;
        line-height: 28px;
      }
      .el-input__inner:focus {
        cursor: text;
        border: none;
      }
    }
  }
}
</style>

