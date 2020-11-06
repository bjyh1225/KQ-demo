/**
 * portal的server拦截器，将会作为默认拦截器
 */
import {before} from "./before.js"
import {resolve} from './resolve.js'
import {reject} from './reject.js'
export default {
  before:before,
  resolve:resolve,
  reject:reject
}