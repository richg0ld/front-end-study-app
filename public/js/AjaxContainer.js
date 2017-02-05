import React from 'react';
import $ from 'jquery';
import Button from './Button';

class AjaxContainer extends React.Component {
  constructor(props){
    super();
    this.name = window.prompt('이름을 입력하세요');
  }
  ajax(method) {
    switch (method.toUpperCase()) {
      case 'GET': {
        $.ajax('/api/data', {
          success: function(res){
            console.log(res);
          }
        });
        break;
      }
      case 'POST': {
        $.post('/api/data', {name: this.name},function(res){
          console.log(res);
        });
        break;
      }
    }
  }


  render() {
    return <div>
      <Button clickHandler={(e)=>this.ajax('GET')} text="GET"/>
      <Button clickHandler={(e)=>this.ajax('POST')} text="POST"/>
    </div>;
  }
}

export default AjaxContainer;
