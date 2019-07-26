import RootNode from './root-node';
import TreeNode from './tree-node';

class Tree {

	constructor(familyData) {
		this.el = document.createElement('div');
		this.family = familyData.family;
		this.metadata = familyData.metadata;
	}

	render() {
		const rootNode = new RootNode(this.family);
		this.el.appendChild(rootNode.render());
		const nodes = this.getNodes(this.family.children);
		this.el.appendChild(nodes);
		return this.el;
	}

	getNodes(children) {
		const nodesWrapper = document.createElement('div')
		const appendChildren = (children) => children.forEach(child => {
			const node = new TreeNode(child);
			nodesWrapper.appendChild(node.render())
			appendChildren(child.children);
		});
		appendChildren(children);
		return nodesWrapper
	}

}

export default Tree;