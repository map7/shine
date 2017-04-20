var reflectMetadata = require("reflect-metadata");
var ng={
  core: require("@angular/core"),
  http: require("@angular/http"),
  router: require("@angular/router")
};

var CustomerDetailsComponent = ng.core.Component({
  selector: "shine-customer-details",
  template: require("./CustomerDetailsComponent.html")
}).Class({
  constructor: [
    ng.router.ActivatedRoute,
    ng.http.Http;
    function(activatedRoute){
      this.activatedRoute = activatedRoute;
      this.http = Http;
      this.customer = null;
    }
  ],

  ngOnInit: function() {
    var self = this;
    
    self.activatedRoute.params.subscribe(
      function(params){
        var id = +params['id'];
        self.id = id;
      }
    );
  }
});
module.exports = CustomerDetailsComponent;
