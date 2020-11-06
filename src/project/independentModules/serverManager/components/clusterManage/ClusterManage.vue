<template>
  <!-- <div class="clusterManager" v-if="Menue.secondMenueItem.topographicMap"> -->
  <div class="clusterManager">
    <!--操作按钮-->
    <div class="mask">
      <el-row class="oprationButtons">
        <!-- <el-col :span="3"></el-col> -->
        <el-col :span="4" :offset="3" style="min-width:100px">
          <p>
            <el-tooltip content="设置均衡策略" placement="bottom" effect="light">
              <el-button class="kqserver-strategy1 base-btn" @click="modifyEquilibriumStrategy()" size="small" circle>
              </el-button>
            </el-tooltip>
            <el-tooltip content="添加节点" placement="bottom" effect="light">
              <el-button class="kqserver-tianjiafuwuqi base-btn" @click="addNode()" size="small" circle>
              </el-button>
            </el-tooltip>
          </p>
        </el-col>

        <!-- 没有搜索框的界面-->
        <el-col :span="15">
          <p class="directionButtons" style="float:right">
            <el-button size="small" class="kqserver-shangjiantouxiangshangxianxing base-btn"
              @click="changeDirection('UD')" circle></el-button>
            <el-button size="small" class="kqserver-shangjiantouxiangshangxianxing1 base-btn"
              @click="changeDirection('DU')" circle></el-button>
            <el-button size="small" class="kqserver-right base-btn" @click="changeDirection('LR')" circle>
            </el-button>
            <el-button size="small" class="kqserver-zuojiantouxiangzuoxianxing base-btn" @click="changeDirection('RL')"
              circle></el-button>
          </p>
        </el-col>
        <el-col :offset="2"></el-col>

        <!--  有模糊搜素功能的界面
      <el-col :span="12">
      <p  class="directionButtons" style="float:left" >
      <el-button type="primary" size="small" class="kqserver-shangjiantouxiangshangxianxing" @click="changeDirection('UD')" circle></el-button>
      <el-button type="primary" size="small" class="kqserver-shangjiantouxiangshangxianxing1" @click="changeDirection('DU')" circle></el-button>
      <el-button type="primary" size="small" class="kqserver-right" @click="changeDirection('LR')" circle></el-button>
      <el-button type="primary" size="small" class="kqserver-zuojiantouxiangzuoxianxing" @click="changeDirection('RL')" circle></el-button>
      </p>
    </el-col>
    <el-col :span="5" >
      <p>
      <el-input :placeholder="$t('serverManage.searchText_placeholder')" v-model="searchNodeText" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchNodeByText"></el-button>
        </el-input>
      </p>
    </el-col>
    <el-col :offset="2">
      </el-col>-->
      </el-row>
      <!--标题-->
      <el-row class="titleRow">
        <el-col :span="24" class="titleLabel">
          <b>集群管理拓扑图</b>
        </el-col>
      </el-row>
    </div>
    <!--拓扑图-->
    <el-row>
      <div class="netWorkRow">
        <div id="mynetwork" ref="netWork" class="mynetwork">
          <!-- <el-button v-if="nodeStatus" class="kqserver-shanchu1 " @click="deleteNode()" size="small" circle>

          </el-button> -->
        </div>
        <template v-for="(item,index) in getNodesId">
          <el-button style="display: none; margin: 0;" v-bind:key="index"
            :style="{top:defaultPositionY[index] + 'px',left:defaultPositionX[index] + 'px'}"
            class="delNode kqserver-shanchu1 base-btn-del" @click="deleteNode(index)" size="small" circle>
          </el-button>
        </template>
        <!-- <button v-show="false" @click="changedata">changedata</button> -->
      </div>
    </el-row>
    <cluster-manage-dialog v-if="dialogVisible" :dialogVisible="dialogVisible" :type.sync="type"
      :formData.sync="nodeData" @dialogClose="dialogClose" @conform="initNodes"></cluster-manage-dialog>
    <cluster-manage-equilibrium-dialog :equilibriumDialogVisible="equilibriumDialogVisible"
      @equilibriumDialogClose="equilibriumDialogClose"></cluster-manage-equilibrium-dialog>
  </div>
</template>

