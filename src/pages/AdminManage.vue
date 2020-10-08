<template>
  <q-page>
    <q-dialog v-model="dialog.item_info">
      <q-card class="my-card" flat style="width: 90%">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 q-ma-md">{{shop_address}}货品详情</div>
        </q-card-section>
        <q-card-section>
          <q-list padding class="rounded-borders">
            <q-item dense v-for="item in item_list" clickable v-ripple>
              <q-item-section>
                {{item.itemName}}
              </q-item-section>
              <q-item-section side>
                {{item.stockCurrent}}/{{item.stockMix}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat color="red" label="缺货" @click="dialog.check_info = true" />
          <q-btn flat label="确认" @click="checkShopPass()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.check_info">
      <q-card class="my-card" flat style="width: 90%">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 q-ma-md">{{shop_address}}缺货详情</div>
        </q-card-section>
        <q-card-section>
          <q-list padding class="rounded-borders">
            <q-item dense v-for="item in item_list" clickable v-ripple>
              <q-item-section>
                {{item.itemName}}
              </q-item-section>
              <q-input class="col-3" dense type="number" v-model="item.defectNum" label="缺货数量" />
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="提交" @click="checkShop()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.replenishment_info">
      <q-card class="my-card" flat style="width: 90%">
        <q-card-section class="bg-teal text-white">
          <div class="text-h6 q-ma-md">{{replenishment_info_detail.replenishmentShopAddress}}补货单详情</div>
        </q-card-section>
        <q-card-section>
          <q-list padding class="rounded-borders">
            <q-item dense v-for="item in replenishment_info_detail.replenishmentInfo" clickable v-ripple>
              <q-item-section>
                {{item.replenishmentItemName}} * {{item.replenishmentItemNum}}
              </q-item-section>
              <q-item-section side>
                ￥ {{item.replenishmentItemPrice}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="确认" @click="confirmReplenishment()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-tabs
      v-model="tab"
      align="justify"
      narrow-indicator
      class="q-mb-sm bg-grey-1"
    >
      <q-tab class="text-teal" name="ph" label="盘货"/>
      <q-tab class="text-green" name="bh" label="补货"/>
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-tab-panel name="ph">
        <div class="q-pa-xs">
          <div class="row">
            <div v-for="(shop,i) in shop_info"
                 :key="shop.shopId" class="col-6 q-pa-sm">
              <q-card flat bordered @click="goShopDetail(shop)">
                <q-linear-progress size="2px" :value="1" :color="shop.shopState ? 'teal' : 'red'"/>
                <q-card-section>

                  <q-list v-ripple="false" padding class="rounded-borders">
                    <q-item v-ripple="false">
                      <q-item-section class="text-weight-bold">
                        {{shop.shopAddress}}
                      </q-item-section>
                    </q-item>

                  </q-list>
                  <q-separator/>
                  <q-card-actions class="text-grey">
                    {{shop.shopLastCheckTime}}
                  </q-card-actions>
                </q-card-section>

                <!--        <q-card-actions>-->
                <!--          <div class="text-caption text-grey">-->
                <!--            {{order.orderTime}}-->
                <!--          </div>-->
                <!--          <q-space/>-->
                <!--          <div class="text-caption text-grey">-->
                <!--            实付:-->
                <!--          </div>-->
                <!--          <span class="text-m-orange">-->
                <!--                ￥{{order.orderPrice}}-->
                <!--              </span>-->
                <!--        </q-card-actions>-->

              </q-card>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="bh">
        <div class="q-pa-xs">
          <div class="row">
            <div v-for="(shop,i) in replenishment_info"
                 :key="shop.replenishmentItemId" class="col-6 q-pa-sm">
              <q-card flat bordered @click="getReplenishmentDetailInfo(shop)">
                <q-linear-progress size="2px" :value="1" :color="shop.isFinish ? 'teal' : 'red'"/>
                <q-card-section>

                  <q-list v-ripple="false" padding class="rounded-borders">
                    <q-item v-ripple="false">
                      <q-item-section class="text-weight-bold">
                        {{shop.replenishmentShopAddress}}
                      </q-item-section>
                    </q-item>

                  </q-list>
                  <q-separator/>
                  <q-card-actions class="text-grey">
                    {{shop.CreatTime}}
                  </q-card-actions>
                </q-card-section>

                <!--        <q-card-actions>-->
                <!--          <div class="text-caption text-grey">-->
                <!--            {{order.orderTime}}-->
                <!--          </div>-->
                <!--          <q-space/>-->
                <!--          <div class="text-caption text-grey">-->
                <!--            实付:-->
                <!--          </div>-->
                <!--          <span class="text-m-orange">-->
                <!--                ￥{{order.orderPrice}}-->
                <!--              </span>-->
                <!--        </q-card-actions>-->

              </q-card>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import axios from 'axios';

const qs = require('qs');

export default {
  name: 'AdminManage',
  created() {
    this.findAllShopInfo();
    this.findReplenishmentInfo();
  },
  data() {
    return {
      shop_info: '',
      replenishment_info: '',
      replenishment_info_detail: {
        ReplenishmentInfo: null,
      },
      location: {
        id: 0,
      },
      tab: 'ph',
      shop_address: null,
      item_list: null,
      shop_id: null,
      dialog: {
        item_info: false,
        replenishment_info: false,
        check_info: false,
      },
    };
  },
  methods: {
    findAllShopInfo() {
      const that = this;
      axios.post(that.$store.state.url_paths.adminGetShops, qs.stringify({
        access_token: that.$store.state.user_info.access_token,
      }))
        .then((response) => {
          that.shop_info = response.data.ShopInfo;
        })
        .catch((error) => {
          that.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    findReplenishmentInfo() {
      const that = this;
      axios.post(that.$store.state.url_paths.findReplenishmentInfo, qs.stringify({
        access_token: that.$store.state.user_info.access_token,
      }))
        .then((response) => {
          that.replenishment_info = response.data.data.info;
        })
        .catch((error) => {
          that.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    getReplenishmentDetailInfo(replenishment_info) {
      this.replenishment_info_detail = replenishment_info;
      this.dialog.replenishment_info = true;
      this.replenishment_info_detail.replenishmentInfo = JSON.parse(replenishment_info.replenishmentInfo);
    },
    goShopDetail(shop) {
      // this.shop_address = shop.shopAddress;
      // this.$api.admin.findItemInfoByShopId(this.$store.state.user_info.access_token, shop.shopId)
      //   .then((res) => {
      //     console.log(res);
      //     this.item_list = res?.data?.itemInfo;
      //     this.dialog.item_info = true;
      //   })
      //   .catch((error) => {
      //     this.$q.dialog({
      //       title: '网络错误',
      //       message: `错误信息：${error}`,
      //     });
      //   });
      this.shop_address = shop.shopAddress;
      this.shop_id = shop.shopId;
      axios.post(this.$store.state.url_paths.findItemInfoByShopId, qs.stringify({
        access_token: this.$store.state.user_info.access_token,
        shop_id: shop.shopId,
      }))
        .then((response) => {
          this.item_list = response.data.itemInfo;
          this.dialog.item_info = true;
        })
        .catch((error) => {
          this.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    checkShopPass() {
      this.$api.admin.checkShopPass(this.$store.state.user_info.access_token, this.shop_id)
        .then((res) => {
          console.log(res);
          this.$q.notify({
            type: 'negative',
            color: 'green',
            position: 'top',
            message: `${this.shop_address}盘货成功`,
          });
          this.findAllShopInfo();
          this.dialog.item_info = false;
        })
        .catch((error) => {
          this.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    checkShop() {
      const shop_json = JSON.stringify(this.item_list.filter(item => item.defectNum > 0 && item.defectNum.length > 0));
      // this.$api.admin.checkShop(this.$store.state.user_info.access_token, this.shop_id, shop_json)
      axios.post('/admin/checkShop', qs.stringify({
        access_token: this.$store.state.user_info.access_token,
        shop_id: this.shop_id,
        shop_json,
      }))
        .then((res) => {
          console.log(res);
          const { appId } = res.data;
          const { timeStamp } = res.data;
          const { nonceStr } = res.data;
          const package_ = res.data.package;
          const { signType } = res.data;
          const { paySign } = res.data;

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
          this.findAllShopInfo();
          this.dialog.check_info = false;
          this.dialog.item_info = false;
        })
        .catch((error) => {
          this.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
    confirmReplenishment() {
      this.$api.user.updateReplenishment(this.$store.state.user_info.access_token, this.replenishment_info_detail.replenishmentItemId)
        .then((res) => {
          this.findReplenishmentInfo();
          this.$q.notify({
            type: 'negative',
            color: 'green',
            position: 'top',
            message: `${this.replenishment_info_detail.replenishmentShopAddress}补货成功`,
          });
          this.dialog.replenishment_info = false;
        })
        .catch((error) => {
          this.$q.dialog({
            title: '网络错误',
            message: `错误信息：${error}`,
          });
        });
    },
  },
};
</script>

<style scoped>

</style>
