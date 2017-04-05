var reflectMetadata = require("reflect-metadata");
var ng={
  core: require("@angular/core"),
  router: require("@angular/router")
};

var CustomerDetailsComponent = ng.core.Component({
  selector: "shine-customer-details",
  template: require("./CustomerDetailsComponent.html")
}).Class({
  constructor: [
    ng.router.ActivatedRoute,
    function(activatedRoute){
      this.activatedRoute = activatedRoute;
      this.id = null;
    }
  ]
});
module.exports = CustomerDetailsComponent;
