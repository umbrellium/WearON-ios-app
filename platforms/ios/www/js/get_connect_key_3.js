function getKeyData_connectivity_3() {

    var key = document.getElementById("key9").value + "-" + document.getElementById("key10").value;
    var x = "http://www.wearon.io/connectivity_tokens/" + key + "/connect_key";
    $.get(x,
        function(data, status) {
            var body = data.replace(/^[\S\s]*<body[^>]*?>/i, "")
                .replace(/<\/body[\S\s]*$/i, ""); //get body of content

            connect_key_info_3 = body;
            readConnectKeyData_3();
        });

    localStorage.lastSavedConnectKey_3 = key;

}

function readConnectKeyData_3() {

    // split the html content of url to readable chunk
    var keyContent_3 = connect_key_info_3.split("&quot;");

    //dissect connect_key string into the neccessary info
    if (keyContent_3[3] != "") { // check is user inputing any key in this catagory

        $("#ReadApi_3").show();
        document.getElementById("ReadApi_3").innerHTML = "Read API: " + keyContent_3[3];
        ReadApi_3 = keyContent_3[3];
        localStorage.ReadApi_3 = ReadApi_3;

    } else {
        $("#ReadApi_3").show();
        document.getElementById("ReadApi_3").innerHTML = "No Read Api found";
    }

    if (keyContent_3[7] != "") { // check is user inputing any key in this catagory

        $("#channelID_3").show();
        document.getElementById("channelID_3").innerHTML = "Channel ID: " + keyContent_3[7];
        channelID_3 = keyContent_3[7];
        localStorage.channelID_3 = channelID_3;
    } else {
        $("#channelID_3").show();
        document.getElementById("channelID_3").innerHTML = "No Channel ID found";
    }

    if (keyContent_3[11] != "") { // check is user inputing any key in this catagory

        $("#channel_field_1_3").show();
        document.getElementById("channel_field_1_3").innerHTML = "Chosen Field: " + keyContent_3[11];
        channelField_3 = keyContent_3[11];
        localStorage.channelField_3 = channelField_3;
    } else {
        $("#channel_field_1_3").show();
        document.getElementById("channel_field_1_3").innerHTML = "No Field found";
    }

    if ((keyContent_3[3] == undefined) || (keyContent_3[7] == undefined)) {

        clearInterval(getDataFeed3_Thingspeak);
        $("#DataFeed3").hide();

        $("#confirmation_connect_3").show();
        $(".useStoredConnectKey_3").hide();

    } else {

        $("#confirmation_connect_3").show();
        $(".useStoredConnectKey_3").hide();

    }

}

function lastSavedConnectKey_3() {

    ReadApi_3 = localStorage.ReadApi_3;
    channelID_3 = localStorage.channelID_3;
    channelField_3 = localStorage.channelField_3;
    Confirm_connect_3();

}

//get data feed from the selected thingspeak channel field every 7.5s
var getDataFeed3_Thingspeak;

function gettingDataFeed3_Thingspeak() {
    getDataFeed3_Thingspeak = setInterval(get_Data_feed_3_from_thingspeak, 2500); // get update from thingspeak every 2.5 seconds
}

function get_Data_feed_3_from_thingspeak() {

    initiateLogic_data_feed_3(); // initiate logic for data feed if there is one

    var urlConnect_key_3 = "https://api.thingspeak.com/channels/" + channelID_3 + "/fields/" + channelField_3 + "/last?api_key=" + ReadApi_3;
    $.get(urlConnect_key_3,
        function(data, status) {
            if (status == "success") {
                data_feed_3_reading = parseInt(data); // parse the var into strictly number value
                $("#DataFeed3_content").html("<b>Data Feed 3 =" + data + "</b>");
                $("#DataFeed3_content_status").html("Data obtained successfully");
            } else {
                $("#DataFeed3_content_status").html("Error in obtaining data");
            }
        });

}

function Confirm_connect_3() {

    var urlConnect_key_3 = "https://api.thingspeak.com/channels/" + channelID_3 + "/fields/" + channelField_3 + "/last?api_key=" + ReadApi_3;
    $.get(urlConnect_key_3,
        function(data, status) {
            if (status == "success") {
                get_data_3_success = true;
                toggelgetDataFeed3();
                $("#DataFeed3").show();
                $("#DataFeed3_content").html("<span><b>Data Feed 3 =" + data + "</b></span>");
                $("#DataFeed3_content_status").html("Data obtained successfully");
                gettingDataFeed3_Thingspeak();
            } else {
                get_data_3_success = false;
            }
        });
};

function restart_connect_3() {

    $("#confirmation_connect_3").hide();
    $("#ReadApi_3").hide();
    $("#channelID_3").hide();
    $("#channel_field_1_3").hide();
    $("#channel_field_2_3").hide();
    $("#key9").val("");//data_feed_2
    $("#key10").val("");//data_feed_2

}