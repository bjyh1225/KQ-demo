/*
引用路径
import {dotLineNet} from 'common/animate/dotLineNet.js'
实例new dotLineNet({el:"#aaa"});

options{
  el:绘制的dom,如果不需要创建canvas，则传入canvas的dom
  isCreateCanvas:是否创建canvas，默认是true
  dotsNumber:当前页面的点数
  lineMaxLength:连线的最大距离
  dotColor:点的颜色，rgb颜色
  lineColoe:线的颜色,
  speed:速度,
  dotsAlpha:点的透明度,
  maxRadius:点的最大半径
}
*/

const defaultOptions={
  isCreateCanvas:true,
  dotColor:"0,0,0",
  lineColoe:"0,0,0",
  speed:1,
  dotsAlpha:0.8,
  lineMaxLength:200,
  dotsNumber:50,
  maxRadius:6
}

export function dotLineNet(options){
  if(!options.el){
    throw new Error("需要传入选择器");
  }
  options=Object.assign(defaultOptions,options);
  //判断是否创建canvas
  var canvas;
  var ctx;
  var area;
  if(options.isCreateCanvas==false){
    canvas = document.querySelector(options.el);
    ctx = canvas.getContext('2d');
    var canvasStyle = window.getComputedStyle(canvas, null);
    var width= parseInt(canvasStyle.width),height = parseInt(canvasStyle.height);
    area=width*height;
  }
  else{
    var part = document.querySelector(options.el);
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    var partStyle = window.getComputedStyle(part, null);
    var width = parseInt(partStyle.width),height = parseInt(partStyle.height);
    area=width*height;
    var cssText = 'width: '+width+'px; height: '+height+'px;';
    canvas.setAttribute('style', cssText);
    canvas.width = width.toString();
    canvas.height = height.toString();
	  part.appendChild(canvas);
  }

  var dotsArr = [],
  dotsNum = options.dotsNumber || parseInt(area / 5000),
  maxDotsNum = dotsNum * 2,
  overNum = 0, // 超出最大数量的点的数量
  dotsDistance = options.lineMaxLength || 250; // 点之间产生连线的最大距离

  //生成点
  for (var i = 0; i < dotsNum; i ++) {
      var dot = new Dots(options.speed, options.dotsAlpha,options.dotColor);
      if (i < dotsNum - 1) {
          dot.init(canvas);
      } else {
          dot.init(canvas, 0, 0, 1);
      }
      dotsArr.push(dot);
  }
  //动画与连线
  var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
  requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

  function animateUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

    // 更新点的位置 数量超出最大值时舍弃旧的点
    if (dotsNum > maxDotsNum) {
        overNum = dotsNum - maxDotsNum;
    }

    for (var i = overNum; i < dotsNum; i ++) {
        if (dotsArr[i]) dotsArr[i].update();
    }

    // 绘制连线
    for (var i = overNum; i < dotsNum; i ++) {
        for (var j = i + 1; j < dotsNum; j ++) {
            var tx = dotsArr[i].x - dotsArr[j].x,
                ty = dotsArr[i].y - dotsArr[j].y,
                s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
            if (s < dotsDistance) {
                ctx.beginPath();
                ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
                ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
                ctx.strokeStyle = 'rgba('+options.lineColor+','+(dotsDistance-s)/dotsDistance+')';
                ctx.strokeWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    requestAnimFrame(animateUpdate);
  }
}


var Dots = function (speed,alpha,dotColor) {
  // 画布相关
  this.canvas;
  this.ctx;

  // 绘制点相关
  this.x;
  this.y;
  this.r;
  this.a = alpha && alpha > 0 && alpha <= 1 ? alpha : .8;
  this.color=dotColor||'0,0,0';

  // 移动相关
  this.speed = speed && speed > 0 ? speed : 2;
  this.sx;
  this.sy;
  this.isMouseDot = 0;
};

Dots.prototype = {
  init: function (canvas, x, y, isMouseDot) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');

      this.x = x*2 || Math.random() * this.canvas.width;
      this.y = y*2 || Math.random() * this.canvas.height;
      this.r = Math.random() * 6; // 随机生成 <6 的半径值

      if (isMouseDot) this.isMouseDot = 1;

      // 随机确定点的移动速度与方向 速度值在 [-this.speed, this.speed) 之间 提高数值可加快速度
      this.sx = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;
      this.sy = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;

      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      this.ctx.fillStyle = 'rgba('+this.color+','+this.a+')';
      this.ctx.fill();
      this.ctx.closePath();
  },
   // 更新点位置
  update: function () {
      if (this.isMouseDot) return;

      this.x = this.x + this.sx;
      this.y = this.y + this.sy;

      // 点超出canvas范围时另其"重生"
      if (this.x < 0 || this.x > this.canvas.width) {
          this.init(this.canvas);
      }
      if (this.y < 0 || this.y > this.canvas.height) {
          this.init(this.canvas);
      }

      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2*Math.PI);
      this.ctx.fillStyle = 'rgba('+this.color+','+this.a+')';
      this.ctx.fill();
      this.ctx.closePath();
  },
}