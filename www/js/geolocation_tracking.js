var watchGeo;

function geolocationTracking() {

  if (navigator.geolocation) {

    if (geolocation_enabled == true) {
      watchGeo = navigator.geolocation.watchPosition(geolocationSuccess, geolocationFailure, {
        enableHighAccurracy: true
      });
    } else if (geolocation_enabled == false) {
      navigator.geolocation.clearWatch(watchGeo);
    }

  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function geolocationSuccess(position) {
    if ((lockScreenStatus == true) || (userQuitApp == true)) {
      checkDataForUser();
    }
    document.getElementById("geolocationValue").innerHTML = "<b>Latitude= " + position.coords.latitude + ", Longitude= " + position.coords.longitude + "</b>";
    myLocationLat = position.coords.latitude;
    myLocationLong = position.coords.longitude;
  };

  function geolocationFailure(error) {
    alert("geolocation failure");
  };

};

app.toggleGeoTrack = function() {
  if (geolocation_enabled) {
    geolocation_enabled = false;
    localStorage.geolocation_enabled = geolocation_enabled;
    $('.enableGeoTrack').css("background-color", "white");
    $('.enableGeoTrack').css("color", "black");
    $('.enableGeoTrack').text('Enable Tracking');
    $('#geolocationValue').hide();
    geolocationTracking();
    $('.connectGeo').hide();
    $('#geoStatus').hide();

    if (connect_to_Geo == true) {
      connect_to_Geo = false;
      $('.connectGeo').css("background-color", "white");
      $('.connectGeo').css("color", "black");
      $('.connectGeo').text('Connect to Thingspeak');
    }

  } else {
    geolocation_enabled = true;
    localStorage.geolocation_enabled = geolocation_enabled;
    $('#geolocationValue').show();
    geolocationTracking();
    $('.enableGeoTrack').css("background-color", "black");
    $('.enableGeoTrack').css("color", "white");
    $('.enableGeoTrack').text('Disable Tracking');
    $('.connectGeo').show();
  }

};


function toggelConnectGeo() { // connect geolocation data to thingspeak

  if (connect_to_Geo) {
    if (geolocation_enabled == true) {
      connect_to_Geo = false;
      if ((connect_to_A2 == false) && (connect_to_A3 == false) && (connect_to_A4 == false) && (connect_to_A5 == false)) {
        clearInterval(connectThingspeak);
      }
      localStorage.connect_to_Geo = connect_to_Geo;
      $('.connectGeo').css("background-color", "white");
      $('.connectGeo').css("color", "black");
      $('.connectGeo').text('Connect to Thingspeak');
      $('#geoStatus').hide();

    }
  } else {
    if (geolocation_enabled == true) {
      connect_to_Geo = true;
      if ((connect_to_A2 == false) && (connect_to_A3 == false) && (connect_to_A4 == false) && (connect_to_A5 == false)) {
        connectingThingspeak();
      }
      localStorage.connect_to_Geo = connect_to_Geo;
      $('.connectGeo').css("background-color", "black");
      $('.connectGeo').css("color", "white");
      $('.connectGeo').text('Disconnect to Thingspeak');
      $('#geoStatus').show();
    }
  };

};