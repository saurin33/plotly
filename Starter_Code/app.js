function getDemoInfo(id) {
  d3.json("samples.json").then(data => {
    // get the metadata info for the demographic panel
    var metadata = data.metadata;

    console.log(metadata);

    // filter meta data info by id
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
    // select demographic panel to put data
    var demographicInfo = d3.select("#sample-metadata");

    // empty the demographic info panel each time before getting new id info
    demographicInfo.html("");

    // grab the necessary demographic data data for the id and append the info to the panel
    Object.entries(result).forEach(key => {
      demographicInfo
        .append("h5")
        .text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
  });
}
function getPlots(id) {
  //read json
  d3.json("samples.json").then(bellydata => {
    console.log(bellydata);
    var ids = bellydata.samples[0].otu_ids;
    console.log(ids);
    var sampleValues = bellydata.samples[0].sample_values
      .slice(0, 10)
      .reverse();
    console.log(sampleValues);
    var labels = bellydata.samples[0].otu_labels.slice(0, 10);
    console.log(labels);
    // top 10 otu ids and reversing it
    var OTU_top = bellydata.samples[0].otu_ids.slice(0, 10).reverse();
    // get the otu id's for the plot
    var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`);
    var labels = bellydata.samples[0].otu_labels.slice(0, 10);
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

    // create layout variable to set plots layout
    var layoutbar = {
      title: "Top 10 OTU",
      yaxis: {
        tickmode: "linear"
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
      }
    };

    // create the bar plot
    Plotly.newPlot("bar", bardata, layoutbar);
    // The bubble chart
    var tracebub = {
      x: bellydata.samples[0].otu_ids,
      y: bellydata.samples[0].sample_values,
      mode: "markers",
      marker: {
        size: bellydata.samples[0].sample_values,
        color: bellydata.samples[0].otu_ids
      },
      text: bellydata.samples[0].otu_labels
    };

    // set the layout for the bubble plot
    var layoutbub = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000
    };

    // creating data variable
    var databub = [tracebub];

    // create the bubble plot
    Plotly.newPlot("bubble", databub, layoutbub);
  });
}
// create the function to get the necessary data

// create the function for the change event
function optionChanged(id) {
  getPlots(id);
  getDemoInfo(id);
}

// create the function for the initial data rendering
function init() {
  // select dropdown menu
  var dropdown = d3.select("#selDataset");

  // read the data
  d3.json("samples.json").then(data => {
    console.log(data);

    // get the id data to the dropdwown menu
    data.names.forEach(function(name) {
      dropdown
        .append("option")
        .text(name)
        .property("value");
    });

    // call the functions to display the data and the plots to the page
    getPlots(data.names[0]);
    getDemoInfo(data.names[0]);
  });
}

init();
