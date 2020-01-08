import { shallowMount } from '@vue/test-utils'
import Button from '@/components/common/Button'
import Spinner from '@/components/common/Spinner'

describe('Button.vue', () => {
  it('should have button_primary class when variant prop is passed as primary', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        variant: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('button_primary')
  })

  it('should emit click event when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallowMount(Button, {
      listeners: {
        click: onClick
      }
    })
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('should render with default slot', () => {
    const text = 'Button text'
    const wrapper = shallowMount(Button, {
      slots: {
        default: text
      }
    })
    expect(wrapper.text()).toContain(text)
  })

  it('should render with spinner when loading prop is passed as true', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        loading: true
      }
    })
    expect(wrapper.contains(Spinner)).toBe(true)
  })

  it('should render an <a> tag when href attribute is passed', () => {
    const wrapper = shallowMount(Button, {
      attrs: {
        href: 'http://www.google.com'
      }
    })
    expect(wrapper.is('a')).toBe(true)
  })

  it('should render a <button> tag when href attribute is not passed', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.is('button')).toBe(true)
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
