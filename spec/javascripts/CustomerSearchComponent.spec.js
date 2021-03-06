var proxyquire = require("proxyquire");
var CustomerSearchComponent = proxyquire(
  "../../webpack/CustomerSearchComponent",
  {
    "./CustomerSearchComponent.html": {
      "@noCallThru": "true"
    }
  }
);
var td = require("testdouble");

var component = null;


describe("CustomerSearchComponent", function(){
  beforeEach(function(){
    component = new CustomerSearchComponent();
  });
  
  describe("initial state", function(){
    it("sets customers to null", function(){
      expect(component.customers).toBe(null);
    });
    it("sets keywords to the empty string", function(){
      expect(component.keywords).toBe("");
    });
  });

  describe("search", function(){
    describe("A search for 'pa', less than three characters", function(){
      var mockHttp = null;

      beforeEach(function(){
        mockHttp = td.object(["get"]);
        component = new CustomerSearchComponent(mockHttp);
      });
      
      it("sets the keywords to be 'pa'",function(){
        component.search("pa");
        expect(component.keywords).toBe("pa");
      });
      it("does not make a HTTP call",function(){
        component.search("pa");
        td.verify(mockHttp.get(), { times: 0 });
      });
    });
    
    describe("A search for 'pat', three or more characters", function(){
      var mockHttp = null;
      var customers = [
        {
          id: 1,
          created_at: (new Date()).toString(),
          first_name: "Pat",
          last_name: "Jones",
          username: "pj",
          email: "pjones@somewhere.net"
        },
        {
          id: 2,
          created_at: (new Date()).toString(),
          first_name: "Pat",
          last_name: "Jones",
          username: "pj",
          email: "pjones@somewhere.net"
        }
      ];

      beforeEach(function(){
        window = td.object(["alert"]);
        
        var response = td.object(["json"]);
        td.when(response.json()).thenReturn({customers: customers});

        var observable = td.object(["subscribe"]);
        // From the book "when we call subscribe on observable, call the callback passed as the first parameter with
        // our mock response, and make sure the second parameter is also a function."
        td.when(observable.subscribe(
          td.callback(response),
          td.matchers.isA(Function))).thenReturn();

        // Return mock observable when get is called
        mockHttp = td.object(["get"]);
        td.when(mockHttp.get("/customers.json?keywords=pat")).thenReturn(observable);

        component = new CustomerSearchComponent(mockHttp);
      });
      
      describe("A successful search", function(){
        it("sets the keywords to be 'pat'",function(){
          component.search("pat");
          expect(component.keywords).toBe("pat");
        });
        
        it("sets the customers to the results of the HTTP call", function(){
          component.search("pat");
          expect(component.customers).toBe(customers);
        });
      });

      describe("A search that fails on the back-end", function(){
        beforeEach(function(){
          var response = "There was an error!";
          var observable = td.object(["subscribe"]);

          td.when(observable.subscribe(
            td.matchers.isA(Function),
            td.callback(response))).thenReturn();

          // Return mock observable when get is called
          mockHttp = td.object(["get"]);
          td.when(mockHttp.get("/customers.json?keywords=pat")).thenReturn(observable);

          td.when(window.alert()).thenReturn();
          
          component = new CustomerSearchComponent(mockHttp);
        });
        
        it("sets the keywords to be 'pat'", function(){
          component.search("pat");
          expect(component.keywords).toBe("pat");
        });
        
        it("leaves customers as null", function(){
          component.search("pat");
          expect(component.customers).toBe(null);
        });
        
        it("alerts the user with the response message", function(){
          component.search("pat");
          td.verify(window.alert("There was an error!"));
        });
      });
    });
  });
});
