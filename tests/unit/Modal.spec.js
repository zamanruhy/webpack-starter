import { shallowMount, mount } from '@vue/test-utils'
import Modal from '@/components/common/Modal'

global.MutationObserver = class {
  disconnect () {}
  observe () {}
}

describe('Modal.vue', () => {
  it('should not render when visible prop is not passed', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.isEmpty()).toBe(true)
  })

  it('should render when visible prop is passed as true', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        visible: true
      }
    })
    expect(wrapper.isEmpty()).toBe(false)
  })

  // it('should show when show::modal event is emitted on $root with id argument as test', () => {
  //   const wrapper = shallowMount(Modal, {
  //     propsData: {
  //       id: 'test'
  //     }
  //   })
  //   expect(wrapper.isEmpty()).toBe(true)
  //   wrapper.vm.$root.$emit('show::modal', 'test')
  //   expect(wrapper.isEmpty()).toBe(false)
  // })

  it('should render with default slot', () => {
    const html = '<p>Modal content</p>'
    const wrapper = shallowMount(Modal, {
      propsData: {
        visible: true
      },
      slots: {
        default: html
      }
    })
    expect(wrapper.html()).toContain(html)
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        visible: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
