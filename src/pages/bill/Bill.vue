<template>
  <div class="bill">
    <div class="title_top title_left defaultFontBlod clear">
      账单管理
      <span class="line_bot1" />
    </div>
    <div class="billContetn">
      <div class="top_content">
        <div
          id="chart1"
          class="chart"
        >
          chart1
        </div>
        <div
          id="chart2"
          class="chart"
        >
          chart2
        </div>
      </div>
      <div class="bottom_content">
        Table
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .bill{
    padding: 0 13%;
    .top_content{
      display: flex;
      justify-content: center;
      .chart{
        width: 50%;
        height: 300px;
        border: 1px solid #dddddd;
      }
    }
  }
</style>
