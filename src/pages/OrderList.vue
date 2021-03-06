<template>
  <q-page>
    <div class="q-pa-none">
      <div class="justify-center q-gutter-sm">
        <q-tabs
          v-model="tab"
          align="justify"
          narrow-indicator
          class="q-mb-sm bg-grey-1"
        >
          <q-tab class="text-teal" name="myOrder" label="我的订单"/>
          <q-tab class="text-green" name="boxOrder" label="盒子订单"/>
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
        >
          <q-tab-panel name="myOrder">
            <div class="q-pa-xs">
              <q-intersection
                v-for="(order,i) in order_list"
                :key="order.orderId"
                once
                transition="scale"
                class="example-item"
              >

                <q-card class="my-card" flat bordered>
                  <q-linear-progress size="2px" :value="1" color="secondary"/>
                  <q-card-section>

                    <q-list dense padding class="rounded-borders">
                      <q-item v-for="item in order.orderItemJson.cart_list" clickable v-ripple>
                        <q-item-section>
                          {{item.itemName}} * {{item.num}}
                        </q-item-section>
                        <q-item-section side>
                          ￥ {{item.itemPrice}}
                        </q-item-section>
                      </q-item>

                    </q-list>

                  </q-card-section>

                  <q-card-actions>
                    <div class="text-caption text-grey">
                      {{order.orderTime}}
                    </div>
                    <q-space/>
                    <div class="text-caption text-grey">
                      实付:
                    </div>
                    <span class="text-m-orange">
                ￥{{order.orderPrice}}
              </span>
                  </q-card-actions>

                </q-card>
              </q-intersection>
            </div>
          </q-tab-panel>
          <q-tab-panel name="boxOrder">
            <div class="q-pa-xs">
              <q-intersection
                v-for="(order,i) in order_list"
                :key="order.orderId"
                once
                transition="scale"
                class="example-item"
              >

                <q-card class="my-card" flat bordered>
                  <q-linear-progress size="2px" :value="1" color="secondary"/>
                  <q-card-section>

                    <q-list dense padding class="rounded-borders">
                      <q-item v-for="item in order.orderItemJson.cart_list" clickable v-ripple>
                        <q-item-section>
                          {{item.itemName}} * {{item.num}}
                        </q-item-section>
                        <q-item-section side>
                          ￥ {{item.itemPrice}}
                        </q-item-section>
                      </q-item>

                    </q-list>

                  </q-card-section>

                  <q-card-actions>
                    <div class="text-caption text-grey">
                      {{order.orderTime}}
                    </div>
                    <q-space/>
                    <div class="text-caption text-grey">
                      实付:
                    </div>
                    <span class="text-m-orange">
                ￥{{order.orderPrice}}
              </span>
                  </q-card-actions>

                </q-card>
              </q-intersection>
            </div>
          </q-tab-panel>
        </q-tab-panels>

      </div>
    </div>

  </q-page>
</template>


<script>
import axios from 'axios';

const Qs = require('qs');

export default {
  data() {
    return {
      expanded: false,
      tab: 'myOrder',
      order_list: [
        {
          orderItemJson: {},
        },
      ],
      box_order_list: [
        {
          orderItemJson: {},
        },
      ],
    };
  },
  beforeMount() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      const that = this;
      axios.post(that.$store.state.url_paths.getOrder, Qs.stringify({
        access_token: that.$store.state.user_info.access_token,
      }))
        .then((response) => {
          if (response.data.code === 200) {
            that.order_list = response.data.data.OrderInfo;
            for (let i = 0; i < response.data.data.OrderInfo.length; i++) {
              console.log(that.order_list[i].orderItemJson);
              that.order_list[i].orderItemJson = JSON.parse(response.data.data.OrderInfo[i].orderItemJson);
            }
            console.log(that.order_list);
          }
        });
    },
    getBoxOrder() {
      this.$api.order.getBoxOrder(this.$store.state.user_info.access_token)
        .then((res) => {
          if (res.data.code === 200) {
            this.order_list = res.data.data.OrderInfo;
            for (let i = 0; i < res.data.data.OrderInfo.length; i++) {
              console.log(this.order_list[i].orderItemJson);
              this.order_list[i].orderItemJson = JSON.parse(response.data.data.OrderInfo[i].orderItemJson);
            }
            console.log(this.order_list);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
