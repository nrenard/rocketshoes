import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdAddShoppingCart } from 'react-icons/md';

import * as CardActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { ProductList } from './styles';

function Home({ amount, cart, addToCart }) {
  const [products, handleChangeProducts] = useState([]);

  const getProdutcs = async () => {
    const { data } = await api.get('/products');

    const listProduct = data.map(product => ({
      ...product,
      priceFormated: formatPrice(product.price),
    }));

    handleChangeProducts(listProduct);
  };

  useEffect(() => {
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

            <button type="button" onClick={() => addToCart(product)}>
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

const mapStateToProps = ({ cart }) => ({
  cart,
  amount: cart.list.reduce((amount, product) => {
    amount[product.id] = product.amount || 0;
    return amount;
  }, {}),
});
const mapDispatchToProps = dispatch => bindActionCreators(CardActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
