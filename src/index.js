import csvData from '../data.js';
import parse from './parse.js';
import Tree from './tree.js';
import styles from './index.css';

const familyData = parse(csvData);
const tree = new Tree(familyData);
document.body.className = styles.body;
document.body.appendChild(tree.render());

// Testing
console.log(familyData);