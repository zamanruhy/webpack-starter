import { shallowMount, mount, createWrapper } from '@vue/test-utils'
import Collapse from '@/components/common/Collapse'

// const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve))

describe('Collapse.vue', () => {
  it('should show when visible prop is passed as true', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        visible: true
      }
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('should hide when visible prop is not passed', () => {
    const wrapper = shallowMount(Collapse)
    expect(wrapper.isVisible()).toBe(false)
  })

  it('should toggle when toggle::collapse event is emitted on $root with id argument as test', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        id: 'test',
        visible: true
      }
    })
    expect(wrapper.isVisible()).toBe(true)
    wrapper.vm.$root.$emit('toggle::collapse', 'test')
    expect(wrapper.isVisible()).toBe(false)
    wrapper.vm.$root.$emit('toggle::collapse', 'test')
    expect(wrapper.isVisible()).toBe(true)
  })

  it('should emit change event when visibility is changed', () => {
    const wrapper = shallowMount(Collapse)
    wrapper.setData({ isVisible: true })
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0]).toEqual([true])
  })

  it('should emit collapse::change event on $root when id prop is passed and visibility is changed', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        id: 'test'
      }
    })
    const rootWrapper = createWrapper(wrapper.vm.$root)
    wrapper.setData({ isVisible: true })
    expect(rootWrapper.emitted('collapse::change')).toBeTruthy()
    expect(rootWrapper.emitted('collapse::change').length).toBe(1)
    expect(rootWrapper.emitted('collapse::change')[0]).toEqual(['test', true])
  })

  it('should hide when collapse::accordion event is emitted on $root with id & accordion arguments and accordion prop is same & id prop is different', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        id: 'test',
        accordion: 'group',
        visible: true
      }
    })
    expect(wrapper.isVisible()).toBe(true)
    wrapper.vm.$root.$emit('collapse::accordion', 'other', 'group')
    expect(wrapper.isVisible()).toBe(false)
  })

  it('should emit collapse::accordion event on $root on open when id and accordion props are passed', () => {
    const wrapper = shallowMount(Collapse, {
      propsData: {
        id: 'test',
        accordion: 'group'
      }
    })
    const rootWrapper = createWrapper(wrapper.vm.$root)
    wrapper.setData({ isVisible: true })
    expect(rootWrapper.emitted('collapse::accordion')).toBeTruthy()
    expect(rootWrapper.emitted('collapse::accordion').length).toBe(1)
    expect(rootWrapper.emitted('collapse::accordion')[0]).toEqual(['test', 'group'])
  })

  it('should emit open and opened events on start and end of opening animation', (done) => {
    const wrapper = mount(Collapse, {
      stubs: {
        transition: false
      }
    })
    expect(wrapper.isVisible()).toBe(false)
    wrapper.setData({ isVisible: true })
    expect(wrapper.emitted('open')).toBeTruthy()
    expect(wrapper.emitted('open').length).toBe(1)
    setTimeout(() => {
      expect(wrapper.emitted('opened')).toBeTruthy()
      expect(wrapper.emitted('opened').length).toBe(1)
      done()
    }, 300)
  })

  it('should emit close and closed events on start and end of closing animation', (done) => {
    const wrapper = mount(Collapse, {
      propsData: {
        visible: true
      },
      stubs: {
        transition: false
      }
    })
    expect(wrapper.isVisible()).toBe(true)
    wrapper.setData({ isVisible: false })
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close').length).toBe(1)
    setTimeout(() => {
      expect(wrapper.emitted('closed')).toBeTruthy()
      expect(wrapper.emitted('closed').length).toBe(1)
      done()
    }, 300)
  })

  it('should render with default slot', () => {
    const html = '<p>Collapse content</p>'
    const wrapper = shallowMount(Collapse, {
      slots: {
        default: html
      }
    })
    expect(wrapper.html()).toContain(html)
  })

  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Collapse)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
