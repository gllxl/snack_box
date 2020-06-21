<template>
  <q-page padding>

    <div class="q-pa-xs">
      <div class=" justify-center q-gutter-sm">
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
    </div>

  </q-page>
</template>


<script>
  import axios from "axios";

  const Qs = require('qs');
  export default {
    data() {
      return {
        expanded: false,
        order_list: [
          {
            orderItemJson :{}
          }
        ]
      }
    },
    beforeMount() {
      this.getOrder()
    },
    methods: {
      getOrder() {
        let that = this;
        axios.post(that.$store.state.url_paths.getOrder, Qs.stringify({
          access_token: that.$store.state.user_info.access_token
        }))
          .then(function (response) {
            if (response.data.code === 200) {
              that.order_list = response.data.data.OrderInfo;
              for (let i = 0; i < response.data.data.OrderInfo.length; i++) {
                console.log(that.order_list[i].orderItemJson);
                that.order_list[i].orderItemJson = JSON.parse(response.data.data.OrderInfo[i].orderItemJson);
              }
              console.log(that.order_list)
            }
          })
      }
    },
  }
</script>
