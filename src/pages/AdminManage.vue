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
          <q-btn flat label="反馈" v-close-popup/>
          <q-btn flat label="确认" v-close-popup/>
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
          <q-btn flat label="反馈" v-close-popup/>
          <q-btn flat label="确认" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-tabs
      v-model="tab"
      align="justify"
      narrow-indicator
      class="q-mb-lg bg-grey-1"
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
                    {{shop.shopId}}
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
                <q-linear-progress size="2px" :value="1" :color="shop.shopState ? 'teal' : 'red'"/>
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
      dialog: {
        item_info: false,
        replenishment_info: false,
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
      const that = this;
      that.shop_address = shop.shopAddress;
      axios.post(that.$store.state.url_paths.findItemInfoByShopId, qs.stringify({
        access_token: that.$store.state.user_info.access_token,
        shop_id: shop.shopId,
      }))
        .then((response) => {
          that.item_list = response.data.itemInfo;
          that.dialog.item_info = true;
        })
        .catch((error) => {
          that.$q.dialog({
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
