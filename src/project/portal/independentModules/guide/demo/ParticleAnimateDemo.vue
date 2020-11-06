<template>
  <div>
    <div class="header">
      <el-row class="form-area">
        <el-form :model="formInfo">
          <el-col :span="6">
            <el-form-item label="连接粒子">
              <el-select v-model="formInfo.isAutoConnectingLineSegment">
                <el-option label="连接" value="连接"></el-option>
                <el-option label="不连接" value="不连接"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="粒子风格">
              <el-select v-model="formInfo.style">
                <el-option label="重生" value="重生"></el-option>
                <el-option label="不重生" value="不重生"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运动轨迹">
              <el-select v-model="formInfo.motionTrack">
                <el-option label="随机" value="随机"></el-option>
                <el-option label="向左" value="向左"></el-option>
                <el-option label="向右" value="向右"></el-option>
                <el-option label="向上" value="向上"></el-option>
                <el-option label="向下" value="向下"></el-option>
                <el-option label="向左上" value="向左上"></el-option>
                <el-option label="向右上" value="向右上"></el-option>
                <el-option label="向左下" value="向左下"></el-option>
                <el-option label="向右下" value="向右下"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button @click="regeneratePreview">重新生成预览</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div id="particle-animate-demo" class="content"></div>
  </div>
</template>

<script>
  import {particleAnimate} from 'common/animate/particleAnimate.js'
  export default {
    name: "ParticleAnimateDemo",
    props:{
      previewInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return {
        formInfo:{
          isAutoConnectingLineSegment:"连接",
          style:"重生",
          motionTrack:"随机"
        },
        params:{
          "重生":"rebirth",
          "不重生":"noRebirth",
          "连接":true,
          "不连接":false,
          "随机":"random",
          "向左":"to-left",
          "向右":"to-right",
          "向上":"to-top",
          "向下":"to-bottom",
          "向左上":"to-top-left",
          "向左下":"to-bottom-left",
          "向右上":"to-top-right",
          "向右下":"to-bottom-right"
        }
      }
    },
    methods:{
      close(){
        this.$emit('close')
      },
      regeneratePreview(){
        new particleAnimate({
          el: '.particle-animate-demo-class',
          dotsColor:"254, 120, 121",
          lineColor:"254, 120, 121",
          isAutoCreateCanvas:false,
          isAutoConnectingLineSegment:this.params[this.formInfo.isAutoConnectingLineSegment],
          style:this.params[this.formInfo.style],
          motionTrack:this.params[this.formInfo.motionTrack]
        })
      }
    },
    mounted(){
      new particleAnimate({
        el: '#particle-animate-demo',
        dotsColor:"254, 120, 121",
        lineColor:"254, 120, 121",
        canvasClass:"particle-animate-demo-class"
      })
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    .form-area{
      padding:10px 0px;
      .el-col{
        height:40px;
        line-height:40px;
        padding-left:10px;
      }
    }
  }
  .content{
    height:700px;
    background:#f8f8f8;
    
  }
</style>
