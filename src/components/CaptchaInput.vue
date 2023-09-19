<template>
  <div @click="refreshCode">
    <SIdentify :identifyCode="identifyCode"></SIdentify>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import SIdentify from '@/components/Identify.vue';

const makeCode = ref('');
const identifyCode = ref('');

/**
  * 随机生成一个0~9之间的数
  */
const randomNum = () => {
  return Math.floor(Math.random() * 10)
}
/**
  * 随机生成一个字母
  * @param {boolean} isUupper 生成大写字母
  */
const randomAlphabet = ({ isUupper = false } = {}) => {
  // a的Unicode值为97,z的Unicode值为123
  const alphabet = String.fromCharCode(Math.floor(Math.random() * 25) + 97)
  if (!isUupper) {
    return alphabet
  } else {
    return alphabet.toUpperCase()
  }
}
/**
  * 生成图片验证码
  * @param {number} length 图片验证码位数
  * @param {boolean} typeMix 数字和字母混合
  * @param {string} pureNumber 纯数字('number')或者字母('alphabet')
  * @param {boolean} randomTypeLen 随机生成类型个数组合
  * @param {boolean} capsLookMix 字母大小写混合
  * @param {number} numLength 混合类型下的数字个数
  * @param {number} uupperLength 大写字母的个数
  */
const makeIdentifyCode = ({ length = 4, typeMix = true, pureNumber = 'alphabet', randomTypeLen = false, capsLookMix = false, numLength = 2, uupperLength = 1 } = {}) => {
  makeCode.value = ''
  // 数字和字母混合
  if (typeMix) {
    // 随机生成类型个数组合
    if (randomTypeLen) {
      // 字母大小写混合
      if (capsLookMix) {
        const numLength = Math.floor(Math.random() * length) + 1
        const uupperLength = numLength === length ? 0 : Math.floor(Math.random() * (length - numLength)) + 1
        for (let i = 0; i < numLength; i++) {
          makeCode.value += randomNum()
        }
        for (let i = 0; i < uupperLength; i++) {
          makeCode.value += randomAlphabet({ isUupper: true })
        }
        if (numLength + uupperLength < length) {
          for (let i = 0; i < length - numLength - uupperLength; i++) {
            makeCode.value += randomAlphabet()
          }
        }
      } else {
        const numLength = Math.floor(Math.random() * length) + 1
        for (let i = 0; i < numLength; i++) {
          makeCode.value += randomNum()
        }
        if (numLength < length) {
          for (let i = 0; i < length - numLength; i++) {
            makeCode.value += randomAlphabet()
          }
        }
      }
    } else {
      // 字母大小写混合
      if (capsLookMix) {
        const tempNumLength = numLength < 0 ? 2 : numLength > length ? 2 : numLength
        const tempUupperLength = uupperLength < 0 ? 1 : uupperLength > length - tempNumLength ? 1 : uupperLength
        for (let i = 0; i < tempNumLength; i++) {
          makeCode.value += randomNum()
        }
        for (let i = 0; i < tempUupperLength; i++) {
          makeCode.value += randomAlphabet({ isUupper: true })
        }
        if (tempNumLength + tempUupperLength < length) {
          for (let i = 0; i < length - tempNumLength - tempUupperLength; i++) {
            makeCode.value += randomAlphabet()
          }
        }
      } else {
        const tempNumLength = numLength < 0 ? 2 : numLength > length ? 2 : numLength
        for (let i = 0; i < tempNumLength; i++) {
          makeCode.value += randomNum()
        }
        if (tempNumLength < length) {
          for (let i = 0; i < length - tempNumLength; i++) {
            makeCode.value += randomAlphabet()
          }
        }
      }
    }
  } else {
    // 纯数字('number')
    if (pureNumber === 'number') {
      for (let i = 0; i < length; i++) {
        makeCode.value += randomNum()
      }
    }
    // 纯字母('alphabet')
    if (pureNumber === 'alphabet') {
      // 字母大小写混合
      if (capsLookMix) {
        const tempUupperLength = uupperLength < 0 ? 1 : uupperLength > length ? 1 : uupperLength
        for (let i = 0; i < tempUupperLength; i++) {
          makeCode.value += randomAlphabet({ isUupper: true })
        }
        if (tempUupperLength < length) {
          for (let i = 0; i < length - tempUupperLength; i++) {
            makeCode.value += randomAlphabet()
          }
        }
      } else {
        for (let i = 0; i < length; i++) {
          makeCode.value += randomAlphabet()
        }
      }
    }
  }
  shuffle(makeCode.value)
}
/**
  * 图片验证码随机排序
  * @param {string} str 图片验证码
  */
const shuffle = (str) => {
  identifyCode.value = [...str].sort(() => Math.random() - 0.5).join('')
  console.log("identifyCode:::::",identifyCode.value)
}
/**
  * 更换图片验证码
  */
const refreshCode = () => {
  makeIdentifyCode({ randomTypeLen: true })
}

onMounted(() => {
  makeIdentifyCode({ randomTypeLen: true });
});

defineExpose({
  identifyCode,
  refreshCode
})
</script>
