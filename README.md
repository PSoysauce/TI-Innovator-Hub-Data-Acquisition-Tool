# TI-Innovator-Hub-Data-Acquisition-Tool
Work on building a basic instrumentation tool for portable signal measurements using the classroom ready TI-Innovator 

# Links
Project Drive Folder for Weekly Reports

https://drive.google.com/drive/folders/1_6ZeOX9q_LUwdCHrLToANEMP_AoG7OoP?usp=sharing

GUI Composer Tool
https://dev.ti.com/gc/

GUI Composer Guide
https://dev.ti.com/gc/designer/help/GC_UserGuide_v2/overview.html

TI Innovator Hub
https://education.ti.com/en/products/micro-controller/ti-innovator

Demos to test if LaunchPad works:
https://dev.ti.com/gallery/view/demos/button_MSP432R_Demo/ver/1.0.0/

Icons for the GUI Composer:
https://dev.ti.com/gc/components/ti-core-icons/demo/index.html

Git Info:
https://git-scm.com/book/en/v2

Launchpad info:
https://dev.ti.com/tirex/explore/node?devtools=MSP-EXP432P401R&node=AC5Wb-VBjXI4EELckTDYfQ__FUz-xrs__LATEST

# Things to do
Familiarize with GUI Composer Tool
The target hardware for the GUI is a microcontroller board from TI called MSP432 LaunchPad (Part number MSP-EXP432P401R). This same hardware is used in the product called TI-Innovator Hub. In the beginning of the project we will use the LaunchPad for practice and then try to get the GUI running on the TI-Innovator Hub after the features have been finalized.
Run through tutorial material for XDS demo to create first GUI
Read through User Guide and experiment with different GUI components
Add functionality to the base tutorial
 
The software team is going to focus on the GUI development. Starting with TI GUI Composer, you will showcase a proof of concept. Next you will determine if sticking with GUI Composer is going to be the viable option or if other options are necessary to complete the GUI. You will proceed to improve the GUI demo to meet the project objectives and interface with the TI-Innovator Hub
 
Work on GUI skeleton for navigating the five primary functions using tabs or menus
Oscilloscope, Logic Analyzer, Waveform Generator, Power Supplies, Voltmeter
Create similar elements to WaveForms. Check out WaveForms and Analog discovery tutorials and see how they are displaying data in the screen caps https://reference.digilentinc.com/learn/instrumentation/tutorials/start
Check out TExaS Display and see how they are displaying data from the MSP432
https://training.ti.com/ti-rslk-max-module-1-lab-video-4-running-texas-oscilloscope
https://training.ti.com/ti-rslk-max-module-1-lab-video-3-running-texas-logic-analyzer
Another big piece of the GUI since it is complex with several “views” is the ability to switch between different functions within the UI
Figure out how to have a prominent main menu bar to switch between top level views
Within this framework, you can build the individual UI pages, but you need this top level structure figured out first in your prototype
 
Evaluate other HTML5 based options for creating GUI
Must be able to visualize graphs and have interactive elements, look for Javascript libraries like chart.js, dygraphs, chartist.js, D3.js
Target is for PC usage (hardware connected to PC via USB, do not assume wireless or connection to phone/tablet)
Look at possible complete front end UI framework or platform
Must account for speed of development (can introduce more features faster) because of limited project timeline
Associated cost + Integration cost for TI Innovator
Identify team experience with these tools
 
Continue building with GUI Composer Tool
Collect the LaunchPad from UTD. The target hardware for the GUI is a microcontroller board from TI called MSP432 LaunchPad (Part number MSP-EXP432P401R). This same hardware is used in the product called TI-Innovator Hub. In the beginning of the project we will use the LaunchPad for practice and then try to get the GUI running on the TI-Innovator Hub after the features have been finalized.
Run through tutorial material for XDS demo to create first GUI
Read through User Guide and experiment with different GUI components
Add functionality to the base tutorial
https://dev.ti.com/gc/designer/help/GC_UserGuide_v2/monitor.html
https://dev.ti.com/gc/designer/help/GC_UserGuide_v2/xds.html
It is going to be safest to start with GUI composer because the drivers already work with the target hardware, so figure out ways you might spice it up with importing JS libraries or other frameworks. The alternative is to host the GUI code directly on the device in the case of Wi-Fi connection (Access Point + mini server), but this would be an advanced use case.
 
The software team is going to focus on the GUI development. Starting with TI GUI Composer, you will showcase a proof of concept. Next you will determine if sticking with GUI Composer is going to be the viable option or if other options are necessary to complete the GUI. You will proceed to improve the GUI demo to meet the project objectives and interface with the TI-Innovator Hub.
 
 
# Target Programming
https://dev.ti.com/gc/designer/help/GC_UserGuide_v2/targetprog.html

# Binding a widget to a data source
https://dev.ti.com/gc/designer/help/GC_UserGuide_v2/components.html
1. Click on graph
2. click on the chain next to the values
3. Select input source???


# Serving Webpage from the MSP432 Hardware
here is the example code of how a webpage can be served up directly from the MSP432 hardware. See how the PrintConfig() and PrintIndex() functions are printing out the client code? So you can use this hard code method to setup the chart.js GUI on the local page and then eventually feed it variable data coming from the hardware or dummy data in the case of this project.
https://github.com/energia/Energia/blob/master/libraries/SimplelinkWifi/examples/simpleWebServer/simpleWebServer.ino
https://github.com/energia/Energia/tree/master/libraries/SimplelinkWifi

 
# Chart.js Live 
https://nagix.github.io/chartjs-plugin-streaming/

# Previous Year Repo
https://github.com/RyanKGeorgeDev/TI-Innovator-Hub-Data-Acquisition-Tool
