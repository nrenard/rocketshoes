import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { addToCartSuccess, updateAmountSuccess } from './actions';
import { Types } from './reducer';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

function* addToCart({ payload }) {
  const { data: product } = yield call(api.get, `/products/${payload.id}`);

  const productExists = yield select(state => state.cart.list.find(p => p.id === payload.id));

  const { data: productStock } = yield call(api.get, `/stock/${payload.id}`);

  const stockAmount = productStock.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(payload.id, amount));
  } else {
    const data = {
      ...product,
      amount: 1,
      priceFormatted: formatPrice(product.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ payload }) {
  const { id, amount } = payload;

  if (amount <= 0) return;

  const { data: productStock } = yield call(api.get, `/stock/${id}`);

  if (amount > productStock.amount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest(Types.ADD_REQUEST, addToCart),
  takeLatest(Types.UPDATE_AMOUNT_REQUEST, updateAmount),
]);