<script>
  import vis from "./vis/vis-network.min.js";
  import "./vis/vis-network.min.css";
  import ClusterManageDialog from "./ClusterManageDialog.vue";
  import ClusterManageEquilibriumDialog from "./ClusterManageEquilibriumDialog.vue";
  export default {
    name: "clusterManager",
    components: {
      ClusterManageDialog,
      ClusterManageEquilibriumDialog
    },
    data: function () {
      return {
        defaultHeight: "380px",
        type: "add",
        dialogVisible: false,
        nodeData: {},
        nodes: [],
        edges: [],
        nodeDataset: null,
        edgesDataset: null,
        network: null,
        nodeStatus: false,
        slectNode: null,
        direction: "UD",
        label_userDefine: "ccccccadg惆怅长岑长",
        searchNodeText: "",
        equilibriumDialogVisible: false, //修改均衡策略
        cycleName: "cycle",
        nodesBorder: [],
        defaultPositionX: [],
        defaultPositionY: [],
        getNodesId: [],
        delStatus: {},
        nowStatus: false,
      };
    },
    methods: {
      //销毁network
      destroyNetwork() {
        if (this.network !== null) {
          this.network.destroy();
          this.network = null;
        }
      },
      //设置数据(测试数据)
      /* setData:function()
     {
       this.nodes = [];
       this.edges = [];
       var connectionCount = [];
       let data ={aa:"aaa",bb:"bbb",cc:"ccccc"}
        this.nodes.push({id:0,gg:data,label:"<b>集群网关</b>\n\n地址：172.16.0.72:8699", shape: "box",color: "#409eff",widthConstraint: { minimum: 120 },heightConstraint:{minimum:80},font:{color:'white',align:'left',size:16,multi:'html'}  });
       for(var i=1;i<5;i++)
       {
         this.nodes.push({id:i+"cc",gg:data,label:"<b>GIS服务器</b>\n\n<b>名称：</b>\n\n<b>地址：</b><i>172.16.0.72:8699</i>", shape: "box",color:this.randomRgbColor(),widthConstraint: { minimum: 120 },heightConstraint:{minimum:80},font:{color:'white',align:'left',size:16,vadjust:0,multi:'html',mono:{vadjust:10}},margin:{top:10,bottom:10}   });
       }
        this.edges.push({ from: 0, to: 1+"cc" , arrows: "to"});
        this.edges.push({ from: 0, to: 2+"cc", arrows: "to"});
        this.edges.push({ from: 0, to: 3+"cc" , arrows: "to"});
        this.edges.push({ from: 0, to: 4+"cc" , arrows: "to"});
  
         this.nodes[0]["level"] = 0;
         this.nodes[1]["level"] = 1;
         this.nodes[2]["level"] = 1;
         this.nodes[3]["level"] = 1;
         this.nodes[4]["level"] = 1;
  
          this.nodeDataset = new vis.DataSet(this.nodes)
          this.edgesDataset = new vis.DataSet(this.edges) 
     },*/

      initData: function () {
        let that = this;
        this.nodes = [];
        this.edges = [];
        this.$api.clusterManageApi.getNodes()
          .then(data => {
            if (data.data.code == "200") {
              var dataList = data.data.data;
              for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].serviceAlias == "gateway") {

                } else {
                  this.getNodesId.push(dataList[i].serviceAlias)
                }
                // heightConstraint:{minimum:80},font:{color:'white',align:'left',size:16,multi:'html'}
                var dataItem = {
                  shape: "box",
                  widthConstraint: {
                    minimum: 120
                  },
                  heightConstraint: {
                    minimum: 80
                  },
                  font: {
                    color: "white",
                    align: "left",
                    size: 16,
                    multi: "html"
                  }
                };
                var edgeItem = {};
                if (dataList[i].type == "1") {
                  //集群节点
                  //dataItem.id =i;
                  dataItem.id = "root";
                  dataItem.data = dataList[i];
                  dataItem.label =
                    "<b>" +
                    "集群网关" +
                    "</b>\n\n<b>" +
                    "名称：" +
                    "</b><i>" +
                    dataList[i].serviceAlias +
                    "</i>\n\n<b>" +
                    "状态：" +
                    "</b>" +
                    dataList[i].health
                  // +
                  // this.$t("clusterManager.node_adressLabel") +
                  // "</b><i>" +
                  // dataList[i].ipAddress +
                  // ":" +
                  // dataList[i].port +
                  // "</i>";
                  dataItem.color = "#409eff";
                  dataItem.level = 0;
                } else if (dataList[i].type == "2") {
                  //gisServer节点
                  dataItem.id = dataList[i].serviceAlias;
                  dataItem.data = dataList[i];
                  var nodeName = dataList[i].serviceAlias;
                  var nodeHealth = dataList[i].health;
                  if (!nodeName || nodeName == "") {
                    nodeName = dataList[i].serviceName;
                  }
                  // ?dataList[i].serviceName:dataList[i].serviceAlias
                  dataItem.label =
                    "<b>" +
                    "GIS服务器" +
                    "</b>\n\n<b>" +
                    "名称：" +
                    "</b><i>" +
                    nodeName +
                    "</i>\n\n<b>" +
                    "状态：" +
                    "</b>" +
                    nodeHealth


                  // +
                  // this.$t("clusterManager.node_adressLabel") +
                  // "</b><i>" +
                  // dataList[i].ipAddress +
                  // ":" +
                  // dataList[i].port +
                  // "</i>";
                  dataItem.color = that.randomRgbColor();
                  dataItem.level = 1;
                  dataItem.icon = {
                    face: "icon",
                    code: "el-icon-close"
                  }
                  edgeItem.from = "root";
                  edgeItem.to = dataList[i].serviceAlias;
                  edgeItem.arrows = "to";
                  that.edges.push(edgeItem);
                }
                that.nodes.push(dataItem);
              }
              that.nodeDataset = new vis.DataSet(that.nodes);
              that.edgesDataset = new vis.DataSet(that.edges);
              that.draw();
            } else {
              if (data.msg) {
                this.$message({
                  type: "error",
                  message: "data.msg"
                })
              }
            }
          })
          .finally(() => {});
      },
      draw: function () {
        let that = this;
        that.destroyNetwork();

        // create a network
        let container = document.getElementById("mynetwork");
        container.style.height = this.defaultHeight;
        let data = {
          nodes: that.nodeDataset,
          edges: that.edgesDataset
          /*nodes: nodes,
        edges: edges*/
        };

        let options = {
          width: "100%",
          height: this.defaultHeight,
          edges: {
            smooth: {
              type: "cubicBezier",
              // type: "horizontal",
              forceDirection: that.direction == "UD" || that.direction == "DU" ?
                "vertical" : "horizontal",
              //  forceDirection:"vertical",
              roundness: 0.6
            },
            arrowStrikethrough: true
          },
          layout: {
            hierarchical: {
              direction: that.direction,
              // direction:'UD',
              nodeSpacing: that.direction == "UD" || that.direction == "DU" ? 300 : 200,
              levelSeparation: that.direction == "UD" || that.direction == "DU" ? 200 : 500
            }
          },
          nodes: {
            margin: {
              top: 10,
              bottom: 10,
              left: 5,
              right: 5
            }
          },
          physics: false
        };
        that.network = new vis.Network(container, data, options);
        // that.network.setSize("100%",that.defaultHeight)
        // add event listeners
        that.network.on("select", function (params) {
          that.slectNode = params.nodes;
          that.nodeStatus = true;
        });
        that.network.on("dragging", function () {
          that.displayDel()
          that.getPositon(that.network);
        })
        that.network.on("zoom", function () {
          that.getPositon(that.network);
          that.displayDel()

        })
        that.network.on("click", function (nodes) {
          that.getPositon(that.network);
          // if (that.network.getScale() == 1) {
          //   that.getNodesId.forEach((item, index) => {
          //     if (item == nodes.nodes[0]) {
          //       document.getElementsByClassName("delNode")[index].style.display = "block"
          //     }
          //   });
          // }
          that.getNodesId.forEach((item, index) => {
            if (item == nodes.nodes[0]) {
              if (that.network.getScale() >= 1) {
                document.getElementsByClassName("delNode")[index].style.display = "block"
                document.getElementsByClassName("delNode")[index].style.width = 30 * that.network.getScale() +
                  "px"
                document.getElementsByClassName("delNode")[index].style.height = 30 * that.network
                  .getScale() +
                  "px";
                document.getElementsByClassName("delNode")[index].style.fontSize = 12 * that.network
                  .getScale() + "px";
              } else if (that.network.getScale() < 1 && 0.5 <= that.network.getScale()) {
                if (item == nodes.nodes[0]) {
                  document.getElementsByClassName("delNode")[index].style.display = "block";
                  document.getElementsByClassName("delNode")[index].style.width = "30px";
                  document.getElementsByClassName("delNode")[index].style.height = "30px";
                }
              }
            }
          });



        })
        //双击节点点击编辑
        that.network.on("doubleClick", function (nodes) {
          if (nodes.nodes.length == 0) {
            return;
          }
          that.dialogVisible = true;
          that.nodeDataset.forEach(function (item) {
            if (item.id == nodes.nodes[0]) {
              that.nodeData = item;
            }
          });
          //   this.nodeData = this.nodes[nodes.nodes[0]]
          // this.nodeData = this.slectNode;
          that.type = "edit";
        });
        this.getPositon(that.network);

      },
      changedata: function () {
        var newNode = {
          id: 10,
          label: "<b>GIS服务器</b>\n\n<b>名称：</b>\n\n<b>地址：</b><i>172.16.0.72:8699</i>",
          shape: "box",
          color: this.randomRgbColor(),
          widthConstraint: {
            minimum: 120
          },
          heightConstraint: {
            minimum: 80
          },
          font: {
            color: "white",
            align: "left",
            size: 16,
            vadjust: 8,
            multi: "html"
          },
          margin: {
            top: 10,
            bottom: 10
          }
        };
        // var newNode = { id: 10, label: "This is a lot of text\nbut luckily we can spread\nover multiple lines", shape: "box", color: this.randomRgbaColor(),widthConstraint: true  }
        newNode["level"] = 1;
        this.nodeDataset.add(newNode);
        this.edgesDataset.add({
          from: 0,
          to: 10,
          arrows: "to"
        });
        /*this.nodeDataset.remove(this.slectNode)*/
      },
      //隐藏删除按钮
      displayDel() {
        this.getNodesId.forEach((item, index) => {
          document.getElementsByClassName("delNode")[index].style.display = "none"
        });
      },
      //改变拓扑图方向
      changeDirection: function (v) {
        this.direction = v;
        if (v == "LR" || v == "RL") {
          //this.$refs["netWork"].style.height= '1000px';
          let netWorkHeight = (this.nodeDataset.length - 2) * 200;
          if (netWorkHeight > this.defaultHeight.split("px")[0]) {
            this.defaultHeight = netWorkHeight + "px";
          }

          //document.getElementsByName("mynetwork").style.height="1000px !important"
        } else {
          // var height = document.body.offsetHeight - 480+"px";

          // this.defaultHeight = "380px"
        }

        this.draw();
        this.displayDel()
      },
      //修改均衡策略
      modifyEquilibriumStrategy() {
        this.equilibriumDialogVisible = true;
      },
      //添加节点
      addNode() {
        this.dialogVisible = true;
        this.type = "add";
      },
      //删除节点
      deleteNode(index) {
        let that = this;
        let serviceAlias = this.getNodesId[index]
        this.$confirm(
            "确定删除选中节点？",
            "删除节点", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
          .then(() => {
            that.dialogVisible = false;

            that
              .$api.clusterManageApi.deleteNode({
                serviceAlias
              })
              .then(data => {
                if (data.data.code == "200") {
                  that.initData();
                } else {
                  if (data.data.msg) {
                    this.$message({
                      type: "error",
                      message: "data.msg"
                    })
                  }
                }
              })
              .finally(() => {});
          })
          .catch(() => {});
        // this.nodeDataset.remove(this.slectNode);
      },
      //编辑或者添加节点之后，执行查询
      initNodes() {
        // this.draw();
        this.initData();
        this.dialogVisible = false;
      },
      //删除按钮定位
      getPositon(nodes) {
        this.getNodesId.forEach((item, index) => {
          this.nodesBorder[index] = nodes.getBoundingBox(item);
          if (this.nodesBorder !== []) {
            this.defaultPositionX[index] = document.getElementById("mynetwork").offsetWidth * 0.5 + this
              .nodesBorder[
                index].right * nodes
              .getScale() - 20 * nodes.getScale();
            this.defaultPositionY[index] = document.getElementById("mynetwork").offsetHeight * 0.5 + this
              .nodesBorder[
                index].top * nodes
              .getScale();
          }
          if (document.getElementsByClassName("delNode")[index]) {

            document.getElementsByClassName("delNode")[index].style.top = this.defaultPositionY[index] -
              nodes.getViewPosition().y * nodes.getScale() + "px"

            document.getElementsByClassName("delNode")[index].style.left = this.defaultPositionX[index] -
              nodes.getViewPosition().x * nodes.getScale() + "px"
          }
        })
      },
      //关闭弹出框
      dialogClose() {
        this.dialogVisible = false;
      },
      equilibriumDialogClose() {
        this.equilibriumDialogVisible = false;
      },
      //按照标签内容或者节点名称查询服务器
      searchNodeByText() {
        this.initData();
      },
      randomRgbColor: function () {
        //随机生成RGBA颜色
        var r = Math.floor(Math.random() * 256); //随机生成256以内r值
        var g = Math.floor(Math.random() * 256); //随机生成256以内g值
        var b = Math.floor(Math.random() * 256); //随机生成256以内b值
        // var alpha = Math.random(); //随机生成1以内a值
        return `rgb(${r},${g},${b})`; //返回rgba(r,g,b,a)格式颜色
      },
      randomRgbaColor: function () {
        //随机生成RGBA颜色
        var r = Math.floor(Math.random() * 256); //随机生成256以内r值
        var g = Math.floor(Math.random() * 256); //随机生成256以内g值
        var b = Math.floor(Math.random() * 256); //随机生成256以内b值
        var alpha = Math.random(); //随机生成1以内a值
        return `rgb(${r},${g},${b},${alpha})`; //返回rgba(r,g,b,a)格式颜色
      }
    },
    created: function () {

    },
    computed: {
      // defaultPositionX: function () {
      //   return document.getElementById("mynetwork").offsetWidth + this.nodesBorder.right
      // },
      // defaultPositionY: function () {
      //   return document.getElementById("mynetwork").offsetHeight + this.nodesBorder.top
      // }

    },
    mounted() {
      this.initData()

      // this.setData();
      //this.draw();
    },
    watch: {
      "$i18n.locale": function () {
        this.initData(); //
      }
    }
  };
