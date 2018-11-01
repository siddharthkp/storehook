function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, useReducer } from 'react';
if (!React.version.includes('16.7')) console.warn('storehook needs a React version >=16.7.0-alpha.0');
/*
  Create a global store context
  We use this to pass the reducer to every connected component
*/

const StoreContext = React.createContext();
/*
  This is the component that is wrapped around the top level App
  We use the context Provider here to pass the reducer
*/

const Provider = props => {
  const {
    reducer
  } = props;
  /* We can get the initial state by running the reducer with no state */

  const initialState = reducer(undefined, {
    type: '__INTERNAL_INIT__'
  });
  /* Create a global store */

  const [state, dispatch] = useReducer(reducer, initialState);
  return React.createElement(StoreContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, props.children);
};
/*
  connect is a higher order component that passes state values
  and a dispatch function to the component it wraps

  this does not accept a mapStateToProps-type function like redux,
  it passes ALL of the state the connected component _right now_
*/


const hoistedReducerPair = {
  set: false
};

const connect = Component => {
  /* Create a new component that will be returned instead of the original */
  const ConnectedComponent = props => {
    /* Grab the state and dispatch function with useContext hook */
    const {
      state,
      dispatch
    } = useContext(StoreContext);
    /*
      Render the original component with it's props and add
      additional props for state and dispatch
    */

    return React.createElement(Component, _extends({}, props, state, {
      dispatch: dispatch
    }));
  };

  return ConnectedComponent;
};
/**/


const useStore = () => {
  /* Grab the state and dispatch function with useContext hook */
  const {
    state,
    dispatch
  } = useContext(StoreContext);
  /* Instead of rendering component, pass an array pair - hook style */

  return [state, dispatch];
};

export { Provider, connect, useStore };
