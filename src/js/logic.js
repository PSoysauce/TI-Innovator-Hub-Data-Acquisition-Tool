var activeChannels = 6;
var paused = false;

function generate(num) {
    var data = Math.round(Math.random() * 1);
    callFunctions(num);
    return data;
}

function hideChannel(num) {
    var channel = document.getElementById("channelChart" + num);
    var button = document.getElementById("channelToggle" + num);
    var settings = document.getElementById("channelSettings" + num);
    var characteristics = document.getElementById("characteristics" + num);
    var timing = document.getElementById("timing");
    if(channel.style.display == 'none') {
        button.style.color = 'white';
        button.style.backgroundColor = '#c00';
        channel.style.display = 'block';
        settings.style.display = 'block';
        characteristics.style.display = 'block';
        activeChannels++;
        if(activeChannels != 0) {
            timing.style.display ='block';
        }
    } else {
        button.style.color = 'black';
        button.style.backgroundColor = 'white';
        channel.style.display = 'none';
        settings.style.display = 'none';
        characteristics.style.display = 'none';
        activeChannels--;
        if(activeChannels == 0) {
            timing.style.display ='none';
        }
    }
}

function pauseButton(num){
    var pause = document.getElementById("pause" + num);
    var chart = Chart.instances[num];
    if(pause.innerHTML == "Pause") {
        pause.innerHTML = "Start";
        chart.options.scales.xAxes[0].realtime.pause = true;
        chart.update({duration: 0});
    } else {
        pause.innerHTML = "Pause";
        chart.options.scales.xAxes[0].realtime.pause = false;
        chart.update({duration: 0});
    }
}

function callFunctions(num){
    var chart = Chart.instances[num];
    var data = []; // data[i].x || data[i].y

    var dutyCycle = 0;

    chart.data.datasets[0].data.forEach(function (point) {
        data.push(point);
    });

    // Rise & Fall Times
    for(var i = 0; i < data.length; i++){
        if(i != 0) {
            if(data[i-1].y == 0 && data[i].y == 1){
                var riseTime = data[i].x;
                const today = new Date(data[i].x);
                console.log(today.toISOString());
            }
            else if(data[i-1].y == 1 && data[i].y == 0){
                var fallTime = data[i].x;
                //console.log(fallTime);
            }
            else{
                console.log("No Change");
            }
        }
    }
    
}

function getDutyCycle(dataPoint){
    // ratio of time on vs. off
    var dutyCycle = 0;
    
    return dutyCycle;
}

function getVisibleValues(chart){
    
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
                text: 'Channel ' + (i + 1),
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
                            if(chart.options.scales.xAxes[0].realtime.pause == false) {
                                chart.data.datasets.forEach(function(dataset) {
                                    dataset.data.push({
                                        x: Date.now(),
                                        y: generate(chart.id),
                                    });
                                });
                            }
                        },
                        delay: 2000,
                        pause: false
                    }
                }]
            },
        }});
    }
}

generateCharts();