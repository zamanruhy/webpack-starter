<template>
  <button
    class="hamburger"
    :class="classes"
    type="button"
    aria-label="Toggle menu"
    @click.prevent="toggle"
  >
    <span class="hamburger__inner">
      <span class="hamburger__bar" />
      <span class="hamburger__bar" />
    </span>
    <span class="hamburger__bar" />
  </button>
</template>

<script>
export default {
  name: 'Hamburger',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Boolean
  },
  data () {
    return {
      isActive: this.active
    }
  },
  computed: {
    classes () {
      return {
        hamburger_active: this.isActive
      }
    }
  },
  watch: {
    active (value) {
      this.isActive = value
    },
    isActive (value) {
      this.$emit('change', value)
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss">
$hamburger-width: 26px;
$hamburger-height: 22px;
$hamburger-bar-height: 2px;
$hamburger-bar-radius: 0;
$hamburger-bar-offset: ($hamburger-height - $hamburger-bar-height) / 2;
$hamburger-transition: 0.3s easing(fast-in-fast-out);

.hamburger {
  width: $hamburger-width;
  height: $hamburger-height;
  background-color: transparent;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border: none;
  padding: 0;
  cursor: pointer;
  transform: translate3d(0, 0, 0);
  transition: $hamburger-transition;
  color: #222222;

  &__inner {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: translateX(-50%);
    transition: inherit;
  }

  &_active &__inner {
    width: 110%;
  }

  &__bar {
    height: $hamburger-bar-height;
    background-color: currentColor;
    width: 100%;
    display: block;
    border-radius: $hamburger-bar-radius;
    transition: inherit;
    transform: translate3d(0, 0, 0);
  }

  & > &__bar {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }

  &_active > &__bar {
    background-color: transparent;
  }

  &_active &__inner > &__bar {
    &:first-child {
      transform: translate3d(0, $hamburger-bar-offset, 0) rotate(45deg);
    }
    &:last-child {
      transform: translate3d(0, $hamburger-bar-offset * -1, 0) rotate(-45deg);
    }
  }
}

@include vue(v-hamburger) {
  @extend .hamburger;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: $hamburger-bar-height;
    border-radius: $hamburger-bar-radius;
    background-color: currentColor;
  }
  &:before {
    top: 0;
    box-shadow: 0 $hamburger-bar-offset currentColor;
  }
  &:after {
    bottom: 0;
  }
}
</style>
