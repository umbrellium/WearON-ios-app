var filter_environment = false;
var filter_transport = false;
var filter_energy = false;
var filter_home = false;
var filter_miscellaneous = false;
var filter_experiment = false;
var filter_health = false;

function toggleFilterEnvironment() {
  if (filter_environment) {
    filter_environment = false;
    $("#filter_environment").css("background-color", "#0098D4");
    $("#filter_environment").css("color", "black");
    $(".environment").show();
  } else {
    filter_environment = true;
    $("#filter_environment").css("background-color", "black");
    $("#filter_environment").css("color", "white");
    $(".environment").hide();
  }
}

function toggleFilterTransport() {
  if (filter_transport) {
    filter_transport = false;
    $("#filter_transport").css("background-color", "#AD4FD9");
    $("#filter_transport").css("color", "black");
    $(".transport").show();
  } else {
    filter_transport = true;
    $("#filter_transport").css("background-color", "black");
    $("#filter_transport").css("color", "white");
    $(".transport").hide();
  }
}

function toggleFilterEnergy() {
  if (filter_energy) {
    filter_energy = false;
    $("#filter_energy").css("background-color", "#FFDC36");
    $("#filter_energy").css("color", "black");
    $(".energy").show();
  } else {
    filter_energy = true;
    $("#filter_energy").css("background-color", "black");
    $("#filter_energy").css("color", "white");
    $(".energy").hide();
  }
}

function toggleFilterHome() {
  if (filter_home) {
    filter_home = false;
    $("#filter_home").css("background-color", "#EE7C0E");
    $("#filter_home").css("color", "black");
    $(".home").show();
  } else {
    filter_home = true;
    $("#filter_home").css("background-color", "black");
    $("#filter_home").css("color", "white");
    $(".home").hide();
  }
}

function toggleFilterMiscellaneous() {
  if (filter_miscellaneous) {
    filter_miscellaneous = false;
    $("#filter_miscellaneous").css("background-color", "#A0A5A9");
    $("#filter_miscellaneous").css("color", "black");
    $(".miscellaneous").show();
  } else {
    filter_miscellaneous = true;
    $("#filter_miscellaneous").css("background-color", "black");
    $("#filter_miscellaneous").css("color", "white");
    $(".miscellaneous").hide();
  }
}

function toggleFilterExperiment() {
  if (filter_experiment) {
    filter_experiment = false;
    $("#filter_experiment").css("background-color", "#EA6DEC");
    $("#filter_experiment").css("color", "black");
    $(".experiment").show();
  } else {
    filter_experiment = true;
    $("#filter_experiment").css("background-color", "black");
    $("#filter_experiment").css("color", "white");
    $(".experiment").hide();
  }
}

function toggleFilterHealth() {
  if (filter_health) {
    filter_health = false;
    $("#filter_health").css("background-color", "#E4271E");
    $("#filter_health").css("color", "black");
    $(".health").show();
  } else {
    filter_health = true;
    $("#filter_health").css("background-color", "black");
    $("#filter_health").css("color", "white");
    $(".health").hide();
  }
}

//reset all the filter buttons
function resetFilter() {
  $('#filter').hide();
  if (filter_environment === true) {
    toggleFilterEnvironment();
  }
  if (filter_transport === true) {
    toggleFilterTransport();
  }
  if (filter_energy === true) {
    toggleFilterEnergy();
  }
  if (filter_home === true) {
    toggleFilterHome();
  }
  if (filter_miscellaneous === true) {
    toggleFilterMiscellaneous();
  }
  if (filter_experiment === true) {
    toggleFilterExperiment();
  }
  if (filter_health === true) {
    toggleFilterHealth();
  }
}