# Define matcher and name it
RSpec::Matchers.define :violate_check_constraint do |constraint_name|
  
  supports_block_expectations   # Turn on block support as we need to capture the error.
  
  match do |code_to_test|       # Start the testing block
    begin
      code_to_test.()           # Run our test within the begin/rescue block.
      false                     # If no exception then pass 'false' back to our test.
    rescue ActiveRecord::StatementInvalid => ex # Catch our exception
      ex.message =~ /#{constraint_name}/ # Look for a specific message defined in the expectations of our test.
    end
  end
end
