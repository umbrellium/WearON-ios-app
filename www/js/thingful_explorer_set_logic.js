//some global variables for the logic panel 
var greater_than_ThingfulExplorer = 1;
var D10_on_ThingfulExplorer = false;
var on_ThingfulExplorer = false;
var check_number_ThingfulExplorer = false;
var numThingfulExplorer; // number input by user

function toggelConnect_explore_thingful() {
  if (show_thingful_explorer_logic_panel) {
    show_thingful_explorer_logic_panel = false;
    $('#connect_thingful_explorer_panel').hide();

    if (logic_constructed_thingful_explorer == true) {
      $('#connect_explore_thingful').css("background-color", "black");
      $('#connect_explore_thingful').css("color", "white");
      $('#connect_explore_thingful').text('Reset Logic');
    } else {
      $('#connect_explore_thingful').css("background-color", "white");
      $('#connect_explore_thingful').css("color", "black");
      $('#connect_explore_thingful').text('Set Logic');
    }
    checkLogic_thingful_explorer_number();
    checkVisualStatus();

  } else {
    show_thingful_explorer_logic_panel = true;
    $('#connect_thingful_explorer_panel').show();
    $('#connect_explore_thingful').css("background-color", "black");
    $('#connect_explore_thingful').css("color", "white");
    $('#connect_explore_thingful').text('Close panel');

    app.sendData([0x01, 0x00, 0x02]); //turn D9 off
    app.sendData([0x01, 0x00, 0x04]); // turn D10 off

    $('#connect_thingful_explorer_panel').show();
    checkLogic_thingful_explorer_number();
    checkVisualStatus();
  }
}

function checkLogic_thingful_explorer_greater_than() {

  initiateLogic_thingful_explorer();

  if (greater_than_ThingfulExplorer == "1") {

    greater_than_ThingfulExplorer = 2;
    $('#greater_than_thingful_explorer').html('>');
  } else if (greater_than_ThingfulExplorer == "2") {
    greater_than_ThingfulExplorer = 3;
    $('#greater_than_thingful_explorer').html('=');
  } else {
    greater_than_ThingfulExplorer = 1;
    $('#greater_than_thingful_explorer').html('<');
  }

}

function checkLogic_thingful_explorer_output() {

  initiateLogic_thingful_explorer();

  if (D10_on_ThingfulExplorer) {
    D10_on_ThingfulExplorer = false; // D9 selected
    $('#select_output_thingful_explorer').html('D9');
    checkLogic_thingful_explorer_number();
  } else {
    D10_on_ThingfulExplorer = true; // D10 selected
    $('#select_output_thingful_explorer').html('D10');
    checkLogic_thingful_explorer_number();
  }

}

function checkLogic_thingful_explorer_on_off() {

  initiateLogic_thingful_explorer();

  if (on_ThingfulExplorer) {
    on_ThingfulExplorer = false;
    $('#on_off_thingful_explorer').html('OFF');
  } else {
    on_ThingfulExplorer = true;
    $('#on_off_thingful_explorer').html('ON');
  }

}

