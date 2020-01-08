import { shallowMount } from '@vue/test-utils'
import Hamburger from '@/components/common/Hamburger'

describe('Hamburger.vue', () => {
  it('should have hamburger_active class when active prop is passed as true', () => {
    const wrapper = shallowMount(Hamburger, {
      propsData: {
        active: true
      }
    })
    expect(wrapper.classes()).toContain('hamburger_active')
  })

  it('should emit change event when clicked', () => {
    const wrapper = shallowMount(Hamburger)
    wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0]).toEqual([true])
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Hamburger)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
