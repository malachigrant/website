import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'update': {
      const result = [...state];
      result[action.payload.id] = action.payload.value;
      return result;
    }
    case 'delete':
      return state.filter((val, index) => index != action.payload);
    default:
      throw new Error(`No action type ${action.type}`);
  }
};

/**
 * Creates a box that you can read from, add to, modify, or delete from.
 * @returns [state, addFunction, modifyFunction, deleteFunction]
 */
export const useBox = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const add = (item) => {
    dispatch({ type: 'add', payload: item });
  };
  const update = (id, item) => {
    dispatch({ type: 'update', payload: { id, value: item } });
  };
  const remove = (id) => {
    dispatch({ type: 'delete', payload: id });
  };

  return [state, add, update, remove];
};
