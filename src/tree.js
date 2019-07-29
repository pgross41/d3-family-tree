import RootNode from './root-node';
import TreeNode from './tree-node';
import NodeStyle from './node-style';

class Tree {

	constructor(familyData) {
		this.el = document.createElement('div');
		this.family = familyData.family;
		this.metadata = familyData.metadata;
	}

	render() {
		const nodes = this.getNodes();
		this.el.id = 'tree';
		this.el.appendChild(nodes);
		return this.el;
	}

	getNodes() {
		const rootNode = new RootNode(this.family);
		const children = this.family.children;
		const nodeStyle = new NodeStyle(this.metadata);

		// Single div to return 
		const nodesWrapper = document.createElement('div')
		nodesWrapper.className = 'treeNodes';
		nodesWrapper.appendChild(rootNode.render())

		// Traverse the tree 
		const appendChildren = (children) => {
			const siblingWrapper = document.createElement('div');
			children.forEach(child => {
				const node = new TreeNode(child);
				const style = nodeStyle.calculate(child)
				const nodeEl = node.render(style);
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