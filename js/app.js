var submitBtn = document.getElementById("submitBtn");

// Check if Fetch is available
(function checkFetch() {
  if (self.fetch) {
    console.log("Fetch is working");
  } else {
    alert("Something happened...it's not you, well it might be.  Check your browser settings and make sure it supports the fetch() API call.  Otherwise, please upgrade to the latest and greatest version of Chrome or FireFox");
  }
})();

// Isolate zipcode
function getZipcode() {
  return document.getElementById("zipcodeInput").value;
};

// Fetch Data
function fetchData() {
  fetch("https://congress.api.sunlightfoundation.com/legislators/locate?zip=" + getZipcode())
  .then(data => data.json())
  .then(data => {

    console.log(data);

    var dataResults = data.results;
    var dataResultsArray = [];

    for (var i in dataResults) {
      dataResultsArray.push({fname: dataResults[i]["first_name"], lname: dataResults[i]["last_name"], chamber: dataResults[i]["chamber"], phone: dataResults[i]["phone"], fax: dataResults[i]["fax"], email: dataResults[i]["oc_email"], facebook_id: dataResults[i]["facebook_id"], party: dataResults[i]["party"], termStart: dataResults[i]["term_start"], termEnd: dataResults[i]["term_end"], tile: dataResults[i]["title"], twitterID: dataResults[i]["twitter_id"], website: dataResults[i]["website"], state_name: dataResults[i]["state_name"]});
    };

    console.log(dataResultsArray);

  })
  .catch(function(error) {
    console.log(error);
  });
};

// Clear data on subsequent calls
function clearData() {
  document.getElementsByTagName("li").innerHTML = "";
};

// Initialize program
submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  fetchData();
  clearData();
});