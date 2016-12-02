app.receivedData = function(data) {

	if (app.connected) {
		var data = new Uint8Array(data);
		// data are sent in packet of 3: (pin, value0, value1), (pin, value0, value1), etc
		var chunkSize = 3;
		// slicing data in chunk of 3
		for (var i = 0; i < data.length; i += chunkSize) {
			// manually getting the 2nd and 3rd data set ( value0 and value1)
			var value = (data[i + 1] << 8) | data[i + 2];

			//portal for A0 analog input pin 
			if (data[i] === 0x0F) {
				if (analog_enabled_A0) {

					// if ((lockScreenStatus == true) || (userQuitApp == true)) {
					// 	checkDataForUser();
					// }

					// if (digital_enabled_D9 == true) {
					// 	initiateLogicA4_D9();
					// }

					// if (digital_enabled_D10 == true) {
					// 	initiateLogicA4_D10();
					// }

					if (value > 0) {
						A0reading = value;
						document.getElementById("valueA0").innerHTML = "<b> A0 Reading = " + A0reading + "</b>";
						$('#valueA0').css("color", "black");
						$('.connectA0').show();
						$('#connectA0error').hide();
					} else if (A0reading == undefined) {
						document.getElementById("valueA0").innerHTML = "<b> A0 Reading = " + A0reading + "</b>";
						connect_to_A0 = false;
						$('.connectA0').text('Connect to Thingspeak ' + analogSensor6);
						$('.connectA0status').hide();
						$('#connectA0error').show();
					} else {
						document.getElementById("valueA0").innerHTML = "<b> A0 Reading = " + A0reading + "</b>";
						$('#valueA0').css("color", "red");
						$('#connectA0error').show();
					}
				}
			}

			//portal for A1 analog input pin 
			if (data[i] === 0x0E) {
				if (analog_enabled_A1) {

					// if ((lockScreenStatus == true) || (userQuitApp == true)) {
					// 	checkDataForUser();
					// }

					// if (digital_enabled_D9 == true) {
					// 	initiateLogicA4_D9();
					// }

					// if (digital_enabled_D10 == true) {
					// 	initiateLogicA4_D10();
					// }

					if (value > 0) {
						A1reading = value;
						document.getElementById("valueA1").innerHTML = "<b> A1 Reading = " + A1reading + "</b>";
						$('#valueA1').css("color", "black");
						$('.connectA1').show();
						$('#connectA1error').hide();
					} else if (A1reading == undefined) {
						document.getElementById("valueA1").innerHTML = "<b> A1 Reading = " + A1reading + "</b>";
						connect_to_A1 = false;
						$('.connectA1').text('Connect to Thingspeak ' + analogSensor5);
						$('.connectA1status').hide();
						$('#connectA1error').show();
					} else {
						document.getElementById("valueA1").innerHTML = "<b> A1 Reading = " + A1reading + "</b>";
						$('#valueA1').css("color", "red");
						$('#connectA1error').show();
					}
				}
			}

			//portal for A2 analog input pin 
			if (data[i] === 0x0D) {
				if (analog_enabled_A2) {

					// if ((lockScreenStatus == true) || (userQuitApp == true)) {
					// 	checkDataForUser();
					// }

					// if (digital_enabled_D9 == true) {
					// 	initiateLogicA4_D9();
					// }

					// if (digital_enabled_D10 == true) {
					// 	initiateLogicA4_D10();
					// }

					if (value > 0) {
						A2reading = value;
						document.getElementById("valueA2").innerHTML = "<b> A2 Reading = " + A2reading + "</b>";
						$('#valueA2').css("color", "black");
						$('.connectA2').show();
						$('#connectA2error').hide();
					} else if (A2reading == undefined) {
						document.getElementById("valueA2").innerHTML = "<b> A2 Reading = " + A2reading + "</b>";
						connect_to_A2 = false;
						$('.connectA2').text('Connect to Thingspeak ' + analogSensor4);
						$('.connectA2status').hide();
						$('#connectA2error').show();
					} else {
						document.getElementById("valueA2").innerHTML = "<b> A2 Reading = " + A2reading + "</b>";
						$('#valueA2').css("color", "red");
						$('#connectA2error').show();
					}
				}
			}

			//portal for A3 analog input pin 
			if (data[i] === 0x0C) {
				if (analog_enabled_A3) {

					// if ((lockScreenStatus == true) || (userQuitApp == true)) {
					// 	checkDataForUser();
					// }

					// if (digital_enabled_D9 == true) {
					// 	initiateLogicA4_D9();
					// }

					// if (digital_enabled_D10 == true) {
					// 	initiateLogicA4_D10();
					// }

					if (value > 0) {
						A3reading = value;
						document.getElementById("valueA3").innerHTML = "<b> A3 Reading = " + A3reading + "</b>";
						$('#valueA3').css("color", "black");
						$('.connectA3').show();
						$('#connectA3error').hide();
					} else if (A3reading == undefined) {
						document.getElementById("valueA3").innerHTML = "<b> A3 Reading = " + A3reading + "</b>";
						connect_to_A3 = false;
						$('.connectA3').text('Connect to Thingspeak ' + analogSensor3);
						$('.connectA3status').hide();
						$('#connectA3error').show();
					} else {
						document.getElementById("valueA3").innerHTML = "<b> A3 Reading = " + A3reading + "</b>";
						$('#valueA3').css("color", "red");
						$('#connectA3error').show();
					}
				}
			}

			//portal for A4 analog input pin 
			if (data[i] === 0x0A) {
				if (analog_enabled_A4) {

					if ((lockScreenStatus == true) || (userQuitApp == true)) {
						checkDataForUser();
					}

					if (digital_enabled_D9 == true) {
						initiateLogicA4_D9();
					}

					if (digital_enabled_D10 == true) {
						initiateLogicA4_D10();
					}

					if (value > 0) {
						A4reading = value;
						document.getElementById("valueA4").innerHTML = "<b> A4 Reading = " + A4reading + "</b>";
						$('#valueA4').css("color", "black");
						$('.connectA4').show();
						$('#connectA4error').hide();
					} else if (A4reading == undefined) {
						document.getElementById("valueA4").innerHTML = "<b> A4 Reading = " + A4reading + "</b>";
						connect_to_A4 = false;
						$('.connectA4').text('Connect to Thingspeak ' + analogSensor1);
						$('.connectA4status').hide();
						$('#connectA4error').show();
					} else {
						document.getElementById("valueA4").innerHTML = "<b> A4 Reading = " + A4reading + "</b>";
						$('#valueA4').css("color", "red");
						$('#connectA4error').show();
					}
				}
			}

			//portal for A5 analog input pin 
			if (data[i] === 0x0B) {
				if (analog_enabled_A5) {

					if ((lockScreenStatus == true) || (userQuitApp == true)) {
						checkDataForUser();
					}

					if (digital_enabled_D9 == true) {
						initiateLogicA5_D9();
					}

					if (digital_enabled_D10 == true) {
						initiateLogicA5_D10();
					}

					if (value > 0) {
						A5reading = value;
						document.getElementById("valueA5").innerHTML = "<b> A5 Reading = " + A5reading + "</b>";
						$('#valueA5').css("color", "black");
						$('.connectA5').show();
						$('#connectA5error').hide();
					} else if (A5reading == undefined) {
						document.getElementById("valueA5").innerHTML = "<b> A5 Reading = " + A5reading + "</b>";
						$('#valueA5').css("color", "red");
						connect_to_A5 = false;
						$('.connectA5').text('Connect to Thingspeak ' + analogSensor2);
						$('.connectA5status').hide();
						$('#connectA5error').show();
					} else {
						document.getElementById("valueA5").innerHTML = "<b> A5 Reading = " + A5reading + "</b>";
						$('#valueA5').css("color", "red");
						$('#connectA5error').show();
					}
				}
			}

			// else if (data[0] === 0x0C)
			// 		{
			// 		$('#digitalInputResult').text(data[1] ? 'High' : 'Low');
			// 		}
			else if (data[i] === 0xB0) {
				// alert("hey");
				//send a tracker count to phone, for debugging if app quit by accident
				// activate();
				//make sure counter counts btw 0-100
				if (dataReceivedTracker > 500) {
					dataReceivedTracker = 0;
					dataReceivedTracker++;
				} else {
					dataReceivedTracker++;
				}
				keepTrackConnection();
			}

		}
	} else {
		// Write debug information to console
		// alert('Error - No device connected.');
	}

};
//enable/disable A0 analog pin on and off
app.toggelAnalogA0 = function() {
	if (analog_enabled_A0) {
		analog_enabled_A0 = false;
		localStorage.analog_enabled_A0 = analog_enabled_A0;
		app.sendData([0xA0, 0x12, 0x00]); // send to hardware to turn A0 off
		$('#valueA0').empty();
		$('.connectA0').hide();
		$('#connectA0status').hide();
		$('#connectA0error').hide();
		$('.enableA0').css("background-color", "white");
		$('.enableA0').css("color", "black");
		$('.enableA0').text('Enable Pin');
		$('.connectA0').text('Connect to Thingspeak ');
		connect_to_A0 = false;
		$('.connectA0').css("background-color", "white");
		$('.connectA0').css("color", "black");

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	} else {
		analog_enabled_A0 = true;
		localStorage.analog_enabled_A0 = analog_enabled_A0;
		app.sendData([0xA0, 0x11, 0x00]); // send to hardware to turn A0 on
		$('.enableA0').css("background-color", "black");
		$('.enableA0').css("color", "white");
		$('.enableA0').text('Disable Pin');

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	}
};

