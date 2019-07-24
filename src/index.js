import * as csv from './csv.js';
// import {data} from '../data.js';

function component() {

  const pre = document.createElement('pre');
  const fam = csv.parse("");
  console.log(fam);
  pre.innerHTML = JSON.stringify(fam, null, 2);
  return pre;

}

document.body.appendChild(component());