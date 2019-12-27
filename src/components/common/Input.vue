<template>
  <div class="input">
    <label
      v-if="label"
      :for="id"
      class="input__label"
    >{{ label }}</label>
    <div class="input__field">
      <input
        :id="id"
        :type="type"
        class="input__control"
        v-bind="$attrs"
        @input="$emit('update', $event.target.value)"
        v-on="$listeners"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  model: {
    event: 'update'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return [
          'email',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'url'
        ].includes(value)
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    id () {
      return this.$attrs.id || `input-${this._uid}`
    }
  }
}
</script>

<style lang="scss">
.input {
  &__label {
    margin-bottom: 8px;
    display: inline-block;
  }
  &__field {}
  &__control {
    width: 100%;
    border: 1px solid #ced4da;
    color: #495057;
    border-radius: 2px;
    padding: 6px 12px;
    height: calc(1.5em + #{6px * 2} + 2px);

    &::placeholder {
      color: #6c757d;
      opacity: 1;
    }
  }
}

@include vue(v-input) {
  display: block;

  &[label]:before {
    content: attr(label);
    @extend .input__label;
  }
  &:after {
    content: attr(placeholder);
    display: block;
    @extend .input__control;
    @extend .input__control::placeholder;
  }
}
</style>
