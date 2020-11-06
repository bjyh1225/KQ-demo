/**
 * 引用路径 import {throttle} from '@/utils/throttle.js'
 * @param {Function} action
 * @param {Number} delay
 * @param {Object} context
 * @param {Boolean} iselapsed
 */
export function throttle(action, delay, context, iselapsed) {
  let timeout = null;
  let lastRun = 0;
  return function() {
    if (timeout) {
      if (iselapsed) {
        return;
      } else {
        clearTimeout(timeout);
        timeout = null;
      }
    }
    let elapsed = Date.now() - lastRun;
    let args = arguments;
    if (iselapsed && elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
    function runCallback() {
      lastRun = Date.now();
      timeout = false;
      action.apply(context, args);
    }
  };
}
