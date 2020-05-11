<template>
  <q-page padding>
    正在获取微信授权
  </q-page>
</template>

<script>

  import axios from 'axios'

  const Qs = require('qs');
  export default {
    name: 'PageName',
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
        console.log('已登录')
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
              that.$store.commit('getUserInfo',response.data.data.userInfo);
              console.log(that.$store.state.user_info);
              that.$router.push('/');
            }
          })
      },
    }
  }
</script>
