/* eslint-disable */
const defaultOptions={
  el:"",//元素的dom选择器，如果不自动创建canvas，则需传入canvas的元素选择器
  isAutoCreateCanvas:true,//是否自动创建画布
  isAutoConnectingLineSegment:true,//是否自动链接粒子的
  isShadow:false,//是否有阴影
  speed:1,//粒子移动速度
  dotsAlpha:1,//粒子透明度
  lineMaxLength:250,//粒子连线的最大长度
  dotsNumber:50,//粒子数
  maxRadius:6,//生成粒子的最大半径
  dotsColor:"0,0,0",//粒子的颜色
  lineColor:"0,0,0",//连线的颜色
  lineWidth:1,//连线的宽度
  shadowColor:"0,0,0",//阴影颜色
  shadowBlur:10,//阴影模糊程度
  canvasWidth:"",//手动设置画布宽度，默认取的是父容器的宽度
  canvasHeight:"",//手动设置画布高度，默认取的是父容器的宽度
  style:"rebirth",//风格，rebirth:粒子超出画布会重生，noRebirth:粒子运动不会超出画布
  birthX:"",//粒子的出生X轴
  birthY:"",//粒子的出生Y轴
  birthFunction:null,//出生的函数，同时传入birthX、birthY和birthFunction，会优先选择函数
  motionTrack:'random',//运动轨迹，默认随机，可选值to-left,to-top,to-bottom,to-right,to-top-left,to-top-right,to-bottom-left,to-bottom-right
  canvasClass:'',//画布的类
  canvasStyle:'',//画布的样式
}

var Dots=function(dotOpts){
  // 画布相关
  this.canvas;
  this.ctx;
  this.birthX = "";
  this.birthY = "";
  //初始化相关
  if (dotOpts.birthFunction && typeof dotOpts.birthFunction === 'function') {
    dotOpts.birthFunction(this.birthX, this.birthY);
  }
  else {
    if (dotOpts.birthX) {
      this.birthX = dotOpts.birthX;
    }
    if (dotOpts.birthY) {
      this.birthY = dotOpts.birthY;
    }
  }
  // 绘制点相关
  this.x;
  this.y;
  this.r;
  this.a = dotOpts.dotsAlpha;
  this.color = dotOpts.dotsColor;
  this.maxRadius = dotOpts.maxRadius;
  this.isShadow = dotOpts.isShadow;
  this.shadowColor = dotOpts.shadowColor;
  this.shadowBlur = dotOpts.shadowBlur;
  // 移动相关
  this.speed = dotOpts.speed;
  this.sx;
  this.sy;
  this.isMouseDot = 0;
  //粒子风格
  this.style = dotOpts.style;
  this.motionTrack = dotOpts.motionTrack;
  //连线的颜色
  this.lineColor = dotOpts.lineColor;
}

