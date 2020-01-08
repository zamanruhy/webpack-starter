import { shallowMount } from '@vue/test-utils'
import ToTop from '@/components/common/ToTop'

describe('ToTop.vue', () => {
  it('should show when scrollTop greater then offset', () => {
    const wrapper = shallowMount(ToTop)
    wrapper.setData({ scrollTop: wrapper.vm.offset + 1 })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('should hide when button is clicked', () => {
    const wrapper = shallowMount(ToTop, {
      attachToDocument: true
    })
    wrapper.setMethods({
      scrollToTop () {
        this.scrollTop = 0
      }
    })
    wrapper.setData({ scrollTop: wrapper.vm.offset + 1 })
    expect(wrapper.isVisible()).toBe(true)
    wrapper.trigger('click')
    expect(wrapper.isVisible()).toBe(false)
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(ToTop)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
