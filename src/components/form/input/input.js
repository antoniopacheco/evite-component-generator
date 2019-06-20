import React, {Component} from 'react';
import Result from '../../result/result';
import {INPUT_CLASS, FORM_GROUP_CLASS} from '../../../constants';

export class Input extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      type: 'node',
      nodeType: 'input',
      selfClosing: true,
      props: {
        ...props,
        className: FORM_GROUP_CLASS,
        type: 'text',
      },
      value: null,
      children: [
        {
          type: 'value',
          value: 'hey',
        },
      ],
    };
  }

  getState = () => {
    return this.state;
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
