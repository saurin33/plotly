function getDemoInfo(id) {
  d3.json("samples.json").then(data => {
    var metadata = data.metadata;

    console.log(metadata);

    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    var demographicInfo = d3.select("#sample-metadata");

    demographicInfo.html("");

    Object.entries(result).forEach(key => {
      demographicInfo
        .append("h5")
        .text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
  });
}
function getPlots(id) {
  d3.json("samples.json").then(data => {
    console.log(data);
    var ids = data.samples[0].otu_ids;
    console.log(ids);
    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    console.log(sampleValues);
    var labels = data.samples[0].otu_labels.slice(0, 10);
    console.log(labels);

    var OTU_top = data.samples[0].otu_ids.slice(0, 10).reverse();

    var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`);
    var labels = data.samples[0].otu_labels.slice(0, 10);
    console.log(`OTU_labels: ${labels}`);
    var tracebar = {
      x: sampleValues,
      y: OTU_id,
      text: labels,
      marker: {
        color: "Rainbow"
      },
      type: "bar",
      orientation: "h"
    };
    // create data variable
    var bardata = [tracebar];

    var layoutbar = {
      title: "Top 10 OTU",
      yaxis: {
        tickmode: "linear"
      },
      margin: { l: 100, r: 100, t: 100, b: 30 }
    };

    // create the bar plot
    Plotly.newPlot("bar", bardata, layoutbar);
    // The bubble chart
    var tracebub = {
      x: data.samples[0].otu_ids,
      y: data.samples[0].sample_values,
      mode: "markers",
      marker: {
        size: data.samples[0].sample_values,
        color: data.samples[0].otu_ids
      },
      text: data.samples[0].otu_labels
    };

    // set the layout for the bubble plot
    var layoutbub = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000
    };

    // creating data variable
    var databub = [tracebub];

    Plotly.newPlot("bubble", databub, layoutbub);
  });
}

function optionChanged(id) {
  getPlots(id);
  getDemoInfo(id);
}

// create the function for the initial data rendering
function init() {
  var dropdown = d3.select("#selDataset");

  d3.json("samples.json").then(data => {
    console.log(data);

    data.names.forEach(function(name) {
      dropdown
        .append("option")
        .text(name)
        .property("value");
    });

    getPlots(data.names[0]);
    getDemoInfo(data.names[0]);
  });
}

init();
