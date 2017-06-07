require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {findDOMNode} from 'react-dom';
import ImgFigure from './ImgFigure';
import ControllerUnit from './controllerUnit';
//let yeomanImage = require('../images/yeoman.png');
let imageDatas = require('../data/imageDatas.json');
//利用自执行函数，将图片名信息转成图片URL
imageDatas = (function(imageDatasArr){
  for(let i=0;i<imageDatasArr.length;i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/'+singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);
function getRangeRandom(arr){
  return Math.floor(Math.random()*(arr[1]-arr[0])+arr[0]);
}
function getStateRandom(){
  return Math.floor(Math.random()*60)-30;
}

class AppComponent extends React.Component {
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeleftSecX = hPosRange.leftSecX,
      hPosRangerightSecX = hPosRange.rightSecX,
      hPosRangerY = hPosRange.y,
      vPosRangerTopY = vPosRange.topY,
      vPosRangerX = vPosRange.x,

      imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random() * 2),
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
      imgsArrangeCenterArr[0] ={
        pos : centerPos,
        rotate : 0,
        isCenter:true
      };

      topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));

      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      imgsArrangeTopArr.forEach((value, index)=> {
        imgsArrangeTopArr[index] = {
          pos : {
            left:getRangeRandom(vPosRangerX),
            top:getRangeRandom(vPosRangerTopY)
          },
          rotate : getStateRandom()
        };
      });

      for(let i= 0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
        let hPosRangeLORX = (i<k)?hPosRangeleftSecX:hPosRangerightSecX;
        imgsArrangeArr[i] = {
          pos : {
            left: getRangeRandom(hPosRangeLORX),
            top: getRangeRandom(hPosRangerY)
          },
          rotate : getStateRandom()
        };
      }
      if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
      }
      imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
    }
  reCenter(i){
    return () => {
      this.rearrange(i);
    }
  }
  flip(i){
    return () => {
      this.state.imgsArrangeArr[i].isFlip = !this.state.imgsArrangeArr[i].isFlip;
      this.setState({
        imgsArrangeArr:this.state.imgsArrangeArr
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr:[]
    };
  }
  componentDidMount() {
    //获取舞台大小
    let stage = this.refs.stage,
        stageW = stage.scrollWidth,
        stageH = stage.scrollHeight,
        halfStageW = Math.floor(stageW/2),
        halfStageH = Math.floor(stageH/2);
    //获取图片大小
    let imgfigure = findDOMNode(this.refs.img0),
        imgW = imgfigure.scrollWidth,
        imgH = imgfigure.scrollHeight,
        halfImgW = Math.floor(imgW/2),
        halfImgH = Math.floor(imgH/2);
    this.Constant ={
      centerPos:{
        left:halfStageW-halfImgW,
        top:halfStageH-halfImgH
      },
      hPosRange:{
        leftSecX:[-halfImgW,halfStageW-halfImgW*3],
        rightSecX:[halfStageW+halfImgW,stageW-halfImgW],
        y:[-halfImgH,stageH-halfImgH]
      },
      vPosRange:{
        x:[halfStageW-halfImgW,halfStageW],
        topY:[-halfImgH,halfStageH-halfImgH*3]
      }
    };
    this.rearrange(0);
  }
  render() {
    let controllerUnits = [],
      imgFigures = [];
    imageDatas.forEach((value,i) => {
        if(!this.state.imgsArrangeArr[i]){
          this.state.imgsArrangeArr[i]={
            pos:{
              left:0,
              top:0
            },
            rotate:0,
            isFlip:false,
            isCenter:false
          }
        }
        imgFigures.push(<ImgFigure data = {value} ref = {'img'+i} arrange= {this.state.imgsArrangeArr[i]} flip= {this.flip(i)} center= {this.reCenter(i)} key ={'img'+i}/>);
        controllerUnits.push(<ControllerUnit arrange= {this.state.imgsArrangeArr[i]} flip= {this.flip(i)} center= {this.reCenter(i)} key={'m'+i}/>);
    });
    return (
     <section className="stage" ref ="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
