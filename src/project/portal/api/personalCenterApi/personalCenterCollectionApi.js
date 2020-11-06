import { post} from 'common/config/server/server.js';

const personalCenterCollectionApi = {
  getFavoritesList(params, config) {
    return post('/api/cos3-portal-manager/favorites/select/getFavoritesList', params, config);
  },
  saveFavoritesCategory(params, config) {
    return post('/api/cos3-portal-manager/favorites/save/saveFavoritesCategory', params, config);
  },
  getFavoritesCategoryOnly(params, config) {
    return post('/api/cos3-portal-manager/favorites/select/getFavoritesCategoryOnly', params, config||{loadingText:vm.$t('common.checking')});
  },
  selectFavoritesResourceList(params, config) {
    return post('/api/cos3-portal-manager/favorites/select/selectFavoritesResourceList', params, config);
  },
  deletetFavoritesById(params, config) {
    return post('/api/cos3-portal-manager/favorites/delete/deleteFavoritesCategoryList', params, config);
  },
  cancelCollection(params, config){
    return post('/api/cos3-portal-manager/favorites/delete/deletetFavoritesById', params, config);
  }
}
export default personalCenterCollectionApi;
