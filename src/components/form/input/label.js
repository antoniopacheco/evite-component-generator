import React, {Component} from 'react';
import Result from '../../result/result';
import {LABEL_CLASS} from '../../../constants';

export class Label extends Component {
  constructor(props) {
    const {value = 'label value', ...labelProps} = props;
    super(props);
    this.state = {
      type: 'node',
      nodeType: 'label',
      selfClosing: false,
      props: {
        ...labelProps,
        className: LABEL_CLASS,
      },
      value: null,
      children: [
        {
          type: 'value',
          nodeType: null,
          value: value,
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
        <h1>Label</h1>
        <button onClick={this.addInput}>add input</button>
        <Result value={this.state}></Result>
      </>
    );
  }
}
