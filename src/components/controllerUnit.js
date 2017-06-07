import React from 'react';

class controllerUnit extends React.Component{
  handleClick(){
    return ()=>{
      if(this.props.arrange.isCenter){
        this.props.flip();
      }else{
        this.props.center();
      }
    }
  }
  render() {
    let centerClass = '';
    if(this.props.arrange.isCenter){
      centerClass+=' is-center';
    }
    if(this.props.arrange.isFlip){
      centerClass+=' is-inverse';
    }
    return (
      <span className = {centerClass} onClick = {this.handleClick()}></span>
    )
  }
}

controllerUnit.defaultProps = {

};

export default controllerUnit;
