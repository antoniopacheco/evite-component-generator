import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const VALIDPROPS = [
  'className',
  'style',
  'id',
  'novalidate',
  'type',
  'htmlFor',
];

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'hey',
    };
  }
  onCopyClicked = () => {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = this.state.code;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  parseProps = (props) => {
    if (!props) return '';
    let parsedProps = '';
    const propsReceived = Object.keys(props);
    for (let i = 0; i < propsReceived.length; i++) {
      let keyName = propsReceived[i];
      if (VALIDPROPS.includes(keyName)) {
        parsedProps += ` ${keyName}="${props[keyName]}"`;
      } else {
        console.warn(`${keyName} prop not valid`);
      }
    }
    return parsedProps.trim();
  };

  parseValue = (node, indentation = 0) => {
    let stringToRet = '';
    for (let i = 0; i < indentation * 2; i++) {
      stringToRet += ' ';
    }
    const {type, nodeType, props, children, value, selfClosing} = node;
    switch (type) {
      case 'value':
        stringToRet += value;
        break;
      case 'node':
        if (!selfClosing) {
          stringToRet += `<${nodeType} ${this.parseProps(props)}>\n`;
          stringToRet += children.reduce((ac, child) => {
            ac += `${this.parseValue(child, indentation + 1)}\n`;
            return ac;
          }, '');
          for (let i = 0; i < indentation * 2; i++) {
            stringToRet += ' ';
          }
          stringToRet += `</${nodeType}>`;
        } else {
          stringToRet += `<${nodeType} ${this.parseProps(props)}" \/>`;
        }
        break;
    }
    return stringToRet;
  };

  componentDidMount = () => {
    const {value} = this.props;
    this.setState({
      code: this.parseValue(value),
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.setState({
        code: this.parseValue(this.props.value),
      });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.onCopyClicked}>Copy</button>
        <SyntaxHighlighter language="htmlbars" style={dark}>
          {this.state.code}
        </SyntaxHighlighter>
      </div>
    );
  }
}
