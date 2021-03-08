import qs from 'qs';
import axios from '../boot/axios';

const order = {
  /**
   * 获取盒子订单
   * @return 1
   * @param access_token
   */

  getBoxOrder(access_token) {
    return axios.post('/admin/getOrderByShopAddress', qs.stringify({
      access_token,
    }));
  },

  getMyOrder(access_token) {
    return axios.post('/user/getOrder', qs.stringify({
      access_token,
    }))
  }
};

export default order
