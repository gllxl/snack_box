<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view @getItem="getItem"></router-view>
    </q-page-container>
    <q-footer elevated class="bg-grey-1 text-grey-8" style="z-index: 6001;">
      <q-toolbar class="bg-grey-9 text-white">
        <q-btn @click="goCart()" flat round dense icon="mdi-shopping" class="q-mr-sm">
          <q-badge color="secondary" floating transparent>
            {{ cart_item_total }}
          </q-badge>
        </q-btn>
        <q-toolbar-title @click="goCart()">￥{{ cart_price_total.toFixed(2) }}</q-toolbar-title>

        <q-dialog v-model="seamless" position="bottom">

          <q-card :thumb-style="thumbStyle" style="padding-bottom: 50px;">
            <q-linear-progress :value="1" size="2px" color="secondary"/>
            <q-scroll-area
              :thumb-style="thumbStyle"
              :style="getCartHeight"
            >
              <q-list bordered separator class="text-weight-bold">
                <q-item v-for="(item,i) in this.$store.state.cart.cart_list" style="padding: 0 16px;">
                  <q-item-section avatar>
                    {{ item.itemName }}
                  </q-item-section>
                  <q-item-section class="text-right ">
                    {{ (item.itemPrice * item.num).toFixed(2) }}元
                  </q-item-section>
                  <q-item-section side>
                    <div>

                      <q-btn flat round icon="remove" @click="itemRemove(item.itemId)"/>
                      <span class="text-weight-bold">{{ item.num }}</span>
                      <q-btn flat round icon="add" @click="itemAdd(item.itemId)"/>

                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card>
        </q-dialog>
        <span class="text-h6" @click="buyItems()">去付款</span>
        <q-btn flat round dense icon="chevron_right" @click="buyItems()"/>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import axios from 'axios';

const Qs = require('qs');

export default {
  name: 'MyLayout',
  computed: {
    cart_item_total() {
      return this.$store.state.cart.cart_item_total;
    },
    cart_price_total() {
      return this.$store.state.cart.cart_price_total;
    },
    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#ff7d00',
        width: '5px',
        opacity: 0.75,
      };
    },
    getCartHeight() {
      const that = this;
      if (that.$store.state.cart.cart_list.length < 4) {
        return `height:${that.$store.state.cart.cart_list.length * 48}px`;
      }
      return 'height:192px';
    },
  },
  data() {
    return {
      seamless: false,
    };
  },
  methods: {
    getItem(item) {
      // console.log(item);
      const that = this;
      that.$store.commit('addItemToCart', item);
    },
    itemAdd(itemId) {
      this.$store.commit('item_add', itemId);
    },
    itemRemove(itemId) {
      if (this.$store.state.cart_item_total === 1) {
        this.seamless = false;
      }
      this.$store.commit('item_remove', itemId);
    },
    goCart() {
      if (this.$store.state.cart_item_total !== 0) {
        this.seamless = true;
      }
    },
    buyItems() {
      const that = this;
      console.log(that.$store.state.cart);
      axios.post(that.$store.state.url_paths.buyItems, Qs.stringify({
        itemJson: JSON.stringify(that.$store.state.cart),
        access_token: that.$store.state.user_info.access_token,
        shop_id: that.$store.state.shop_id,
      }))
        .then((response) => {
          console.log(response);
          let appId = response.data.appId;
          let timeStamp = response.data.timeStamp;
          let nonceStr = response.data.nonceStr;
          let package_ = response.data.package;
          let signType = response.data.signType;
          let paySign = response.data.paySign;

          alert(`appId:${appId} ` + `timeStamp:${timeStamp} ` + `nonceStr:${nonceStr} ` + `package:${package_} ` + `signType:${signType} ` + `paySign:${paySign} `);

          WeixinJSBridge.invoke('getBrandWCPayRequest', {
            appId, // 公众号名称,由商户传入
            timeStamp, // 时间戳,自1970年以来的秒数
            nonceStr, // 随机串
            package: package_,
            signType, // 微信签名方式：
            paySign, // 微信签名
          },
          (res) => {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              // alert('支付成功');
              that.$q.notify({
                type: 'negative',
                color: 'green',
                position: 'top',
                message: '支付成功',
              });
              // 支付成功后跳转的页面
            } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
              that.$q.notify({
                type: 'negative',
                color: 'red',
                position: 'top',
                message: '支付取消',
              });
            } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
              that.$q.notify({
                type: 'negative',
                color: 'red',
                position: 'top',
                message: '支付失败',
              });
              alert(JSON.stringify(res));

              WeixinJSBridge.call('closeWindow');
            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
          });
        });
    },
  },
};
</script>
