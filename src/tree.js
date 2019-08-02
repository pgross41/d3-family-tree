import config from '../config.js';
import styles from './tree.css';
import RootNode from './root-node';
import TreeNode from './tree-node';
import LeafImg from './leaf-img';

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


	// Tree-level leaves (does not divide nodes) 
	// Node leaves are added via CSS 
	getLeafImages() {
		const imgWrapper = document.createElement('div')
		imgWrapper.className = styles.leafImgs
		Object.keys(this.metadata.depthCounts).forEach((depth) => {
			console.log(this.metadata);
			// The lines between each depth 
			const leavesInRow = Math.round(depth * 9);
			// const thetaStart = this.metadata.depthMinThetas[depth];
			const thetaStart = Math.min(...this.metadata.depthMinThetas.slice(1));
			// const thetaEnd = Math.PI * 2 + (Math.PI - thetaStart);
			const thetaEnd = Math.PI * 2 + (Math.PI - Math.min(...this.metadata.depthMinThetas.slice(1)));
			[...Array(leavesInRow)].forEach((_, idx) => {
				const r = ((100 / this.metadata.depthCounts.length) * depth) + 12;
				const theta = thetaStart + ((thetaEnd - thetaStart) / (leavesInRow - 1)) * idx;
				const img = new LeafImg(r, theta, Math.PI / 2);
				imgWrapper.appendChild(img.render());
				const img2 = new LeafImg(r-1, theta, Math.PI + Math.PI / 2);
				imgWrapper.appendChild(img2.render());
				const img3 = new LeafImg(r+1, theta, Math.PI / 2);
				imgWrapper.appendChild(img3.render());
			});
			// The "edge" leaves
			if (depth != 0) {
				// Left side
				imgWrapper.appendChild(new LeafImg(
					((100 / this.metadata.depthCounts.length) * depth),
					thetaStart - config.edgeLeafOffset
				).render());
				// Right side
				imgWrapper.appendChild(new LeafImg(
					((100 / this.metadata.depthCounts.length) * depth),
					thetaEnd + config.edgeLeafOffset
				).render());
			}
		});
		return imgWrapper;
	}
}

export default Tree;