let makeGauge = (value) => {

  // make gauge
  let data = [ {
      domain: { x: [0, 1], y: [0, 1] },
      value: value,
      title: { text: "Belly Button Washing Frequency<br><sup>Scrubs Per Week</sup>", 
               font: { size: 24 } },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        // set gauge bar to not appear
        bar: {
          line: {
            width: 0
          },
          thickness: 0
        },

        //set range for guage
        axis: { range: [null, 9] },

        // set range and colors for steps
        steps: [
          { range: [0, 1], color: "#F8F3EB" },
          { range: [1, 2], color: "#F4F1E4" },
          { range: [2, 3], color: "#E9E6C9" },
          { range: [3, 4], color: "#E5E8B0" },
          { range: [4, 5], color: "#D5E599" },
          { range: [5, 6], color: "#B6CD8F" },
          { range: [6, 7], color: "#8AC086" },
          { range: [7, 8], color: "#88BC8D" },
          { range: [8, 9], color: "#83B588" }
        ],
        threshold: { //TODO: remove threshold and replace with dial/needle
          line: { color: "red", width: 4},
          thickness: 1,
          value: value
        },
      },
    } ];

  let layout = { 
    width: 600,
    height: 450,
    margin: { t: 0, b: 0 },

  };

  // initial plot
  Plotly.newPlot('gauge', data, layout);
}

// TODO update plot when selection changes
