import { shallowMount } from '@vue/test-utils'
import Button from '@/components/common/Button'

describe('Button.vue', () => {
  it('renders link when href attribute passed', () => {
    const wrapper = shallowMount(Button, {
      attrs: { href: '/' }
    })
    expect(wrapper.element.tagName).toBe('A')
  })

  it('renders button when href attribute not passed', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders default slot when passed', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'Button text' }
    })
    expect(wrapper.text()).toBe('Button text')
  })
})
