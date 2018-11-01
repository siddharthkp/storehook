"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = exports.connect = exports.Provider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* Hooks are going to be introduced in 16.7 */
if (!_react.default.version.includes('16.7')) console.warn('storehook needs a React version >=16.7.0-alpha.0');
/*
  Create a global store context
  We use this to pass the reducer to every connected component
*/

var StoreContext = _react.default.createContext();
/*
  This is the component that is wrapped around the top level App
  We use the context Provider here to pass the reducer
*/


var Provider = function Provider(props) {
  var reducer = props.reducer;
  /* We can get the initial state by running the reducer with no state */

  var initialState = reducer(undefined, {
    type: '__INTERNAL_INIT__'
  });
  /* Create a global store */

  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return _react.default.createElement(StoreContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, props.children);
};
/* useStore */


exports.Provider = Provider;

var useStore = function useStore() {
  /* Grab the state and dispatch function with useContext hook */
  var _useContext = (0, _react.useContext)(StoreContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;
  /* Instead of rendering component, pass an array pair - hook style */


  return [state, dispatch];
};
/*
  connect is a higher order component that passes state values
  and a dispatch function to the component it wraps

  class components cannot use hooks but they can be wrapped in a component
  that does
*/


exports.useStore = useStore;

var connect = function connect(Component) {
  /* Create a new component that will be returned instead of the original */
  var ConnectedComponent = function ConnectedComponent(props) {
    /* Get state and dispatch function from our useStore hook! */
    var _useStore = useStore(),
        _useStore2 = _slicedToArray(_useStore, 2),
        state = _useStore2[0],
        dispatch = _useStore2[1];
    /*
      Render the original component with it's props and add
      additional props for state and dispatch
    */


    return _react.default.createElement(Component, _extends({}, props, state, {
      dispatch: dispatch
    }));
  };

  return ConnectedComponent;
};

exports.connect = connect;
