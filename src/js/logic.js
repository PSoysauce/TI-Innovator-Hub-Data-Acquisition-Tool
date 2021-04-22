var activeChannels = 6; // columns

var memory = [[]];  // Straight Teeth Katie

// var memory[channels][[].push()]


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

function generateCharts() {
    for(var i = 0; i < 6; i++) {
        var ctx = document.getElementById("channelChart" + i).getContext('2d');
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
            title: {
                display: true,
                text: 'Channel ' + i,
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
                        drawOnChartArea: false,
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
                                dataset.data.push({
                                    x: Date.now(),
                                    y: Math.random(),
                                });
                            });
                        },
                        delay: 2000,
                    }
                }]
            },
        }});
    }
}

generateCharts();

var frequency = 0;

function generateData() {
    var ran = Math.random();
    return Math.random()
}