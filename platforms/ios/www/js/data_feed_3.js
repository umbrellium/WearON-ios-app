//some global variables for the logic panel 
var greater_than_DataFeed3 = 1;
var D10_on_DataFeed3 = false;
var on_DataFeed3 = false;
var check_number_DataFeed3 = false;
var numDataFeed3; // number input by user

//enable retrieve of data feed 1
function toggelgetDataFeed3() {

  if (get_data_feed_3) {
    get_data_feed_3 = false;
    if (get_data_3_success == false) {
      $('#get_data_set_3').css("background-color", "white");
      $('#get_data_set_3').css("color", "black");
      $('#get_data_set_3').html("Retrieve");
      $('#get_data_set_3').css("padding-left", "22px");
      $('#get_data_set_3').css("padding-right", "22px");
      $("#get_data_set_3_panel").hide();

      //hide the set logic button
      $('#connect_data_set_3').hide();

    } else if (get_data_3_success == true) { // if data retreival is successful
      $('#get_data_set_3').css("background-color", "black");
      $('#get_data_set_3').css("color", "white");
      $("#get_data_set_3").html("Reset");
      $('#get_data_set_3').css("padding-left", "30px");
      $('#get_data_set_3').css("padding-right", "30px");
      $("#get_data_set_3_panel").hide();

      // show the set logic button
      $('#connect_data_set_3').show();
    }
    checkVisualStatus();
  } else {
    get_data_feed_3 = true;
    $('#get_data_set_3').css("background-color", "black");
    $('#get_data_set_3').css("color", "white");
    $('#get_data_set_3').html("Close Panel");
    $('#get_data_set_3').css("padding-left", "16px");
    $('#get_data_set_3').css("padding-right", "16px");
    $("#get_data_set_3_panel").show();
    $(".useStoredConnectKey_3").hide();
    $("#confirmation_connect_3").hide();
    $("#ReadApi_3").hide();
    $("#channelID_3").hide();
    $("#channel_field_1_3").hide();
    $("#channel_field_2_3").hide();
    $("#key9").val("");//data_feed_2
    $("#key10").val("");//data_feed_2

    //if there is stored key info, show it on panel
    if (localStorage.lastSavedConnectKey_3 != "-") {
      $(".useStoredConnectKey_3").show();
      $(".useStoredConnectKey_3").html("<p>Use Last Save Key: <br><b>" + localStorage.lastSavedConnectKey_3 + "</b></p>");
    } else {
      $(".useStoredConnectKey_3").hide();
    }
    checkVisualStatus();
  }

}

//enable connection of data feed 3 to other outputs
function toggelConnect_data_feed_3() {

  if (show_panel_data_feed_3) {
    show_panel_data_feed_3 = false;
    $('#connect_data_feed_3_panel').hide();

    if (logic_constructed_data_feed_3 == true) {

      $('#connect_data_set_3').css("background-color", "black");
      $('#connect_data_set_3').css("color", "white");
      $('#connect_data_set_3').text('Reset Logic');

    } else {

      $('#connect_data_set_3').css("background-color", "white");
      $('#connect_data_set_3').css("color", "black");
      $('#connect_data_set_3').text('Set Logic');

    }

    checkLogic_data_feed_3_number();
    checkVisualStatus();
  } else {
    show_panel_data_feed_3 = true;
    $('#connect_data_set_3').css("background-color", "black");
    $('#connect_data_set_3').css("color", "white");
    $('#connect_data_set_3').text('Close panel');

    app.sendData([0x01, 0x00, 0x02]); //turn D9 off
    app.sendData([0x01, 0x00, 0x04]); // turn D10 off

    $('#connect_data_feed_3_panel').show();
    checkLogic_data_feed_3_number();
    checkVisualStatus();

  }

}

function checkLogic_data_feed_3_greater_than() {

  if (greater_than_DataFeed3 == "1") {

    greater_than_DataFeed3 = 2;
    $('#greater_than_data_feed_3').html('>');
  } else if (greater_than_DataFeed3 == "2") {
    greater_than_DataFeed3 = 3;
    $('#greater_than_data_feed_3').html('=');
  } else {
    greater_than_DataFeed3 = 1;
    $('#greater_than_data_feed_3').html('<');
  }

}

function checkLogic_data_feed_3_output() {

  if (D10_on_DataFeed3) {
    D10_on_DataFeed3 = false; // D9 selected
    $('#select_output_data_feed_3').html('D9');
    checkLogic_data_feed_3_number();
  } else {
    D10_on_DataFeed3 = true; // D10 selected
    $('#select_output_data_feed_3').html('D10');
    checkLogic_data_feed_3_number();
  }

}

