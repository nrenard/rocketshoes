import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';

import { addToCartSuccess, updateAmount } from './actions';
import { Types } from './reducer';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

function* addToCart({ payload }) {
  const { data: product } = yield call(api.get, `/products/${payload.id}`);

  const productExists = yield select(state => state.cart.list.find(p => p.id === payload.id));

  const { data: productStock } = yield call(api.get, `/stock/${payload.id}`);

  const stockAmount = productStock.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    console.log('Erro');

    return;
  }

  if (productExists) {
    yield put(updateAmount(payload.id, amount));
  } else {
    const data = {
      ...product,
      amount: 1,
      priceFormatted: formatPrice(product.price),
    };

    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest(Types.ADD_REQUEST, addToCart)]);
