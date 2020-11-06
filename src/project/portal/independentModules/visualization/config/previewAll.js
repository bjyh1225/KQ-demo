const modulesFiles = require.context('../components/', true, /\.vue$/);

const filterName={
  BaseLayout:"BaseLayout"
}

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1');
  const value = modulesFiles(modulePath);
  if(!filterName[moduleName]){
    modules[moduleName] = value.default;
  }
  return modules;
}, {});

modules.BaseLayout=require('portal/independentModules/visualization/renderComponents/BaseLayout').default;

import otherComponents from 'common/config/allProjectConfig/visualizationConfig/componentsConfig.js'
import IndexHeader from 'common/config/allProjectConfig/visualizationConfig/indexHeaderComponentsBoxConfig.js';
modules.IndexHeader=IndexHeader.IndexHeader;
export default {
  ...modules,
  ...otherComponents
}