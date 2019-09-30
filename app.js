// write your code here!

var height = 500;
var width = 500;
var padding = 50;

var yScale = d3
	.scaleLinear()
	.domain(d3.extent(regionData, d => d.subscribersPer100))
	.range([height - padding, padding]);

var xScale = d3
	.scaleLinear()
	.domain(d3.extent(regionData, d => d.adultLiteracyRate))
	.range([padding, width - padding]);

var rScale = d3
	.scaleLinear()
	.domain(d3.extent(regionData, d => d.urbanPopulationRate))
	.range([1, 20]);

var cScale = d3
	.scaleLinear()
	.domain(d3.extent(regionData, d => d.extremePovertyRate))
	.range(["green", "red"]);

var xAxis = d3
	.axisBottom(xScale)
	.tickSize(-height + 2 * padding)
	.tickSizeOuter(0);

var yAxis = d3
	.axisLeft(yScale)
	.tickSize(-width + 2 * padding)
	.tickSizeOuter(0);

d3.select("svg")
	.append("g")
	.attr("transform", "translate(0," + (height - padding) + ")")
	.call(xAxis);

d3.select("svg")
	.append("g")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);

d3.select("svg")
	.attr("width", width)
	.attr("height", height)
	.selectAll("circle")
	.data(regionData)
	.enter()
	.append("circle")
	.attr("cx", d => xScale(d.adultLiteracyRate))
	.attr("cy", d => yScale(d.subscribersPer100))
	.attr("r", d => rScale(d.urbanPopulationRate))
	.attr("fill", d => cScale(d.extremePovertyRate))
	.attr("stroke", "lightgrey")
	.on("mousemove", d => {
		tooltip
			.style("opacity", 1)
			.text(d.region)
			.style("top", d3.event.y + "px")
			.style("left", d3.event.x + "px");
	});

d3.select("svg")
	.append("text")
	.attr("x", width / 2)
	.attr("y", height - padding)
	.attr("dy", "1.5em")
	.style("text-anchor", "middle")
	.text("Adult literacy rate");

d3.select("svg")
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("x", -height / 2 - padding)
	.attr("y", 0)
	.attr("dy", "1.5em")

	// .style("text-anchor","middle")
	.text("Subscribers per 100");

var tooltip = d3
	.select("body")
	.append("div")
	.classed("tooltip", true);
