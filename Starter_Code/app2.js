function getDemoInfo(id) {
  // read the json file to get data
  d3.json("samples.json").then(data => {
    // get the metadata info for the demographic panel
    var metadata = data.metadata;

    console.log(metadata);

    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    var demographicInfo = d3.select("#sample-metadata");

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
  d3.json("samples.json").then(data => {
    let otu_ids = data.samples[0].otu_ids;
    console.log(otu_ids);
    let otu_labels = data.samples[0].otu_labels.slice(0, 10);
    console.log(otu_labels);
    let sample_values = data.samples[0].sample_values.slice(0, 10).reverse();
    // Top ten otu for the plot
    var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`);
    var labels = bellydata.samples[0].otu_labels.slice(0, 10);
    console.log(`OTU_labels: ${labels}`);
    var tracebar = {
      x: sampleValues,
      y: OTU_id,
      text: labels,
      marker: {
        color: "green"
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
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
      }
    };

    // create bar plot
    Plotly.newPlot("bar", bardata, layoutbar);

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
      xaxis: { title: "OTU ID" },
      showlegend: false,
      height: 600,
      width: 1000
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);
  });
}
function optionChanged(id) {
  getPlots(id);
  getDemoInfo(id);
}
// create the function for the initial data rendering
function init() {
  var selector = d3.select("#selDataset");

  // Read the data
  d3.json("samples.json").then(data => {
    console.log(data);

    data.names.forEach(function(name) {
      selector
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

//     let pie_chart = {
//       labels: otu_ids.slice(0, 10),
//       values: sample_values.slice(0, 10),
//       hovertext: otu_labels.slice(0, 10),
//       type: "pie"
//     };

//     let pie_layout = {
//       height: 500,
//       width: 600
//     };

//     // console.log(data);

//     Plotly.newPlot("pie", pie_chart, pie_layout);
//   });
// }
