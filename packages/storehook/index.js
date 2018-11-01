import React, { useContext, useReducer } from 'react'

/* Hooks are going to be introduced in 16.7 */
if (!React.version.includes('16.7'))
  console.warn('storehook needs a React version >=16.7.0-alpha.0')

/*
  Create a global store context
  We use this to pass the reducer to every connected component
*/
const StoreContext = React.createContext()

/*
  This is the component that is wrapped around the top level App
  We use the context Provider here to pass the reducer
*/
const Provider = props => {
  const { reducer } = props

  /* We can get the initial state by running the reducer with no state */
  const initialState = reducer(undefined, { type: '__INTERNAL_INIT__' })

  /* Create a global store */
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  )
}

/* useStore */

const useStore = () => {
  /* Grab the state and dispatch function with useContext hook */
  const { state, dispatch } = useContext(StoreContext)

  /* Instead of rendering component, pass an array pair - hook style */
  return [state, dispatch]
}

/*
  connect is a higher order component that passes state values
  and a dispatch function to the component it wraps

  class components cannot use hooks but they can be wrapped in a component
  that does
*/

const connect = Component => {
  /* Create a new component that will be returned instead of the original */

  const ConnectedComponent = props => {
    /* Get state and dispatch function from our useStore hook! */
    const [store, dispatch] = useStore()

    /*
      Render the original component with it's props and add
      additional props for state and dispatch
    */
    return <Component {...props} {...state} dispatch={dispatch} />
  }

  return ConnectedComponent
}

export { Provider, connect, useStore }
