<template>

  <canvas id="s-canvas" :width="contentWidth" :height="contentHeight" style="border-radius:5px; cursor: pointer;"></canvas>

</template>

<script setup lang="ts">
import { onMounted, toRefs, watch } from 'vue';

const props = defineProps({
  //图片验证码
  identifyCode:{
      type:String,
      default: '1234'
  },
  // 字体最小值
  fontSizeMin: {
    type: Number,
    default: 28
  },
  // 字体最大值
  fontSizeMax: {
    type: Number,
    default: 34
  },
  // 背景颜色色值最小值，最小为0
  backgroundColorMin: {
    type: Number,
    default: 200
  },
  // 背景颜色色值最大值，最大为255
  backgroundColorMax: {
    type: Number,
    default: 240
  },
  // 字体颜色色值最小值，最小为0
  colorMin: {
    type: Number,
    default: 0
  },
  // 字体颜色色值最大值，最大为255
  colorMax: {
    type: Number,
    default: 180
  },
  // 干扰线颜色色值最小值，最小为0
  lineColorMin: {
    type: Number,
    default: 150
  },
  // 干扰线颜色色值最大值，最大为255
  lineColorMax: {
    type: Number,
    default: 200
  },
  // 干扰点颜色色值最小值，最小为0
  dotColorMin: {
    type: Number,
    default: 100
  },
  // 干扰点颜色色值最大值，最大为255
  dotColorMax: {
    type: Number,
    default: 250
  },
  // 画布宽度
  contentWidth: {
    type: Number,
    default: 170
  },
  // 画布高度
  contentHeight: {
    type: Number,
    default: 50
  }
})
const { identifyCode, fontSizeMin, fontSizeMax, backgroundColorMin, backgroundColorMax,
  colorMin, colorMax, lineColorMin,lineColorMax,dotColorMin,dotColorMax,contentWidth,contentHeight } = toRefs(props);

/**
  * 生成一个随机数
  * @param {number} min 随机数最小值
  * @param {number} max 随机数最大值
  */
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
/**
  * 生成一个随机的颜色
  * @param {number} min 随机数最小值
  * @param {number} max 随机数最大值
  */
const randomColor = (min, max) => {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
/**
  * 绘制图片验证码
  */
const drawPic = () => {
  let canvas:any = document.querySelector('#s-canvas')
  let ctx = canvas.getContext('2d')
  ctx.textBaseline = 'bottom'
  // 绘制背景
  ctx.fillStyle = randomColor(backgroundColorMin.value, backgroundColorMax.value)
  ctx.fillRect(0, 0, contentWidth.value, contentHeight.value)
  // 绘制干扰点
  drawDot(ctx)
  // 绘制验证码
  for (let i = 0; i < identifyCode.value.length; i++) {
    drawText(ctx, identifyCode.value[i], i)
  }
  // 绘制干扰线
  drawLine(ctx)
}
/**
  * 绘制文本单个验证码
  * @param {object} ctx canvas上下文对象
  * @param {string} txt 单个验证码
  * @param {number} i 单个验证码序号
  */
const drawText = (ctx, txt, i) => {
  ctx.fillStyle = randomColor(colorMin.value, colorMax.value)
  ctx.font = randomNum(fontSizeMin.value, fontSizeMax.value) + 'px SimHei'
  let x = (i + 1) * (contentWidth.value / (identifyCode.value.length + 1))
  let y = randomNum(fontSizeMax.value, contentHeight.value - 5)
  let deg = randomNum(-45, 45)
  // 修改坐标原点和旋转角度
  ctx.translate(x, y)
  ctx.rotate(deg * Math.PI / 180)
  ctx.fillText(txt, 0, 0)
  // 恢复坐标原点和旋转角度
  ctx.rotate(-deg * Math.PI / 180)
  ctx.translate(-x, -y)
}
/**
  * 绘制干扰线
  * @param {object} ctx canvas上下文对象
  */
const drawLine = (ctx) => {
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = randomColor(lineColorMin.value, lineColorMax.value)
    ctx.beginPath()
    ctx.moveTo(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value))
    ctx.lineTo(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value))
    ctx.stroke()
  }
}
/**
  * 绘制干扰点
  * @param {object} ctx canvas上下文对象
  */
const drawDot = (ctx) => {
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}

onMounted(() => {
  drawPic();
});
watch(() => identifyCode.value,
  () => {
    drawPic();
  }
)
</script>