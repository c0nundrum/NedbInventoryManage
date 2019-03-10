import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';

const Datastore = require('nedb');

const db = new Datastore({ filename: 'estoque2.db', autoload: true });

export default class AddProducts extends Component {
  render() {
    return (
      <div>
        <p>This is working</p>
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
      </div>
    );
  }
}
