<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-dialog v-model="dialog.admin" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width: 300px">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 q-ma-md">管理员登录</div>
        </q-card-section>

        <q-card-section class="q-ml-md q-mr-md q-mb-sm q-mt-md">
          <q-input outlined dense v-model="admin.id" color="teal" label="账号"/>
          <q-input class="q-mt-sm" outlined dense color="teal" v-model="admin.pwd" label="密码"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="取消" v-close-popup/>
          <q-btn flat label="登录" @click="AdminLogin()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.shop" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="shop-card">
        <q-img src="statics/pic/chicken-salad.jpg"/>

        <q-card-section>


          <div class="no-wrap items-center" style="margin-left: 6px">

            <div class="col text-h6 ellipsis">
              零食盒子 {{ $store.state.shop_address }}
            </div>
            <div>
              信用评级
              <q-rating v-model="stars" :max="5" size="18px"/>
            </div>

          </div>

          <q-space/>

        </q-card-section>

        <q-card-section class="q-pt-none">

        </q-card-section>

      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.replenishment" transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width: 300px">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 q-ma-md">补货申请单</div>
        </q-card-section>

        <q-card-section class="q-ml-md q-mr-md q-mb-sm q-mt-md">
          <q-list padding class="rounded-borders">
            <q-item dense v-for="item in replenishment_info" clickable v-ripple>
              <q-item-section>
                {{ item.replenishmentItemName }} * {{ item.replenishmentItemNum }}
              </q-item-section>
              <q-item-section side>
                {{ item.replenishmentItemPrice }}
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item dense clickable v-ripple class="text-weight-bold">
              <q-item-section>
                合计：
              </q-item-section>
              <q-item-section side>
                {{ total }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确认" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog full-height v-model="dialog.user_info" position="right">
      <q-card style="min-width: 240px;height: 100px">

        <q-card-section class="row items-center no-wrap q-ml-sm q-mt-sm q-mb-sm">
          <q-avatar class="text-center" @click="changeAccount()">
            <img :src="$store.state.user_info.headimgurl">
          </q-avatar>
          <div style="margin-left: 20px" class="text-subtitle2">{{ $store.state.user_info.nickname }}</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-list bordered padding class="rounded-borders" style="max-width: 350px">

          <q-item clickable v-ripple @click="goOrder()">
            <q-item-section avatar top>
              <q-icon name="mdi-format-list-text" size="30px" color="accent"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">购买记录</q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="Replenishment()">
            <q-item-section avatar top>
              <q-icon name="mdi-phone" size="30px" color="accent"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">补货申请</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="pay()">
            <q-item-section avatar top>
              <q-icon name="mdi-swap-horizontal" size="30px" color="accent"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">申请零食更换</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-icon name="mdi-phone-hangup" size="30px" color="accent"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">反馈</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right"/>
            </q-item-section>
          </q-item>

          <q-item v-if="$store.state.permission != '0' " @click="$router.push('admin_manage')" clickable v-ripple
                  :active="active" active-class="text-teal">
            <q-item-section avatar top>
              <q-icon color="teal" name="mdi-file-table-box-multiple-outline" size="30px"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">盒子管理</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon color="teal" name="keyboard_arrow_right"/>
            </q-item-section>
          </q-item>
        </q-list>

      </q-card>

    </q-dialog>

    <q-card class="top-card">
      <q-img style="max-height: 170px;" src="statics/pic/chicken-salad.jpg"/>

      <q-card-section>
        <q-btn
          round
          class="absolute"
          style="top: 0; right: 20px; transform: translateY(-50%);"
        >
          <q-avatar size="80px" @click="dialog.user_info=true">
            <img :src="$store.state.user_info.headimgurl">
          </q-avatar>
        </q-btn>
        <div class="row no-wrap items-center" @click="dialog.shop=true">
          <div class="col text-h6 ellipsis" style="margin-left: 4px">
            零食盒子 {{ $store.state.shop_address }}
          </div>

        </div>
      </q-card-section>
      <q-separator/>
    </q-card>

    <q-card class="snack-card">
      <template>
        <div>
          <q-splitter
            v-model="splitterModel"
            style="height: 100%"
            :limits="[20,20]"
          >

            <template v-slot:before>
              <q-tabs
                v-model="tab"
                vertical
                class="text-secondary"
              >
                <q-tab v-for="tab in items" :name="tab.sortName" :label="tab.sortName"
                       :icon="'img:' + tab.sortPhotoAddress" :key="tab.sortId" v-bind="tab"/>
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel v-for="(item,i) in items" :name="item.sortName">
                  <q-card class="item-card pd-top" v-for="(item) in item.sortPageItem"
                          @click="ItemToCart(item)">
                    <q-item clickable v-ripple>
                      <q-item-section side>
                        <q-avatar rounded size="48px">
                          <img :src="item.itemPhotoAddress"/>
                          <!--                          <q-badge floating color="teal">新品</q-badge>-->
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item.itemName }}</q-item-label>
                        <q-item-label caption>余量：{{ item.itemStockCurrent }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        ￥{{ item.itemPrice }}
                      </q-item-section>
                    </q-item>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </div>
      </template>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { wexinPay } from '../plugins/weixinPay';

const qs = require('qs');

export default {
  name: 'PageIndex',
  beforeMount() {
    this.items = this.$store.state.items;
    this.tab = this.$store.state.items[0].sortName;
  },
  data() {
    return {
      dialog: {
        replenishment: false,
        shop: false,
        user_info: false,
        admin: false,
      },
      replenishment_info: null,
      total: null,
      num: 0,
      time0: '',
      time4: '',
      items: null,
      stars: 3,
      tab: null,
      admin: {
        id: '',
        pwd: '',
      },
      active: true,
      splitterModel: 20,
    };
  },
  methods: {
    ItemToCart(item) {
      this.$emit('getItem', item);
    },
    goOrder() {
      this.$router.push('/order');
    },

    pay() {
      // let that = this;
      // axios.post(that.$store.state.url_paths.getWxConfig, qs.stringify({}))
      //   .then(function (response) {
      //       pay(response.data)
      //   })
      //   .catch(function (error) {
      //     that.$q.dialog({
      //       title: '网络错误',
      //       message: '错误信息：' + error
      //     })
      //   });
    },
    Replenishment() {
      const that = this;
      axios.post(that.$store.state.url_paths.replenishment, qs.stringify({
        access_token: that.$store.state.user_info.access_token,
      }))
        .then((response) => {
          if (response.data.code === 200) {
            that.dialog.replenishment = true;
            that.total = response.data.data.allPrice;
            that.replenishment_info = response.data.data.info;
          } else if (response.data.code !== 200) {
            that.$q.dialog({
              title: `${response.data.code}错误！`,
              message: `错误信息：${response.data.msg}`,
            });
          }
        })
        .catch((error) => {
          that.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    AdminLogin() {
      const that = this;
      axios.post(that.$store.state.url_paths.bindPermission, qs.stringify({
        access_token: that.$store.state.user_info.access_token,
        userLogin: that.admin.id,
        userPassword: that.admin.pwd,
      }))
        .then((response) => {
          if (response.data.code === 200) {
            that.$q.notify('登录成功');
            that.dialog.admin = false;
          } else if (response.data.code !== 200) {
            that.$q.dialog({
              title: `${response.data.code}错误！`,
              message: `错误信息：${response.data.msg}`,
            });
          }
        })
        .catch((error) => {
          that.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    changeAccount() {
      this.num++;
      if (this.num == 1) {
        this.timer0 = new Date().getTime() / 1000;
      }
      if (this.num == 4) {
        this.timer4 = new Date().getTime() / 1000;
        if (this.timer4 - this.timer0 <= 3) {
          this.num = 0;
          this.dialog.admin = true;
        } else {
          this.num = 0;
        }
      }
    },
  },
};
let appId;
let timeStamp;
let nonceStr;
let package_;
let signType;
let paySign;

function pay() {
  const url = 'http://lsp.chinaqwe.top:10001/pay/orders';
  $.get(url, (result) => {
    appId = result.appId;
    timeStamp = result.timeStamp;
    nonceStr = result.nonceStr;
    package_ = result.package;
    signType = result.signType;
    paySign = result.paySign;

    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady',
          onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady',
          onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady',
          onBridgeReady);
      }
      alert('请在微信上进行支付操作！');
      onBridgeReady();
    } else {
      onBridgeReady();
    }
  });
}

// 去微信那边发起支付请求
function onBridgeReady() {
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
      console.log('支付成功');
      // 支付成功后跳转的页面
    } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
      alert('支付取消');
    } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
      alert('支付失败');

      alert(JSON.stringify(res));

      WeixinJSBridge.call('closeWindow');
    } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
  });
}
</script>
