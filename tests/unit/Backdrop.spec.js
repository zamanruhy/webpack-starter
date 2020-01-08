import { shallowMount } from '@vue/test-utils'
import Backdrop from '@/components/common/Backdrop'

describe('ToTop.vue', () => {
  it('should not render when visible prop is not passed', () => {
    const wrapper = shallowMount(Backdrop)
    expect(wrapper.isEmpty()).toBe(true)
  })

  it('should render when visible prop is passed as true', () => {
    const wrapper = shallowMount(Backdrop, {
      propsData: {
        visible: true
      }
    })
    expect(wrapper.isEmpty()).toBe(false)
  })

  it('should emit click event when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallowMount(Backdrop, {
      propsData: {
        visible: true
      },
      listeners: {
        click: onClick
      }
    })
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Backdrop)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