function checkLogic_data_feed_3_on_off() {

  if (on_DataFeed3) {
    on_DataFeed3 = false;
    $('#on_off_data_feed_3').html('OFF');
  } else {
    on_DataFeed3 = true;
    $('#on_off_data_feed_3').html('ON');
  }

}

//check overall logic of the statement made by user for data feed 3
function checkLogic_data_feed_3_number() {

  numDataFeed3 = document.getElementById("numbering_data_feed_3").value;

  if (numDataFeed3 == "") { //if no number input in number box

    $('#check_logic_status_data_feed_3_number').show();
    $('#check_logic_status_data_feed_3_number').html('*error: input number is not within range*');
    $('#check_logic_status_data_feed_3_number').css("color", "red");

    $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
    $('#check_overall_logic_status_data_feed_3').css("color", "red");

    check_number_DataFeed3 = false; //number check turns out incorrect
    logic_constructed_data_feed_3 = false;

    //this section run check to check whether D9/D10 is enabled
    if (D10_on_DataFeed3 == false) { //if D9 selected

      if (digital_enabled_D9 == false) {

        $('#check_logic_status_data_feed_3_output').show();
        $('#check_logic_status_data_feed_3_output').html('*Error - D9 is not enabled*');
        $('#check_logic_status_data_feed_3_output').css("color", "red");

      } else {
        $('#check_logic_status_data_feed_3_output').hide();
      }

    } else if (D10_on_DataFeed3 == true) { //if D10 selected

      if (digital_enabled_D10 == false) {

        $('#check_logic_status_data_feed_3_output').show();
        $('#check_logic_status_data_feed_3_output').html('*Error - D10 is not enabled*');
        $('#check_logic_status_data_feed_3_output').css("color", "red");

      } else {
        $('#check_logic_status_data_feed_3_output').hide();
      }

    }

  } else { // if there is number input

    check_number_DataFeed3 = true; //number check turns out correct
    $('#check_logic_status_data_feed_3_number').hide();

    if (D10_on_DataFeed3 == false) { //if D9 selected

      if (digital_enabled_D9 == true) { //if D9 pin is enabled
        logic_constructed_data_feed_3 = true;

        $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Successful-</b>');
        $('#check_overall_logic_status_data_feed_3').css("color", "green");

        $('#check_logic_status_data_feed_3_output').hide(); // hide output check if D9 is enabled

      } else {
        logic_constructed_data_feed_3 = false;

        $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
        $('#check_overall_logic_status_data_feed_3').css("color", "red");

        $('#check_logic_status_data_feed_3_output').show();
        $('#check_logic_status_data_feed_3_output').html('*Error - D9 is not enabled*');
        $('#check_logic_status_data_feed_3_output').css("color", "red");
      }

    } else if (D10_on_DataFeed3 == true) { //if D10 selected

      if (digital_enabled_D10 == true) { //if D10 pin is enabled
        logic_constructed_data_feed_3 = true;

        $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Successful-</b>');
        $('#check_overall_logic_status_data_feed_3').css("color", "green");

        $('#check_logic_status_data_feed_3_output').hide(); // hide output check if D9 is enabled

      } else {
        logic_constructed_data_feed_3 = false;

        $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
        $('#check_overall_logic_status_data_feed_3').css("color", "red");

        $('#check_logic_status_data_feed_3_output').show();
        $('#check_logic_status_data_feed_3_output').html('*Error - D10 is not enabled*');
        $('#check_logic_status_data_feed_3_output').css("color", "red");

      }

    }

  }

  if (D10_on_DataFeed3 == false) { // if D9 selected by cross connectivity panel
    if (logic_constructed_D9 == true) { // if D9 is used in device control panel
      $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_data_feed_3').css("color", "red");

      $('#check_logic_status_data_feed_3_output').show();
      $('#check_logic_status_data_feed_3_output').html('*Error - D9 is in use*');
      $('#check_logic_status_data_feed_3_output').css("color", "red");
      logic_constructed_data_feed_3 = false;

      if (show_panel_data_feed_3 == false) {
        $('#connect_data_set_3').css("background-color", "white");
        $('#connect_data_set_3').css("color", "black");
        $('#connect_data_set_3').text('Set Logic');
      }
    } else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == false)) { // if D9 is used in global connected device
      $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_data_feed_3').css("color", "red");

      $('#check_logic_status_data_feed_3_output').show();
      $('#check_logic_status_data_feed_3_output').html('*Error - D9 is in use*');
      $('#check_logic_status_data_feed_3_output').css("color", "red");
      logic_constructed_data_feed_3 = false;

      if (show_panel_data_feed_3 == false) {
        $('#connect_data_set_3').css("background-color", "white");
        $('#connect_data_set_3').css("color", "black");
        $('#connect_data_set_3').text('Set Logic');
      }
    }

  } else if (D10_on_DataFeed3 == true) { // if D10 selected by cross connectivity panel

    if (logic_constructed_D10 == true) { // if D10 is used in device control panel
      $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_data_feed_3').css("color", "red");

      $('#check_logic_status_data_feed_3_output').show();
      $('#check_logic_status_data_feed_3_output').html('*Error - D10 is in use*');
      $('#check_logic_status_data_feed_3_output').css("color", "red");
      logic_constructed_data_feed_3 = false;

      if (show_panel_data_feed_3 == false) {
        $('#connect_data_set_3').css("background-color", "white");
        $('#connect_data_set_3').css("color", "black");
        $('#connect_data_set_3').text('Set Logic');
      }
    } else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == true)) { // if D10 is used in global connected device
      $('#check_overall_logic_status_data_feed_3').html('<b>-Logic: Unsuccessful-</b>');
      $('#check_overall_logic_status_data_feed_3').css("color", "red");

      $('#check_logic_status_data_feed_3_output').show();
      $('#check_logic_status_data_feed_3_output').html('*Error - D10 is in use*');
      $('#check_logic_status_data_feed_3_output').css("color", "red");
      logic_constructed_data_feed_3 = false;

      if (show_panel_data_feed_3 == false) {
        $('#connect_data_set_3').css("background-color", "white");
        $('#connect_data_set_3').css("color", "black");
        $('#connect_data_set_3').text('Set Logic');
      }
    }
  }

}

