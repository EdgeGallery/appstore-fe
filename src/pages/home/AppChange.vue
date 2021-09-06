
<template>
  <div class="appChange">
    <div class="appChangeTop">
      <p class="appChangeTool">
        {{ $t('store.appChange') }}
      </p>
      <button class="backAppStore">
        {{ $t('store.backAppStore') }}
      </button>
    </div>
    <iframe
      class="appChanegContent"
      src="http://192.168.100.33:30087/#/home"
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
    }
  },
  methods: {
  },
  mounted () {
  },
  watch: {
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
    border: 1px solid red;
    width: 73.64%;
    margin: 0px 13.18% 0px 13.18%;
    min-width: 1200px;
    height: 632px;
  }
}
</style>
