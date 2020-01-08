import { shallowMount } from '@vue/test-utils'
import Icon from '@/components/common/Icon'

describe('Icon.vue', () => {
  it('should have icon_left class when left prop is passed as true', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        left: true
      }
    })
    expect(wrapper.classes()).toContain('icon_left')
  })

  it('should have icon_right class when right prop is passed as true', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        right: true
      }
    })
    expect(wrapper.classes()).toContain('icon_right')
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Icon)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
