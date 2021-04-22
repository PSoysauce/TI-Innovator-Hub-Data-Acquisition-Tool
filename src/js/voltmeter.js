var voltmeterChart = new Chart(document.getElementById("voltmeterChart"), {
    type: 'line',
    data: {
        datasets: [{
            label: "Voltage",
            data: [],
            steppedLine: true,
            borderColor: 'rgb(14, 173, 105)'
        }]
    },
    options: {
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    enabled: true,
                    mode: 'x'
                }
            }
        },
        title: {
            display: true,
            text: 'Voltmeter',
            fontColor: 'rgb(255, 255, 255)',
        },
        legend: {
            labels: {
                defaultFontFamily: "'Roboto', 'Franklin Gothic Medium', 'Tahoma', 'sans-serif",
                fontColor: 'rgb(255, 255, 255)',
            }
        },
        color: 'rgb(255, 255, 255)',
        scales: {
            yAxes: [{
                gridLines: {
                    drawOnChartArea: true,
                    color: 'rgb(255,255,255)',
                },
                ticks: {
                    fontColor: 'rgb(255, 255, 255)',
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value + ' V';
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Voltage'
                },
                type: 'linear'
            }],
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    beginAtZero: true,
                    fontColor: 'rgb(255, 255, 255)',
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value;
                    }
                },
                type: 'realtime',
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                },
                realtime: {
                    onRefresh: function (chart) {
                        chart.data.datasets.forEach(function (dataset) {
                            xVal = Date.now();
                            yVal = getData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            storeChartData(xVal,yVal);
                        });
                    },
                    delay: 1000,
                }
            }]
        },
        responsive: false
    }
});

var display_data = true;

// random function to generate data between 0 and 10 V
function getData() {
    if (display_data) {
        point = Math.floor(Math.random() * 11);
        setBox();
        return Math.floor(point);
    }
}

function setBox() {
    $("#volt").val(point + "V");
}

// toggle the data on
function onData() {
    voltmeterChart.options.plugins.streaming.pause = false;
    voltmeterChart.update();
    display_data = true;
}

// toggle the data off
function offData() {

    voltmeterChart.options.plugins.streaming.pause = true;
    voltmeterChart.update();
    display_data = false;
    console.log('stop');
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