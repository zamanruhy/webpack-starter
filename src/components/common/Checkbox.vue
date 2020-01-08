<template>
  <label class="checkbox" :class="classes">
    <input
      v-model="localChecked"
      class="checkbox__control"
      type="checkbox"
      v-bind="$attrs"
      :value="value"
      :true-value="value"
      :false-value="uncheckedValue"
      v-on="$listeners"
    >
    <span class="checkbox__box" />
    <span
      v-if="label"
      class="checkbox__label"
    >{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
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
      default: true
    },
    uncheckedValue: {
      type: null,
      default: false
    }
  },
  data () {
    return {
      localChecked: this.checked
    }
  },
  computed: {
    classes () {
      return {
        checkbox_single: !this.label
      }
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
.checkbox {
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
    border-radius: 2px;
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
      border-radius: 1px;
      background-color: #666666;
    }
  }
  &__control:indeterminate ~ &__box {
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 8px;
      height: 2px;
      border-radius: 1px;
      background-color: #666666;
    }
  }
  &__control:disabled ~ &__box {
    background-color: #e9ecef;
  }
  &_single &__box {
    top: 0;
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

@include vue(v-checkbox) {
  @extend .checkbox;

  &:before {
    content: '';
    display: inline-block;
    @extend .checkbox__box;
  }
  &[disabled]:before {
    background-color: #e9ecef;
  }
  &:not([label]):before {
    top: 0;
  }
  &[label]:after {
    content: attr(label);
    @extend .checkbox__label;
  }
  &[disabled]:after {
    color: #6c757d;
  }
}
</style>
