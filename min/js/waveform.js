jQuery.fn.inputFilter=function(e){return this.on("input keydown keyup mousedown mouseup select contextmenu drop",(function(){e(this.value)?(this.oldValue=this.value,this.oldSelectionStart=this.selectionStart,this.oldSelectionEnd=this.selectionEnd):this.hasOwnProperty("oldValue")?(this.value=this.oldValue,this.setSelectionRange(this.oldSelectionStart,this.oldSelectionEnd)):this.value=""}))},$("#settings-form input[type='text']").inputFilter((function(e){return/^-{0,1}\d*\.{0,1}\d*$/.test(e)}));var freq,amplitude,dacFreq,type,bias,chart=new Chart(document.getElementById("idealChart").getContext("2d"),{type:"line",data:{datasets:[{pointStyle:"line",label:"Ideal voltage",data:[],steppedLine:!0,fill:!1,borderColor:"rgb(14, 173, 105)"}]},options:{plugins:{zoom:{pan:{enabled:!0,mode:"x"},zoom:{enabled:!0,mode:"x"}}},title:{display:!0,text:"Theoretical Waveform",fontColor:"rgb(255, 255, 255)"},legend:{labels:{defaultFontFamily:"'Roboto', 'Franklin Gothic Medium', 'Tahoma', 'sans-serif",fontColor:"rgb(255, 255, 255)"}},color:"rgb(255, 255, 255)",scales:{yAxes:[{gridLines:{drawOnChartArea:!0,color:"rgb(255,255,255)"},ticks:{fontColor:"rgb(255, 255, 255)",beginAtZero:!0,callback:function(e,t,a){return e+" V"}},scaleLabel:{display:!0,labelString:"Voltage"},type:"linear"}],xAxes:[{ticks:{fontColor:"rgb(255, 255, 255)",beginAtZero:!0,callback:function(e,t,a){return e+"s"}},scaleLabel:{display:!0,labelString:"Time"},type:"linear"}]}}});function updateVars(){freq=(freq=parseFloat($("#freq-input").val()))<=0?.01:freq,amplitude=parseFloat($("#amplitude-input").val()),dacFreq=(dacFreq=parseFloat($("#dac-freq-input").val()))<=0?.01:dacFreq,type=$("#settings-form option:selected").index(),bias=parseFloat($("#bias-input").val())}function trimNum(e){return Math.round(e*10**7)/10**7}function setIdealChart(){data=[];var e=dacFreq>freq?dacFreq/freq:dacFreq;switch(type){case 0:for(freq<1&&(e=dacFreq/freq),cycleLength=trimNum(1/freq),i=0;i<e;i++)sec=trimNum(i/dacFreq),cycleCount=Math.floor(trimNum(sec/cycleLength)),sec-=cycleCount*cycleLength,sec<=cycleLength/2?data.push(bias+amplitude/2):data.push(bias-amplitude/2);break;case 1:for(dx=2*Math.PI*freq/dacFreq,freq<1&&(e=dacFreq/freq,dx=2*Math.PI/e,console.log(e)),i=0;i<e;i++)data.push(amplitude/2*Math.sin(i*dx)+bias);break;case 2:for(dx=amplitude/freq,dacFreq>freq&&(e=dacFreq,dx=amplitude/e),freq<1&&(e=dacFreq/freq),cycleLength=trimNum(1/freq),i=0;i<e;i++)sec=trimNum(i/e),cycleCount=Math.floor(trimNum(sec/cycleLength)),sec-=cycleCount*cycleLength,data.push(sec/cycleLength*amplitude+bias-amplitude/2)}for(chart.data.datasets[0].data=[],cycleIndex=0,length=Math.floor(freq)==freq?dacFreq:e;chart.data.datasets[0].data.length<=length;){for(i=0;i<e&&(chart.data.datasets[0].data.push({x:trimNum((cycleIndex*e+i)/dacFreq),y:trimNum(data[i])}),!(chart.data.datasets[0].data.length>length));i++);cycleIndex++}chart.update()}function resetZoom(){chart.resetZoom()}$("#settings-form :input").change((function(){this.id.includes("range")?$("#"+this.id.substring(0,this.id.indexOf("range"))+"input").val(this.value):this.id.includes("input")&&$("#"+this.id.substring(0,this.id.indexOf("input"))+"range").val(this.value),updateVars(),setIdealChart()})),$(document).ready((function(){updateVars(),setIdealChart()}));