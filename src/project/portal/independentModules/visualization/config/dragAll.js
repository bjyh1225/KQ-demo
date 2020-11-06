const modulesFiles = require.context('../components/', true, /\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
import otherComponents from 'common/config/allProjectConfig/visualizationConfig/componentsConfig.js'
export default {
  ...modules,
  ...otherComponents
}