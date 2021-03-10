/******************************************************************************************
 * To add additional script to the scripting widget, create/upload a JavaScript file
 * to the 'scripts' folder. Open the scripting.html file in the editor by double clicking
 * the file in the Project view. Append the filename to the 'scripts' attribute in the
 * ti-widget-scripting element, separated each script filename by a comma.
 ******************************************************************************************/

const SCRIPT_START_MESSAGE = 'Script Started';
const SCRIPT_END_MESSAGE   = 'Script Ended';

/**
 * The entry point for the script, this function will be called when the user presses
 * the RUN button in the scripting widget. Any call to access the controller must be
 * initiated within this function.
 */
function main() {
    /*
     * To debug this script, open the debugger in the main application window that
     * spawned this window. For most browser, press F12 to enable debugging.
     *
     * The 'debugger' keyword is an inline breakpoint. Uncomment the following line to stop
     * the script at main when the debugger is opened.
     */
    // debugger

    /* Log to text file */
    // log(SCRIPT_START_MESSAGE);

    /* Read the acc_en register and toggle it */
    // let acc_en = read('acc_en');
    // write('acc_en', acc_en == 0x0f ? 0x00 : 0x0f);

    /* Invoking a function using the AEVMCodec I2C interface */
    // invoke('I2C_WriteRegister', [2, 0x18, 8, 0, [48, 0]], 'i2c');

    /* Log to text file */
    // log(SCRIPT_END_MESSAGE);
}