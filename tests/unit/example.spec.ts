import { mount } from '@vue/test-utils'
import LibraryListPage from '@/library/pages/LibraryListPage.vue'

describe('LibraryListPage.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(LibraryListPage)
    expect(wrapper.text()).toMatch('Verses')
  })
})
