<template>
  <label class="radio">
    <input
      v-model="localChecked"
      class="radio__control"
      type="radio"
      v-bind="$attrs"
      :value="value"
      v-on="$listeners"
    >
    <span class="radio__box" />
    <span
      v-if="label"
      class="radio__label"
    >{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'Radio',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'update'
  },
  props: {
    checked: {
      type: null,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: null
    }
  },
  data () {
    return {
      localChecked: this.checked
    }
  },
  watch: {
    checked (value) {
      this.localChecked = value
    },
    localChecked (value) {
      this.$emit('update', value)
    }
  }
}
</script>

<style lang="scss">
.radio {
  display: inline-flex;
  align-items: flex-start;
  vertical-align: middle;
  user-select: none;

  &__control {
    @include visually-hidden;
  }
  &__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    border: 1px solid #adb5bd;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;
    top: 4px;
  }
  &__control:checked ~ &__box {
    &:before {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #666666;
    }
  }
  &__control:disabled ~ &__box {
    background-color: #e9ecef;
  }
  &__label {
    display: inline-block;
    flex: 0 1 auto;
    margin-left: 8px;
  }
  &__control:disabled ~ &__label {
    color: #6c757d;
  }
}

@include vue(v-radio) {
  @extend .radio;

  &:before {
    content: '';
    display: inline-block;
    @extend .radio__box;
  }
  &[disabled]:before {
    background-color: #e9ecef;
  }
  &:after {
    content: attr(label);
    @extend .radio__label;
  }
  &[disabled]:after {
    color: #6c757d;
  }
}
</style>
