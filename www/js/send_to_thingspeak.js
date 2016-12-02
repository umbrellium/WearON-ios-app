//send data to user's thingspeak account when user starts using their hardware device

var connectThingspeak;

function connectingThingspeak() {
    connect_to_thingspeak();
    connectThingspeak = setInterval(connect_to_thingspeak, 15000); // default 15s, rate of thingspeak 
};

function connect_to_thingspeak() {
    console.log("pingping!");

    if (connect_to_A0 !== true) {
        A0reading = "";
    } else {
        A0count++;
    }

    if (connect_to_A1 !== true) {
        A1reading = "";
    } else {
        A1count++;
    }

    if (connect_to_A2 !== true) {
        A2reading = "";
    } else {
        A2count++;
    }

    if (connect_to_A3 !== true) {
        A3reading = "";
    } else {
        A3count++;
    }

    if (connect_to_A4 !== true) {
        A4reading = "";
    } else {
        A4count++;
    }

    if (connect_to_A5 !== true) {
        A5reading = "";
    } else {
        A5count++;
    }

    if (connect_to_Geo !== true) {
        myLocationLat = "";
        myLocationLong = "";
    } else {
        geoCount++;
    }


    if ((connect_to_A0 == true) || (connect_to_A1 == true) || (connect_to_A2 == true) || (connect_to_A3 == true) || (connect_to_A4 == true) || (connect_to_A5 == true)) {
        $.post("https://api.thingspeak.com/update", {
                api_key: thingspeakApi,
                field1: A0reading,
                field2: A1reading,
                field3: A2reading,
                field4: A3reading,
                field5: A4reading,
                field6: A5reading,
                field7: myLocationLat, // send latitude of user
                field8: myLocationLong, // send longitude of user
            },

            function(data, status) {
                if (status == "success") {
                    document.getElementById("connectA0status").innerHTML = "Number of readings sent to Thingspeak:" + A0count;
                    document.getElementById("connectA1status").innerHTML = "Number of readings sent to Thingspeak:" + A1count;
                    document.getElementById("connectA2status").innerHTML = "Number of readings sent to Thingspeak:" + A2count;
                    document.getElementById("connectA3status").innerHTML = "Number of readings sent to Thingspeak:" + A3count;
                    document.getElementById("connectA4status").innerHTML = "Number of readings sent to Thingspeak:" + A4count;
                    document.getElementById("connectA5status").innerHTML = "Number of readings sent to Thingspeak:" + A5count;
                    document.getElementById("geoStatus").innerHTML = "Number of readings sent to Thingspeak:" + geoCount;
                } else {
                    document.getElementById("connectA0status").innerHTML = "error";
                    document.getElementById("connectA1status").innerHTML = "error";
                    document.getElementById("connectA2status").innerHTML = "error";
                    document.getElementById("connectA3status").innerHTML = "error";
                    document.getElementById("connectA4status").innerHTML = "error";
                    document.getElementById("connectA5status").innerHTML = "error";
                    document.getElementById("geoStatus").innerHTML = "error";
                }
            });
    } else {
        $('#connectA0status').hide();
        $('#connectA1status').hide();
        $('#connectA2status').hide();
        $('#connectA3status').hide();
        $('#connectA4status').hide();
        $('#connectA5status').hide();
        $('#geoStatus').hide();
    }
};

function toggelConnectA0() {

    if (connect_to_A0) {
        connect_to_A0 = false;
        localStorage.connect_to_A0 = connect_to_A0;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_Geo == false)) {
            clearInterval(connectThingspeak);
        }
        $('.connectA0').css("background-color", "white");
        $('.connectA0').css("color", "black");
        $('.connectA0').text('Connect to Thingspeak ');
        $('#connectA0status').hide();
    } else {
        connect_to_A0 = true;
        localStorage.connect_to_A0 = connect_to_A0;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_Geo == false)) {
            connectingThingspeak();
        }
        $('.connectA0').css("background-color", "black");
        $('.connectA0').css("color", "white");
        $('.connectA0').text('Disconnect to Thingspeak ');
        $('#connectA0status').show();

    }
};

