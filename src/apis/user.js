import qs from 'qs';
import axios from '../boot/axios';

const user = {

  /**
   * 获取用户信息
   * @return user_info
   * @param code
   * @param shop_id
   */

  getCode(code, shop_id) {
    return axios.post('/user/getCode', qs.stringify({
      code,
      shop_id,
    }));
  },

  /**
   * 确认补货
   * @param access_token token
   * @param replenishment_id 补货id
   * @return 1
   */
  updateReplenishment(access_token, replenishment_id) {
    return axios.post('/user/updateReplenishment', qs.stringify({
      access_token,
      replenishment_id,
    }));
  },
};

export default user;
