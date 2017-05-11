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

    var dataResults = data.results;

    console.log(dataResults);

    for (var i in dataResults) {
      var resultsList = document.getElementById("resultsUL");
      resultsList.innerHTML += "<li><strong>Name</strong>: " + dataResults[i]["first_name"] + " " + dataResults[i]["last_name"] + "</li>";
      resultsList.innerHTML += "<li><strong>Party</strong>: " + dataResults[i]["party"] + "</li>";
      resultsList.innerHTML += "<li><strong>Chamber</strong>: " + dataResults[i]["chamber"].charAt(0).toUpperCase() + dataResults[i]["chamber"].slice(1); + "</li>";
      resultsList.innerHTML += "<li><strong>Title</strong>: " + dataResults[i]["title"] + "</li>";
      resultsList.innerHTML += "<li><strong>State</strong>: " + dataResults[i]["state_name"] + "</li>";
      resultsList.innerHTML += "<li><strong>District</strong>: " + dataResults[i]["district"] + "</li>";
      resultsList.innerHTML += "<li><strong>Term Start</strong>: " + dataResults[i]["term_start"] + "</li>";
      resultsList.innerHTML += "<li><strong>Term End</strong>: " + dataResults[i]["term_end"] + "</li>";
      resultsList.innerHTML += "<li><strong>Phone</strong>: " + "<a href='tel:+'" + dataResults[i]["phone"] + ">" + dataResults[i]["phone"] + "</a>" + "</li>";
      resultsList.innerHTML += "<li><strong>Fax</strong>: " + dataResults[i]["fax"] + "</li>";
      resultsList.innerHTML += "<li><strong>Email</strong>: <a href=mailto:" + dataResults[i]["oc_email"] + ">" + dataResults[i]["oc_email"] + "</a></li>";
      resultsList.innerHTML += "<li><strong>Website</strong>: " + dataResults[i]["website"] + "</li>";
      // resultsList.innerHTML += "<li><strong>Facebook</strong>: " + dataResults[i]["facebook_id"] + "</li>";
      resultsList.innerHTML += "<li><strong>Twitter</strong>: @" + dataResults[i]["twitter_id"] + "</li>";
      resultsList.innerHTML += "<li><br></li>";
    };

    var showResults = document.getElementById("resultsUL").style.display = "inline-block";

  })
  .catch(function(error) {
    console.log(error);
  });
};

// Clear data on subsequent calls
function clearData() {
  document.getElementById("resultsUL").innerHTML = "";
};

// Initialize program
submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  fetchData();
  clearData();
});