<template>
  <q-page padding>

    <div class="q-pa-xs">
      <div class=" justify-center q-gutter-sm">
        <q-intersection
          v-for="index in 60"
          :key="index"
          once
          transition="scale"
          class="example-item"
        >

          <q-card class="my-card" flat bordered>
            <q-linear-progress size="2px"  :value="1" color="secondary"/>
            <q-card-section>

              <q-list dense padding class="rounded-borders">
                <q-item clickable v-ripple>
                  <q-item-section>
                    绿爽 * 8
                  </q-item-section>
                  <q-item-section side>
                    ￥4.00
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>
                    鱼豆腐 * 3
                  </q-item-section>

                  <q-item-section side>
                    ￥1.00
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>
                    豆干 * 2
                  </q-item-section>
                  <q-item-section side>
                    ￥1.00
                  </q-item-section>
                </q-item>
              </q-list>

            </q-card-section>

            <q-card-actions>
              <div class="text-caption text-grey">
                2020/01/26 19:30:50
              </div>
              <q-space/>
              <div class="text-caption text-grey">
                实付:
              </div>
              <span class="text-m-orange">
                ￥10.00
              </span>
            </q-card-actions>

          </q-card>
        </q-intersection>
      </div>
    </div>

  </q-page>
</template>


<script>
  export default {
    data() {
      return {
        expanded: false,
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
