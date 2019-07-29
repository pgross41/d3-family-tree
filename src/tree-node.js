// The node is aware of other nodes 
let nodeId = 0;
const generationIds = [1];
const getGenerationId = (depth) => {
	generationIds[depth] = generationIds[depth] + 1 || 0;
	return generationIds[depth];
}

class TreeNode {

	constructor(familyMember, metadata) {
		this.el = document.createElement('div');
		this.familyMember = familyMember;
		this.metadata = metadata;
	}

	render() {
		this.el.id = `node${++nodeId}`;
		const calculations = this.calculate();
		this.el.className = `treeNode depth${this.familyMember.depth} ${calculations.half}`;
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
			<div class="member">
				<div class="name">${name}</div> 
				${date && `<div class="date">${date}</div>`}
			</div>
			${spouseName && `<div class="spouse">
				<div class="spouseName">${spouseName}</div>
				${spouseBirthday && `<div class="spouseBirthday">${spouseBirthday}</div>`}
			</div>`}
		`.trim();
	}

	/**
	 * Calculate info about this node relative to the others
	 */
	calculate() {
		const maxTheta = Math.PI; 
		const depth = this.familyMember.depth
		const maxDepth = this.metadata.depthCounts.length;
		const r = ((100 / maxDepth) * this.familyMember.depth);
		const sliceTheta = maxTheta / this.metadata.depthCounts[depth]
		const sliceNum = getGenerationId(depth);
		const theta = Math.PI + (Math.PI - maxTheta) / 2 + sliceTheta * (sliceNum + 0.5); 
		const x = (r * Math.cos(theta)) / 2 + 50; // Half because it goes left AND right
		const y = (r * Math.sin(theta)) + 100; // Not half because it only goes up
		const isRightHalf = theta > (Math.PI + (Math.PI / 2));
		const rotation = theta + (isRightHalf ? 0 : Math.PI);
		return {
			sliceNum: sliceNum,
			half: isRightHalf ? 'right' : 'left',
			style: {
				left: `${x}%`,
				top: `${y}%`,
				transform: `rotate(${rotation}rad)`
			}
		}
	}
}

export default TreeNode;