function initiateLogic_data_feed_3() {

  numDataFeed3 = parseInt(numDataFeed3); // parse the var into strictly number value

  if (logic_constructed_data_feed_3 == true) {

    if (D10_on_DataFeed3 == false) { // if D9 selected

      if (on_DataFeed3 == true) { // if selected: ON

        if (greater_than_DataFeed3 == "1") { // selected: <

          if (data_feed_3_reading < numDataFeed3) {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          } else {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          }
        } else if (greater_than_DataFeed3 == "2") { // selected: >

          if (data_feed_3_reading > numDataFeed3) {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          } else {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          }
        } else if (greater_than_DataFeed3 == "3") { // selected: =

          if (data_feed_2_reading == numDataFeed3) {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          } else {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          }
        }

      } else { // if selected: OFF

        if (greater_than_DataFeed3 == "1") { // selected: <

          if (data_feed_3_reading < numDataFeed3) {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          } else {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          }
        } else if (greater_than_DataFeed3 == "2") { // selected: >

          if (data_feed_3_reading > numDataFeed3) {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          } else {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          }
        } else if (greater_than_DataFeed3 == "3") { // selected: =

          if (data_feed_3_reading == numDataFeed3) {
            app.sendData([0x01, 0x00, 0x02]); // turn D9 off
          } else {
            app.sendData([0x01, 0x00, 0x01]); // turn D9 on
          }
        }

      }

    } else { // if D10 selected

      if (on_DataFeed3 == true) { // if selected: ON

        if (greater_than_DataFeed3 == "1") { // selected: <

          if (data_feed_3_reading < numDataFeed3) {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          } else {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          }
        } else if (greater_than_DataFeed3 == "2") { // selected: >

          if (data_feed_3_reading > numDataFeed3) {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          } else {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          }
        } else if (greater_than_DataFeed3 == "3") { // selected: =

          if (data_feed_3_reading == numDataFeed3) {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          } else {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          }
        }

      } else { // if selected: OFF

        if (greater_than_DataFeed3 == "1") { // selected: <

          if (data_feed_3_reading < numDataFeed3) {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          } else {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          }
        } else if (greater_than_DataFeed3 == "2") { // selected: >

          if (data_feed_3_reading > numDataFeed3) {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          } else {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          }
        } else if (greater_than_DataFeed3 == "3") { // selected: =

          if (data_feed_3_reading == numDataFeed3) {
            app.sendData([0x01, 0x00, 0x04]); // turn D10 off
          } else {
            app.sendData([0x01, 0x00, 0x03]); // turn D10 on
          }
        }

      }

    }
  }

}