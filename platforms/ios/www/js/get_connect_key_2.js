function getKeyData_connectivity_2() {

    var key = document.getElementById("key7").value + "-" + document.getElementById("key8").value;
    var x = "http://www.wearon.io/connectivity_tokens/" + key + "/connect_key";
    $.get(x,
        function(data, status) {
            var body = data.replace(/^[\S\s]*<body[^>]*?>/i, "")
                .replace(/<\/body[\S\s]*$/i, ""); //get body of content

            connect_key_info_2 = body;
            readConnectKeyData_2();
        });

    localStorage.lastSavedConnectKey_2 = key;

}

function readConnectKeyData_2() {

    // split the html content of url to readable chunk
    var keyContent_2 = connect_key_info_2.split("&quot;");

    //dissect connect_key string into the neccessary info
    if (keyContent_2[3] != "") { // check is user inputing any key in this catagory

        $("#ReadApi_2").show();
        document.getElementById("ReadApi_2").innerHTML = "Read API: " + keyContent_2[3];
        ReadApi_2 = keyContent_2[3];
        localStorage.ReadApi_2 = ReadApi_2;

    } else {
        $("#ReadApi_2").show();
        document.getElementById("ReadApi_2").innerHTML = "No Read Api found";
    }

    if (keyContent_2[7] != "") { // check is user inputing any key in this catagory

        $("#channelID_2").show();
        document.getElementById("channelID_2").innerHTML = "Channel ID: " + keyContent_2[7];
        channelID_2 = keyContent_2[7];
        localStorage.channelID_2 = channelID_2;
    } else {
        $("#channelID_2").show();
        document.getElementById("channelID_2").innerHTML = "No Channel ID found";
    }

    if (keyContent_2[11] != "") { // check is user inputing any key in this catagory

        $("#channel_field_1_2").show();
        document.getElementById("channel_field_1_2").innerHTML = "Chosen Field: " + keyContent_2[11];
        channelField_2 = keyContent_2[11];
        localStorage.channelField_2 = channelField_2;
    } else {
        $("#channel_field_1_2").show();
        document.getElementById("channel_field_1_2").innerHTML = "No Field found";
    }

    if ((keyContent_2[3] == undefined) || (keyContent_2[7] == undefined)) {

        clearInterval(getDataFeed2_Thingspeak);
        $("#DataFeed2").hide();

        $("#confirmation_connect_2").show();
        $(".useStoredConnectKey_2").hide();

    } else {

        $("#confirmation_connect_2").show();
        $(".useStoredConnectKey_2").hide();

    }

}

function lastSavedConnectKey_2() {

    ReadApi_2 = localStorage.ReadApi_2;
    channelID_2 = localStorage.channelID_2;
    channelField_2 = localStorage.channelField_2;
    Confirm_connect_2();

}

//get data feed from the selected thingspeak channel field every 7.5s
var getDataFeed2_Thingspeak;

function gettingDataFeed2_Thingspeak() {
    getDataFeed2_Thingspeak = setInterval(get_Data_feed_2_from_thingspeak, 2500); // get update from thingspeak every 2.5 seconds
}

function get_Data_feed_2_from_thingspeak() {

    initiateLogic_data_feed_2(); // initiate logic for data feed if there is one

    var urlConnect_key_2 = "https://api.thingspeak.com/channels/" + channelID_2 + "/fields/" + channelField_2 + "/last?api_key=" + ReadApi_2;
    $.get(urlConnect_key_2,
        function(data, status) {
            if (status == "success") {
                data_feed_2_reading = parseInt(data); // parse the var into strictly number value
                $("#DataFeed2_content").html("<b>Data Feed 2 =" + data + "</b>");
                $("#DataFeed2_content_status").html("Data obtained successfully");
            } else {
                $("#DataFeed2_content_status").html("Error in obtaining data");
            }
        });

}

function Confirm_connect_2() {

    var urlConnect_key_2 = "https://api.thingspeak.com/channels/" + channelID_2 + "/fields/" + channelField_2 + "/last?api_key=" + ReadApi_2;
    $.get(urlConnect_key_2,
        function(data, status) {
            if (status == "success") {
                get_data_2_success = true;
                toggelgetDataFeed2();
                $("#DataFeed2").show();
                $("#DataFeed2_content").html("<span><b>Data Feed 2 =" + data + "</b></span>");
                $("#DataFeed2_content_status").html("Data obtained successfully");
                gettingDataFeed2_Thingspeak();
            } else {
                get_data_2_success = false;
            }
        });
};

function restart_connect_2() {

    $("#confirmation_connect_2").hide();
    $("#ReadApi_2").hide();
    $("#channelID_2").hide();
    $("#channel_field_1_2").hide();
    $("#channel_field_2_2").hide();
    $("#key7").val(""); //data_feed_2
    $("#key8").val(""); //data_feed_2

}