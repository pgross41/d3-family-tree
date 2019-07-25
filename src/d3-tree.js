import * as d3 from 'd3';

/* D3 Tree */
/* Copyright 2013 Peter Cook (@prcweb); Licensed MIT */

// Tree configuration
var branches = [];
var seed = { i: 0, x: 420, y: 600, a: 0, l: 130, d: 0 }; // a = angle, l = length, d = depth
var da = 0.7; // Angle delta
var dl = 0.8; // Length delta (factor)
var ar = 0; // Randomness
var maxDepth = 3;


// Tree creation functions
function branch(b) {
	var end = endPt(b), daR, newB;

	branches.push(b);

	if (b.d === maxDepth)
		return;

	// Left branch
	daR = ar * Math.random() - ar * 0.5;
	newB = {
		i: branches.length,
		x: end.x,
		y: end.y,
		a: b.a - da + daR,
		l: b.l * dl,
		d: b.d + 1,
		parent: b.i
	};
	branch(newB);

	// Right branch
	daR = ar * Math.random() - ar * 0.5;
	newB = {
		i: branches.length,
		x: end.x,
		y: end.y,
		a: b.a + da + daR,
		l: b.l * dl,
		d: b.d + 1,
		parent: b.i
	};
	branch(newB);
}

function regenerate(initialise) {
	branches = [];
	branch(seed);
	initialise ? create() : update();

	var p = d3.select("#test")
		.selectAll("div")
		.append(getNode({
			"name": "Greg Gross",
			"born": "19-Oct-1937",
			"died": "",
			"spouseName": "Kaye Gross",
			"spouseBirthday": "11-Jul-1937",
			"anniversary": "25-Aug-1954",
			"children": []
		}))
}

function endPt(b) {
	// Return endpoint of branch
	var x = b.x + b.l * Math.sin(b.a);
	var y = b.y - b.l * Math.cos(b.a);
	return { x: x, y: y };
}


// D3 functions
function x1(d) { return d.x; }
function y1(d) { return d.y; }
function x2(d) { return endPt(d).x; }
function y2(d) { return endPt(d).y; }

function create() {
	d3.select('#chart svg')
		.selectAll('line')
		.data(branches)
		.enter()
		.append('line')
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2)
		.style('stroke-width', function (d) { return parseInt(maxDepth + 1 - d.d) + 'px'; })
		.attr('id', function (d) { return 'id-' + d.i; })

}

function getNode(data) {
	// return data;
	return d3
		.data(["heyyy", "wazuppp"])
		.enter()
		.append('line')
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2)
		.style('stroke-width', 10);

	return d3
		.selectAll("x")
		.data(["heyyy", "wazuppp"])
		.enter()
		.append("p")
		.text(function (d) {
			return d;
		});

}

regenerate(true);