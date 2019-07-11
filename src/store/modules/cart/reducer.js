import produce from 'immer';

export const Types = {
  ADD_REQUEST: '@cart/ADD_REQUEST',
  ADD_REQUEST_SUCCESS: '@cart/ADD_REQUEST_SUCCESS',

  REMOVE: '@cart/REMOVE',
  UPDATE_AMOUNT_REQUEST: '@cart/UPDATE_AMOUNT_REQUEST',
  UPDATE_AMOUNT_SUCCESS: '@cart/UPDATE_AMOUNT_SUCCESS',
};

const INITIAL_STATE = {
  list: [],
};

export default function cart(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.ADD_REQUEST_SUCCESS:
      return produce(state, (draft) => {
        const { product } = payload;
        draft.list.push(product);
      });

    case Types.REMOVE:
      return produce(state, (draft) => {
        const productIndex = draft.list.findIndex(p => p.id === payload.id);
        if (productIndex >= 0) draft.list.splice(productIndex, 1);
      });

    case Types.UPDATE_AMOUNT_SUCCESS: {
      return produce(state, (draft) => {
        const productIndex = draft.list.findIndex(p => p.id === payload.id);
        if (productIndex >= 0) {
          draft.list[productIndex].amount = Number(payload.amount);
        }
      });
    }

    default:
      return state;
  }
}
