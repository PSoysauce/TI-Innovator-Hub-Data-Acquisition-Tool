// FROM https://stackoverflow.com/a/995193/4352298
(function ($) {
  $.fn.inputFilter = function (inputFilter) {
    return this.on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      }
    );
  };
})(jQuery);

$("#settings-form input").inputFilter(function (value) {
  return /^-{0,1}\d*\.{0,1}\d*$/.test(value);
});

// Sets up the char.js chart that is called oscilloscopeChart
var ctx = document.getElementById("oscilloscopeChart").getContext("2d");
var chart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Voltage",
        pointStyle: "line",
        data: [],
        steppedLine: false,
        fill: false,
        borderColor: "rgb(14, 173, 105)",
      },
    ],
  },
  options: {
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          enabled: true,
          mode: "x",
        },
      },
    },
    title: {
      display: true,
      text: "Oscilloscope",
      fontColor: "rgb(255, 255, 255)",
    },
    legend: {
      labels: {
        defaultFontFamily:
          "'Roboto', 'Franklin Gothic Medium', 'Tahoma', 'sans-serif",
        fontColor: "rgb(255, 255, 255)",
      },
    },
    color: "rgb(255, 255, 255)",
    scales: {
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: true,
            color: "rgb(255,255,255)",
          },
          ticks: {
            fontColor: "rgb(255, 255, 255)",
            beginAtZero: true,
            callback: function (value, index, values) {
              return value + " V";
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Voltage",
          },
          type: "linear",
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            fontColor: "rgb(255, 255, 255)",
            beginAtZero: true,
            callback: function (value, index, values) {
              return value;
            },
          },
          type: "realtime",
          scaleLabel: {
            display: true,
            labelString: "Time",
          },
          realtime: {
            onRefresh: function (chart) {
              chart.data.datasets.forEach(function (dataset) {
                if(display_data) { 
                  dataset.data.push({
                    x: Date.now(),
                    y: plotSine(),
                  });
                }
              });
            },
            delay: 2000,
          },
        },
      ],
    },
  },
});

var x = 1;
var frequency = 1;
var amplitude = 1;
var period = 1 / frequency;
var max_volt = 0,
  min_volt = 0;

// updateVars will update all of the variables once new values are inputed
function updateVars() {
  frequency = parseFloat($("#freq-input").val());
  frequency = frequency <= 0 ? 0.01 : frequency;
  amplitude = parseFloat($("#amplitude-input").val());
}

// will start displaying data once the page is opened
var display_data = true;

// funciton plotSine will calculate the y value for the sine curve and will update the current value
function plotSineWave() {
  switchX();
  y_val = amplitude * Math.sin(x / frequency);
  if (y_val > max_volt) {
    max_volt = y_val;
    $("#max-voltage-input").val(y_val.toFixed(2));
  }
  if (y_val < min_volt) {
    min_volt = y_val;
    $("#min-voltage-input").val(y_val.toFixed(2));
  }
  updateStats();
  return y_val;
}

// plotSine is used to graph the sine curve, for now this data simply generates -1 or 1
function plotSine() {
    updateStats();
    switchX();
    $("#max-voltage-input").val(1);
    $("#min-voltage-input").val(1);
    return x;
}

// mean calculates the mean of all the graph values
function mean() {
  sum = 0;
  for (const row of chart.data.datasets[0].data) {
    sum += row.y;
  }
  return Math.round(sum / chart.data.datasets[0].data.length * 100) / 100;
}

// update Stats is used to update the mean value whenever it changes
function updateStats() {
  $("#mean-voltage-input").val(mean());
}

// function switchX will osillate between -1 and 1
function switchX() {
  if (x == amplitude) {
    x = -1 * amplitude;
  } else {
    x = amplitude;
  }
}

// onrecieve will push the data to the dataset once it is recieved
function onReceive(event) {
  window.myChart.config.data.datasets[event.index].data.push({
    x: event.timestamp,
    y: event.value,
  });
  window.myChart.update({
    preservation: true,
  });
}

// toggle the data on
function onData() {
  chart.clear();
  chart.options.plugins.streaming.pause = false;
  chart.update();
  display_data = true;
}

// toggle the data off
function offData() {
  chart.options.plugins.streaming.pause = true;
  chart.update();
  display_data = false;
}

// will convert the graph values to the CSV
function convertToCSV() {
  const csvRows = [];
  const headers = ["Time,Voltage"];
  csvRows.push(headers.join(","));
  for (const row of chart.data.datasets[0].data) {
    time = new Date(row.x).toString().replace("GMT-0500 (Central Daylight Time)", "");
    csvRows.push([time, row.y].join(","));
  }
  download(csvRows.join("\n"));
}

// how to download the data to a csv
const download = function (data) {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "download.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