function toggelConnectA1() {

    if (connect_to_A1) {
        connect_to_A1 = false;
        localStorage.connect_to_A1 = connect_to_A1;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            clearInterval(connectThingspeak);
        }
        $('.connectA1').css("background-color", "white");
        $('.connectA1').css("color", "black");
        $('.connectA1').text('Connect to Thingspeak ');
        $('#connectA1status').hide();
    } else {
        connect_to_A1 = true;
        localStorage.connect_to_A1 = connect_to_A1;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            connectingThingspeak();
        }
        $('.connectA1').css("background-color", "black");
        $('.connectA1').css("color", "white");
        $('.connectA1').text('Disconnect to Thingspeak ');
        $('#connectA1status').show();

    }
};

function toggelConnectA2() {

    if (connect_to_A2) {
        connect_to_A2 = false;
        localStorage.connect_to_A2 = connect_to_A2;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            clearInterval(connectThingspeak);
        }
        $('.connectA2').css("background-color", "white");
        $('.connectA2').css("color", "black");
        $('.connectA2').text('Connect to Thingspeak ');
        $('#connectA2status').hide();
    } else {
        connect_to_A2 = true;
        localStorage.connect_to_A2 = connect_to_A2;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            connectingThingspeak();
        }
        $('.connectA2').css("background-color", "black");
        $('.connectA2').css("color", "white");
        $('.connectA2').text('Disconnect to Thingspeak ');
        $('#connectA2status').show();

    }
};

function toggelConnectA3() {

    if (connect_to_A3) {
        connect_to_A3 = false;
        localStorage.connect_to_A3 = connect_to_A3;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            clearInterval(connectThingspeak);
        }
        $('.connectA3').css("background-color", "white");
        $('.connectA3').css("color", "black");
        $('.connectA3').text('Connect to Thingspeak ');
        $('#connectA3status').hide();
    } else {
        connect_to_A3 = true;
        localStorage.connect_to_A3 = connect_to_A3;
        if ((connect_to_A5 == false) && (connect_to_A4 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            connectingThingspeak();
        }
        $('.connectA3').css("background-color", "black");
        $('.connectA3').css("color", "white");
        $('.connectA3').text('Disconnect to Thingspeak ');
        $('#connectA3status').show();

    }
};


function toggelConnectA4() {

    if (connect_to_A4) {
        connect_to_A4 = false;
        localStorage.connect_to_A4 = connect_to_A4;
        if ((connect_to_A5 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            clearInterval(connectThingspeak);
        }
        $('.connectA4').css("background-color", "white");
        $('.connectA4').css("color", "black");
        $('.connectA4').text('Connect to Thingspeak ');
        $('#connectA4status').hide();
    } else {
        connect_to_A4 = true;
        localStorage.connect_to_A4 = connect_to_A4;
        if ((connect_to_A5 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            connectingThingspeak();
        }
        $('.connectA4').css("background-color", "black");
        $('.connectA4').css("color", "white");
        $('.connectA4').text('Disconnect to Thingspeak ');
        $('#connectA4status').show();

    }
};


function toggelConnectA5() {

    if (connect_to_A5) {
        connect_to_A5 = false;
        localStorage.connect_to_A5 = connect_to_A5;
        if ((connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            clearInterval(connectThingspeak);
        }
        $('.connectA5').css("background-color", "white");
        $('.connectA5').css("color", "black");
        $('.connectA5').text('Connect to Thingspeak ');
        $('#connectA5status').hide();
    } else {
        connect_to_A5 = true;
        localStorage.connect_to_A5 = connect_to_A5;
        if ((connect_to_A4 == false) && (connect_to_A3 == false) && (connect_to_A2 == false) && (connect_to_A1 == false) && (connect_to_A0 == false) && (connect_to_Geo == false)) {
            connectingThingspeak();
        }
        $('.connectA5').css("background-color", "black");
        $('.connectA5').css("color", "white");
        $('.connectA5').text('Disconnect to Thingspeak ');
        $('#connectA5status').show();

    }
};