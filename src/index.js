import csvData from '../data.js';
import parse from './parse.js';
import Tree from './tree.js';

const familyData = parse(csvData);
const tree = new Tree(familyData);
document.body.appendChild(tree.render());

// Testing
console.log(familyData);