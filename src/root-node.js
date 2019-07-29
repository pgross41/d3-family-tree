import TreeNode from './tree-node';

class RootNode extends TreeNode {

	render() {
		this.el.className = 'treeNode rootNode';
		this.el.innerHTML = this.getNodeHtml(this.familyMember);
		return this.el
	}
}

export default RootNode;