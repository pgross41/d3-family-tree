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
		this.el.className = styles.tree;
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
}

export default Tree;