import config from '../config.js';
import parse from './parse.js';
import Tree from './tree.js';
import styles from './index.css';

const familyData = parse(config.data);
const tree = new Tree(familyData);
document.body.className = styles.body;
document.body.appendChild(tree.render());

if(config.debugMode){
    document.body.classList.add('debugMode');
}