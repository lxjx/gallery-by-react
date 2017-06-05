require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

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
console.log(imageDatas);
class AppComponent extends React.Component {
  render() {
    return (
     <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
