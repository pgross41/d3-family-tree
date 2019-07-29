const maxTheta = Math.PI;

class NodeStyle {
	constructor(metadata) {
		this.depthCounts = metadata.depthCounts;
		this.maxDepth = metadata.depthCounts.length;
		this.generationIds = [1];
		this.getGenerationId = (depth) => {
			this.generationIds[depth] = this.generationIds[depth] + 1 || 0.5;
			return this.generationIds[depth];
		}
		console.log(this);
	}

	getSliceTheta(depth) {
		return maxTheta / this.depthCounts[depth]
	};

	getRadians(degrees) {
		// degrees = radians * (180/Math.PI)
		return degrees / (180 / Math.PI)
	}

	calculate(familyMember) {
		const depth = familyMember.depth
		const r = ((100 / this.maxDepth) * familyMember.depth);
		const sliceTheta = this.getSliceTheta(depth);
		const sliceNum = this.getGenerationId(depth);
		const theta = Math.PI + sliceTheta * sliceNum;
		const x = (r * Math.cos(theta)) / 2 + 50; // Half because it goes left AND right
		const y = (r * Math.sin(theta)) + 100; // Not half because it only goes up
		const rotation = theta + (theta > (Math.PI + (Math.PI / 2)) ? 0 : Math.PI);
		return {
			left: `${x}%`,
			top: `${y}%`,
			theta: theta,
			transform: `rotate(${rotation}rad)`
		}
	}
}

export default NodeStyle;