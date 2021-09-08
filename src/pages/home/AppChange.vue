
<template>
  <div class="appChange">
    <div class="appChangeTop">
      <p class="appChangeTool">
        {{ $t('store.appChange') }}
      </p>
      <button
        class="backAppStore"
        @click="jumpToIndex()"
      >
        {{ $t('store.backAppStore') }}
      </button>
    </div>
    <iframe
      class="appChanegContent"
      :src="srcUrl"
      frameborder="0"
    />
  </div>
</template>

<script>
export default ({
  name: 'AppChange',
  components: {
  },
  data () {
    return {
      srcUrl: '',
      isRouterAlive: true
    }
  },
  methods: {
    getAtpUrl () {
      // let language = localStorage.getItem('language')
      let currUrl = window.location.origin
      // this.srcUrl = 'http://192.168.100.33:30087/#/home'
      if (currUrl.indexOf('30091') !== -1) {
        let originUrl = currUrl.replace('30091', '30087')
        this.srcUrl = originUrl + '/#/home'
      }
    },
    jumpToIndex () {
      this.$router.push('/index')
    },
    rebuileComponents () {
      // Destroy subtag
      this.isRouterAlive = false
      // Recreate the subtag
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  mounted () {
    this.getAtpUrl()
  },
  watch: {
    '$i18n.locale': function () {
      this.rebuileComponents()
      this.getAtpUrl()
    }
  }
})
</script>

<style lang='less'>
.appChange{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 1200px;
  align-items: center;
  .appChangeTop{
    width: 73.64%;
    margin: 60px 13.18% 20px 13.18%;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    .appChangeTool{
      font-size: 30px;
      font-family: HarmonyOS Sans SC;
      font-weight: bold;
      color: #5D3DA0;
      line-height: 50px;
      margin-bottom:0px ;
      text-align: left;
    }
    .backAppStore{
      width: 222px;
      height: 50px;
      background: linear-gradient(122deg, #4444D0, #6724CB);
      border-radius: 25px;
      padding: 4px 10px;
      font-size: 20px;
      font-family: HarmonyHeiTi;
      font-weight: 300;
      color: #FFFFFF;
      border: 1px solid #6724CB;
      box-shadow: 0px 16px 8px rgba(94, 44, 204, 0.3);
    }
  }
  .appChanegContent{
    width: 100%;
    height: 632px;
  }
}
</style>