</script>

<style scoped lang='scss'>
  #mynetwork {
    position: relative;

    .vis-label {
      margin: 0 0 0 23px;
      line-height: 45px;
    }
  }

  .cycle {
    height: 20px;
    width: 20px;
    background-color: blue;
    border-radius: 10px;
  }

  .clusterManager {
    width: 96%;
    margin: 0 auto;
    background: #fff;
    position: relative;
    overflow: hidden;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background: #fff;
    height: 100px;
  }

  .clusterManager .oprationButtons {
    width: 100%;
    margin: 0 auto;
  }

  .clusterManager .titleRow {
    width: 100%;
  }

  .clusterManager .titleLabel {
    width: 100%;
    text-align: center;
  }

  .clusterManager .titleLabel b {
    font-size: 18px;
    font-family: sans-serif;
  }

  .clusterManager .netWorkRow {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 100px;
  }

  .clusterManager .vis-network {
    width: 100%;
    height: 100%;
    cursor: hand;
  }

  .delNode {
    position: absolute;
  }

  .clusterManager .mynetwork .vis-label {
    margin: 0 0 25px 23px !important;
    line-height: 25px !important;
  }

  .clusterManager .vis-label b {
    margin-bottom: 15px !important
  }

  .clusterManager .mynetwork {
    min-height: 350px;
    /* height:380px; */
  }

  .clusterManager .directionButtons {
    /* float: right; */
    padding-right: 10px;
  }


  .clusterManager .el-input-group__append {
    padding: 0px;
    background: #409EFF;
    border: 1px solid #409EFF;
  }

  .clusterManager .el-input-group__append .el-button {
    margin: 0px;
  }

  .clusterManager .el-button {
    padding: 8px 9px;
  }


  .clusterManager .el-input-group__append .el-button i {
    color: #ffffff;
  }


  .clusterManager .el-input__inner {
    height: 32px;
    /* line-height: 32px; */
  }
</style>