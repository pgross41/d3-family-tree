import styles from './tree-node.css';

var idx = 0;

class LeafImg {
	constructor(r, theta, extraRotation = 0) {
        this.el = document.createElement('div');
        this.r = r;
        this.theta = theta;
        this.extraRotation = extraRotation;
    }
    
    render(){
        this.el.className = styles.treeNodeContainer;
        const x = (this.r * Math.cos(this.theta)) / 2 + 50; // Half because it goes left AND right
        const y = (this.r * Math.sin(this.theta)) + 50; // Not half because it only goes up
        const rotation = this.theta + this.extraRotation;
        this.el.style.left = `${x}%`;
        this.el.style.top = `${y}%`;
        this.el.style.transform = `rotate(${rotation}rad)`
        const img = document.createElement('img');
        img.className = styles.leafImg;
        img.src = `/images/leaves${idx++ % 3 + 1}.png`;
        this.el.appendChild(img);
        return this.el;
    }
}

export default LeafImg;