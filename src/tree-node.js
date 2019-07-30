import styles from './tree-node.css';
class TreeNode {

	constructor(familyMember, metadata) {
		this.el = document.createElement('div');
		this.familyMember = familyMember;
		this.metadata = metadata;
	}

	render() {
		this.el.id = `node${this.familyMember.nodeId}`;
		const calculations = this.calculate();
		this.familyMember.calculations = calculations;
		const depthClass = styles[`depth${this.familyMember.depth}`] || '';
		this.el.className = `${styles.treeNode} ${calculations.half} ${depthClass} `;
		this.el.innerHTML = this.getNodeHtml(this.familyMember);
		Object.assign(this.el.style, calculations.style);
		return this.el;
	}

	getNodeHtml(data) {
		const name = data.name || '';
		const date = data.born + (data.died ? ` - ${data.died}` : '');
		const spouseName = data.spouseName || '';
		const spouseBirthday = data.spouseBirthday || '';
		return `
			<div class="${styles.member}">
				<div class="${styles.name}">${name}</div> 
				${date && `<div class="${styles.date}">${date}</div>`}
			</div>
			${spouseName && `<div class="${styles.spouse}">
				<div class="${styles.spouseName}">${spouseName}</div>
				${spouseBirthday && `<div class="${styles.spouseBirthday}">${spouseBirthday}</div>`}
			</div>`}
		`.trim();
	}

	/**
	 * Calculate info about this node relative to the others
	 */
	calculate() {
		const minThetaBetweenSibs = Math.PI / 30; // Configurable?
		const bonusParentTheta = 2.5; // Configurable?
		const parentCalc = this.familyMember.parent.calculations;
		const parentSibCount = this.familyMember.parent.parent && this.familyMember.parent.parent.children.length;
		const maxTheta = parentCalc ? parentCalc.singleNodeTheta * parentSibCount : Math.PI;
		const depth = this.familyMember.depth;
		const maxDepth = this.metadata.depthCounts.length;
		const r = (100 / maxDepth) * this.familyMember.depth;
		const singleNodeTheta = maxTheta / this.metadata.depthCounts[depth];
		const childId = this.familyMember.childId;
		const thetaStart = parentCalc ? parentCalc.theta : Math.PI + (Math.PI - maxTheta) / 2;
		const theta0 = thetaStart + singleNodeTheta * (childId - (parentCalc ? bonusParentTheta : 0.5));
		const prevSiblingTheta = this.familyMember.prevSibling && this.familyMember.prevSibling.calculations.theta || 0;
		const theta = Math.max(prevSiblingTheta + minThetaBetweenSibs, theta0);
		const x = (r * Math.cos(theta)) / 2 + 50; // Half because it goes left AND right
		const y = (r * Math.sin(theta)) + 100; // Not half because it only goes up
		const isRightHalf = theta > (Math.PI + (Math.PI / 2));
		const rotation = theta + (isRightHalf ? 0 : Math.PI);
		return {
			half: isRightHalf ? styles.right : styles.left,
			singleNodeTheta: singleNodeTheta,
			theta: theta,
			style: {
				left: `${x}%`,
				top: `${y}%`,
				transform: `rotate(${rotation}rad)`
			}
		}
	}
}

export default TreeNode;