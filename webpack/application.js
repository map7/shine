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

