<template>
  <q-layout  view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
<!--    <q-toolbar elevated class="bg-m-orange shadow-3 text-white ">-->
<!--      <div>-->
<!--        购买记录-->
<!--      </div>-->
<!--      <q-space />-->

<!--      &lt;!&ndash;-->
<!--        notice shrink property since we are placing it-->
<!--        as child of QToolbar-->
<!--      &ndash;&gt;-->
<!--      <q-btn icon="close" flat round dense />-->
<!--    </q-toolbar>-->
    <q-header reveal elevated class="bg-grey-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="mdi-format-list-text" size="30px" color="white"/>
          <span style="margin-left: 10px">购买记录</span>
        </q-toolbar-title>
        <q-space />
        <q-btn icon="close" flat round dense @click="$router.push('/')" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data() {
    return {
      leftDrawer: true,
    };
  },
};
</script>
