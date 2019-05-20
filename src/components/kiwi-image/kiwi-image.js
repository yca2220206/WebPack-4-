import "./kiwi-image.scss";
import simion from '../../images/simion.jpeg';
import loadash from 'lodash';

class KiwiImage {
  render() {
     const img = document.createElement('img');
     img.src = simion;
     img.classList.add('kiwiImage');
     const body = document.querySelector('body');
     body.appendChild(img);
  }
}
export default KiwiImage;
