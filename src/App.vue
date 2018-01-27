<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-ajax-bar ref="bar" position="bottom" size="8" color="primary"></q-ajax-bar>
    <router-view />
  </div>
</template>

<script>
  import {
    QAjaxBar
  } from 'quasar'

export default {
  components: {
    QAjaxBar
  }
}
</script>

<!--<style scoped>-->
<style lang="styl">
  @import '~variables'

  .u-layout-padding {
    padding: 20px;
    padding-top: 20px;
  }

  @media (max-height: 500px) {
    .u-layout-padding {
      padding: 20px;
      padding-top: 10px;
    }
  }

  .u-overlay .modal-content {
    height: 78%;
  }

  .u-overlay-content {
    height: 100%;
  }

  .u-overlay-bottom {
    height: 78%;
    position: relative;
  }

  .u-overlay-buttons {
    height: 50px;
    width: 100%;
    bottom: 0;
    position: absolute;
  }

  .u-overlay-buttons-inner {
    width: 97%;
    margin-right: 5px;
  }

  @media (max-height: 500px) {
    .u-overlay .modal-content {
      height: 100%;
    }
  }

  /*.u-card-title {*/
  /*padding-top: 10px;*/
  /*padding-bottom: 10px;*/
  /*}*/

  .u-padding-left {
    padding-left: 20px;
  }

  .u-small {
    font-size: smaller;
  }

  .u-large {
    font-size: larger;
  }

  .u-info {
    display: block;
    margin-bottom: 5px;
  }

  /*.u-info-header {*/
  /*display: inline-block;*/
  /*margin-bottom: 5px;*/
  /*}*/

  .u-info-spacer {
    display: block;
    margin-bottom: 10px;
  }

  .u-info-spacer {
    display: block;
    margin-bottom: 5px;
  }

  .u-info-spacer-2 {
    display: block;
    margin-bottom: 15px;
  }

  .u-spacer {
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .u-spacer-half {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .u-action-button {
    min-height: 32px;
    height: 32px;
    width: 100px;
    margin: 5px;
    color: grey;
  }

  /*.u-action-button-smaller {*/
    /*!*width: 60px;*!*/
    /*min-height: 32px;*/
    /*height: 32px;*/
    /*margin: 5px;*/
  /*}*/

  @media (max-width: $breakpoint-xs) {
    .u-action-button {
      width: 70px;
      margin: 3px;
      /*height: 40px;*/
    }
  }

  @media (max-width: 400px) {
    .u-action-button {
      width: 60px;
      margin: 3px;
      /*height: 35px;*/
    }
  }

  .u-action-button-done {
    color: white;
    /*background-color: #09b412 !important;*/
    /*border: 1px solid #0ac313;*/
    /*opacity: 0.98;*/
    background-color: green !important;
    border: 1px solid green;
  }

  .u-action-button-small {
    width: 60px;
    height: 10px;
    margin: 5px;
  }

  .layout-page {
    height: calc(100vh - 106px);
    overflow: hidden;
  }

  .q-chip {
    min-height: 22px;
  }

  .q-chip .q-chip-main {
    padding: 4px;
  }

  .u-avatar-placeholder {
    display: flex;
    height: 40px;
    width: 40px;
    align-items: center;
    background: #e7e7e7;
    font-size: 10px;
    text-align: center;
  }

  .u-avatar-placeholder-large {
    height: 60px;
    width: 60px;
  }

  .u-avatar-placeholder-text {
    text-align: center;
  }
</style>