//check overall logic of the statement made by user for data feed 1 
function checkLogic_thingful_explorer_number() {

  numThingfulExplorer = document.getElementById("numbering_thingful_explorer").value;

  if (numThingfulExplorer == "") { //if no number input in number box

    $('#check_logic_status_thingful_explorer_number').show();
    $('#check_logic_status_thingful_explorer_number').html('*error: input number is not within range*');
    $('#check_logic_status_thingful_explorer_number').css("color", "red");

    $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Unsuccessful-</b>');
    $('#check_overall_logic_status_thingful_explorer').css("color", "red");

    check_number_ThingfulExplorer = false; //number check turns out incorrect
    logic_constructed_thingful_explorer = false;

    //this section run check to check whether D9/D10 is enabled
    if (D10_on_ThingfulExplorer == false) { //if D9 selected

      if (digital_enabled_D9 == false) {

        $('#check_logic_status_thingful_explorer_output').show();
        $('#check_logic_status_thingful_explorer_output').html('*Error - D9 is not enabled*');
        $('#check_logic_status_thingful_explorer_output').css("color", "red");

      } else {
        $('#check_logic_status_thingful_explorer_output').hide();
      }

    } else if (D10_on_ThingfulExplorer == true) { //if D10 selected

      if (digital_enabled_D10 == false) {

        $('#check_logic_status_thingful_explorer_output').show();
        $('#check_logic_status_thingful_explorer_output').html('*Error - D10 is not enabled*');
        $('#check_logic_status_thingful_explorer_output').css("color", "red");

      } else {
        $('#check_logic_status_thingful_explorer_output').hide();
      }

    }

  } else { // if there is number input

    initiateLogic_thingful_explorer();

    check_number_ThingfulExplorer = true; //number check turns out correct
    $('#check_logic_status_thingful_explorer_number').hide();

    if (D10_on_ThingfulExplorer == false) { //if D9 selected

      if (digital_enabled_D9 == true) { //if D9 pin is enabled
        logic_constructed_thingful_explorer = true;

        $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Successful-</b>');
        $('#check_overall_logic_status_thingful_explorer').css("color", "green");

        $('#check_logic_status_thingful_explorer_output').hide(); // hide output check if D9 is enabled

      } else {
        logic_constructed_thingful_explorer = false;

        $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Unsuccessful-</b>');
        $('#check_overall_logic_status_thingful_explorer').css("color", "red");

        $('#check_logic_status_thingful_explorer_output').show();
        $('#check_logic_status_thingful_explorer_output').html('*Error - D9 is not enabled*');
        $('#check_logic_status_thingful_explorer_output').css("color", "red");
      }

    } else if (D10_on_ThingfulExplorer == true) { //if D10 selected

      if (digital_enabled_D10 == true) { //if D10 pin is enabled
        logic_constructed_thingful_explorer = true;

        $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Successful-</b>');
        $('#check_overall_logic_status_thingful_explorer').css("color", "green");

        $('#check_logic_status_thingful_explorer_output').hide(); // hide output check if D9 is enabled

      } else {
        logic_constructed_thingful_explorer = false;

        $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Unsuccessful-</b>');
        $('#check_overall_logic_status_thingful_explorer').css("color", "red");

        $('#check_logic_status_thingful_explorer_output').show();
        $('#check_logic_status_thingful_explorer_output').html('*Error - D10 is not enabled*');
        $('#check_logic_status_thingful_explorer_output').css("color", "red");

      }

    }

  }

  if (D10_on_ThingfulExplorer == false) { // if D9 selected by cross connectivity panel
    if (logic_constructed_D9 == true) { // if D9 is used in device control panel
      $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_thingful_explorer').css("color", "red");

      $('#check_logic_status_thingful_explorer_output').show();
      $('#check_logic_status_thingful_explorer_output').html('*Error - D9 is in use*');
      $('#check_logic_status_thingful_explorer_output').css("color", "red");
      logic_constructed_thingful_explorer = false;

      if (show_panel_thingful_explorer == false) {
        $('#connect_explore_thingful').css("background-color", "white");
        $('#connect_explore_thingful').css("color", "black");
        $('#connect_explore_thingful').text('Set Logic');
      }
    } else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == false)) { // if D9 is used in global connected device
      $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_thingful_explorer').css("color", "red");

      $('#check_logic_status_thingful_explorer_output').show();
      $('#check_logic_status_thingful_explorer_output').html('*Error - D9 is in use*');
      $('#check_logic_status_thingful_explorer_output').css("color", "red");
      logic_constructed_thingful_explorer = false;

      if (show_panel_thingful_explorer == false) {
        $('#connect_explore_thingful').css("background-color", "white");
        $('#connect_explore_thingful').css("color", "black");
        $('#connect_explore_thingful').text('Set Logic');
      }
    }

  } else if (D10_on_ThingfulExplorer == true) { // if D10 selected by cross connectivity panel

    if (logic_constructed_D10 == true) { // if D10 is used in device control panel
      $('#check_overall_logic_status_thingful_explorer').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_thingful_explorer').css("color", "red");

      $('#check_logic_status_thingful_explorer_output').show();
      $('#check_logic_status_thingful_explorer_output').html('*Error - D10 is in use*');
      $('#check_logic_status_thingful_explorer_output').css("color", "red");
      logic_constructed_thingful_explorer = false;

      if (show_panel_thingful_explorer == false) {
        $('#connect_explore_thingful').css("background-color", "white");
        $('#connect_explore_thingful').css("color", "black");
        $('#connect_explore_thingful').text('Set Logic');
      }
    } else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == true)) { // if D10 is used in global connected device
      $('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_data_feed_1').css("color", "red");

      $('#check_overall_logic_status_thingful_explorer').show();
      $('#check_overall_logic_status_thingful_explorer').html('*Error - D10 is in use*');
      $('#check_overall_logic_status_thingful_explorer').css("color", "red");
      logic_constructed_thingful_explorer = false;

      if (show_panel_thingful_explorer == false) {
        $('#connect_explore_thingful').css("background-color", "white");
        $('#connect_explore_thingful').css("color", "black");
        $('#connect_explore_thingful').text('Set Logic');
      }
    }
  }

}


function initiateLogic_thingful_explorer() {

  numThingfulExplorer = parseInt(numThingfulExplorer); // parse the var into strictly number value

  if (logic_constructed_thingful_explorer == true) {

    if (D10_on_ThingfulExplorer == false) { // if D9 selected

      if (on_ThingfulExplorer == true) { // if selected: ON

        if (greater_than_ThingfulExplorer == "1") { // selected: <

          if (thingful_explorer_reading < numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          } else {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          }
        } else if (greater_than_ThingfulExplorer == "2") { // selected: >

          if (thingful_explorer_reading > numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          } else {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          }
        } else if (greater_than_ThingfulExplorer == "3") { // selected: =

          if (thingful_explorer_reading == numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          } else {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          }
        }

      } else { // if selected: OFF

        if (greater_than_ThingfulExplorer == "1") { // selected: <

          if (thingful_explorer_reading < numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          } else {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          }
        } else if (greater_than_ThingfulExplorer == "2") { // selected: >

          if (thingful_explorer_reading > numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          } else {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          }
        } else if (greater_than_ThingfulExplorer == "3") { // selected: =

          if (thingful_explorer_reading == numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          } else {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          }
        }

      }

    } else { // if D10 selected

      if (on_ThingfulExplorer == true) { // if selected: ON

        if (greater_than_ThingfulExplorer == "1") { // selected: <

          if (thingful_explorer_reading < numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          } else {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          }
        } else if (greater_than_ThingfulExplorer == "2") { // selected: >

          if (thingful_explorer_reading > numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          } else {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          }
        } else if (greater_than_ThingfulExplorer == "3") { // selected: =

          if (thingful_explorer_reading == numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          } else {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          }
        }

      } else { // if selected: OFF

        if (greater_than_ThingfulExplorer == "1") { // selected: <

          if (thingful_explorer_reading < numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          } else {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          }
        } else if (greater_than_ThingfulExplorer == "2") { // selected: >

          if (thingful_explorer_reading > numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          } else {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          }
        } else if (greater_than_ThingfulExplorer == "3") { // selected: =

          if (thingful_explorer_reading == numThingfulExplorer) {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          } else {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          }
        }

      }

    }
  }

}