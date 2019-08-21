import * as React from 'react';

const StoreContext = React.createContext<any>(undefined);

/*
  This is the component that is wrapped around the top level App
  We use the context Provider here to pass the reducer
*/
const Provider = <
  P extends { reducer: React.Reducer<any, any>; children: React.ReactNode }
>(
  props: P
) => {
  const { reducer } = props;

  /* We can get the initial state by running the reducer with no state */
  const initialState = reducer(undefined, { type: '__STOREHOOK__INIT__' });

  /* Create a global store */
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

/* useStore */

const useStore = () => {
  /* Grab the state and dispatch function with useContext hook */
  const { state, dispatch } = React.useContext(StoreContext);

  /* Instead of rendering component, pass an array pair - hook style */
  return [state, dispatch];
};

/*
  connect is a higher order component that passes state values
  and a dispatch function to the component it wraps

  class components cannot use hooks but they can be wrapped in a component
  that does
*/

const connect = (Component: React.ComponentType) => {
  /* Create a new component that will be returned instead of the original */

  const ConnectedComponent = <P extends {}>(props: P) => {
    /* Get state and dispatch function from our useStore hook! */
    const [state, dispatch] = useStore();

    /*
      Render the original component with it's props and add
      additional props for state and dispatch
    */
    return <Component {...props} {...state} dispatch={dispatch} />;
  };

  return ConnectedComponent;
};

export { Provider, connect, useStore };
