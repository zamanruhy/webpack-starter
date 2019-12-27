<template>
  <div class="spinner" :style="styles">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      class="spinner__svg"
    >
      <circle
        fill="transparent"
        :cx="viewBoxSize"
        :cy="viewBoxSize"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDashArray"
        :stroke-dashoffset="strokeDashOffset"
        class="spinner__circle"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    }
  },
  data () {
    return {
      radius: 20
    }
  },
  computed: {
    styles () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    circumference () {
      return 2 * Math.PI * this.radius
    },
    strokeDashArray () {
      return Math.round(this.circumference * 1000) / 1000
    },
    strokeDashOffset () {
      return `${this.circumference}px`
    },
    strokeWidth () {
      return Number(this.width) / +this.size * this.viewBoxSize * 2
    },
    viewBoxSize () {
      return this.radius / (1 - Number(this.width) / +this.size)
    },
    viewBox () {
      return `0 0 ${this.viewBoxSize * 2} ${this.viewBoxSize * 2}`
    }
  }
}
</script>

<style lang="scss">
.spinner {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;

  &__svg {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;

    @keyframes progress-circular-rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  }

  &__circle {
    stroke: currentColor;
    z-index: 2;
    transition: all 0.6s ease-in-out;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0;

    @keyframes progress-circular-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }

      50% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -15px;
      }

      100% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -125px;
      }
    }
  }
}
</style>
