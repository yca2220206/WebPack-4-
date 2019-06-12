import "babel-polyfill";
import hellowordbutton from './components/hello-world-button/hello-world-button.js';
import heading from './components/heading/heading.js';
import React from 'react';

const helloworldbbutton = new hellowordbutton();
const header = new heading();
header.render();
helloworldbbutton.render();
