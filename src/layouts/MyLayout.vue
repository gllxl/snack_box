<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view @getItem="getItem"></router-view>
    </q-page-container>
    <q-footer elevated class="bg-grey-1 text-grey-8" style="z-index: 6001;">
      <q-toolbar class="bg-grey-9 text-white">
        <q-btn @click="goCart()" flat round dense icon="mdi-shopping" class="q-mr-sm">
          <q-badge color="secondary" floating transparent>
            {{cart_item_total}}
          </q-badge>
        </q-btn>
        <q-toolbar-title @click="goCart()">￥{{cart_price_total}}</q-toolbar-title>

        <q-dialog v-model="seamless" position="bottom">


          <q-card style="max-height: 250px; padding-bottom: 50px;">
            <q-linear-progress :value="1" size="2px" color="secondary"/>

            <q-list bordered separator class="text-weight-bold">

              <q-item v-for="(item,i) in this.$store.state.cart_list" style="padding: 0 16px;">
                <q-item-section avatar>
                  {{item.item_name}}
                </q-item-section>
                <q-item-section class="text-right ">
                  {{item.item_price * item.num}}元
                </q-item-section>
                <q-item-section side>
                  <div>

                    <q-btn flat round icon="remove" @click="itemRemove(item.item_id)"/>
                    <span class="text-weight-bold">{{item.num}}</span>
                    <q-btn flat round icon="add" @click="itemAdd(item.item_id)"/>

                  </div>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card>
        </q-dialog>
        <span class="text-h6">去付款</span>
        <q-btn flat round dense icon="chevron_right"/>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
  export default {
    name: 'MyLayout',
    computed: {
      cart_item_total() {
        return this.$store.state.cart_item_total
      },
      cart_price_total() {
        return this.$store.state.cart_price_total
      }
    },
    data() {
      return {
        seamless: false
      };
    }, methods: {
      getItem(item) {
        //console.log(item);
        let that = this;
        that.$store.commit('addItemToCart', item)
      },
      itemAdd(item_id) {
        this.$store.commit('item_add', item_id)
      },
      itemRemove(item_id) {
        if (this.$store.state.cart_item_total ===1){
          this.seamless = false
        }
        this.$store.commit('item_remove', item_id)
      },
      goCart() {
        if (this.$store.state.cart_item_total !== 0)
        {
          this.seamless = true
        }
      }
    }
  };
</script>
