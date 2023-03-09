import { mount } from '@vue/test-utils'
import LogInPage from '@/auth/pages/LogInPage.vue'

describe('LibraryListPage.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(LogInPage)
    expect(wrapper.text()).toMatch('Log In')
  })
})
