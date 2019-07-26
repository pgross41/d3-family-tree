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
		const rootNode = new RootNode(this.family);
		const nodes = this.getNodes(this.family.children);
		this.el.id = 'tree';
		this.el.appendChild(rootNode.render());
		this.el.appendChild(nodes);
		return this.el;
	}

	getNodes(children) {
		const nodeStyle = new NodeStyle(this.metadata);
		const nodesWrapper = document.createElement('div')
		const appendChildren = (children) => {
			const familyNode = document.createElement('div');
			children.forEach(child => {
				const node = new TreeNode(child);
				const style = nodeStyle.calculate(child)
				const nodeEl = node.render(style);
				familyNode.appendChild(nodeEl)
				nodesWrapper.appendChild(familyNode)
				appendChildren(child.children);
			});
		}
		appendChildren(children);
		return nodesWrapper
	}
}

export default Tree;