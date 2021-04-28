var activeChannels = 6;

function generate(num) {
    var data = Math.round(Math.random() * 1);
    callTriggerFunctions(num);
    return data;
}

function hideChannel(num) {
    var channel = document.getElementById("channelChart" + num);
    var button = document.getElementById("channelToggle" + num);
    var characteristics = document.getElementById("characteristics" + num);
    var timing = document.getElementById("timing");
    if(channel.style.display == 'none') {
        button.style.color = 'white';
        button.style.backgroundColor = '#c00';
        channel.style.display = 'block';
        characteristics.style.display = 'block';
        activeChannels++;
        if(activeChannels != 0) {
            timing.style.display ='block';
        }
    } else {
        button.style.color = 'black';
        button.style.backgroundColor = 'white';
        channel.style.display = 'none';
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
    } else if(pause.innerHTML == "Start") {
        pause.innerHTML = "Pause";
        chart.options.scales.xAxes[0].realtime.pause = false;
        chart.update({duration: 0});
    }
}

function pauseAll() {
    var pause = document.getElementById("pauseAll");
    for(var i = 0; i < 6; i++) {
        pauseButton(i);
    }
    if(pause.innerHTML == "Pause All Charts") {
        pause.innerHTML = "Start All Charts";
    } else {
        pause.innerHTML = "Pause All Charts";
    }
}

function exportCVS() {
    const csvRows = [];
    const headers = ["Chart ID,Time,Voltage"];
    var chart = null;
    csvRows.push(headers.join(","));
    for(var i = 0; i < 6; i++) {
        chart = Chart.instances[i];
        chart.data.datasets[1].data.forEach(function (point) {
            var time = new Date(point.x).toString().replace("GMT-0500 (Central Daylight Time)", "");
            csvRows.push([i + 1, time, point.y]);
        });
    }
    download(csvRows.join('\n'));
}

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

function callTriggerFunctions(num){
    var chart = Chart.instances[num];
    var trigger = document.getElementById("trigger");
    var triggerSelection = trigger.options[trigger.selectedIndex].text;
    var data = []; // data[i].x || data[i].y

    var validPattern = -1;

    if (triggerSelection == "Pattern Trigger"){
        var pattern = document.getElementById("pattern");
        var textP = pattern.value;
        
        if(textP == null) {
            return;
        }
        
        validPattern = validatePattern(textP);

        if(validPattern == 1){
            patternTrigger(num,textP);
        }
        else{
            console.log("Error - Invalid Pattern");
        }
    }

    chart.data.datasets[1].data.forEach(function (point) {
        data.push(point);
    });
}

function findPattern(chart, pattern) {
    var data = [];
    chart.data.datasets[1].data.forEach(function (point) {
        data.push(point.y);
    });
    var string = data.join("");
    if(string.indexOf(pattern) != -1) {
        return string.indexOf(pattern.toString());
    } else {
        return -1;
    }
}

function validatePattern(pattern){
    for(i = 0; i < pattern.length; i++){
        console.log(pattern[i]);
        if (pattern[i] != '1' && pattern[i] != '0'){
            return -1;
        }
        else{
            return 1;
        }
    }
}

function patternTrigger(num,pattern){
    var chart = Chart.instances[num];

    index = findPattern(chart, pattern);

    if(index != -1) {
        for(var i = index; i < pattern.length + index; i++) {
            chart.data.datasets[0].data.push({
                x: chart.data.datasets[1].data[i].x,
                y: chart.data.datasets[1].data[i].y,
            });
        }

    } else {
        return -1;
    }
}

function callThreshold(num){
    var chart = Chart.instances[num];
    var threshold = document.getElementById("threshold");
    var thresholdValue = threshold.options[threshold.selectedIndex].text;
    var data = [];
}

function generateCharts() {
    for(var i = 0; i < 6; i++) {
        var ctx = document.getElementById("channelChart" + i).getContext('2d');
        var chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                    label: 'Pattern',
                    pointStyle: 'circle',
                    data: [],
                    steppedLine: false,
                    showLine: false,
                    fill: false,
                    borderColor: 'rgb(255, 255, 255)',
                    pointBorderColor: 'rgb(255, 255, 255)',
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointRadius: 5,
                    pointHoverRadius: 5,
                }, {
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
            showTooltips: false,
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
                                chart.data.datasets[1].data.push({
                                    x: Date.now(),
                                    y: generate(chart.id),
                                });
                            }
                        },
                        delay: 2000,
                        pause: true,
                    }
                }]
            },
        }});
    }
}

generateCharts();