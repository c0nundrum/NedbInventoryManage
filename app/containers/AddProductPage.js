import React, { Component } from 'react';
import AddProducts from '../components/AddProduct';

type Props = {};

export default class AddProductPage extends Component<Props> {
  props: Props;

  render() {
    return <AddProducts />;
  }
}
