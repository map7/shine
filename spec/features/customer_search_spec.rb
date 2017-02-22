require "rails_helper"

feature "Customer Search" do
  let(:email) {"pat@example.com"}
  let(:password) {"password123"}
  
  def create_customer(first_name:,
                      last_name:,
                      email: nil)

    username = "#{Faker::Internet.user_name}#{rand(1000)}"
    email ||= "#{username}#{rand(1000)}@" +
      "#{Faker::Internet.domain_name}"

    Customer.create!(
                     first_name: first_name,
                     last_name: last_name,
                     username:username,
                     email:email
                    )
  end

  before do
    User.create!(email:email,
                 password: password,
                 password_confirmation: password)

    create_customer first_name: "Chris",    last_name: "Aaron"
    create_customer first_name: "Pat",      last_name: "Johnson"
    create_customer first_name: "I.T.",     last_name: "Pat"
    create_customer first_name: "Patricia", last_name: "Dobbs"
    create_customer first_name: "Pat",      last_name: "Jones", email: "pat123@somewhere.net"

    # Login
    visit "/customers"
    fill_in "Email", with: email
    fill_in "Password", with: password
    click_button "Log in"    
  end

  
end
