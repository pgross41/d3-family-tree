import TreeNode from './tree-node';

class RootNode extends TreeNode {

	render() {
		const innerEl = document.createElement('div')
		innerEl.className = 'rootNode';
		innerEl.innerHTML = this.getNodeHtml(this.familyMember);
		this.el.className = 'center';
		this.el.appendChild(innerEl);
		return this.el
	}
}

export default RootNode;