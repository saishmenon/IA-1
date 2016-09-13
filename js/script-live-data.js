var barData = [];

d3.json('http://mysafeinfo.com/api/data?list=worldcitiesbypop_2015&format=json', function(data){
//      console.log(data.length);  
    for(var i=0; i<data.length; i++){
        barData.push(data[i].pop);
    }
    
    console.log(barData[0]);
    
    var margin = {
      top: 30,
      right: 30,
      bottom: 40,
      left: 50
    }

    var height = 400 - margin.top - margin.bottom,
        width = 1200 - margin.left - margin.right,
        barWidth = 50,
        barOffset = 5;

    var colorScale = d3.scaleLinear()
                    .domain([0, barData.length*.33, barData.length*.66, barData.length ])
                    .range(['#2F88A7', '#34495E', '#F1C40F', '#E74C3C']);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(barData)])
                    .range([0, height]);

    var xScale = d3.scaleBand()
                    .domain(d3.range(0, barData.length))
                    .range([0, width]);

    var tooltip = d3.select('body').append('div')
                    .style('position', 'absolute')
                    .style('padding', '0 10px')
                    .style('background', 'white')
                    .style('opacity', 0);

    var visualChart = d3.select('#content')
        .style('background', '#e7e0ce')
        .append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        .append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.right +')')
        .selectAll('rect').data(barData)
        .enter().append('rect')
            .style('fill', function(d,i){
                return colorScale(i);
            })
            .attr('width', xScale.bandwidth())
            .attr('x', function(d,i){
                return xScale(i);
            })
            .attr('height', 0)
            .attr('y', height)
        .on('mouseover', function(d){

            tooltip.transition()
                .style('opacity', .9)

            tooltip.html(d)
                .style('left', (d3.event.pageX - 35) + 'px')
                .style('top',(d3.event.pageY - 30) + 'px')

            d3.select(this)
                .style('opacity', 0.4)
        })
        .on('mouseout', function(d){

            tooltip.transition()
                .style('opacity', 0)

            d3.select(this)
                .style('opacity', 1)
        })

    visualChart.transition()
        .attr('height', function(d){
                return yScale(d)
            })
        .attr('y', function(d){
                return height - yScale(d);
            })
        .delay(function(d,i){
            return i * 10;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)

    var vGuideScale = d3.scaleLinear()
                .domain([0, d3.max(barData)])
                .range([height, 0]);

    var vAxis = d3.axisLeft(vGuideScale)
                .ticks(10);

    var vGuide = d3.select('svg').append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
        vGuide.selectAll('path')
            .style('fill', 'none')
            .style('stroke', '#000')
        vGuide.selectAll('line')
            .style('stroke', '#000')

    var hAxis = d3.axisBottom(xScale)
                .tickValues(xScale.domain().filter(function(d, i){
                    return !(i % (barData.length/5));
                }));

    var hGuide = d3.select('svg').append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate('+ margin.left +', '+ (height + margin.top) +')')
        hGuide.selectAll('path')
            .style('fill', 'none')
            .style('stroke', '#000')
        hGuide.selectAll('line')
            .style('stroke', '#000')
});