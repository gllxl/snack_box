<template>
  <div class="q-pa-sm q-gutter-sm">

    <q-dialog v-model="dialog.shop" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="shop-card">
        <q-img src="statics/pic/chicken-salad.jpg"/>

        <q-card-section>


          <div class="no-wrap items-center" style="margin-left: 6px">

            <div class="col text-h6 ellipsis">
              2-301寝室零食小铺
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
      <q-card class="shop-card">

        <q-card-section>


        </q-card-section>

        <q-card-section class="q-pt-none">


        </q-card-section>

      </q-card>
    </q-dialog>

    <q-dialog full-height v-model="dialog.user_info" position="right">
      <q-card style="min-width: 240px;height: 100px">

        <q-card-section class="row items-center no-wrap q-ml-sm q-mt-sm q-mb-sm">
          <q-avatar class="text-center">
            <img :src="$store.state.user_info.headimgurl">
          </q-avatar>
          <div style="margin-left: 20px" class="text-subtitle2">{{$store.state.user_info.nickname}}</div>
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

          <q-item clickable v-ripple @click="getBoxItem()">
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

          <q-item clickable v-ripple>
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
            301寝室零食小铺
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
          >

            <template v-slot:before>
              <q-tabs
                v-model="tab"
                vertical
                class="text-teal"
              >
                <q-tab name="lt" class="text-m-orange" icon="img:statics/list_icons/latiao.svg" label="辣条"/>
                <q-tab name="dzp" class="text-m-orange" icon="img:statics/list_icons/dougan.svg" label="豆制品"/>
                <q-tab name="kcl" class="text-m-orange" icon="img:statics/list_icons/kaochang.svg" label="烤肠类"/>
                <q-tab name="rs" class="text-m-orange" icon="img:statics/list_icons/roushi.svg" label="肉食"/>
                <q-tab name="ts" class="text-m-orange" icon="img:statics/list_icons/tangguo.svg" label="甜食"/>
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="lt">
                  <q-card class="item-card pd-top" v-for="(item,i) in $store.state.item_list.lt"
                          @click="ItemToCart(item)">
                    <q-item clickable v-ripple>
                      <q-item-section side>
                        <q-avatar rounded size="48px">
                          <img src="https://cdn.quasar.dev/img/avatar.png"/>
                          <q-badge floating color="teal">新品</q-badge>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{item.item_name}}</q-item-label>
                        <q-item-label caption>余量：10</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        ￥{{item.item_price}}/{{item.item_unit}}
                      </q-item-section>
                    </q-item>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="dzp">
                  <q-card class="item-card pd-top" v-for="(item,i) in $store.state.item_list.dzp"
                          @click="ItemToCart(item)">
                    <q-item clickable v-ripple>
                      <q-item-section side>
                        <q-avatar rounded size="48px">
                          <img src="https://cdn.quasar.dev/img/avatar.png"/>
                          <q-badge floating color="teal">新品</q-badge>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{item.item_name}}</q-item-label>
                        <q-item-label caption>余量：10</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        ￥{{item.item_price}}/{{item.item_unit}}
                      </q-item-section>
                    </q-item>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="kcl">

                </q-tab-panel>

                <q-tab-panel name="rs">

                </q-tab-panel>

                <q-tab-panel name="ts">

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
  import axios from "axios";
  const Qs = require('qs');
  export default {
    name: 'PageIndex',
    data() {
      return {
        dialog: {
          replenishment: false,
          shop: false,
          user_info: false,
        },
        stars: 3,
        tab: 'lt',
        splitterModel: 20,
      }
    },
    methods: {
      ItemToCart(item) {
        this.$emit('getItem', item);
        console.log(item);
        console.log(this.$store.state.cart_list)
      },
      goOrder() {
        this.$router.push('/order');
      },
      getBoxItem() {
        let that = this;
        axios.post(that.$store.state.url_paths.getBoxItems, Qs.stringify({
          access_token: that.$store.state.user_info.access_token
        }))
          .then(function (response) {
            // if (response.data.code === 200) {
            //   that.$store.commit('GetUserInfo', response.data.data.userInfo);
            //   console.log(that.$store.state.user_info);
            //   that.$router.push('/');
            // }
          })
      }
    }
  }
</script>
