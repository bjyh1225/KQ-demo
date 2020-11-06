import {get} from 'common/config/server/server.js';

const themeApi = {
  saveCustomTheme(params, config) {
    return get('/api/cos3-portal-manager/customTheme/add/saveCustomTheme', params, config);
  }
}
export default themeApi;
