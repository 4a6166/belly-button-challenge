// read in data
let data_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let dropdown = d3.select('#selDataset')

//initial make functions
let addToDropdown = (arr) => {
  for( n of arr){
    dropdown.append("option")
      .text(n)
      .property("value", n);
  }
}

let makeHBar = (sample) => {
  let h_sample = sample.sample_values.slice(0,10).reverse();
  let h_otu = sample.otu_ids.slice(0,10).reverse();
  let h_otuName = sample.otu_labels.slice(0,10).reverse();

  let data_hbar = [{
    x: h_sample,
    y: h_otu.map(s => `OTU ${s}`),
    text: h_otuName,
    type: "bar",
    orientation: "h"
  }]

  layout_hbar = {
    title: "Top 10 OTUs",
    margine: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  Plotly.newPlot("bar", data_hbar, layout_hbar)
}

let makeBubble = (sample) => {
  let data_bub = [{
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: 'markers',
    marker: {
      size: sample.sample_values,
      color: sample.otu_ids.map(o => o*15)
    }
  }];

  let layout_bub = {
    title: "",
    showlegend: false,
    height: 600,
    width: 1000,
  };
  
  Plotly.newPlot("bubble", data_bub, layout_bub)
}

let makeDemoTable = (meta_table,  metadata) => {
  for(l of metadata){
    let tr = meta_table.append("div");
    tr.text(`${l[0]}: ${l[1]}\n`);
  }
}

d3.json(data_url).then((data) => {
  // add vals to dropdown
  addToDropdown(data.names);

  // set initial index to zeo for first load
  let index = 0;
  
  // create gauge (bonus)
  makeGauge(data.metadata[index]['wfreq']);

  // // creater horizontal bar chart with dropdown menu to display top 10 OTUs
  makeHBar(data.samples[index]);
 
  // // create bubble chart that displays each sample
  makeBubble(data.samples[index]);

  // // display sample metadata (demographic information)
  makeDemoTable(d3.select("#sample-metadata"),
                Object.entries(data.metadata[index]))
})

// // upate plots when new sample is selected
let updatePlotly = () => {
  let index = dropdown.property("value")
  console.log(`New entry index: ${index}`)

  makeDemoTable(
}

dropdown.on("change", updatePlotly);
