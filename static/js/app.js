// read in data
let data_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let dropdown = d3.select('#selDataset')

let d;
d3.json(data_url).then((data) => {
  d= data; //TODO: remove after testing

  // add vals to dropdown
  for( n of data.names){
    dropdown.append("option")
      .text(n)
      .property("value", n);
  }

  let index = 0;
  // index = dropdown.property("value")
  let sample = data.samples[index], 
      metadata = data.metadata[index];

  console.log(sample)

  // // creater horizontal bar chart with dropdown menu to display top 10 OTUs
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
  // // create bubble chart that displays each sample
  
  // // display sample metadata (demographic information)
  
  // // display each key-value pair from the metadata

})

// // upate plots when new sample is selected
