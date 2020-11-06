const modulesFiles = require.context('@/project/', true, /zh\.js$/);
const zhLocale = {};
modulesFiles.keys().forEach(item => {
  var value = modulesFiles(item).default;
  Object.assign(zhLocale, value);
})

const enModulesFiles = require.context('@/project/', true, /en\.js$/);
const enLocale = {};
enModulesFiles.keys().forEach(item => {
  var value = enModulesFiles(item).default;
  Object.assign(enLocale, value);
})

export default {
  zhLocale,
  enLocale
}



