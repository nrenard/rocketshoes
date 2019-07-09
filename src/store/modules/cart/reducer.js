import produce from 'immer';

export const Types = {
  ADD: '@cart/ADD',
  REMOVE: '@cart/REMOVE',
  UPDATE_AMOUNT: '@cart/UPDATE_AMOUNT',
};

const INITIAL_STATE = {
  list: [],
};

export default function cart(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.ADD:
      return produce(state, (draft) => {
        const productIndex = draft.list.findIndex(p => p.id === payload.product.id);

        if (productIndex >= 0) {
          draft.list[productIndex].amount += 1;
        } else {
          draft.list.push({ ...payload.product, amount: 1 });
        }
      });

    case Types.REMOVE:
      return produce(state, (draft) => {
        const productIndex = draft.list.findIndex(p => p.id === payload.id);
        if (productIndex >= 0) draft.list.splice(productIndex, 1);
      });

    case Types.UPDATE_AMOUNT: {
      if (payload.amount <= 0) return state;

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
