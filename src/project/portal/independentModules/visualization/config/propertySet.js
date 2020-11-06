const modulesFiles = require.context('../propertySetComponents/', true, /\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
import otherPropertySet from 'common/config/allProjectConfig/visualizationConfig/propertySetConfig.js'
export default {
  ...modules,
  ...otherPropertySet
}