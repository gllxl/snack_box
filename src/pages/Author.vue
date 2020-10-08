<template >
  <q-page class="flex flex-center ">

    <div class="row flex-center" style="width: 100%">
      <q-spinner-dots
        size="xl"
        color="secondary"
        style="margin: auto auto "
      />
    </div>
    <img alt="Snack Box" width="128px" style="margin-top: -470px" src="statics/logo.png">
  </q-page>
</template>

<script>

import axios from 'axios';

const Qs = require('qs');

export default {
  name: 'PageName',
  data() {
    return {
      log: '',
    };
  },
  created() {
    const that = this;
    // 检测会员有没有登录
    if (!this.$store.state.user_info.access_token) {
      const ua = window.navigator.userAgent.toLowerCase();
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 跳转到微信授权页面
        that.login();
      }
    } else {
      that.log = '请使用微信登录';
    }
  },
  methods: {
    // login() {
    //   const that = this;
    //   // 通过cookie中保存的token 获取用户信息
    //   axios.post(this.$store.state.url_paths.getCode, Qs.stringify({
    //     code: that.$store.state.code,
    //     shop_id: that.$store.state.shop_id,
    //   }))
    //     .then((response) => {
    //       if (response.data.code === 200) {
    //         that.$store.commit('getShopAddress', response.data.data.shopAddress);
    //         that.$store.commit('getUserInfo', response.data.data.userInfo);
    //         that.$store.commit('getUserPermission', response.data.data.permission);
    //         console.log(that.$store.state.user_info);
    //         axios.post(that.$store.state.url_paths.getBoxItems, Qs.stringify({
    //           access_token: that.$store.state.user_info.access_token,
    //         }))
    //           .then((response) => {
    //             if (response.data.code === 200) {
    //               that.$store.commit('getBoxItems', response.data.data.Info);
    //               that.$router.push('/');
    //             }
    //           });
    //       }
    //     });
    // },
    login() {
      this.$api.user.getCode(this.$store.state.code, this.$store.state.shop_id)
        .then((res) => {
          console.log(res);
          this.$store.commit('getShopAddress', res.data.data.shopAddress);
          this.$store.commit('getCreditScore', res.data.data.creditScore);
          this.$store.commit('getUserInfo', res.data.data.userInfo);
          this.$store.commit('getUserPermission', res.data.data.permission);
          this.$api.shop.getBoxItems(this.$store.state.user_info.access_token)
            .then((res) => {
              this.$store.commit('getBoxItems', res.data.data.Info.filter(item => {
                return item?.sortPageItem.length > 0
              }));
              this.$router.push('/');
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
