<script>
import Spinner from './Spinner'

export default {
  name: 'Button',
  functional: true,
  props: {
    block: Boolean,
    size: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: ''
    },
    loading: Boolean
  },
  render (h, { props, data, slots }) {
    const componentData = {
      class: {
        [`button_${props.variant}`]: !!props.variant,
        [`button_${props.size}`]: !!props.size,
        button_block: props.block,
        button_loading: props.loading
      }
    }

    let tag = 'button'
    if (data.attrs.href) {
      tag = 'a'
      delete data.attrs.type
    } else {
      data.attrs.type = data.attrs.type || 'button'
      delete data.attrs.href
    }

    return (
      <tag class="button" {...data} {...componentData}>
        <span class="button__content">{slots().default}</span>
        {
          props.loading &&
          <Spinner class="button__spinner" size={23} width={2} />
        }
      </tag>
    )
  }
}
</script>

<style lang="scss">
.button {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  color: $body-color;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  line-height: $line-height;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 4px;
  transition-duration: 0.2s; // 0.28s
  transition-property: background-color, border-color, box-shadow, transform, opacity;
  transition-timing-function: easing(fast-out-slow-in);
  max-width: 100%;
  flex: 0 0 auto;
  position: relative;

  &:hover {
    text-decoration: none;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.65;
  }

  &_primary {
    color: #ffffff;
    background-color: $primary;
    border-color: $primary;

    &:hover {
      background-color: lighten($primary, 4%);
      border-color: lighten($primary, 4%);
    }

    &:active {
      background-color: darken($primary, 4%);
      border-color: darken($primary, 4%);
    }
  }

  &_small {
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 3px;
  }

  &_large {
    padding: 8px 16px;
    font-size: 20px;
    border-radius: 5px;
  }

  &_block {
    display: flex;
    width: 100%;
  }

  &_loading {
    pointer-events: none;
    transition: none;
  }

  &__content {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
  }

  &_loading &__content {
    opacity: 0;
  }

  &__spinner.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@include vue(v-button) {
  @extend .button;
  -webkit-appearance: none !important;

  &[variant="primary"] {
    @extend .button_primary;
  }

  &[size="small"] {
    @extend .button_small;
  }

  &[size="large"] {
    @extend .button_large;
  }

  &[block] {
    @extend .button_block;
  }
}
</style>
