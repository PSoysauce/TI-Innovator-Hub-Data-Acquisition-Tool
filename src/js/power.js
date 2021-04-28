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
                        dataset.data.push({
                            x: Date.now(),
                            y: document.getElementById("voltage").value,
                        });
                    });
                },
                delay: 2000,
            }
        }]
    },
}});