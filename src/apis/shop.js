import qs from 'qs';
import axios from '../boot/axios';

const shop = {
  /**
   * 获取盒子商品
   * @return 1
   * @param access_token
   */
  getBoxItems(access_token) {
    return axios.post('/user/getItem', qs.stringify({
      access_token,
    }));
  },
};
export default shop;
