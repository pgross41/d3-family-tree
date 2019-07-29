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
		// const r = 100 / this.maxDepth; // For percentages 
		const r = depth * 200;
		const sliceTheta = this.getSliceTheta(depth);
		const sliceNum = this.getGenerationId(depth);
		const theta = Math.PI + sliceTheta * sliceNum;
		const x = (r * Math.cos(theta)) + 700;
		const y = (r * Math.sin(theta)) + 600;
		const rotation = theta + (theta > (Math.PI + (Math.PI / 2)) ? 0 : Math.PI);
		console.log(theta);
		return {
			left: `${x}px`,
			top: `${y}px`,
			theta: theta,
			transform: `rotate(${rotation}rad)`
		}
	}
}

export default NodeStyle;