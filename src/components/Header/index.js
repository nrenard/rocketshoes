import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';
import logo from '../../assets/images/logo.svg';

import { Container, Cart } from './styles';

const Header = ({ cartSize }) => (
  <Container>
    <Link to="/">
      <img src={logo} alt="Rocketshoes" />
    </Link>

    <Cart to="/cart">
      <div>
        <strong>Meu carrinho</strong>
        <span>
          {cartSize}
          {' '}
itens
        </span>
      </div>

      <MdShoppingBasket size={36} color="#fff" />
    </Cart>
  </Container>
);

const mapStateToProps = ({ cart }) => ({
  cartSize: cart.list.length,
});

export default connect(mapStateToProps)(Header);
