function getKeyData_global_connectivity() {

    var key = document.getElementById("key5").value + "-" + document.getElementById("key6").value;
    var x = "http://www.wearon.io/global_connectivity_tokens/" + key + "/global_connect_key";
    $.get(x,
        function(data, status) {
            var body = data.replace(/^[\S\s]*<body[^>]*?>/i, "")
                .replace(/<\/body[\S\s]*$/i, ""); //get body of content

            global_connect_key_info = body;
            readGlobalConnectKeyData();
        });

    localStorage.lastSavedGlobalConnectKey = key;

}


function readGlobalConnectKeyData() {

    // split the html content of url to readable chunk
    var global_keyContent = global_connect_key_info.split("&quot;");

    //dissect connect_key string into the neccessary info
    if (global_keyContent[3] != "") { // check is user inputing any key in this catagory

        $("#thingID").show();
        document.getElementById("thingID").innerHTML = "Thing ID: " + global_keyContent[3];
        Thing_ID = global_keyContent[3];
        localStorage.Thing_ID = Thing_ID;

    } else {
        $("#thingID").show();
        document.getElementById("thingID").innerHTML = "No Thing ID found";
    }

    if (global_keyContent[7] != "") { // check is user inputing any key in this catagory

        $("#thing_data_name").show();
        document.getElementById("thing_data_name").innerHTML = "Thing data setname: " + global_keyContent[7];
        Thing_data_set = global_keyContent[7];
        localStorage.Thing_data_set = Thing_data_set;
    } else {
        $("#thing_data_name").show();
        document.getElementById("thing_data_name").innerHTML = "No Thing data set found";
    }

    if ((global_keyContent[3] == undefined) || (global_keyContent[7] == undefined)) {

        clearInterval(getDataFeed_Thingful);
        $("#ThingfulFeed").hide();

        $("#confirmation_global_connect").show();
        $(".useStoredGlobalConnectKey").hide();

    } else {

        $("#confirmation_global_connect").show();
        $(".useStoredGlobalConnectKey").hide();

    }

}

function lastSavedGlobalConnectKey() {

    Thing_ID = localStorage.Thing_ID;
    Thing_data_set = localStorage.Thing_data_set;
    Confirm_global_connect();

}

// get data feed from the selected thing from thingful
var getDataFeed_Thingful;

function gettingDataFeed_Thingful() {
    getDataFeed_Thingful = setInterval(get_Data_feed_from_thingful, 60000); // get update from thingful every 1 min
}

function get_Data_feed_from_thingful() {

    initiateLogic_thingful_data_feed(); // initiate logic for data feed if there is one

    var z = 0;
    var id = Thing_ID;

    var url_access = "https://api.thingful.net/access?uid=" + id;
    $.ajax({
        url: url_access,
        headers: {
            "Authorization": "Bearer APIKey-Znd5MnpoYWE2d2Rj-ZjRrandwcHNxZno2ZnpkNHBlZGNiOWhq"
        },
        type: "GET",
        crossDomain: true,
        success: function(response) {
            var data = response.data;
            var all_channels = data[0].attributes.channels;
            for (var i = 0; i < all_channels.length; i++) {
                if (all_channels[i].id === Thing_data_set) {
                    thingful_reading = parseInt(all_channels[i].value);
                    $("#ThingfulFeed_content").html("<b>" + Thing_data_set + " =" + thingful_reading + "</b>");
                    $("#ThingfulFeed_content_status").html("Data obtained successfully");
                }
            }
        },
    });

}

function Confirm_global_connect() {
    var z = 0;
    var id = Thing_ID;

    var url_access = "https://api.thingful.net/access?uid=" + id;
    $.ajax({
        url: url_access,
        headers: {
            "Authorization": "Bearer APIKey-Znd5MnpoYWE2d2Rj-ZjRrandwcHNxZno2ZnpkNHBlZGNiOWhq"
        },
        type: "GET",
        crossDomain: true,
        success: function(response) {
            var data = response.data;
            var all_channels = data[0].attributes.channels;
            for (var i = 0; i < all_channels.length; i++) {
                if (all_channels[i].id === Thing_data_set) {
                    z = i;
                    var thingValue = parseInt(all_channels[i].value);
                    $("#ThingfulFeed").show();
                    $("#ThingfulFeed_content").html("<b>" + Thing_data_set + " =" + thingValue + "</b>");
                    $("#ThingfulFeed_content_status").html("Data obtained successfully");
                    get_thingful_success = true;
                    toggelgetThingful();
                    get_Data_feed_from_thingful();
                    //start periodically getting data from thingful
                    gettingDataFeed_Thingful();
                } else if (all_channels[i].id != Thing_data_set) {
                    get_thingful_success = false;
                }
            }
        },
        error: function(xhr, error) {
            $("#ThingfulFeed_content_status").html("Error in obtaining data");
        },
    });
}

function restart_global_connect() {

    $("#confirmation_global_connect").hide();
    $("#thingID").hide();
    $("#thing_data_name").hide();
    $("#key5").val("");
    $("#key6").val("");

}