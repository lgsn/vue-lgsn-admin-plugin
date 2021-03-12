<template>
  <!-- 下拉加载动图 -->
  <div class="refreshLoadMask" @touchstart.prevent>
    <div class="refreshLoad">
      <span class="circle1"></span>
      <span class="circle2"></span>
      <span class="circle3"></span>
    </div>
  </div>
</template>

<style lang="scss">
  @function vw($px) {
    @return ($px / 750) * 100vw;
  }
  .refreshLoadMask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    .refreshLoad {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 99999;
      > span {
        display: inline-block;
        width: 12px;
        height: 12px;
        &:nth-of-type(n+2) {
          margin-left: 15px;
        }
        background-color: #FF7002;
        border-radius: 100%;
        animation: delay 1.4s infinite ease-in-out;
        animation-fill-mode: both;
      }
      .circle1 {
        animation-delay: -0.32s;
      }
      .circle2 {
        animation-delay: -0.16s;
      }
    }
    @keyframes delay {
      0%,
      80%,
      100% {
        transform: scale(0.0);
      }
      40% {
        transform: scale(1.0);
      }
    }
  }

</style>
