import config from '../config.js';
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
		const varietyClass = styles[`variety${this.familyMember.generationId % 3 + 1}`] || '';
		const noBorderSide = config.noBorders[this.familyMember.name]
			|| (this.familyMember.generationId == 1 && "Top")
			|| (this.familyMember.generationId == this.metadata.depthCounts[this.familyMember.depth] && "Bottom");
		const noBorderClass = noBorderSide ? styles[`noBorder${noBorderSide}`] : '';
		this.el.className = `${styles.treeNode} ${calculations.half} ${depthClass} ${varietyClass} ${noBorderClass}`;
		this.el.innerHTML = this.getNodeHtml(this.familyMember);
		Object.assign(this.el.style, calculations.style);
		return this.el;
	}

	getNodeHtml(data) {
		const name = data.name || '';
		const date = data.born + (data.died ? ` - ${data.died}` : '');
		const spouseName = data.spouseName || '';
		const spouseBorn = data.spouseBorn || '';
		return `
			<div>
				<div class="${styles.member}">
					<div class="${styles.name}">${name}</div> 
					${date && `<div class="${styles.date}">${date}</div>`}
				</div>
				${spouseName && `<div class="${styles.spouse}">
					<div class="${styles.name}">${spouseName}</div>
					${spouseBorn && `<div class="${styles.date}">${spouseBorn}</div>`}
				</div>
			</div>`}
		`.trim();
	}

	/**
	 * Calculate info about this node relative to the others
	 */
	calculate() {
		const parentCalc = this.familyMember.parent.calculations;
		const parentSibCount = this.familyMember.parent.parent && this.familyMember.parent.parent.children.length;
		const maxTheta = parentCalc ? parentCalc.singleNodeTheta * parentSibCount : config.maxAngle;
		const depth = this.familyMember.depth;
		const maxDepth = this.metadata.depthCounts.length;
		const r = (100 / maxDepth) * this.familyMember.depth;
		const singleNodeTheta = maxTheta / (this.metadata.depthCounts[depth] - 1);
		const childId = this.familyMember.childId;
		const thetaStart = parentCalc ? parentCalc.theta : Math.PI + (Math.PI - maxTheta) / 2;
		const prevSiblingTheta = this.familyMember.prevSibling && this.familyMember.prevSibling.calculations.theta || 0;
		const theta0 = thetaStart + singleNodeTheta * (childId - (parentCalc ? config.bonusParentFactor : 1));
		const theta1 = Math.max(prevSiblingTheta + config.minThetaBetweenSibs, theta0);
		const theta = theta1 + (config.adjustments[this.familyMember.name] || 0);
		const x = (r * Math.cos(theta)) / 2 + 50; // Half because it goes left AND right
		const y = (r * Math.sin(theta)) + 50; // Not half because it only goes up
		console.log(this.el, x, y);
		const isRightHalf = theta > (Math.PI + (Math.PI / 2));
		if (this.familyMember.generationId == 1) {
			this.metadata.depthMinThetas[depth] = theta;
		}
		return {
			half: isRightHalf ? styles.right : styles.left,
			singleNodeTheta: singleNodeTheta,
			theta: theta,
			style: {
				left: `${x}%`,
				top: `${y}%`,
				transform: `rotate(${theta}rad)`
			}
		}
	}
}

export default TreeNode;