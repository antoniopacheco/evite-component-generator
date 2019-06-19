import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

  parseValue = (node, indentation = 0) => {
    let stringToRet = '';
    for (let i = 0; i < indentation * 2; i++) {
      stringToRet += ' ';
    }
    const {type, nodeType, className, children, value} = node;
    switch (type) {
      case 'value':
        stringToRet += value;
        break;
      case 'node':
        stringToRet += `<${nodeType} className="${className}">\n`;
        stringToRet += children.reduce((ac, child) => {
          ac += `${this.parseValue(child, indentation + 1)}\n`;
          return ac;
        }, '');
        for (let i = 0; i < indentation * 2; i++) {
          stringToRet += ' ';
        }
        stringToRet += `</${nodeType}>`;
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
        <SyntaxHighlighter language="javascript" style={dark}>
          {this.state.code}
        </SyntaxHighlighter>
      </div>
    );
  }
}
