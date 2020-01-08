import { shallowMount } from '@vue/test-utils'
import Spinner from '@/components/common/Spinner'

describe('Spinner.vue', () => {
  it('should render and match snapshot', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        size: 23,
        width: 2
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
