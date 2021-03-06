import { Types } from './reducer';

export function addToCartRequest(id) {
  return {
    type: Types.ADD_REQUEST,
    payload: {
      id,
    },
  };
}

export function addToCartSuccess(product) {
  return {
    type: Types.ADD_REQUEST_SUCCESS,
    payload: {
      product,
    },
  };
}

export function removeFormCart(id) {
  return { type: Types.REMOVE, payload: { id } };
}

export function updateAmountRequest(id, amount) {
  return { type: Types.UPDATE_AMOUNT_REQUEST, payload: { id, amount } };
}

export function updateAmountSuccess(id, amount) {
  return { type: Types.UPDATE_AMOUNT_SUCCESS, payload: { id, amount } };
}