Dots.prototype = {
  //初始化位置
  initPosition: function () {
    if (this.birthX) {
      this.x = this.birthX;
    }
    else {
      this.x = Math.random() * this.canvas.width;
    }
    if (this.birthY) {
      this.y = this.birthY;
    }
    else {
      this.y = Math.random() * this.canvas.height;
    }
  },
  updatePostion: function () {
    if (this.style == "rebirth") {
      this.x = this.x + this.sx;
      this.y = this.y + this.sy;
      if (this.x < 0 || this.x > this.canvas.width) {
        this.initPosition();
      }
      if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
        this.initPosition();
      }
    }
    else if (this.style == "noRebirth") {
      var nextX = this.x + this.sx;
      var nextY = this.y + this.sy;
      if (nextX < 0 || nextY < 0 || nextX > this.canvas.width || nextY > this.canvas.height) {
        this.sx = 0 - this.sx;
        this.sy = 0 - this.sy;
      }
      this.x = this.x + this.sx;
      this.y = this.y + this.sy;
    }
    else {
      this.initPosition();
    }
  },
  //初始化位置
  init: function (canvas, x, y, isMouseDot) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.r = Math.random() * this.maxRadius; // 随机生成半径值
    // if (isMouseDot) this.isMouseDot = 1;
    // 随机确定点的移动速度与方向 速度值在 [-this.speed, this.speed) 之间 提高数值可加快速度
    // if(this.isMouseDot){

    // }
    if (this.motionTrack == 'to-top') {
      this.sx = 0;
      this.sy = Math.random() * this.speed * 2 - this.speed;
      if (this.sy > 0) {
        this.sy = 0 - this.sy;
      }
    }
    else if (this.motionTrack == 'to-bottom') {
      this.sx = 0;
      this.sy = Math.random() * this.speed * 2 - this.speed;
      if (this.sy < 0) {
        this.sy = 0 - this.sy;
      }
    }
    else if (this.motionTrack == 'to-left') {
      this.sy = 0;
      this.sx = Math.random() * this.speed * 2 - this.speed;
      if (this.sx > 0) {
        this.sx = 0 - this.sx;
      }
    }
    else if (this.motionTrack == 'to-right') {
      this.sy = 0;
      this.sx = Math.random() * this.speed * 2 - this.speed;
      if (this.sx < 0) {
        this.sx = 0 - this.sx;
      }
    }
    else if (this.motionTrack == 'to-top-left') {
      this.sx = Math.random() * this.speed * 2 - this.speed;
      this.sy = Math.random() * this.speed * 2 - this.speed;
      if (this.sx > 0) {
        this.sx = 0 - this.sx;
      }
      if (this.sy > 0) {
        this.sy = 0 - this.sy;
      }
    }
    else if (this.motionTrack == 'to-top-right') {
      this.sx = Math.random() * this.speed * 2 - this.speed;
      this.sy = Math.random() * this.speed * 2 - this.speed;
      if (this.sx < 0) {
        this.sx = 0 - this.sx;
      }
      if (this.sy > 0) {
        this.sy = 0 - this.sy;
      }
    }
    else if (this.motionTrack == 'to-bottom-left') {
      this.sx = Math.random() * this.speed * 2 - this.speed;
      this.sy = Math.random() * this.speed * 2 - this.speed;
      if (this.sx > 0) {
        this.sx = 0 - this.sx;
      }
      if (this.sy < 0) {
        this.sy = 0 - this.sy;
      }
    }
    else if (this.motionTrack == 'to-bottom-right') {
      this.sx = Math.random() * this.speed * 2 - this.speed;
      this.sy = Math.random() * this.speed * 2 - this.speed;
      if (this.sx < 0) {
        this.sx = 0 - this.sx;
      }
      if (this.sy < 0) {
        this.sy = 0 - this.sy;
      }
    }
    else {
      this.sx = Math.random() * this.speed * 2 - this.speed;
      this.sy = Math.random() * this.speed * 2 - this.speed;
    }
    this.initPosition();
    this.draw();
  },
  // 更新点位置
  update: function () {
    // if (this.isMouseDot) return;
    this.updatePostion();
    this.draw();
  },
  draw: function () {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(' + this.color + ',' + this.a + ')';
    if (this.isShadow) {
      this.ctx.shadowColor = 'rgba(' + this.shadowColor + ')';
      this.ctx.shadowBlur = this.shadowBlur;
    }
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export function particleAnimate(options) {
  if (!options.el) {
    throw new Error("需要传入选择器");
  }
  options=Object.assign(JSON.parse(JSON.stringify(defaultOptions)),options);
  //判断是否创建canvas
  var canvas;
  var ctx;
  var area;
  if(options.isAutoCreateCanvas==false){
    canvas = document.querySelector(options.el);
    ctx = canvas.getContext('2d');
    var canvasStyle = window.getComputedStyle(canvas, null);
    var width = parseInt(canvasStyle.width), height = parseInt(canvasStyle.height);
    area = width * height;
  }
  else {
    var part = document.querySelector(options.el);
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    var partStyle = window.getComputedStyle(part, null);
    var width, height;
    if (options.canvasWidth) {
      width = options.canvasWidth;
    }
    else {
      width = parseInt(partStyle.width)
    }
    if (options.canvasHeight) {
      height = options.canvasHeight;
    }
    else {
      height = parseInt(partStyle.height)
    }
    area = width * height;
    var cssText = 'width: ' + width + 'px; height: ' + height + 'px;' + options.canvasStyle;
    canvas.setAttribute('style', cssText);
    canvas.width = width.toString();
    canvas.height = height.toString();
    part.appendChild(canvas);
  }
  //给画布加上类名
  if (options.canvasClass) {
    canvas.setAttribute('class', options.canvasClass)
  }
  var dotsArr = [],
    dotsNum = options.dotsNumber || parseInt(area / 5000),
    maxDotsNum = dotsNum * 2,
    overNum = 0, // 超出最大数量的点的数量
    dotsDistance = options.lineMaxLength || 250; // 点之间产生连线的最大距离
  ctx.clearRect(0, 0, canvas.width,canvas.height); // 清空canvas中原有的内容
  //生成点
  for (var i = 0; i < dotsNum; i++) {
    var dot = new Dots(options);
    dot.init(canvas);
    // if (i < dotsNum - 1) {
    //     dot.init(canvas);
    // } else {
    //     dot.init(canvas, 0, 0, 1);
    // }
    dotsArr.push(dot);
  }
  //动画与连线
  var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
  requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

  function animateUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

    // 更新点的位置 数量超出最大值时舍弃旧的点
    // if (dotsNum > maxDotsNum) {
    //   overNum = dotsNum - maxDotsNum;
    // }

    for (var i = overNum; i < dotsNum; i++) {
      if (dotsArr[i]) dotsArr[i].update();
    }

    // 绘制连线
    if (options.isAutoConnectingLineSegment) {
      for (var i = overNum; i < dotsNum; i++) {
        for (var j = i + 1; j < dotsNum; j++) {
          var tx = dotsArr[i].x - dotsArr[j].x,
            ty = dotsArr[i].y - dotsArr[j].y,
            s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
          if (s < dotsDistance) {
            ctx.beginPath();
            ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
            ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
            ctx.strokeStyle = 'rgba(' + options.lineColor + ',' + (dotsDistance - s) / dotsDistance + ')';
            ctx.lineWidth = options.lineWidth;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
    requestAnimFrame(animateUpdate);
  }
}
