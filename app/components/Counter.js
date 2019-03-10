// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter02.css';
import routes from '../constants/routes';

const Datastore = require('nedb');

const db = new Datastore({ filename: 'estoque.db', autoload: true });

type Props = { increment: () => void,
    incrementIfOdd: () => void,
    incrementAsync: () => void,
    decrement: () => void,
    counter: number };

type State = { products: Array<mixed> };

let productData = [];

export default class Counter extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      produto: '',
      sexo: '',
      quantidade: {
        p: 0,
        m: 0,
        g: 0,
      },
      preco: {
        atacado: 0,
        varejo: 0,
      },
      fabricante: '',
      total: 0,
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      db.find({}, (err, docs) => {
        docs.forEach((d) => {
          this.updateProductList(d);
          console.log('Found product:', d.produto);
        });
      });
    } catch(err) {
      console.log(err);
    }
  };

  updateProductList = (product) => {
    this.setState(state => {
      const products = [...state.products, product];
      return {
        products
      };
    });
  };

  handleChangeProduto = (event) => {
    this.setState({produto: event.target.value});
    console.log(event.target.value);
  };

  handleChangeSexo = (event) => {
    this.setState({sexo: event.target.value});
    console.log(event.target.value);
  };

  handleChangeFabricante = (event) => {
    this.setState({fabricante: event.target.value});
    console.log(event.target.value);
  };

  handleChangeTotal = (event) => {
    this.setState({total: event.target.value});
    console.log(event.target.value);
  };

  handleSubmit = (event) => {
    const { produto, sexo, fabricante, total } = this.state
    const product = {
      produto: produto,
      sexo: sexo,
      fabricante: fabricante,
      total: total
    };

    db.insert(product, (err, docs) => {
          console.log('Saved product:', docs.produto);
      });

    this.updateProductList(product)
    alert('A name was submitted: ' + produto);
    event.preventDefault();
  }

  render() {
    const { products, produto } = this.state
    return (<div>
              <div className={styles.fields}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                  <label htmlFor="produto">
                    <input placeholder = "PRODUTO" id={styles.name} type="text" value={this.state.produto} onChange={this.handleChangeProduto} />
                  </label>
                  <label htmlFor="sexo">
                    <input placeholder = "SEXO" type="text" value={this.state.sexo} onChange={this.handleChangeSexo} />
                  </label>
                  <label htmlFor="Fabricante">
                    <input placeholder = "FABRICANTE" type="text" value={this.state.fabricante} onChange={this.handleChangeFabricante} />
                  </label>
                  <label htmlFor="Total">
                    <input placeholder = "TOTAL" type="number" value={this.state.Total} onChange={this.handleChangeTotal} />
                  </label>
                    <input id={styles.submit} type="submit" value="Submit" />
                </form>
              </div>
              <table>
                {products.map(product => (
                  <tbody key={product._id}>
                    <tr>
                      <td>{product.produto}</td>
                      <td>{product.sexo}</td>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>P</td>
                              <td>M</td>
                              <td>G</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>Atacado</td>
                              <td>Varejo</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>{product.fabricante}</td>
                      <td>{product.total}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
              <div className={styles.backButton} data-tid="backButton">
                <Link to={routes.HOME}>
                  <i className="fa fa-arrow-left fa-3x" />
                </Link>
              </div>
           </div>
    );
  }
}
