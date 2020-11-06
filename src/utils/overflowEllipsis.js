/**
 * 多行省略号工具函数
 * 引用路径 import {overflowEllipsis} from '@/utils/overflowEllipsis.js'
 * @param {String} containerClassName 外部高度容器类名 
 * @param {String} textClassName 文字容器类名
 * @param {number} num 避免死循环，默认为50
 */
export function overflowEllipsis(containerClassName, textClassName, num = 50) {
  var containers = document.getElementsByClassName(containerClassName);
  for (var i = 0; i < containers.length; i++) {
    var text;
    if (containerClassName == textClassName || !textClassName) {
      text = containers[i];
    }
    else {
      text = containers[i].getElementsByClassName(textClassName)[0];
    }
    if (containers[i].offsetHeight >= containers[i].scrollHeight&&containers[i].offsetHeight>=text.offsetHeight) {//不需要省略
      continue;
    }
    var count = 0;
    var str = text.innerHTML;//原始字符串
    if (!str) {
      continue;
    }
    var middle = Math.floor(str.length / 2);
    var status = true;
    var newStr = "";//新字符串
    while (status) {
      newStr = str.substr(0, middle) + '...';
      text.innerHTML = newStr;
      if (containers[i].offsetHeight < text.offsetHeight||containers[i].offsetHeight<containers[i].scrollHeight) {
        middle = Math.floor(middle / 2);
      }
      else {
        status = false;
      }
      count++
      if (count > num) {//发生异常直接给原始值
        status = false;
        text.innerHTML = str;
        continue;
      }
    }
    status = true;//重置循环状态
    var preStr = text.innerHTML;
    middle = middle + 1;
    count = 0;
    while (status) {
      newStr = str.substr(0, middle) + '...';
      text.innerHTML = newStr;
      if (containers[i].offsetHeight < text.offsetHeight || containers[i].offsetHeight < containers[i].scrollHeight) {
        status = false;
      }
      else {
        preStr = newStr;
        middle = middle + 1;
      }
      count++
      if (count > num) {//发生异常直接给原始值
        status = false;
        text.innerHTML = str;
        continue;
      }
    }
    text.innerHTML = preStr;
  }
}