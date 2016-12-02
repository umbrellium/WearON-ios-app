var device_name = [];
var device_id = [];
var device_category = [];
var device_channels = [];
var catergoryColour;
var get_thingful_dataset = false;
var LING_API_KEY = "APIKey-Znd5MnpoYWE2d2Rj-ZjRrandwcHNxZno2ZnpkNHBlZGNiOWhq";
var accessThingfulDatasetPeriodically;


function toggelexploreThingful() {
  if (open_thingful_explorer) {
    open_thingful_explorer = false;
    if (get_thingful_dataset === false) {
      $('#explore_thingful').css("background-color", "white");
      $('#explore_thingful').css("color", "black");
      $('#explore_thingful').html("Explore");
      $('#explore_thingful').css("padding-left", "");
      $('#explore_thingful').css("padding-right", "");
      $("#connect_explore_thingful").hide();
    } else if (get_thingful_dataset === true) { //if retrieval of data set from thingful is successful
      $('#explore_thingful').css("background-color", "black");
      $('#explore_thingful').css("color", "white");
      $("#explore_thingful").html("Reset");
      $('#explore_thingful').css("padding-left", "28px");
      $('#explore_thingful').css("padding-right", "28px");
      $("#connect_explore_thingful").show();
    }
    $("#get_thingful_explorer_panel").hide();
    $("#disconnectDevice").show();
    $("#visual_panel").show();
    $("#AppContent").show();
  } else {
    open_thingful_explorer = true;
    $('#explore_thingful').css("background-color", "black");
    $('#explore_thingful').css("color", "white");
    $('#explore_thingful').html("Close Panel");
    $("#get_thingful_explorer_panel").show();
    $("#disconnectDevice").hide();
    $("#visual_panel").hide();
    $("#AppContent").hide();
  }
}


function startQuery() {
  $("#pre-search").html('EXPLORING...');
  setTimeout(function() {
    $("#pre-search").html('EXPLORE');
  }, 5000);
  console.clear();
  $("#all_devices").empty();
  resetVariable();
  resetFilter();
  var rad = $('#search-rad').val();
  search(LING_API_KEY, "q=" + "&geo-lat=" + myLocationLat + "&geo-long=" + myLocationLong + "&geo-radius=" + rad + "&limit=500&sort=distance");
}

function search(_apikey, _options, _rawAddress) {
  //empty out arrays
  device_name = [];
  device_category = [];

  var query = "https://api.thingful.net/search?" + _options;
  if (_rawAddress) {
    query = _rawAddress;
  } else {
    // console.clear();
  }

  console.log(query);
  $('#queryField').html(query);

  $.ajax({
    url: query,
    // headers: { "Authorization" : "Bearer " + _apikey },
    type: "GET",
    crossDomain: true,
    success: function(response) {
      // $(".btn").button('reset');
      //add a line underneath EXPLORE button
      $('#all_devices').append("<hr>");
      //show all the devices scanned and within boundary
      var all_data = response.data;
      for (var i = 0; i < all_data.length; i++) {
        //record device's name
        device_name[all_data[i].id] = all_data[i].attributes.title;
        //record device's category
        device_category[all_data[i].id] = all_data[i].relationships.category.data.id;
        //validate each device that is found, make sure they have valid data
        validateDevice(all_data[i].id);
      }
    },
    error: function(xhr, error) {
      // $(".btn").button('reset');
      // console.debug(xhr);
      // console.debug(error);
      $('#all_devices').html("<center>*Make sure you have enabled geolocation tracking*</center>");
      // alert("something went wrong: " + error);
    },

  });
}

