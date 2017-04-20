var proxyquire = require("proxyquire");
var CustomerDetailsComponent = proxyquire(
  "../../webpack/CustomerDetailsComponent",
  {
    "./CustomerDetailsComponent.html": {
      "@noCallThru": "true"
    }
  }
);
var td = require("testdouble");

var component = null;

var createMockHttp = function(customer){
  // Setup a response object for returning
  var response = td.object(["json"]);
  td.when(response.json()).thenReturn({ customer: customer});

  // Create an obserable when we will use to watch for http requests
  var observable = td.object(["subscribe"]);
  td.when(observable.subscribe(
    td.callback(response),
    td.matchers.isA(Function))).thenReturn();

  // Setup a mockHttp object
  var mockHttp = td.object(["get"]);

  // When there is a call to /customers/<id>.json return the observable above.
  td.when(
    mockHttp.get("/customers/" + customer.id + ".json")
  ).thenReturn(observable);

  return mockHttp;
};

describe("CustomerDetailsComponentComponent", function(){
  describe("initial state", function(){
    beforeEach(function(){
      component = new CustomerDetailsComponent();
    });
    
    it("sets customer to null", function(){
      expect(component.customer).toBe(null);
    });
  });

  describe("ngOnInit", function(){
    var customer = {
      id: 1,
      created_at: (new Date()).toString(),
      first_name: "Pat",
      last_name: "Jones",
      username: "pj",
      email: "pjones@somewhere.net"
    };

    // more setup

    beforeEach(function(){
      var route = createMockRoute(customer.id);
      var http = createMockHttp(customer);
      component = new CustomerDetailsComponent(route,http);
    });

    it("fetches the customer from the backend", function(){
      component.ngOnInit();
      expect(component.customer).toBe(customer);
    });    
  });
});
