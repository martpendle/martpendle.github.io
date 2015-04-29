$(document).ready(function () {

    $('#menu').on('click', 'a', function (e) {
        e.preventDefault();
        $(this).toggleClass('clicked');
    });


    /*d3.select('body').append('p').text('New Paragraph');*/

    //var dataset = [5,10,15,20,24];

    /*d3.select('body').selectAll('p')
     .data(dataset)
     .enter()
     .append('p')
     .text(function(d) {return "D3 has put " +  d + " on the page!"})
     .style('color' , function(d) {
     if (d > 15) {
     return 'red';
     } else {
     return 'black';
     }
     });*/

    var dataset = [];

    for (var i = 0; i < 25; i++){
        var newNumber = Math.round(Math.random() * 30);
        dataset.push(newNumber);
    }

    var circleData = [5,10,15,20,25]

    /*d3.select('#barchart').selectAll('div')
        .data(dataset)
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style('height', function(d){
            var barHeight = d * 5;
            return barHeight + 'px';
        });*/

    //Circles

    var svg  = d3.select('body').append('svg');

    var w = 500;

    var h = 50;

    svg.attr('width', w)
       .attr('height',h);

    var circles = svg.selectAll('circle')
                        .data(circleData)
                        .enter()
                        .append('circle')

    circles.attr('cx', function (d, i){
                    return (i * 50) + 28;
            })
           .attr('cy', h/2)
           .attr('r', function(d){
            return d;
            })
        .attr('fill', 'yellow')
        .attr('stroke', 'orange')
        .attr('stroke-width',function(d) {
            return d / 2;
        })


    //Bars

    var barData = [5,10,13,19,21,25,22,18,15,13,11,12,15,20,18,17,16,18,23,25]

    var barW = 500;
    var barH = 200;
    var barPadding = 1;

    var barSvg = d3.select('body')
                    .append('svg')
                    .attr('width',barW)
                    .attr('height', barH)

    barSvg.selectAll('rect')
        .data(barData)
        .enter()
        .append('rect')
        .attr('x',function(d,i){
            return i * (barW / barData.length);
        })
        .attr('y',function(d){
            return barH - (d * 4);
        })
        .attr('width', barW / barData.length - barPadding)
        .attr('height',function(d){
            return d * 4;
        })
        .attr('fill', function(d){
            return 'rgb(0,0, ' + (d * 10) + ')';
        });

    barSvg.selectAll('text')
        .data(barData)
        .enter()
        .append('text')
        .text(function(d){
            return d;
        })
        .attr('x',function(d,i){
            return i * (barW / barData.length) + (barW / barData.length - barPadding) /2;
        })
        .attr('y',function(d){
            return barH - (d * 4) + 14;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size','11px')
        .attr('fill','white')
        .attr('text-anchor','middle')


    //ScatterPlot
     /*var scatterData = [
                        [5,20],[80,90],[250,50],[100,33],[330,95],[410,12],[475,44],[25,67],[85,21],[220,88], [600,150]
                       ];
    */

    var scatterData = [];
    var numDataPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++){
        var newNumber1 = Math.floor(Math.random() * xRange);
        var newNumber2 = Math.floor(Math.random() * yRange);
        scatterData.push([newNumber1, newNumber2])
    }

    var scatterW = 500;
    var scatterH = 300;

    var scatterPadding = 30;

    var scatterXScale = d3.scale.linear()
        .domain([0, d3.max(scatterData, function(d) {return d[0];})])
        .range([scatterPadding, scatterW - scatterPadding * 2]);

    var scatterYScale =  d3.scale.linear()
        .domain([0, d3.max(scatterData, function(d) {return d[1];})])
        .range([scatterH - scatterPadding, scatterPadding]);

    var scatterRScale = d3.scale.linear()
        .domain([0, d3.max(scatterData, function(d) {return d[1];})])
        .range([2,5]);

    var scatterXAxis = d3.svg.axis()
                            .scale(scatterXScale)
                            .orient('bottom')
                            .ticks(5);

    var scatterYAxis = d3.svg.axis()
                            .scale(scatterYScale)
                            .orient('left')
                            .ticks(5);

    var scatterSvg = d3.select('body')
        .append('svg')
        .attr('width',scatterW)
        .attr('height',scatterH);

    scatterSvg.selectAll('circle')
                .data(scatterData)
                .enter()
                .append('circle')
        .attr('cx', function(d){
            return scatterXScale(d[0]);
        })
        .attr('cy', function(d){
            return  scatterYScale(d[1]);
        })
        //When setting size of circles, set the area not the radius as this distorts the visuals
        .attr('r', function(d){
            return scatterRScale (d[1]);
        });

    /*scatterSvg.selectAll('text')
        .data(scatterData)
        .enter()
        .append('text')
        .text(function(d){
            return d[0] + "," + d[1];
        })
        .attr('x', function(d){
            return scatterXScale(d[0]);
        })
        .attr('y', function(d){
            return scatterYScale(d[1]);
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size','11px')
        .attr('fill','red')*/

    scatterSvg.append('g')
                .attr('class', 'axis')
                .attr('transform','translate(0,' + (scatterH - scatterPadding) + ')')
                .call(scatterXAxis);

    scatterSvg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(' + scatterPadding + ',0)')
        .call(scatterYAxis);
});







