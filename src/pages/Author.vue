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

  import axios from 'axios'

  const Qs = require('qs');
  export default {
    name: 'PageName',
    data() {
      return {
        log : ''
      }
    },
    created() {
      let that = this;
      // 检测会员有没有登录
      if (!this.$store.state.user_info.access_token) {
        let ua = window.navigator.userAgent.toLowerCase();
        console.log(ua);
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          // 跳转到微信授权页面
          that.login()
        }
      } else {
        that.log = '请使用微信登录'
      }
    }, methods: {
      login() {
        let that = this;
        // 通过cookie中保存的token 获取用户信息
        axios.post(this.$store.state.url_paths.getCode, Qs.stringify({
          code : that.$store.state.code,
          shop_id : that.$store.state.shop_id,
        }))
          .then(function (response) {
            if (response.data.code === 200){
              that.$store.commit('getShopAddress',response.data.data.shopAddress);
              that.$store.commit('getUserInfo',response.data.data.userInfo);
              that.$store.commit('getUserPermission',response.data.data.permission);
              console.log(that.$store.state.user_info);
              axios.post(that.$store.state.url_paths.getBoxItems, Qs.stringify({
                access_token: that.$store.state.user_info.access_token
              }))
                .then(function (response) {
                  if (response.data.code === 200) {
                    that.$store.commit('getBoxItems', response.data.data.Info);
                    that.$router.push('/');
                  }
                });
            }
          })
      },
    }
  }
</script>
