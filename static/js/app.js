// read in data
let data_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//initial make functions
let addToDropdown = (arr, dropdown) => {
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

let updateHBar = (sample) => {
  let h_sample = sample.sample_values.slice(0,10).reverse();
  let h_otu = sample.otu_ids.slice(0,10).reverse();
  let h_otuName = sample.otu_labels.slice(0,10).reverse();

  Plotly.restyle("bar", {x: h_sample, y: h_otu, text: h_otuName})
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

let clearDemoTable = (meta_table) => {
  meta_table.text("")
}

// initial table population
d3.json(data_url).then((data) => {
  let dropdown = d3.select("#selDataset")

  // add vals to dropdown
  addToDropdown(data.names, dropdown);

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

// upate plots when new sample is selected
let updatePlotly = () => {
  d3.json(data_url).then((data) => {
    let dropdown = d3.select('#selDataset')
    let val = dropdown.property("value")
    let index = data.names.indexOf(val)
    
    console.log(index);
    console.log(data.metadata[index]);
    console.log(data.samples[index]);

    //update demo table
    let meta_table = d3.select("#sample-metadata")
    clearDemoTable(meta_table);
    makeDemoTable(meta_table,
                Object.entries(data.metadata[index]))

    //update gauge
    makeGauge(data.metadata[index]['wfreq']);
    //TODO: change from make new table to restyle
    
    //update hbar chart
    makeHBar(data.samples[index])
    // updateHBar(data.samples[index])
    //TODO: change from make new table to restyle
    
    //update bubble chart
    makeBubble(data.samples[index])
    //TODO: change from make new table to restyle
  })
}

d3.selectAll("#selDataset").on("change", updatePlotly);
