var activeChannels = 6; // columns

var memory = [[]];  // Straight Teeth Katie

// var memory[channels][[].push()]

chart1Data = [];
chart2Data = [];
chart3Data = [];
chart4Data = [];
chart5Data = [];
chart6Data = [];

function hideChannel(num) {
    var channel = document.getElementById("channelChart" + num);
    var button = document.getElementById("channelToggle" + num);
    var settings = document.getElementById("channelSettings" + num);
    //var voltage = document.getElementById("voltage" + num);
    var timing = document.getElementById("timing");
    if(channel.style.display == 'none') {
        button.style.color = 'white';
        button.style.backgroundColor = '#c00';
        channel.style.display = 'block';
        settings.style.display = 'block';
        //voltage.style.display = 'block';
        activeChannels++;
        if(activeChannels != 0) {
            timing.style.display ='block';
        }
    } else {
        button.style.color = 'black';
        button.style.backgroundColor = 'white';
        channel.style.display = 'none';
        settings.style.display = 'none';
        //voltage.style.display = 'none';
        activeChannels--;
        if(activeChannels == 0) {
            timing.style.display ='none';
        }
    }
}

chartArray = [];

function generateCharts() {
    var ctx1 = document.getElementById("channelChart" + 0).getContext('2d');
    var chart1 = new Chart(ctx1, {
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
        title: {
            display: true,
            text: 'Channel ' + 1,
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
                            yVal = generateData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            // storeChartData(xVal, yVal, 1);
                            chart1Data.push({ x: xVal, y: yVal });
                        });
                    },
                    delay: 2000,
                }
            }]
        },
    }});

    var ctx2 = document.getElementById("channelChart" + 1).getContext('2d');
    var chart2 = new Chart(ctx2, {
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
        title: {
            display: true,
            text: 'Channel ' + 2,
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
                            yVal = generateData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            // storeChartData(xVal, yVal, 2);
                            chart2Data.push({ x: xVal, y: yVal });
                        });
                    },
                    delay: 2000,
                }
            }]
        },
    }});

    var ctx3 = document.getElementById("channelChart" + 2).getContext('2d');
    var chart3 = new Chart(ctx3, {
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
        title: {
            display: true,
            text: 'Channel ' + 3,
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
                            yVal = generateData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            // storeChartData(xVal, yVal, 3);
                            chart3Data.push({ x: xVal, y: yVal });
                        });
                    },
                    delay: 2000,
                }
            }]
        },
    }});

    var ctx4 = document.getElementById("channelChart" + 3).getContext('2d');
    var chart4 = new Chart(ctx4, {
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
        title: {
            display: true,
            text: 'Channel ' + 4,
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
                            yVal = generateData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            chart4Data.push({ x: xVal, y: yVal });
                            // storeChartData(xVal, yVal, 4);
                        });
                    },
                    delay: 2000,
                }
            }]
        },
    }});

    var ctx5 = document.getElementById("channelChart" + 4).getContext('2d');
    var chart5 = new Chart(ctx5, {
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
        title: {
            display: true,
            text: 'Channel ' + 5,
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
                            yVal = generateData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            // storeChartData(xVal, yVal, 5);
                            chart5Data.push({ x: xVal, y: yVal });
                        });
                    },
                    delay: 2000,
                }
            }]
        },
    }});

    var ctx6 = document.getElementById("channelChart" + 5).getContext('2d');
    var chart6 = new Chart(ctx6, {
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
        title: {
            display: true,
            text: 'Channel ' + 6,
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
                            yVal = generateData();
                            dataset.data.push({
                                x: xVal,
                                y: yVal,
                            });
                            chart6Data.push({ x: xVal, y: yVal });
                            
                            // console.log(chart6Data);
                            // storeChartData(xVal, yVal, 6);
                        });
                    },
                    delay: 2000,
                }
            }]
        },
    }});

    chartArray.push(chart1);
    chartArray.push(chart2);
    chartArray.push(chart3);
    chartArray.push(chart4);
    chartArray.push(chart5);
    chartArray.push(chart6);
}

generateCharts();

var frequency = 0;

function generateData() {
    if(display_data) {
        return Math.random();
    }
}

var display_data = true;

function pauseButton(x) {
    chartData = [];
    chartArray[x].options.plugins.streaming.pause = true;
    chartArray[x].update();
    display_data = false;
}

function start(x) {
    chartArray[x].options.plugins.streaming.pause = false;
    chartArray[x].update();
    display_data = true;
}

function convertToCSV(i) {
console.log(i);
  const csvRows = [];
  const headers = ["Time,Voltage"];
  csvRows.push(headers.join(","));
  
  switch(i) {
        case 0:
            for (const row of chart1Data) {
                csvRows.push([row.x, row.y].join(","));
            }
            break;
        case 1:
            for (const row of chart2Data) {
                csvRows.push([row.x, row.y].join(","));
            }
            break;
        case 2:
            for (const row of chart3Data) {
                csvRows.push([row.x, row.y].join(","));
            }
            break;
        case 3:
            for (const row of chart4Data) {
                csvRows.push([row.x, row.y].join(","));
            }
            break;
        case 4:
            for (const row of chart5Data) {
                csvRows.push([row.x, row.y].join(","));
            }
            break;
        case 5:
            for (const row of chart6Data) {
                csvRows.push([row.x, row.y].join(","));
            }
            break;
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