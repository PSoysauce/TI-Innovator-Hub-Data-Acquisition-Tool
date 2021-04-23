var ctx = document.getElementById('powerChart').getContext('2d');
var chart = new Chart(ctx, {
type: 'line',
data: {
    datasets: [{
        label: 'Voltage',
        pointStyle: 'line',
        data: [],
        steppedLine: true,
        fill: false,
        borderColor: 'rgb(14, 173, 105)',
    }],
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
        text: 'Power Supply',
        fontColor: 'rgb(255, 255, 255)',
    },
    legend: {
        labels: {
            defaultFontFamily:  "'Roboto', 'Franklin Gothic Medium', 'Tahoma', 'sans-serif",
            fontColor: 'rgb(255, 255, 255)',
        }
    },
    color: 'rgb(255, 255, 255)',
    scales: {
        yAxes: [{
            gridLines: {
                drawOnChartArea: true,
                color: "rgb(255,255,255)",
            },
            ticks: {
                beginAtZero: true,
                fontColor: 'rgb(255, 255, 255)',
            },
        }],
        xAxes: [{
            gridLines: {
                drawOnChartArea: false,
            },
            ticks: {
                beginAtZero: true,
                fontColor: 'rgb(255, 255, 255)',
            },
            type: 'realtime',
            realtime: {
                onRefresh: function(chart) {
                    chart.data.datasets.forEach(function(dataset) {
                        xVal = Date.now();
                        yVal = Math.random();
                        dataset.data.push({
                        x: xVal,
                        y: yVal,
                        });
                        storeChartData(xVal, yVal);
                    });
                },
                delay: 2000,
            }
        }]
    },
}});

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