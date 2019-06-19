import React, {Component} from 'react';
import Result from '../result/result';
import {FORM_CLASS, FORM_GROUP_CLASS} from '../../constants';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      value: null,
      type: 'node',
      nodeType: 'form',
      className: FORM_CLASS,
    };
  }

  addInput = () => {
    const {children} = this.state;
    const joined = children.concat({
      type: 'node',
      nodeType: 'div',
      className: FORM_GROUP_CLASS,
      value: null,
      children: [
        {
          type: 'value',
          value: 'hey',
        },
      ],
    });
    this.setState({children: joined});
  };

  render() {
    return (
      <>
        <div>form</div>
        <button onClick={this.addInput}>add input</button>
        <Result value={this.state}></Result>
      </>
    );
  }
}
