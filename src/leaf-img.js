import styles from './tree.css';

var idx = 0;

class LeafImg {
	constructor(r, theta, extraRotation = 0) {
        this.el = document.createElement('img');
        this.r = r;
        this.theta = theta;
        this.extraRotation = extraRotation;
    }
    
    render(){
        const x = (this.r * Math.cos(this.theta)) / 2 + 50; // Half because it goes left AND right
        const y = (this.r * Math.sin(this.theta)) + 50; // Not half because it only goes up
        const rotation = this.theta + this.extraRotation;
        this.el.className = styles.leafImg;
        this.el.src = `/images/leaves${idx++ % 3 + 1}.png`;
        this.el.style.left = `${x}%`;
        this.el.style.top = `${y}%`;
        this.el.style.transform = `rotate(${rotation}rad)`
        return this.el;
    }
}

export default LeafImg;