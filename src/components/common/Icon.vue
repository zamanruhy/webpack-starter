<script>
const icons = {}
const requireIcon = require.context('@/assets/svg', false, /\.svg$/)
requireIcon.keys().forEach(fileName => {
  const iconConfig = requireIcon(fileName)
  // console.log(iconConfig.default || iconConfig)
  const { id, viewBox, url } = iconConfig.default || iconConfig
  const iconName = fileName.replace(/^\.\/|\.\w+$/g, '')
  const [width, height] = viewBox.split(' ').slice(-2).map(Number)
  icons[iconName] = { id: id.replace('-usage', ''), width, height, url }
})

// console.log(icons)

export default {
  name: 'Icon',
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    left: Boolean,
    right: Boolean,
    img: Boolean
  },
  render (h, { props, data }) {
    const { id, width, height } = icons[props.name]
    const componentData = {
      class: {
        'icon': true,
        [`icon_${props.name}`]: !!props.name,
        'icon_left': props.left,
        'icon_right': props.right
      },
      style: {
        height: '1em',
        width: (width / height) + 'em'
      }
    }

    return (
      <svg {...data} {...componentData}>
        <use xlinkHref={`#${id}`} />
      </svg>
    )
    // return props.img
    //   ? (
    //     <img {...data} {...componentData} src={url} />
    //   )
    //   : (
    //     <svg {...data} {...componentData}>
    //       <use xlinkHref={url.replace('-usage', '')} />
    //     </svg>
    //   )
  }
}
</script>

<style lang="scss">
.icon {
  display: inline-block;
  vertical-align: middle;
  height: 1em;

  @at-root svg#{&} {
    fill: currentColor;
  }

  &_left {
    margin-right: 0.4em;
  }
  &_right {
    margin-left: 0.4em;
  }
}

@include vue(v-icon) {
  display: inline-block;
  vertical-align: middle;
  background-color: currentColor;
  width: 1em;
  height: 1em;
  opacity: 0.5;

  &[left] {
    @extend .icon_left;
  }
  &[right] {
    @extend .icon_right;
  }
}
</style>
