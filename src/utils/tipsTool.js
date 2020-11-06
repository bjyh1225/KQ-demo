import Vue from 'vue';
Vue.directive('tips',{
  bind(el,binding,vnode){
    if(binding.value){
      if(!document.getElementById("portal-tips")){
        var tip=document.createElement('div');
        tip.setAttribute('class','portal-tips');
        tip.setAttribute('id','portal-tips');
        tip.style.cssText=`
          display:none;
          position:fixed;
        `;
        var span=document.createElement('span');
        span.setAttribute('class','title');
        tip.appendChild(span);
        var arrow=document.createElement('div');
        arrow.setAttribute('class','portal-tips-arrow');
        tip.appendChild(arrow);
        document.body.appendChild(tip);
      }
      el.addEventListener('mouseenter',function(){
        var x=this.getBoundingClientRect().x;
        var y=this.getBoundingClientRect().y;
        document.getElementById("portal-tips").style.cssText=`
          position:fixed;
          top:${y+this.offsetHeight+10}px;
          left:${x}px;
          display:block;
        `;
        let d=vnode.data.directives;
        if(d){
          d.forEach(item=>{
            if(item.name=='tips'){
              if(typeof item.value==='string'){
                // eslint-disable-next-line
                document.getElementById("portal-tips").querySelector(".title").innerHTML=vm.$t(binding.value);
              }
              else{
                console.error("v-tips绑定值必须是字符串");
                return;
              }
            }
          })
        }
      });
      el.addEventListener('mouseleave',function(){
        document.getElementById("portal-tips").style.cssText=`
          display:none;
          position:fixed;
        `;
      });
    }
  }
})