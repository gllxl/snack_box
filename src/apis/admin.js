import qs from 'qs';
import axios from '../boot/axios';

const admin = {

  /**
   * 获取盘货寝室信息
   * @return 1
   * @param access_token
   * @param shop_id
   */

  findItemInfoByShopId(access_token, shop_id) {
    return axios.post('/admin/findItemInfoByShopId', qs.stringify({
      access_token,
      shop_id,
    }));
  },

  /**
   * 管理员盘货（无缺失商品）
   * @param access_token token
   * @param shop_id 寝室id
   * @return 1
   */
  checkShopPass(access_token, shop_id) {
    return axios.post('/admin/checkShopPass', qs.stringify({
      access_token,
      shop_id,
    }));
  },

  /**
   * 管理员盘货
   *
   * @param access_token token
   * @param shop_id      寝室id
   * @param shop_json    商品json
   * @return 1
   */
  checkShop(access_token, shop_id, shop_json) {
    return axios.post('/admin/checkShop', qs.stringify({
      access_token,
      shop_id,
      shop_json,
    }));
  },
};

export default admin;
