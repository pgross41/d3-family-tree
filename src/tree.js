var nodeId = 0;

function draw(container, familyData) {

	const rootNode = getRootNode(familyData.family);
	container.appendChild(rootNode);

	const nodes = getNodes(familyData.family.children);
	container.appendChild(nodes);
}

function getRootNode(data) {
	const root = document.createElement('div')
	root.id = 'root';
	root.innerHTML = getNodeHtml(data);

	const rootWrapper = document.createElement('div')
	rootWrapper.className = 'center';
	rootWrapper.appendChild(root);
	return rootWrapper
}

function getNodes(children) {
	const nodesWrapper = document.createElement('div')
	const appendChildren = (children) => children.forEach(child => {
		nodesWrapper.appendChild(getNode(child))
		appendChildren(child.children);
	});
	appendChildren(children);
	return nodesWrapper
}

function getNode(data) {
	const node = document.createElement('div')
	node.id = `node-${++nodeId}`;
	node.className = 'node';
	node.innerHTML = getNodeHtml(data);
	node.style.top = nodeId * 50 + 'px';
	return node
}

function getNodeHtml(data) {
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
		&nbsp;(${data.depth})
	`.trim();
}

export default {
	draw: draw
}