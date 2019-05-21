import james from './images/james.jpg';
import React from 'react';

function addImage() {
   const image = document.createElement('img');
   image.width = 300;
   image.src = james;
   document.querySelector('body').appendChild(image);
}
export default addImage;
