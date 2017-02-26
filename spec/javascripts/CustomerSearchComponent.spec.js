describe("CustomerSearchComponent", function(){
  describe("initial state", function(){
    it("sets customers to null");
    it("sets keywords to the empty string");
  });

  describe("search", function(){
    describe("A search for 'pa', less than three characters", function(){
      it("sets the keywords to be 'pa'");
      it("does not make a HTTP call");
    });
    describe("A search for 'pat', three or more characters", function(){
      describe("A successful search", function(){
        it("sets the keywords to be 'pat'");
        it("sets the customers to the results of the HTTP call");
      });
      describe("A search that fails on the back-end", function(){
        it("sets the keywords to be 'pat'");
        it("leaves customers as null");
        it("alerts the user with the response message");
      });
    });
  });
});