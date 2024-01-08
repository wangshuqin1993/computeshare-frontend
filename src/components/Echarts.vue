<template>
  <div :id="echartsId" :style="{width: echartsWidth, height: echartsHeight}"></div>
</template>

<script lang="ts" setup>
// 引入echarts
import * as echarts from 'echarts'
import { onMounted, toRefs } from "vue";

const props = defineProps({
  echartsData: {
    type:Array,
    required:true
  },
  echartsId: {
    type:String,
    required:true
  },
  echartsWidth: {
    type:String,
    default: "300px"
  },
  echartsHeight: {
    type:String,
    default: "66px"
  },
  echartsXData: {
    type: Array,
    required:true
  },
  seriesName: {
    type:String,
    default: "Line"
  },
  areaColor: {
    type:String,
    default: '#5BD171'
  },
  areaColor1: {
    type:String,
    default: '#94EAAA'
  },
});
const { echartsData, echartsId, echartsWidth, echartsHeight, echartsXData, seriesName, areaColor, areaColor1 } = toRefs(props);

onMounted(() => { // 需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById(echartsId?.value)as HTMLElement);
  // 绘制图表
  myChart.setOption({
    
    tooltip: { //鼠标悬浮提示内容
      trigger: 'axis',
      padding: [20, 20],
      // position: 'inside',
      formatter: '{a}: ({c}%)',
    },
    xAxis: {
      show: false,
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show:false
      },
      data: echartsXData.value
    },
    grid: {
      left: "1px",
      top: "0",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    yAxis: {
      axisLabel: { // 取消显示坐标值
        show: false,
      },
      splitLine: { //取消网格线
        show:false
      },
      type: 'value',
      min: 0,
      max: 100,
      interval: 10, //间隔
    },
    series: [
      {
        name: seriesName.value,
        type: 'line',
        stack: 'Total',
        smooth: true, //平滑
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: areaColor.value
            },
            {
              offset: 1,
              color:  areaColor1.value
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: echartsData?.value,
        itemStyle: {
          normal: {
            color: areaColor.value
          }
        }
      }
    ]
  });
  window.onresize = function () { // 自适应大小
    myChart.resize();
  };
});
</script>
