require("application.css");
require("bootstrap/dist/css/bootstrap.css");

// Setup Angular requirements
var coreJS =              require("core-js");
var zoneJS =              require("zone.js");
var reflectMetadata =     require("reflect-metadata");
var ng = {
  core:                   require("@angular/core"),
  common:                 require("@angular/common"),
  compiler:               require("@angular/compiler"),
  forms:                  require("@angular/forms"),
  platformBrowser:        require("@angular/platform-browser"),
  platformBrowserDynamic: require("@angular/platform-browser-dynamic"),
  router:                 require("@angular/router")
};

// --------------------------------------------------------------------------------
// AngularTestComponent
// --------------------------------------------------------------------------------

// Component
var AngularTestComponent = ng.core.Component({
  selector: "shine-angular-test",
  template: '\
  <h2 *ngIf="salutation">Hello {{salutation}}!</h2> \
  <form> \
    <div class="form-group"> \
      <label for="name">Name</label> \
      <input type="text" id="name" class="form-control" \
             name="name" bindon-ngModel="salutation"> \
    </div> \
  </form> \
  '
}).Class({
  constructor: function(){
    this.salutation = null;
  }
});

// Top level component
var AngularTestAppModule = ng.core.NgModule({
  imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
  declarations: [ AngularTestComponent ],
  bootstrap: [ AngularTestComponent ]
}).Class({
  constructor: function(){}
});

// Add event listener
// Check for our angular-test element by looking for ID once the DOM is loaded.
document.addEventListener('DOMContentLoaded', function() {
  var shouldBootstrap = document.getElementById("angular-test");
  if (shouldBootstrap) {
    // Tell Angular that we are running within a browser
    ng.platformBrowserDynamic.
      platformBrowserDynamic().
      bootstrapModule(AngularTestAppModule);
  }
});

// --------------------------------------------------------------------------------
// Customer Search Component
// --------------------------------------------------------------------------------

// Search Component
var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  template: '\
  <header> \
    <h1 class="h2">Customer Search</h1> \
  </header> \
  <section class="search-form"> \
    <div class="input-group input-group-lg"> \
      <label for="keywords" class="sr-only">Keywords</label> \
      <input type="text" id="keywords" name="keywords" \
             placeholder="First Name, Last Name, or Email Address" \
             class="form-control input-lg" \
             bindon-ngModel="keywords"> \
      <span class="input-group-btn"> \
        <input type="submit" value="Find Customers" \
               class="btn btn-primary btn-lg" \
               on-click="search()"> \
      </span> \
    </div> \
  </section> \
  <section class="search-results"> \
    <header> \
      <h1 class="h3">Results</h1> \
    </header> \
    <ol class="list-group"> \
      <li class="list-group-item clearfix"> \
        <h3 class="pull-right"> \
          <small class="text-uppercase">Joined</small> \
          2016-01-01\
        </h3> \
        <h2 class="h3"> \
          Pat Smith \
          <small>psmith34</small> \
        </h2> \
        <h4>pat.smith@example.com</h4> \
      </li> \
    </ol> \
  </section> \
  '
}).Class({
  constructor: function(){}
});

// Top Level SearchComponent
var CustomerSearchAppModule = ng.core.NgModule({
  imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
  declarations: [ CustomerSearchComponent ],
  bootstrap: [ CustomerSearchComponent ]
}).Class({
  constructor: function() {}
});

// Add event listener for customer search component
document.addEventListener('DOMContentLoaded', function() {

  if (document.getElementById("shine-customer-search")) {
    // Tell Angular that we are running within a browser
    ng.platformBrowserDynamic.
      platformBrowserDynamic().
      bootstrapModule(CustomerSearchAppModule);
  }
});
