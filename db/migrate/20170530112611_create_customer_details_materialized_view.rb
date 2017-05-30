class CreateCustomerDetailsMaterializedView < ActiveRecord::Migration[5.1]
  def up
    execute %{
CREATE MATERIALIZED VIEW customer_details AS
SELECT
  customers.id as customer_id,
  customers.first_name as first_name,
  customers.last_name as last_name,
  customers.email as email,
  customers.username as username,
  customers.created_at as joined_at,

  billing_address.id as billing_address_id,
  billing_address.street as billing_street,
  billing_address.city as billing_city,
  billing_state.code as billing_state,
  billing_address.zipcode as billing_zipcode,

  shipping_address.id as shipping_address_id,
  shipping_address.street as shipping_street,
  shipping_address.city as shipping_city,
  shipping_state.code as shipping_state,
  shipping_address.zipcode as shipping_zipcode
from
  customers
join customers_billing_addresses on
     customers.id = customers_billing_addresses.customer_id
join addresses billing_address on
     billing_address.id = customers_billing_addresses.address_id
join states billing_state on
     billing_address.state_id = billing_state.id
join customers_shipping_addresses on
     customers.id = customers_shipping_addresses.customer_id
     and customers_shipping_addresses.primary = true
join addresses shipping_address on
     shipping_address.id = customers_shipping_addresses.address_id
join states shipping_state on
     shipping_address.state_id = shipping_state.id
    }
    execute %{
CREATE UNIQUE INDEX
  customer_details_customer_id
ON
  customer_details(customer_id)
    }
  end

  def down
    execute "DROP MATERIALIZED VIEW customer_details"
  end
end
