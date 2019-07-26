let nodeId = 0;

class TreeNode {
	
	constructor(familyMember) {
		this.el = document.createElement('div');
		this.familyMember = familyMember;
	}

	render(style) {
		this.el.id = `node-${++nodeId}`;
		this.el.className = 'treeNode';
		this.el.innerHTML = this.getNodeHtml(this.familyMember);
		this.el.style.top = nodeId * 50 + 'px';
		Object.assign(this.el.style, style);
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
				<div class="date">${date}</div>
			</div>
			<div class="spouse">
				<div class="spouseName">${spouseName}</div>
				<div class="spouseBirthday">${spouseBirthday}</div>
			</div>
		`.trim();
	}
}

export default TreeNode;