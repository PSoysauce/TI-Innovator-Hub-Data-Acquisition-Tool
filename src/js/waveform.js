// FROM https://stackoverflow.com/a/995193/4352298
(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
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
        });
    };
}(jQuery));

$("#settings-form input[type='text']").inputFilter(function (value) {
    return /^-{0,1}\d*\.{0,1}\d*$/.test(value);
});

var chart = new Chart(document.getElementById("idealChart").getContext('2d'), {
    type: 'line',
    data: {
        datasets: [{
            pointStyle: 'line',
            label: "Ideal voltage",
            data: [],
            steppedLine: true,
            fill: false,
            borderColor: 'rgb(14, 173, 105)',
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
            text: 'Theoretical Waveform',
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
                ticks: {
                    fontColor: 'rgb(255, 255, 255)',
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value + 's';
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                },
                type: 'linear'
            }]
        }
    }
});

var freq, amplitude, dacFreq, type, bias;
function updateVars() {
    freq = parseFloat($("#freq-input").val());
    freq = freq <= 0 ? 0.01 : freq;
    amplitude = parseFloat($("#amplitude-input").val());
    dacFreq = parseFloat($("#dac-freq-input").val());
    dacFreq = dacFreq <= 0 ? 0.01 : dacFreq;
    type = $("#settings-form option:selected").index();
    bias = parseFloat($("#bias-input").val());
}

function trimNum(num) {
    return Math.round(num * 10 ** 7) / 10 ** 7;
}

function setIdealChart() {
    data = [];
    var sampleLength = dacFreq > freq ? dacFreq / freq : dacFreq;
    switch (type) {
        // Square
        case 0:
            if (freq < 1) {
                sampleLength = dacFreq / freq;
            }
            cycleLength = trimNum(1 / freq);
            for (i = 0; i < sampleLength; i++) {
                sec = trimNum(i / dacFreq);
                cycleCount = Math.floor(trimNum(sec / cycleLength));
                sec -= cycleCount * cycleLength;
                if (sec <= cycleLength / 2) {
                    data.push(bias + amplitude / 2);
                } else {
                    data.push(bias - amplitude / 2);
                }
            }
            break;
        // Sine
        case 1:
            dx = 2 * Math.PI * freq / dacFreq;
            if (freq < 1) {
                sampleLength = dacFreq / freq;
                dx = 2 * Math.PI / sampleLength;
                console.log(sampleLength);
            }
            for (i = 0; i < sampleLength; i++) {
                data.push(amplitude / 2 * Math.sin(i * dx) + bias);
            }
            break;
        // Sawtooth
        case 2:
            dx = amplitude / freq;
            if (dacFreq > freq) {
                sampleLength = dacFreq;
                dx = amplitude / sampleLength;
            }
            if (freq < 1) {
                sampleLength = dacFreq / freq;
            }
            cycleLength = trimNum(1 / freq);
            for (i = 0; i < sampleLength; i++) {
                sec = trimNum(i / sampleLength);
                cycleCount = Math.floor(trimNum(sec / cycleLength));
                sec -= cycleCount * cycleLength;
                data.push(sec / cycleLength * amplitude + bias - amplitude / 2);
            }
            break;
    }

    chart.data.datasets[0].data = [];
    cycleIndex = 0;
    length = Math.floor(freq) == freq ? dacFreq : sampleLength;
    while (chart.data.datasets[0].data.length <= length) {
        for (i = 0; i < sampleLength; i++) {
            chart.data.datasets[0].data.push({ x: trimNum((cycleIndex * sampleLength + i) / dacFreq), y: trimNum(data[i]) });
            if (chart.data.datasets[0].data.length > length) {
                break;
            }
        }
        cycleIndex++;
    }
    chart.update();
}

$("#settings-form :input").change(function () {
    if (this.id.includes("range")) {
        $("#" + this.id.substring(0, this.id.indexOf("range")) + "input").val(this.value);
    } else if (this.id.includes("input")) {
        $("#" + this.id.substring(0, this.id.indexOf("input")) + "range").val(this.value);
    }

    updateVars();
    setIdealChart();
});

$(document).ready(function () {
    updateVars();
    setIdealChart();
});

function resetZoom() {
    chart.resetZoom();
}