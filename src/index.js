import csvData from '../data.js';
import parse from './parse.js';
import tree from './tree.js';

const familyData = parse(csvData);
const container = document.getElementById('tree');
tree.draw(container, familyData);

// Testing
console.log(familyData);
const pre = document.createElement('pre');
pre.innerHTML = JSON.stringify(familyData, null, 2);
// document.body.appendChild(pre);