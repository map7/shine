class AddEmailConstraintToUsers < ActiveRecord::Migration[5.0]
  # The ~* is how Postgres does regular expression matching in constraints. 
  def up
    execute %{
ALTER TABLE
  users
ADD CONSTRAINT
  email_must_be_company_email
CHECK ( email ~* '^[^@]+@example\\.com$' )
    }
  end
  
  def down
    execute %{
ALTER TABLE
  users
DROP CONSTRAINT
  email_must_by_company_email
    }
  end
end
