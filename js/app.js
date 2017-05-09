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

  });
};

fetchData();