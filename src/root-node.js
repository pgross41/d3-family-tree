import styles from './tree-node.css';
import TreeNode from './tree-node';

class RootNode extends TreeNode {

	render() {
		this.el.className = `${styles.treeNode} ${styles.rootNode}`;
		this.el.innerHTML = this.getNodeHtml(this.familyMember);
		return this.el
	}
}

export default RootNode;