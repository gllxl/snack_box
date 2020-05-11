import Vue from 'vue'
import Vuex from 'vuex'
import el from "quasar/lang/el";
import it from "quasar/lang/it";

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const hostname = 'http://lsp.free-http.svipss.top/'

  const Store = new Vuex.Store({
    state: {
      user_info: {
        access_token : null
      },
      item_list:
        {
          "lt": [
            {
              item_id: 1,
              item_price: 0.5,
              item_name: "绿爽",
              item_unit: "个",
              item_img_url: "1"
            }, {
              item_id: 2,
              item_price: 0.5,
              item_name: "辣条",
              item_unit: "个",
              item_img_url: "1"
            }],
          "dzp": [
            {
              item_id: 3,
              item_price: 1,
              item_name: "豆干",
              item_unit: "个",
              item_img_url: "1"
            }
          ]
        }
      ,
      code: '',
      shop_id : null,
      cart_price_total: 0,
      cart_item_total: 0,
      cart_list: [],
      url_paths: {
        getCode: hostname + 'user/getCode',
        getBoxItems :hostname + 'user/getItem'
      }
    },
    getters: {},
    mutations: {
      addItemToCart(state, item) {
        let flag = state.cart_list.filter((p) => {
          return p.item_id === item.item_id;
        });
        //console.log(flag);
        if (flag.length === 0) {
          state.cart_list.push({
            item_id: item.item_id,
            item_name: item.item_name,
            item_price: item.item_price,
            num: 1
          });
        } else {
          ++flag[0].num;
        }
        flag = state.cart_list.filter((p) => {
          return p.item_id === item.item_id;
        });
        state.cart_price_total += flag[0].item_price;
        ++state.cart_item_total;
        //console.log(state.cart_price_total)
      },
      item_add(state, item_id) {
        let flag = state.cart_list.filter((p) => {
          return p.item_id === item_id;
        });
        ++flag[0].num;
        ++state.cart_item_total;
        state.cart_price_total += flag[0].item_price;
      },
      item_remove(state, item_id) {
        let flag = state.cart_list.filter((p) => {
          return p.item_id === item_id;
        });
        if (flag[0].num <= 1) {
          let index = state.cart_list.indexOf(flag[0]);
          index > -1 && state.cart_list.splice(index, 1);
        }
        --flag[0].num;
        --state.cart_item_total;
        state.cart_price_total -= flag[0].item_price;

      },
      getCode(state, code) {
        state.code = code;
      },
      getShopId(state, shop_id) {
        state.shop_id = shop_id;
      },
      getUserInfo(state, user_info) {
        state.user_info = user_info
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store
}
