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
                xVal = Date.now();
                yVal = plotSine();
                dataset.data.push({
                  x: xVal,
                  y: yVal,
                });

                storeChartData(xVal, yVal);
              });
            },
            delay: 2000,
          },
        },
      ],
    },
  },
});

dataset = [];
var x = 1;
var frequency = 1;
var amplitude = 1;
var period = 1 / frequency;
var max_volt = 0,
  min_volt = 0;

function updateVars() {
  frequency = parseFloat($("#freq-input").val());

  frequency = frequency <= 0 ? 0.01 : frequency;
  amplitude = parseFloat($("#amplitude-input").val());
}

var display_data = true;

// funciton plotSine will calculate the y value for the sine curve
function plotSine() {
  switchX();
  if (display_data) {
    y_val = amplitude * Math.sin(x / frequency);
    if (y_val > max_volt) {
      max_volt = y_val;
      $("#max-voltage-input").val(y_val.toFixed(2));
      updateStats();
    }
    if (y_val < min_volt) {
      min_volt = y_val;
      $("#min-voltage-input").val(y_val.toFixed(2));
      updateStats();
    }
    dataset.push(y_val);
    return y_val;
  }
}

function median() {
  array = dataset.sort();
  if (array.length % 2 === 0) {
    // array with even number elements
    return (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
  } else {
    return array[(array.length - 1) / 2]; // array with odd number elements
  }
}

function mean() {
  sum = 0;
  dataset.forEach((element) => (sum += element));
  return sum / dataset.length;
}

function updateStats() {
  $("#mean-voltage-input").val(mean());
  $("#median-voltage-input").val(median());
}

// function switchX will osillate between -1 and 1
function switchX() {
  if (x == amplitude) {
    x = -1 * amplitude;
  } else {
    x = amplitude;
  }
}

$("#settings-form :input").change(function () {
  if (this.id.includes("range")) {
    // if a slider
    $("#" + this.id.substring(0, this.id.indexOf("range")) + "input").val(
      this.value
    );
  } else if (this.id.includes("input")) {
    // if a input box
    $("#" + this.id.substring(0, this.id.indexOf("input")) + "range").val(
      this.value
    );
  }
  updateVars();
});

function onReceive(event) {
  window.myChart.config.data.datasets[event.index].data.push({
    x: event.timestamp,
    y: event.value,
  });
  window.myChart.update({
    preservation: true,
  });
}

var timeoutIDs = [];

function startFeed(index) {
  var receive = function () {
    onReceive({
      index: index,
      timestamp: Date.now(),
      value: randomScalingFactor(),
    });
    timeoutIDs[index] = setTimeout(receive, Math.random() * 1000 + 500);
  };
  timeoutIDs[index] = setTimeout(receive, Math.random() * 1000 + 500);
}

// toggle the data on
function onData() {
  chartData = [];
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

chartData = [];

function storeChartData(xVal, yVal) {
  chartData.push({ x: xVal, y: yVal });
}

function convertToCSV() {
  const csvRows = [];
  const headers = ["Time,Voltage"];
  csvRows.push(headers.join(","));
  for (const row of chartData) {
    csvRows.push([row.x, row.y].join(","));
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
