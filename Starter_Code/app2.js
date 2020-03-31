function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then(data => {
    var sample_data = d3.select("#sample-metadata");

    sample_data.html("");

    Object.entries(data).forEach(function([key, value]) {
      sample_data.append("h6").text("${key}:${value}");
    });
  });
}

function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then(data => {
    let otu_ids = data.otu_ids;
    let otu_labels = data.otu_labels;
    let sample_values = data.sample_values;

    let bubble_chart = {
      mode: "markers",
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      marker: { color: otu_ids, colorscale: "Rainbow", size: sample_values }
    };

    let bubble_data = [bubble_chart];

    let bubble_layout = {
      title: "Bacteria Type and Counts",
      showlegend: false,
      height: 600,
      width: 1000
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);

    let pie_chart = {
      labels: otu_ids.slice(0, 10),
      values: sample_values.slice(0, 10),
      hovertext: otu_labels.slice(0, 10),
      type: "pie"
    };

    let pie_layout = {
      height: 500,
      width: 600
    };

    // console.log(data);

    Plotly.newPlot("pie", pie_chart, pie_layout);
  });
}

function init() {
  var selector = d3.select("#selDataset");

  d3.json("/Names").then(sampleNames => {
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = samples[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
