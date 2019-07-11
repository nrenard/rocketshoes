import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';

import * as CardActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state => state.cart.list.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount || 0;
    return sumAmount;
  }, {}));

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProdutcs() {
      const { data } = await api.get('/products');

      const listProduct = data.map(product => ({
        ...product,
        priceFormated: formatPrice(product.price),
      }));

      setProducts(listProduct);
    }

    getProdutcs();
  }, []);

  return (
    <ProductList>
      {!!products.length
        && products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormated}</span>

            <button
              type="button"
              onClick={() => dispatch(CardActions.addToCartRequest(product.id))}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>

              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
    </ProductList>
  );
}
