import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import * as CardActions from '../../store/modules/cart/actions';

import {
  Container, ProductTable, Footer, Total,
} from './styles';

export default function Cart() {
  const total = useSelector(state => formatPrice(
    state.cart.list.reduce((totalAmount, product) => totalAmount + product.price * product.amount, 0),
  ));

  const list = useSelector(state => state.cart.list.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })));

  const dispatch = useDispatch();

  function incrementAmount(product) {
    dispatch(CardActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrementAmount(product) {
    dispatch(CardActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {list.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>

              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormated}</span>
              </td>

              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => decrementAmount(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => incrementAmount(product)}
                    />
                  </button>
                </div>
              </td>

              <td>
                <strong>{product.subTotal}</strong>
              </td>

              <td>
                <button type="button" onClick={() => dispatch(CardActions.removeFormCart(product.id))}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <Footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </Footer>
    </Container>
  );
};