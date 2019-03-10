// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

// const Datastore = require('nedb');

// const db = new Datastore({ filename: 'estoque.db', autoload: true });

// let products = [];

// const product = {
//     produto: 'camisa',
//     sexo: 'm',
//     quantidade: { p: 50, m: 20, g: 30},
//     preco: {atacado: 10.50, varejo: 12.50},
//     fabricante: 'nike',
//     total: 100
// };

// products.push(product);

// db.insert(products, (err, docs) => {
//   docs.forEach((d) => {
//       console.log('Saved product:', d.produto);
//   });
// });

// let productList = []



type Props = {};

export default class Home extends Component<Props> {
  props: Props;


  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <Link to={routes.ADDPRODUCTS}>to Add Products</Link>
      </div>
    );
  }
}
