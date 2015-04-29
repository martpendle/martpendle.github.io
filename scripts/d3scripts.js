window.onload = function runD3code() {
    var svg = d3.select("body").append("svg").attr({
        width:500,
        height:500
    });

    var data = [1,5,2,4,3];

   var heightScale = d3.scale.linear() //y = mx + b
       .domain ([d3.min(data),d3.max(data)])
       .range([0,500 - 40]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr({
            width:100,
            height: heightScale,
            x: function (d,i) {return i * 101;},
            y:20

        });

}

