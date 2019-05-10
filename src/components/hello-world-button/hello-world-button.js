import './hello-world-button.scss';

class hellowordbutton {
  buttonCssClass = 'hello-world-button';
  render() {
    const button = document.createElement('button');
    const body = document.querySelector('body');
    button.innerHTML = 'helloword';
    button.classList.add(this.buttonCssClass);
    button.onclick = function() {
      const p = document.createElement('p');
      p.innerHTML = 'hello world';
      p.classList.add('hello-world-text');
      body.appendChild(p);
    }
    body.appendChild(button);
  }
}
export default hellowordbutton;