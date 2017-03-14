var reflectMetadata = require("reflect-metadata");
var ng = {
  core: require("@angular/core"),
  http: require("@angular/http")
};

// --------------------------------------------------------------------------------
// Customer Search Component
// --------------------------------------------------------------------------------

// Search Component
var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  template: require("./CustomerSearchComponent.html")
}).Class({
  constructor: [
    ng.http.Http,
    function(http){
      this.customers = null;
      this.http = http;
      this.keywords = "";
    }
  ],
  
  search: function($event) {
    var self = this;            // Allow us to use this within the function
    self.keywords = $event;
    if (self.keywords.length < 3){
      return;
    }
    self.http.get (             // Use the http library
      "/customers.json?keywords=" + self.keywords // URL to our rails controller, specify JSON.
    ).subscribe(
      function(response){       // Listen for the completed HTTP request
        self.customers = response.json().customers; // Extract the results from the response
      },
      function(response){       // Only called on ERROR status.
        window.alert(response);
      }
    );
  }
});


module.exports = CustomerSearchComponent;

