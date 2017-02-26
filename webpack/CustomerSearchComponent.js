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
  template: '\
  <section class="search-form"> \
    <form> \
      <label for="keywords" class="sr-only">Keywords</label> \
      <input type="text" id="keywords" name="keywords" \
             placeholder="First Name, Last Name, or Email Address" \
             class="form-control input-lg" \
             bind-ngModel="keywords" \
             on-ngModelChange="search($event)"> \
    </form> \
  </section> \
  <section class="search-results" *ngIf="customers"> \
    <header> \
      <h1 class="h3">Results</h1> \
    </header> \
    <ol class="list-group"> \
      <li *ngFor="let customer of customers" \
          class="list-group-item clearfix"> \
        <h3 class="pull-right"> \
          <small class="text-uppercase">Joined</small> \
          {{customer.created_at}} \
        </h3> \
        <h2 class="h3"> \
          {{customer.first_name}} {{customer.last_name}} \
          <small>{{customer.username}}</small> \
        </h2> \
        <h4>{{customer.email}}</h4> \
      </li> \
    </ol> \
  </section> \
  '
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

