 // javascript
 var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// basic settings
var svgHeight = 400, svgWidth = 400, xPadding = 30, yPadding = 25;
var barWidth = (svgWidth - xPadding - 20) / dataset.length;

var svgScaleY = d3.scaleLinear()
	.domain([0,d3.max(dataset)+5])
	.range([0,svgHeight-yPadding-50]);

var yAxisScale = d3.scaleLinear()
	.domain([d3.max(dataset)+20,0])
	.range([0,svgHeight-50]);

var xAxisScale = d3.scaleLinear()
	.domain([0,dataset.length])
	.range([0,svgWidth-50]);


var svg = d3.select('svg')
	.attr('height',svgHeight)
  .attr('width',svgWidth);

var yAxis = d3.axisLeft()
	.scale(yAxisScale);

var xAxis = d3.axisBottom()
	.scale(xAxisScale);

var bar = svg.selectAll('g')
	.data(dataset)
  .enter()
  .append('g');

bar.append('rect')
  .attr("class", "bar")
  .attr('width',barWidth-2)
  .attr('height',function(d) {
  	return svgScaleY(d);
  })
  .attr('transform', function(d,i) {
  	var translate = [barWidth*i + xPadding + 1,svgHeight - svgScaleY(d) - yPadding];
  	return "translate("+translate+")"
  });

bar.append('text')
  .text(function(d) {
  	return d;
  })
  // Rotate text Using CSS
	.attr('transform', function(d,i) {
  	var translate = [(barWidth*i + xPadding) + (barWidth/2) ,svgHeight - svgScaleY(d) - yPadding + 10];
  	return "translate("+translate+")"
  })
	.attr("style", "writing-mode: tb; glyph-orientation-vertical: 0")
	// Rotate text using double rotate
	/*.attr('transform', function(d,i) {
  	var translate = [(barWidth*i + xPadding - 5) + (barWidth/2) ,svgHeight - svgScaleY(d)];
  	return "translate("+translate+") rotate(90)"
  })
	.attr("rotate", -90)
	.attr("letter-spacing", "0.5em")*/;

svg.append('g')
	.attr('transform',function(d,i) {
  	var translate = [xPadding,yPadding];
  	return "translate("+translate+")"
  })
	.call(yAxis);

var xAxisEle = svg.append('g')
	.attr('transform',function(d,i) {
  	var translate = [xPadding,svgHeight - yPadding];
  	return "translate("+translate+")"
  })
	.call(xAxis);

xAxisEle.select("text")
	.remove();

xAxisEle.selectAll("text")
	.attr('transform', function(d,i) {
		var translate = [-barWidth/2,0];
  	return "translate("+translate+")";
	})
	.attr('fill','red');

