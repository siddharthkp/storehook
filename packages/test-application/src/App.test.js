import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { Provider } from 'storehook'

import { ConnectedCounter, HookedCounter } from './App'
import reducer from './reducer'

const TestComponents = {
  hooked: HookedCounter,
  connected: ConnectedCounter
}

const setup = Component => {
  const Counter = render(
    <Provider reducer={reducer}>
      <Component />
    </Provider>
  )

  const badge = Counter.container.querySelector('#badge')
  const increase = Counter.getByText('+')
  const decrease = Counter.getByText('-')

  return { Counter, badge, increase, decrease }
}

afterEach(cleanup)

Object.keys(TestComponents).map(name => {
  const Counter = TestComponents[name]

  test(`${name}: Count should be 0 by default`, () => {
    const { badge } = setup(Counter)
    expect(badge.innerHTML).toBe('0')
  })

  test(`${name}: Count should increase to 1 when + is clicked`, () => {
    const { badge, increase } = setup(Counter)
    fireEvent.click(increase)
    expect(badge.innerHTML).toBe('1')
  })

  test(`${name}: Count should decrease to -1 when - is clicked`, () => {
    const { badge, decrease } = setup(Counter)
    fireEvent.click(decrease)
    expect(badge.innerHTML).toBe('-1')
  })
})
