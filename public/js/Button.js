import React from 'react';

class Button extends React.Component {
  constructor(props){
    super();
  }
  clickHandler(e){
    this.props.clickHandler(e);
  }
  render(){
    return <button onClick={(e)=> this.clickHandler(e)}>{this.props.text}</button>;
  }
}

export default Button;
