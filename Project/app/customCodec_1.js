/*
 * gc global variable provides access to GUI Composer infrastructure components and project information.
 * For more information, please see the Working with Javascript guide in the online help.
 */
 var gc = gc || {};
 
/*
 * wait for gc.databind to be ready. 
 */
document.addEventListener('gc-databind-ready', function() {

    /* 
     * To see the console logs logged by this file, in the console view, enter the following:
     * gc.console.setCookie('CustomCodec',5) 
     * For more help on how to work with gc.console, please see the help text that is sent to the
     * console when the app starts.
     */
    
    /*
     * Boilerplate code for encoding and decoding packet data transmitted to / received from TI devices.
     * For an example of a codec that accesses symbols using readValue/writeValue, please see components/ti-widget-registers/demo/MotorwareDemo_F28069M/customCodec_0.js
     */
    
    /**
     * This code implements the IPacketCodec interface.
     *
     * @constructor
     * @implements gc.databind.IPacketCodec
     */
    CustomCodec = function() {};
    CustomCodec.prototype = new gc.databind.IPollingPacketCodec();
    CustomCodec.prototype.rxPktCtr = 0;
    CustomCodec.prototype.rxMsgCtr = 0;
    CustomCodec.prototype.txPktCtr = 0;
    CustomCodec.prototype.txMsgCtr = 0;
    CustomCodec.prototype.strRxBuffer = "";
    CustomCodec.prototype.strTxBuffer = "";
    CustomCodec.prototype.isConnected = false;
    CustomCodec.prototype.initComplete = false;
    CustomCodec.prototype.templateObj = undefined;
    
    /**
     * Encodes data into a packet for sending to the target device.
     *
     * @param target - function to call to pass on the encoded data towards the target
     * @param jsonObj - The data object from the GUI that is to be encoded into a packet for sending.
     */
    CustomCodec.prototype.encode = function(target, jsonObj) {
        this.txPktCtr++;
    
    /* TODO: Rework the following example code as required for your app:
       // The following example code shows how to encode property values from the GUI into
       // a JSON formatted string.  You would use this if you wanted to intercept data from the GUI
       // and rework it before passing it on to the target device.
       try{
            this.txMsgCtr++;
            if ((this.txMsgCtr % 256) == 0){
                gc.console.log("CustomCodec","Number of tx messages to target: "+this.txMsgCtr);
            }
            var strToSend = ""; //JSON.stringify(jsonObj) +"\n";
            // send the string to the target
            target(strToSend);
        }
        catch(ex){
            gc.console.log("CustomCodec","CustomCodec.encode (to target): exception="+ex);
        }
    
    */
    };
    /**
     * Decodes packets from the target device into data objects.  One object for each packet of data.
     * Unless you have chained your custom codec with the CR codec, the packet data is not framed,
     * so this method is responsible for decoding partial packets as well as multiple packets.  Partial packets
     * should not be returned, but deferred until the next decode method call with more raw data to process.  As a
     * result, this method may return 0 or more packets of data on each invocation.
     *
     * @param target -  function to call to pass on a JSON object containing the decoded values towards the GUI
     * @param data  - The raw data received that needs to be decoded from packets into objects.
     * @return - true if connected (i.e. valid data received), false if not connected
     */
    CustomCodec.prototype.decode = function(target, data) {
        this.isConnected = true;
        this.rxPktCtr++;
    
    /* TODO: Rework the following example code as required for your app:
        // The following example code shows how to decode JSON strings coming up from the target
        // into a Javascript object.  You would use this if you wanted to intercept data from the target
        // and rework it before passing it on to the GUI for binding
        var strRxData = data.map(function(value) {
            return String.fromCharCode(value);
        }).join("");
        this.strRxBuffer = this.strRxBuffer+strRxData;
        var strMessage = '';
        while (this.strRxBuffer.indexOf('\n') !== -1) {
            strMessage = this.strRxBuffer.substring(0, this.strRxBuffer.indexOf('\n') + 1);
            this.strRxBuffer = this.strRxBuffer.substring(strMessage.length);
            // NOTE: if you set baseCodecs = "CR" at the second to last line in this file, all of the 
            // operations in this TODO section will be handled automatically for you and you will only 
            // need to implement the following try/catch block:
            try {
                var jsonObj = JSON.parse(strMessage);
                this.rxMsgCtr++;
                if ((this.rxMsgCtr % 256) == 0){
                    gc.console.log("CustomCodec","Number of tx messages from target: "+this.rxMsgCtr);
                }
    
                // send the received and decoded javascript object to the application where you can use it to bind to widget properties
                target(jsonObj);
            }
            catch(ex){
                gc.console.log("CustomCodec","CustomCodec.decode (from target): strMessage="+strMessage+", exception="+ex);
            }
        }
    */
    
        // Return true to set the 'Hardware Connected' status in the status bar
        return this.isConnected;
    
    };
    
    CustomCodec.prototype.disconnect = function(){
        this.initComplete = false;
        this.isConnected = false;
        // TODO: remove any event listeners you added in the connect function here:
    };
    
    CustomCodec.prototype.connect = function(settings) {
        this.templateObj = document.querySelector('#template_obj');
        if (this.templateObj) {
     	    // You can use 'automatic node finding' $ syntax with the templateObj to access widgets in your app.
      	    // e.g. to access a widget with an id of 'widget_id' you can use templateObj.$.widgetId
            // TODO: Add any event listeners or initialization logic this codec requires here:
        }
        else {
            gc.console.log("CustomCodec","CustomCodec: Failed to find id template_obj in the Application!");
        }
        this.initComplete = true;
        return Q(); // return a promise
    };
    
    // registerCustomCodec has to be called on or before then gc-databind-ready event in order for the 
    // codec to be recognized and used
    gc.console.log("CustomCodec","CustomCodec","CustomCodec: about to register...");
    // You can 'chain' codecs together to make it easier to work with the data
    // coming from the device or going to the device.
    // The following codecs are provided:
    //   CR  - use this if the target data uses /n as a delimiter for framing.
    //         The CR codec will take care of buffering the incoming data so that
    //         your codec will only receive complete 'ready to use' packets
    //  If your target uses /n delimited strings, set baseCodecs = "CR"
    //  If your target uses some other format for data (e.g. binary data or custom strings) leave baseCodecs = "undefined"
    var baseCodecs;
    gc.databind.registerCustomCodec("custom",CustomCodec, baseCodecs);

});
