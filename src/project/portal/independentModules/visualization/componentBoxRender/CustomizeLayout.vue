<template>
  <div>
    <input v-model="layoutValue" type="text" class="input-text" :placeholder="$t('visualization.CustomLayout')"/>
  </div>
</template>

<script>
export default {
  name: "CustomizeLayout",
  props:{
    currentComponentBox:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data(){
    return {
      layoutValue:""
    }
  },
  watch:{
    layoutValue(){
      var data=this.layoutValue.split(' ');
      var reg= /^\+?[1-9][0-9]*$/;
      var sum=0;
      var resultData=[];
      for(var i=0;i<data.length;i++){
        if(!(reg.test(data[i])||(data[i]==""&&i==data.length-1))){
          this.currentComponentBox.noDrag=true;
          return false;
        }
        else{
          if(data[i]!=""){
            sum=sum+parseInt(data[i]);
            resultData.push(data[i]);
          }
        }
      }
      if(sum!=24){
        this.currentComponentBox.noDrag=true;
        return false;
      }
      this.currentComponentBox.noDrag=false;
      this.$emit('change','layoutValue',resultData);
    }    
  },
  methods:{
    removeItem(){
      this.$emit('removeItem');
    },
    setProperty(){
      this.$emit('setProperty');
    }
  }
};
</script>

<style lang='scss' scoped>
  .input-text{
    width:160px;
    height:26px;
    line-height:26px;
    margin:0;
    padding:0;
    border: none;
    background: #f2f2f2;
    border-radius: 4px;
    color:#4c4c4c;
    font-size:14px;
    text-align: center;
  }
</style>