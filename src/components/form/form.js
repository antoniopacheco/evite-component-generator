import React, {Component} from 'react';
import Result from '../result/result';
import {FORM_CLASS, FORM_GROUP_CLASS} from '../../constants';
import {InputContainer} from './input/';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      value: null,
      type: 'node',
      nodeType: 'form',
      selfClosing: false,
      props: {
        className: FORM_CLASS,
        novalidate: 'novalidate',
      },
    };
  }

  addInput = () => {
    const {children} = this.state;
    const newInput = new InputContainer({index: children.length + 1});
    const joined = children.concat(newInput.getState());
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
