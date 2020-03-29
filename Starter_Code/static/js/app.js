function buildMetadata(sample) {
    const metadataURL = `/metadata/${sample}`;
    d3.json(metadataURL).then(data => {
        sample_metadata = d3.select
        ("#sample-metadata");
        sample_metadata.html("");

        Object.defineProperties(data).for each(([key, value]) => {
            sample_metadata.append("p").text(`${key}: ${value}`);
        });
    });

}

function buildCharts(sample) {
    const sampleDataURL = `/samples/${sample}`;
    d3.json(sampleDataURL).then(data => {
        results = [];
        for (var i = 0; i<data.otu_ids.length; i++){
            results.push({
                otu_ids:data.otu_ids[i],
                otu_labels: data.otu_labels[i],
                sample_values: data.sample_values[i]
            });
        }
        results.sort((a, b))=>b.sample_values - a.sample_values);
        results = results.slice(0, 10);
        console.log(results);

        var trace1 = {
            values: results.map(row => row.sample_values),
            labels: results.map(row => row.otu_ids),
            hovertext: results.map(row => row.otu_labels),
            hoverinfo: "hovertext", 
            type: "pie"
        };
        var piechart = [trace1];
        plotly.newPlot("pie", pieChart);

        var trace2 = {
            x: data.otu_ids,
            y: data.sample_values,
            type: "scatter",
            mode: "markers",
            marker: {
                size: data.sample_values,
                color: data.otu_ids
            },
            text: data.otu_labels
        };
        var bubblechart = [trace2];
        Plotly.newPlot("bubble", bubblechart);
    });
}

function init(){
    var selector = d3.select("#selDataset");


d3.jason("/names").then(sampleNames => {
    sampleNames.forEach(sample => {
        selector
        .append("option")
        .text(sample)
        .property("value", samle);
    });
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
});
}
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

init();