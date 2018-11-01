import React from 'react'
import { Provider, useStore, connect } from 'storehook'
import reducer from './reducer'

/*
  Counter component #2: gets store values and dispatch
  with useStore custom hook from storehook
*/

const HookedCounter = props => {
  const [store, dispatch] = useStore()

  const increase = () => dispatch({ type: 'INCREASE' })
  const decrease = () => dispatch({ type: 'DECREASE' })

  return (
    <p>
      <span onClick={increase}>+</span>
      <span id="badge">{store.count}</span>
      <span onClick={decrease}>-</span>
    </p>
  )
}

/*
  Counter component #2: expects count and dispatch in props
  We wrap this component in connect from storehook to
  get access to state properties and dispatch function
*/
class ClassCounter extends React.Component {
  increase = () => this.props.dispatch({ type: 'INCREASE' })
  decrease = () => this.props.dispatch({ type: 'DECREASE' })

  render() {
    return (
      <p>
        <span onClick={this.increase}>+</span>
        <span id="badge">{this.props.count}</span>
        <span onClick={this.decrease}>-</span>
      </p>
    )
  }
}

const ConnectedCounter = connect(ClassCounter)

/* Top level App: only renders Counter  */
const App = props => {
  return (
    <div>
      <HookedCounter />
      <ConnectedCounter />
    </div>
  )
}

/* Wrap the entire App in a Provider with the reducer */

export default () => (
  <Provider reducer={reducer}>
    <App />
  </Provider>
)

export { ConnectedCounter, HookedCounter }
