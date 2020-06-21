<template>
  <div class="q-pa-md">
    <div class=" justify-center q-gutter-sm">
        <q-card class="my-card" flat bordered>
          <q-card-section class="bg-teal text-white">
            <div class="text-h6 q-ma-md">{{}}货品详情</div>
          </q-card-section>
          <q-card-section>
            <q-list padding class="rounded-borders">
              <q-item v-for="item in item_list" clickable v-ripple>
                <q-item-section>
                  {{item.itemName}}
                </q-item-section>
                <q-item-section side>
                  {{item.stockCurrent}}/{{item.stockMix}}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  const qs = require('qs');
  export default {
    name: "AdminManageDetail",
    created() {
      this.getItemInfo();
    },
    data() {
      return {
        item_list: ''
      }
    }, methods: {
      getItemInfo() {
        let that = this;
        axios.post(that.$store.state.url_paths.findItemInfoByShopId, qs.stringify({
          access_token: that.$store.state.user_info.access_token,
          shop_id: that.$store.state.location.id
        }))
          .then(function (response) {
            that.item_list = response.data.itemInfo
          })
          .catch(function (error) {
            that.$q.dialog({
              title: '网络错误',
              message: '错误信息：' + error
            })
          });
      }
    }
  }
</script>

<style scoped>

</style>
