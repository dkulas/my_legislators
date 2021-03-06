var submitBtn = document.getElementById("submitBtn");
var h1b = document.getElementById("h1b");
var h1a = document.getElementById("h1a");

// Isolate zipcode
function getZipcode() {
  return document.getElementById("zipcodeInput").value;
};

// Fetch Data
function fetchData() {

  $.ajax({

    url: "https://congress.api.sunlightfoundation.com/legislators/locate?zip=" + getZipcode(),
    dataType: "jsonp",

    error: function(jqXHR, textStatus, errorThrown) {

      console.log(errorThrown);

    },

    success: function(parsed_json) {

      var dataResults = parsed_json.results;
      console.log(dataResults);

      if (dataResults.length != 0) {

        for (var i in dataResults) {
          var resultsList = document.getElementById("resultsUL");

          resultsList.innerHTML += "<li>--------------------------------</li>";
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
          resultsList.innerHTML += "<li><strong>Website</strong>: <a href=" + dataResults[i]["website"] + ">Website</a></li>";
          resultsList.innerHTML += "<li><strong>Facebook</strong>: <a href=https://www.facebook.com/"  + dataResults[i]["facebook_id"] +  ">Facebook</a></li>";
          resultsList.innerHTML += "<li><strong>Twitter</strong>: <a href=https://www.twitter.com/@"  + dataResults[i]["twitter_id"] +  ">Twitter</a></li>";
          resultsList.innerHTML += "<li>--------------------------------</li>";
          resultsList.style.display = "inline-block";
        };
      } else {
        alert("Error:  Invalid US zipcode");
        document.getElementById("resultsUL").style.display = "none";
      }

    },

    complete: function() {
      console.log("Completed");
    }
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

// Reload website by clicking main title
h1a.addEventListener("click", function(e) {
  e.preventDefault();
  window.location.reload(true);
});

h1b.addEventListener("click", function(e) {
  e.preventDefault();
  alert("Welcome to Legisearch!\n\nGovernment can be a mess.  Long lines, phone prompts, the list goes on.  When you need to get in touch with your state Representatives, getting their contact information shouldn't be so difficult.\n\nKnowing who represents you (and your family) is important.\n\nKnowing the contact-information for those publicly-elected officials who say they're representing you is oftentimes more difficult to come across.\n\nNo longer.  Now, with the help of this website and the Sunlight Labs Congress API, you can search for your representatives' contact information simply by entering your zipcode\n\nEnjoy!");
});