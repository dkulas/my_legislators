// Check if Fetch is available
(function checkFetch() {
  if (self.fetch) {
    console.log("Fetch is working");
  } else {
    alert("Something happened...it's not you, well it might be.  Check your browser settings and make sure it supports the fetch() API call.  Otherwise, please upgrade to the latest and greatest version of Chrome or FireFox");
  }
})();

// Fetch Data
function fetchData() {
  fetch("https://congress.api.sunlightfoundation.com/legislators/locate?zip=48301")
  .then(data => data.json())
  .then(data => {

    console.log(data);

    var dataResults = data.results;
    var dataResultsArray = [];

    for (var i in dataResults) {
      dataResultsArray.push({fname: dataResults[i]["first_name"], lname: dataResults[i]["last_name"], chamber: dataResults[i]["chamber"], phone: dataResults[i]["phone"], fax: dataResults[i]["fax"], email: dataResults[i]["oc_email"]});
    };

    console.log(dataResultsArray);

  })
  .catch(function(error) {
    console.log(error);
  });
};

fetchData();