//enable/disable A1 analog pin on and off
app.toggelAnalogA1 = function() {
	if (analog_enabled_A1) {
		analog_enabled_A1 = false;
		localStorage.analog_enabled_A1 = analog_enabled_A1;
		app.sendData([0xA0, 0x10, 0x00]); // send to hardware to turn A1 off
		$('#valueA1').empty();
		$('.connectA1').hide();
		$('#connectA1status').hide();
		$('#connectA1error').hide();
		$('.enableA1').css("background-color", "white");
		$('.enableA1').css("color", "black");
		$('.enableA1').text('Enable Pin');
		$('.connectA1').text('Connect to Thingspeak ');
		connect_to_A1 = false;
		$('.connectA1').css("background-color", "white");
		$('.connectA1').css("color", "black");

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	} else {
		analog_enabled_A1 = true;
		localStorage.analog_enabled_A1 = analog_enabled_A1;
		app.sendData([0xA0, 0x09, 0x00]); // send to hardware to turn A1 on
		$('.enableA1').css("background-color", "black");
		$('.enableA1').css("color", "white");
		$('.enableA1').text('Disable Pin');

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	}
};

//enable/disable A2 analog pin on and off
app.toggelAnalogA2 = function() {
	if (analog_enabled_A2) {
		analog_enabled_A2 = false;
		localStorage.analog_enabled_A2 = analog_enabled_A2;
		app.sendData([0xA0, 0x08, 0x00]); // send to hardware to turn A2 off
		$('#valueA2').empty();
		$('.connectA2').hide();
		$('#connectA2status').hide();
		$('#connectA2error').hide();
		$('.enableA2').css("background-color", "white");
		$('.enableA2').css("color", "black");
		$('.enableA2').text('Enable Pin');
		$('.connectA2').text('Connect to Thingspeak ');
		connect_to_A2 = false;
		$('.connectA2').css("background-color", "white");
		$('.connectA2').css("color", "black");

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	} else {
		analog_enabled_A2 = true;
		localStorage.analog_enabled_A2 = analog_enabled_A2;
		app.sendData([0xA0, 0x07, 0x00]); // send to hardware to turn A3 on
		$('.enableA2').css("background-color", "black");
		$('.enableA2').css("color", "white");
		$('.enableA2').text('Disable Pin');

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	}
};


