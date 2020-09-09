import Vue from 'vue';
import Vuex from 'vuex';
import el from 'quasar/lang/el';
import it from 'quasar/lang/it';

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  // const hostname = 'http://47.96.151.125:10001/';
  // const hostname = 'http://lsp.free-http.svipss.top/';
  const hostname = 'http://lsp.chinaqwe.top:10001/';
  const Store = new Vuex.Store({
    state: {
      user_info: {
        access_token: null,
      },
      items: null,
      code: '',
      shop_id: null,
      shop_address: '',
      permission: '0',
      location: {
        id: '',
      },
      cart: {
        cart_price_total: 0,
        cart_item_total: 0,
        cart_list: [],
      },
      url_paths: {
        getCode: `${hostname}user/getCode`,
        getBoxItems: `${hostname}user/getItem`,
        buyItems: `${hostname}user/buyItems`,
        getOrder: `${hostname}user/getOrder`,
        getWxConfig: `${hostname}pay/orders`,
        adminGetShops: `${hostname}admin/findAllShdengopInfo`,
        bindPermission: `${hostname}admin/bindPermission`,
        findItemInfoByShopId: `${hostname}admin/findItemInfoByShopId`,
        replenishment: `${hostname}user/replenishment`,
        findReplenishmentInfo: `${hostname}admin/findReplenishmentInfo`,
      },
    },
    getters: {},
    mutations: {
      addItemToCart(state, item) {
        const flag = state.cart.cart_list.filter(p => p.itemId === item.itemId);
        // console.log(flag);
        if (flag.length === 0) {
          state.cart.cart_list.push({
            itemId: item.itemId,
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemStockCurrent: item.itemStockCurrent,
            num: 1,
          });
          state.cart.cart_price_total += item.itemPrice;
          ++state.cart.cart_item_total;
        } else if (flag[0].num < flag[0].itemStockCurrent) {
          ++flag[0].num;
          state.cart.cart_price_total += flag[0].itemPrice;
          ++state.cart.cart_item_total;
        }
      },
      item_add(state, itemId) {
        const flag = state.cart.cart_list.filter(p => p.itemId === itemId);
        if (flag[0].num < flag[0].itemStockCurrent) {
          ++flag[0].num;
          ++state.cart.cart_item_total;
          state.cart.cart_price_total += flag[0].itemPrice * 100 / 100;
        }
      },
      item_remove(state, itemId) {
        const flag = state.cart.cart_list.filter(p => p.itemId === itemId);
        if (flag[0].num <= 1) {
          const index = state.cart.cart_list.indexOf(flag[0]);
          index > -1 && state.cart.cart_list.splice(index, 1);
        }
        --flag[0].num;
        --state.cart.cart_item_total;
        state.cart.cart_price_total -= flag[0].itemPrice * 100 / 100;
      },
      getCode(state, code) {
        state.code = code;
      },
      getShopId(state, shop_id) {
        state.shop_id = shop_id;
      },
      getShopAddress(state, shop_address) {
        state.shop_address = shop_address;
      },
      getUserInfo(state, user_info) {
        state.user_info = user_info;
      },
      getUserPermission(state, permission) {
        state.permission = permission;
      },
      getBoxItems(state, items) {
        state.items = items;
      },
      changeLocation(state, location) {
        state.location = location;
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
