const movieData = [
    { name: "American", value: 49, number: 17377 },
    { name: "South Asian", value: 26, number: 9007 },
    { name: "British", value: 10, number: 3670 },
    { name: "Japanese", value: 3, number: 1188 },
    { name: "Hong Kong", value: 2, number: 791 },
    { name: "Canadian", value: 2, number: 723 },
    { name: "Australian", value: 1, number: 576 },
    { name: "South Korean", value: 1, number: 522 },
    { name: "Chinese", value: 1, number: 463 },
  ];
  bakeDonut(movieData);
  
  const movieData2 = [
    { name: "1910s", value: 1, number: 283 },
    { name: "1900s", value: 1, number: 6694 },
    { name: "1920s", value: 2, number: 671 },
    { name: "1930s", value: 7, number: 2310 },
    { name: "1940s", value: 8, number: 2919 },
    { name: "1950s", value: 10, number: 3414 },
    { name: "1960s", value: 7, number: 2497 },
    { name: "1970s", value: 7, number: 2519 },
    { name: "1980s", value: 9, number: 3219 },
    { name: "1990s", value: 13, number: 4468 },
    { name: "2000s", value: 17, number: 5866 },
    { name: "2010s", value: 19, number: 6694 }
  ];
  bakeDonut2(movieData2);

  const movieData3 = [
    { name: "Unknown", value: 17, number: 6083 },
    { name: "Drama", value: 17, number: 5991 },
    { name: "Comedy", value: 13, number: 4398 },
    { name: "Horror", value: 3, number: 1172 },
    { name: "Action", value: 3, number: 1119 },
    { name: "Thriller", value: 4, number: 984 },
    { name: "Romance", value: 3, number: 940},
    { name: "Western", value: 2, number: 865},
    { name: "Crime", value: 2, number: 568 },
    { name: "Adventure", value: 2, number: 527 },
    { name: "Musical", value: 1, number: 467 },
    { name: "Science Fiction", value: 1, number: 418}
  ];
  bakeDonut3(movieData3);
  
  function bakeDonut(d) {
    let activeSegment;
    const data = d.sort((a, b) => b["value"] - a["value"]),
      viewWidth = 650,
      viewHeight = 450,
      svgWidth = viewHeight,
      svgHeight = viewHeight,
      thickness = 70,
      el = d3.select(".donut-chart"),
      radius = Math.min(svgWidth, svgHeight) / 2,
      color = d3
        .scaleOrdinal()
        .range([
          "#0a9396",
          "#e9d8a6",
          "#dbc170",
          "#cca633",
          "#ee9b00",
          "#ca6702",
          "#bb3e03",
          "#ae2012",
          "#8a190f",
          "#61051c",
        ]);
  
    const max = d3.max(data, maxData => maxData.value);
  
    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
  
    const arcHover = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius + 20);
  
    const pie = d3
      .pie()
      .value(function(pieData) {
        return pieData.value;
      })
      .sort(null);
  
    // Selecting the div with class "graph" and creating the svg
    const svg = el
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
      .attr("class", "pie")
      .attr("width", viewWidth)
      .attr("height", viewHeight);
  
    // append 'g' element to the svg element
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate( ${svgWidth / 2 + thickness / 2}, ${svgHeight / 2 +
          thickness / 2})`
      );
  
    // Creating the donut chart
    const path = g
      .selectAll("path")
      .attr("class", "data-path")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice")
      .attr("role", "listitem")
      .attr("class", "data-group")
      .style("fill", "white")
      .each(function(pathData, i) {
        const group = d3.select(this);
  
        group
          .append("text")
          .text(`${pathData.data.value}% of Movies`)
          .attr("class", "donut-text donut-text-hours")
          .attr("text-anchor", "middle")

        group
          .append("text")
          .text(`${pathData.data.number} out of 34,866 films`)
          .attr("class", "donut-text donut-text-numbers")
          .attr("text-anchor", "middle")
          .attr("dy", "4rem")
  
        group
          .append("text")
          .text(`${pathData.data.name}`)
          .attr("class", "donut-text donut-text-category")
          .attr("text-anchor", "middle")
          .style("fill", "white")
          .attr("dy", "2rem");
        
  
        // Set default active segment
        if (pathData.value === max) {
          const textVal = d3
            .select(this)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);

          const textNum = d3
            .select(this)
            .select(".donut-text-numbers")
            .classed("donut-text--show", true);
  
          const textName = d3
            .select(this)
            .select(".donut-text-category")
            .classed("donut-text--show", true);
        }
      })
      .append("path")
      .attr("d", arc)
      .attr("aria-label", function(d, i) {
        return d.data.category + " require " + d.data.value + " " + "Hours";
      })
      .attr("focusable", "true")
      .attr("tabindex", "0")
      .attr("fill", (fillData, i) => color(fillData.data.name))
      .attr("class", "data-path")
      .on("mouseover", function() {
        const _thisPath = this,
          parentNode = _thisPath.parentNode;
  
        if (_thisPath !== activeSegment) {
          activeSegment = _thisPath;
  
          const dataTexts = d3
            .selectAll(".donut-text")
            .classed("donut-text--show", false);
  
          const paths = d3
            .selectAll(".data-path")
            .transition()
            .duration(250)
            .attr("d", arc);
  
          d3
            .select(_thisPath)
            .transition()
            .duration(250)
            .attr("d", arcHover);
  
          const thisDataNum = d3
            .select(parentNode)
            .select(".donut-text-numbers")
            .classed("donut-text--show", true);
          const thisDataValue = d3
            .select(parentNode)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);
          const thisDataText = d3
            .select(parentNode)
            .select(".donut-text-category")
            .classed("donut-text--show", true);
        }
      })
      .each(function(v, i) {
        if (v.value === max) {
          const maxArc = d3.select(this).attr("d", arcHover);
          activeSegment = this;
        }
        this._current = i;
      });
  
    //legend
    const legendRectSize = 18;
    const legendSpacing = 13;
  
    const legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(legendData, i) {
        const itemHeight = legendRectSize + legendSpacing;
        const offset = legendRectSize * color.domain().length;
        const horz = svgWidth + 150;
        const vert = i * itemHeight + legendRectSize + (svgHeight - offset) / 2.2;
        return `translate(${horz}, ${vert})`;
      });
  
    legend
      .append("circle")
      .attr("r", legendRectSize / 2)
      .style("fill", color);
  
    legend
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .attr("class", "legend-text")
      .text(legendData => legendData)
      .style("fill", "white");
  }
  
  /*bakeDonut2 */ 
  function bakeDonut2(d) {
    let activeSegment;
    const data = d.sort((a, b) => b["value"] - a["value"]),
      viewWidth = 650,
      viewHeight = 450,
      svgWidth = viewHeight,
      svgHeight = viewHeight,
      thickness = 70,
      el = d3.select(".donut-chart-2"),
      radius = Math.min(svgWidth, svgHeight) / 2,
      color = d3
        .scaleOrdinal()
        .range([
          "#ffe1a8",
          "#f5bea3",
          "#f2ae8c",
          "#f1a782",
          "#e47867",
          "#e26d5c",
          "#c86051",
          "#aa5551",
          "#723d46",
          "#5d353b",
          "#512f34",
          "#472d30",
        ]);
  
    const max = d3.max(data, maxData => maxData.value);
  
    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
  
    const arcHover = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius + 20);
  
    const pie = d3
      .pie()
      .value(function(pieData) {
        return pieData.value;
      })
      .sort(null);
  
    // Selecting the div with class "graph" and creating the svg
    const svg = el
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
      .attr("class", "pie")
      .attr("width", viewWidth)
      .attr("height", viewHeight);
  
    // append 'g' element to the svg element
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate( ${svgWidth / 2 + thickness / 2}, ${svgHeight / 2 +
          thickness / 2})`
      );
  
    // Creating the donut chart
    const path = g
      .selectAll("path")
      .attr("class", "data-path")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice")
      .attr("role", "listitem")
      .attr("class", "data-group")
      .style("fill", "white")
      .each(function(pathData, i) {
        const group = d3.select(this);
  
        group
          .append("text")
          .text(`${pathData.data.value}% of Movies`)
          .attr("class", "donut-text donut-text-hours")
          .attr("text-anchor", "middle")

        group
          .append("text")
          .text(`${pathData.data.number} out of 34,866 films`)
          .attr("class", "donut-text donut-text-numbers")
          .attr("text-anchor", "middle")
          .attr("dy", "4rem")
  
        group
          .append("text")
          .text(`${pathData.data.name}`)
          .attr("class", "donut-text donut-text-category")
          .attr("text-anchor", "middle")
          .attr("dy", "2rem");
        
  
        // Set default active segment
        if (pathData.value === max) {
          const textVal = d3
            .select(this)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);

          const textNum = d3
            .select(this)
            .select(".donut-text-numbers")
            .classed("donut-text--show", false);

          const textName = d3
            .select(this)
            .select(".donut-text-category")
            .classed("donut-text--show", true);
        }
      })
      .append("path")
      .attr("d", arc)
      .attr("aria-label", function(d, i) {
        return d.data.category + " require " + d.data.value + " " + "Hours";
      })
      .attr("focusable", "true")
      .attr("tabindex", "0")
      .attr("fill", (fillData, i) => color(fillData.data.name))
      .attr("class", "data-path")
      .on("mouseover", function() {
        const _thisPath = this,
          parentNode = _thisPath.parentNode;
  
        if (_thisPath !== activeSegment) {
          activeSegment = _thisPath;
  
          const dataTexts = d3
            .selectAll(".donut-text")
            .classed("donut-text--show", false);
  
          const paths = d3
            .selectAll(".data-path")
            .transition()
            .duration(250)
            .attr("d", arc);
  
          d3
            .select(_thisPath)
            .transition()
            .duration(250)
            .attr("d", arcHover);
  
          const thisDataValue = d3
            .select(parentNode)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);

          const thisDataText = d3
            .select(parentNode)
            .select(".donut-text-category")
            .classed("donut-text--show", true);

          const thisDataNum = d3
            .select(parentNode)
            .select(".donut-text-numbers")
            .classed("donut-text--show", true);
        }
      })
      .each(function(v, i) {
        if (v.value === max) {
          const maxArc = d3.select(this).attr("d", arcHover);
          activeSegment = this;
        }
        this._current = i;
      });
  
    //legend
    const legendRectSize = 18;
    const legendSpacing = 13;
  
    const legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(legendData, i) {
        const itemHeight = legendRectSize + legendSpacing;
        const offset = legendRectSize * color.domain().length;
        const horz = svgWidth + 150;
        const vert = i * itemHeight + legendRectSize + (svgHeight - offset) / 2.2;
        return `translate(${horz}, ${vert})`;
      });
  
    legend
      .append("circle")
      .attr("r", legendRectSize / 2)
      .style("fill", color);
  
    legend
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .attr("class", "legend-text")
      .text(legendData => legendData)
      .style("fill", "white");
  }

  /*bakeDonut3 */ 
  function bakeDonut3(d) {
    let activeSegment;
    const data = d.sort((a, b) => b["value"] - a["value"]),
      viewWidth = 650,
      viewHeight = 450,
      svgWidth = viewHeight,
      svgHeight = viewHeight,
      thickness = 70,
      el = d3.select(".donut-chart-3"),
      radius = Math.min(svgWidth, svgHeight) / 2,
      color = d3
        .scaleOrdinal()
        .range([
          "#B0B0B0",
          "#421f7a",
          "#632eb8",
          "#4f51c9",
          "#5e60ce",
          "#4ea8de",
          "#48bfe3",
          "#56cfe1",
          "#64dfdf",
          "#72efdd",
          "#80ffdb",
          "#b3ffe9",
        ]);
  
    const max = d3.max(data, maxData => maxData.value);
  
    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
  
    const arcHover = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius + 20);
  
    const pie = d3
      .pie()
      .value(function(pieData) {
        return pieData.value;
      })
      .sort(null);
  
    // Selecting the div with class "graph" and creating the svg
    const svg = el
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
      .attr("class", "pie")
      .attr("width", viewWidth)
      .attr("height", viewHeight);
  
    // append 'g' element to the svg element
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate( ${svgWidth / 2 + thickness / 2}, ${svgHeight / 2 +
          thickness / 2})`
      );
  
    // Creating the donut chart
    const path = g
      .selectAll("path")
      .attr("class", "data-path")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice")
      .attr("role", "listitem")
      .attr("class", "data-group")
      .style("fill", "white")
      .each(function(pathData, i) {
        const group = d3.select(this);
  
        group
          .append("text")
          .text(`${pathData.data.value}% of Movies`)
          .attr("class", "donut-text donut-text-hours")
          .attr("text-anchor", "middle")

        group
          .append("text")
          .text(`${pathData.data.number} out of 34,866 films`)
          .attr("class", "donut-text donut-text-numbers")
          .attr("text-anchor", "middle")
          .attr("dy", "4rem")
  
        group
          .append("text")
          .text(`${pathData.data.name}`)
          .attr("class", "donut-text donut-text-category")
          .attr("text-anchor", "middle")
          .attr("dy", "2rem");
        
  
        // Set default active segment
        if (pathData.value === max) {
          const textVal = d3
            .select(this)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);

          const textNum = d3
            .select(this)
            .select(".donut-text-numbers")
            .classed("donut-text--show", false);

          const textName = d3
            .select(this)
            .select(".donut-text-category")
            .classed("donut-text--show", true);
        }
      })
      .append("path")
      .attr("d", arc)
      .attr("aria-label", function(d, i) {
        return d.data.category + " require " + d.data.value + " " + "Hours";
      })
      .attr("focusable", "true")
      .attr("tabindex", "0")
      .attr("fill", (fillData, i) => color(fillData.data.name))
      .attr("class", "data-path")
      .on("mouseover", function() {
        const _thisPath = this,
          parentNode = _thisPath.parentNode;
  
        if (_thisPath !== activeSegment) {
          activeSegment = _thisPath;
  
          const dataTexts = d3
            .selectAll(".donut-text")
            .classed("donut-text--show", false);
  
          const paths = d3
            .selectAll(".data-path")
            .transition()
            .duration(250)
            .attr("d", arc);
  
          d3
            .select(_thisPath)
            .transition()
            .duration(250)
            .attr("d", arcHover);
  
          const thisDataValue = d3
            .select(parentNode)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);

          const thisDataText = d3
            .select(parentNode)
            .select(".donut-text-category")
            .classed("donut-text--show", true);

          const thisDataNum = d3
            .select(parentNode)
            .select(".donut-text-numbers")
            .classed("donut-text--show", true);
        }
      })
      .each(function(v, i) {
        if (v.value === max) {
          const maxArc = d3.select(this).attr("d", arcHover);
          activeSegment = this;
        }
        this._current = i;
      });
  
    //legend
    const legendRectSize = 18;
    const legendSpacing = 13;
  
    const legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(legendData, i) {
        const itemHeight = legendRectSize + legendSpacing;
        const offset = legendRectSize * color.domain().length;
        const horz = svgWidth + 150;
        const vert = i * itemHeight + legendRectSize + (svgHeight - offset) / 2.2;
        return `translate(${horz}, ${vert})`;
      });
  
    legend
      .append("circle")
      .attr("r", legendRectSize / 2)
      .style("fill", color);
  
    legend
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .attr("class", "legend-text")
      .text(legendData => legendData)
      .style("fill", "white");
  }
  