//check whether each device has valid data 
function validateDevice(id) {
  $('#device_detail').empty();
  var url_access = "https://api.thingful.net/access?uid=" + id;
  $.ajax({
    url: url_access,
    headers: {
      "Authorization": "Bearer APIKey-Znd5MnpoYWE2d2Rj-ZjRrandwcHNxZno2ZnpkNHBlZGNiOWhq"
    },
    type: "GET",
    crossDomain: true,
    success: function(response) {

      if (device_category[id] === "environment") {
        catergoryColour = "#0098D4";
        $("#filter_environment").show();
      } else if (device_category[id] === "transport") {
        catergoryColour = "#AD4FD9";
        $("#filter_transport").show();
      } else if (device_category[id] === "energy") {
        catergoryColour = "#FFDC36";
        $("#filter_energy").show();
      } else if (device_category[id] === "home") {
        catergoryColour = "#EE7C0E";
        $("#filter_home").show();
      } else if (device_category[id] === "miscellaneous") {
        catergoryColour = "#A0A5A9";
        $("#filter_miscellaneous").show();
      } else if (device_category[id] === "experiment") {
        catergoryColour = "#EA6DEC";
        $("#filter_experiment").show();
      } else if (device_category[id] === "health") {
        catergoryColour = "#E4271E";
        $("#filter_health").show();
      }

      var htmlString =
        '<button class=' + device_category[id] + ' style="font-size:20px; padding:5px; margin:2px;  outline:none; border-style: none; background-color:' + catergoryColour + ';"onclick="accessDevice(\'' +
        id + '\')">' +
        '<span class= "deviceName">' + device_name[id] + '</span>' +
        '</button>';
      $('#all_devices').append($(htmlString));
      $('#filter').show();
    },
    error: function(xhr, error) {
      //do something
    },
  });
}

//when user click on specific device to look at data
function accessDevice(deviceID) {
  $('#device_detail').empty();

  var url_access = "https://api.thingful.net/access?uid=" + deviceID;
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
      $('#device_detail').append("<hr>");
      $('#device_detail').append("Device Name: " + data[0].attributes.title + "<br>");
      for (var i = 0; i < all_channels.length; i++) {
        var htmlStringFilter =
          '<button class=deviceDataset style="font-size:20px; margin:2px; outline:none; border-style: none; "onclick="accessDataset(\'' +
          deviceID + "," + all_channels[i].id + "," + all_channels[i].value + '\')">' + all_channels[i].id + ": " + all_channels[i].value +
          '</button><br>';
        $('#device_detail').append(htmlStringFilter);
      }
    },
  });
}

//when user click on a specific dataset that he/she wants to input into WearON
function accessDataset(deviceID) {
  var datasetInfo = deviceID.split(",");
  var dataset_name = datasetInfo[1];
  var dataset_value = datasetInfo[2];
  //input initial dataset and value
  $("#ThingfulExplorerFeed_content").html("<b>" + dataset_name + "= " + dataset_value + "</b>");
  //log in get thingful dataset is successful
  get_thingful_dataset = true;
  //close thingful explorer panel
  toggelexploreThingful();
  //reset thingful explorer
  resetVariable();
  resetFilter();
  $("#all_devices").empty();
  $("#filter").hide();
  $("#device_detail").empty();
  //stop other previous interval if any
  clearInterval(accessThingfulDatasetPeriodically);
  //access it first time
  accessDatasetPeriodically(datasetInfo[0], datasetInfo[1]);
  //access dataset periodically 
  accessThingfulDatasetPeriodically = setInterval(function() {
    accessDatasetPeriodically(datasetInfo[0], datasetInfo[1]);
  }, 60000); //access every 1 min
}

//access dataset periodically (currently every 1 min)
function accessDatasetPeriodically(deviceID, channelName) {

  initiateLogic_thingful_explorer();
  
  var url_access = "https://api.thingful.net/access?uid=" + deviceID;
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
        if (all_channels[i].id === channelName) {
          $("#ThingfulExplorerFeed_content").html("<b>" + channelName + "= " + all_channels[i].value + "</b>");
          thingful_explorer_reading = parseInt(all_channels[i].value);
          initiateLogic_thingful_explorer(); // initiate logic for thingful explorer if there is one
          $("#ThingfulExplorerFeed_content_status").html("Data obtained successfully");
        }
      }
    },
    error: function(xhr, error) {
      $("#ThingfulExplorerFeed_content_status").html("Error in obtaining data");
    },
  });

}

//reset variables when user click "EXPLORE"
function resetVariable() {
  device_name = [];
  device_id = [];
  device_category = [];
  device_channels = [];
}