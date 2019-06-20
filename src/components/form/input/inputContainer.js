import React, {Component} from 'react';
import Result from '../../result/result';
import {Input, Label} from './index';
import {FORM_GROUP_CLASS} from '../../../constants';

export class InputContainer extends Component {
  constructor(props) {
    super(props);
    const {index = 1} = props;
    const inputId = `evt-input-${index}`;
    this.input = new Input({id: inputId});
    this.label = new Label({value: `Label ${index}`, htmlFor: inputId});
    this.state = {
      type: 'node',
      nodeType: 'div',
      selfClosing: false,
      props: {
        className: FORM_GROUP_CLASS,
      },
      value: null,
      children: [this.label.getState(), this.input.getState()],
    };
  }

  getState = () => {
    return this.state;
  };

  render() {
    return (
      <>
        <h1>form</h1>
        <button onClick={this.addInput}>add input</button>
        <Result value={this.state}></Result>
      </>
    );
  }
}