//enable/disable A3 analog pin on and off
app.toggelAnalogA3 = function() {
	if (analog_enabled_A3) {

		analog_enabled_A3 = false;
		localStorage.analog_enabled_A3 = analog_enabled_A3;
		app.sendData([0xA0, 0x06, 0x00]); // send to hardware to turn A3 off
		$('#valueA3').empty();
		$('.connectA3').hide();
		$('#connectA3status').hide();
		$('#connectA3error').hide();
		$('.enableA3').css("background-color", "white");
		$('.enableA3').css("color", "black");
		$('.enableA3').text('Enable Pin');
		$('.connectA3').text('Connect to Thingspeak ');
		connect_to_A3 = false;
		$('.connectA3').css("background-color", "white");
		$('.connectA3').css("color", "black");

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	} else {
		analog_enabled_A3 = true;
		localStorage.analog_enabled_A3 = analog_enabled_A3;
		app.sendData([0xA0, 0x05, 0x00]); // send to hardware to turn A3 on
		$('.enableA3').css("background-color", "black");
		$('.enableA3').css("color", "white");
		$('.enableA3').text('Disable Pin');

		// if (show_panel_D9 == true) {
		// 	if (A5_on_D9 == false) { // if A4 for D9 selected
		// 		checkLogicD9_number();
		// 	}
		// }

		// if (show_panel_D10 == true) {
		// 	if (A5_on_D10 == false) { // if A4 for D10 selected
		// 		checkLogicD10_number();
		// 	}
		// }

	}
};

