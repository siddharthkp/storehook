<p align="center">
  <img src="https://static.tvtropes.org/pmwiki/pub/images/hookhand.jpg" height="200px"/>
  <br><br>
  <b>silly state management library built with hooks</b>
  <br><br>
  <img src="https://travis-ci.org/siddharthkp/storehook.svg?branch=master&maxAge=3600"/>
</p>

#### install

```
npm install storehook
```

`storehook` has a peer dependency of `react >= 16.x`

&nbsp;

### example

An online demo is available at CodeSandbox:

- https://codesandbox.io/s/live-demo-storehook-78gwz

If you've any problem, **open an issue with a CodeSandbox link with your issue**

#### usage

```js
import React from 'react';
import { Provider, useStore } from 'storehook';
import reducer from './reducer';

/*
  Call useStore inside a functional component
  to get a tuple of store and dispatch function
*/

const Counter = props => {
  const [store, dispatch] = useStore();

  const increase = () => dispatch({ type: 'INCREASE' });
  const decrease = () => dispatch({ type: 'DECREASE' });

  return (
    <p>
      <span onClick={increase}>+</span>
      <span id="badge">{store.count}</span>
      <span onClick={decrease}>-</span>
    </p>
  );
};

/* Wrap your top level App component in a Provider with the reducer */
export default () => (
  <Provider reducer={reducer}>
    <App />
  </Provider>
);

/*
  This is what the reducer looks like
  Don't forget to provide initial state in the reducer
*/

const initialState = { count: 0 };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREASE':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
```

&nbsp;

#### Usage with class components

`storehook` exports a `connect` higher order component that can be used with class components

```js
import React from 'react';
import { Provider, connect } from 'storehook';
import reducer from './reducer';

class ClassCounter extends React.Component {
  increase = () => this.props.dispatch({ type: 'INCREASE' });
  decrease = () => this.props.dispatch({ type: 'DECREASE' });

  render() {
    return (
      <p>
        <span onClick={this.increase}>+</span>
        <span id="badge">{this.props.count}</span>
        <span onClick={this.decrease}>-</span>
      </p>
    );
  }
}

/*
  Use connect from storehook to get access to the store variables and
  dispatch function in props
*/
const ConnectedCounter = connect(ClassCounter);

/* Wrap your top level App component in a Provider with the reducer */
export default () => (
  <Provider reducer={reducer}>
    <App />
  </Provider>
);
```

#### how does it work?

Check out the [source code](https://github.com/siddharthkp/storehook/blob/master/packages/storehook/index.js), it's ~70 lines with comments

&nbsp;

#### like it?

:star: this repo

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
