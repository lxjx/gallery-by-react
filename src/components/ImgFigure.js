import React from 'react';

class ImgFigure extends React.Component{
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
    let styleObj = this.props.arrange.pos?this.props.arrange.pos:{};
    if(this.props.arrange.rotate){
      styleObj['transform'] ='rotate('+this.props.arrange.rotate+'deg)';
    }
    if(this.props.arrange.isCenter){
      styleObj['zIndex'] ='101';
    }
    let cn = this.props.arrange.isFlip?"img-figure is-inverse":"img-figure";
    return <figure className = {cn} style= {styleObj} onClick = {this.handleClick()} >
      <img src={this.props.data.imageURL} alt={this.props.data.title} />
      <figcaption>
        <h2 className ="img-title">{this.props.data.title}</h2>
        <div className="img-back">
          <p>{this.props.data.desc}</p>
        </div>
      </figcaption>
    </figure>
  }
}

ImgFigure.defaultProps = {

};

export default ImgFigure;
