import { Types } from './reducer';

export function addToCart(product) {
  return {
    type: Types.ADD,
    payload: {
      product,
    },
  };
}

export function removeFormCart(id) {
  return { type: Types.REMOVE, payload: { id } };
}

export function updateAmount(id, amount) {
  return { type: Types.UPDATE_AMOUNT, payload: { id, amount } };
}
