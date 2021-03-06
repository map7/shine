class Customer < ApplicationRecord
  has_many :customers_shipping_address
  has_one :customers_billing_address
  has_one :billing_address, through: :customers_billing_addresses, source: :address

  def primary_shipping_address
    self.customers_shipping_address.find_by(primary: true).address
  end
end