//enable/disable A4 analog pin on and off
app.toggelAnalogA4 = function() {
	if (analog_enabled_A4) {

		analog_enabled_A4 = false;
		localStorage.analog_enabled_A4 = analog_enabled_A4;
		app.sendData([0xA0, 0x02, 0x00]); // send to hardware to turn A4 off
		$('#valueA4').empty();
		$('.connectA4').hide();
		$('#connectA4status').hide();
		$('#connectA4error').hide();
		$('.enableA4').css("background-color", "white");
		$('.enableA4').css("color", "black");
		$('.enableA4').text('Enable Pin');
		$('.connectA4').text('Connect to Thingspeak ');
		connect_to_A4 = false;
		$('.connectA4').css("background-color", "white");
		$('.connectA4').css("color", "black");

		if (show_panel_D9 == true) {
			if (A5_on_D9 == false) { // if A4 for D9 selected
				checkLogicD9_number();
			}
		}

		if (show_panel_D10 == true) {
			if (A5_on_D10 == false) { // if A4 for D10 selected
				checkLogicD10_number();
			}
		}

	} else {
		analog_enabled_A4 = true;
		localStorage.analog_enabled_A4 = analog_enabled_A4;
		app.sendData([0xA0, 0x01, 0x00]); // send to hardware to turn A4 on
		$('.enableA4').css("background-color", "black");
		$('.enableA4').css("color", "white");
		$('.enableA4').text('Disable Pin');

		if (show_panel_D9 == true) {
			if (A5_on_D9 == false) { // if A4 for D9 selected
				checkLogicD9_number();
			}
		}

		if (show_panel_D10 == true) {
			if (A5_on_D10 == false) { // if A4 for D10 selected
				checkLogicD10_number();
			}
		}

	}
};

//enable/disable A5 analog pin on and off
app.toggelAnalogA5 = function() {
	if (analog_enabled_A5) {
		analog_enabled_A5 = false;
		localStorage.analog_enabled_A5 = analog_enabled_A5;
		app.sendData([0xA0, 0x04, 0x00]); // send to hardware to turn A5 off
		$('#valueA5').empty();
		$('.connectA5').hide();
		$('#connectA5status').hide();
		$('#connectA5error').hide();
		$('.enableA5').css("background-color", "white");
		$('.enableA5').css("color", "black");
		$('.enableA5').text('Enable Pin');
		$('.connectA5').text('Connect to Thingspeak');
		connect_to_A5 = false;
		$('.connectA5').css("background-color", "white");
		$('.connectA5').css("color", "black");

		if (show_panel_D9 == true) {
			if (A5_on_D9 == true) { // if A5 for D9 selected
				checkLogicD9_number();
			}
		}

		if (show_panel_D10 == true) {
			if (A5_on_D10 == true) { // if A5 for D10 selected
				checkLogicD10_number();
			}
		}

	} else {
		analog_enabled_A5 = true;
		localStorage.analog_enabled_A5 = analog_enabled_A5;
		app.sendData([0xA0, 0x03, 0x00]); // send to hardware to turn A5 on
		$('.enableA5').css("background-color", "black");
		$('.enableA5').css("color", "white");
		$('.enableA5').text('Disable Pin');

		if (show_panel_D9 == true) {
			if (A5_on_D9 == true) { // if A5 for D9 selected
				checkLogicD9_number();
			}
		}

		if (show_panel_D10 == true) {
			if (A5_on_D10 == true) { // if A5 for D10 selected
				checkLogicD10_number();
			}
		}
	}
};


//A tracking function that checks constantly to see whether phone app is still connected to device, if not disconnect
var trackConnection;

function keepTrackConnection() {
	//set a delay in count so that countTracker is always running behind dataReceivedTracker when app is connected
	trackConnection = setTimeout(startTracking, 1000);
}

function startTracking() {

	//make sure counter counts btw 0-100
	if (countTracker > 500) {
		countTracker = 0;
		countTracker++;
	} else {
		countTracker++;
	}
	// if diff is 0, it means dataReceivedTracker has stopped =  app disconnected
	var countDiff = dataReceivedTracker - countTracker;

	//if device is disconnected, countDiff will hit 0 at somepoint
	if (countDiff == 0) {

		//send a beep notification if device is disconnected from app while it is running in background
		if (cordova.plugins.backgroundMode.isActive() == true) {

			cordova.plugins.notification.local.schedule({
				id: 1,
				text: "Lost connection with device",
			});

		};

		//if in user mode(lockScreenStatus == true), rescan for that particular device that was once connected
		if (lockScreenStatus == true) {

			connectedDevice = undefined;

			$("#user_device_connection").show();

			app.startScan();

			//else if in designer mode, move on the disconnected device page
		} else {

			app.disconnect();

		}

		if (userQuitApp == true) {

			//check whether user has quit app before and reconnect as well
			userQuitAppReconnect = true;

			connectedDevice = undefined;

			$("#user_device_connection").show();

			app.startScan();

		}
	}
}