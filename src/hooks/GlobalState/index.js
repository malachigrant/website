import React, { createContext, useContext, useReducer } from 'react';

import initialState from './globalState';

const GlobalStateContext = createContext(initialState);

const convertToSetter = (name) => {
  return `set${name[0].toUpperCase()}${name.substring(1)}`;
};

const getActions = (dispatch) => {
  return Object.keys(initialState).reduce(
    (acc, key) => ({
      ...acc,
      [convertToSetter(key)]: (payload) => dispatch({ type: key, payload }),
    }),
    {}
  );
};

const reducer = (state, action) => {
  return { ...state, [action.type]: action.payload };
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider
      value={{ ...state, ...getActions(dispatch) }}
      children={children}
    />
  );
};

export default GlobalStateProvider;

export const useGlobal = () => {
  return useContext(GlobalStateContext);
};
