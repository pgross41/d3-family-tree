import config from '../config.js';
import styles from './tree.css';
import RootNode from './root-node';
import TreeNode from './tree-node';

class Tree {

	constructor(familyData) {
		console.log(styles);
		this.el = document.createElement('div');
		this.family = familyData.family;
		this.metadata = familyData.metadata;
	}

	render() {
		const nodes = this.getNodes();
		const leafImages = this.getLeafImages();
		this.el.className = styles.tree;
		nodes.appendChild(leafImages);
		this.el.appendChild(nodes);
		return this.el;
	}

	getNodes() {
		const rootNode = new RootNode(this.family);
		const children = this.family.children;

		// Single div to return 
		const nodesWrapper = document.createElement('div')
		nodesWrapper.className = styles.treeNodes;
		nodesWrapper.appendChild(rootNode.render())

		// Traverse the tree 
		const appendChildren = (children) => {
			const siblingWrapper = document.createElement('div');
			children.forEach(child => {
				const node = new TreeNode(child, this.metadata);
				const nodeEl = node.render();
				siblingWrapper.appendChild(nodeEl)
				nodesWrapper.appendChild(siblingWrapper)
				appendChildren(child.children);
			});
		}
		appendChildren(children);

		return nodesWrapper
	}


	// Decorative leaves
	getLeafImages() {
		const imgWrapper = document.createElement('div')
		imgWrapper.className = styles.leafImgs
		Object.keys(this.metadata.depthCounts).forEach((depth) => {
			const leavesInRow = Math.round(depth * 6);
			// const leavesInRow = 10;
			console.log(leavesInRow);
			[...Array(leavesInRow)].forEach((_, idx) => {
				const img = document.createElement('img')
				img.className = styles.leafImg;
				img.src = `/images/leaves${idx % 3 + 1}.png`;
				const thetaStart = Math.PI + (Math.PI - config.maxAngle) / 2;
				const theta = thetaStart + (config.maxAngle / leavesInRow) * (idx + 0.5) ;
				const r = ((100 / this.metadata.depthCounts.length) * depth) + 9;
				console.log(r);
				const x = (r * Math.cos(theta)) / 2 + 50; // Half because it goes left AND right
				const y = (r * Math.sin(theta)) + 100; // Not half because it only goes up
				const rotation = theta + Math.PI/2;
				img.style.left = `${x}%`;
				img.style.top = `${y}%`;
				img.style.transform = `rotate(${rotation}rad)`
				imgWrapper.appendChild(img);
			});
		});
		return imgWrapper;
	}
}

export default Tree;