# ecommerce-site

MERN STACK: 
  - Mongoose,
  - Express.js,
  - React,
  - Node.js,
  - Javascript,
  - Redux,

API's: 
  - Stripe payment API
  - Tailwind

\*\*FRONTEND

- [ ] Main page

  - [ ] Specials
  - [ ] Product category
  - [ ] Product filtering
  - [ ] Product search
  - [ ] Shopping Cart
    - [ ] Shopping Cart retained after login

- [ ] Individual product page

  - [ ] Item Review page for logged in Users

- [ ] Users
  - [ ] Account Creation
    - [ ] Account Edit
    - [ ] Billing and shipping address
    - [ ] Cloud storage of profile picsP
  - [ ] Purchase function: stripe
  - [ ] Order confirmation
  - [ ] Order tracking
- [ ] Admin Login
  - [ ] Admin Dashboard
    - [ ] Orders
    - [ ] Product Management
      - [ ] Create
      - [ ] Edit
      - [ ] Delete
    - [ ] User Control

\*\*BACKEND

- [ ] Product DB
  - [x] Establish Product Models
  - [ ] Setup Cloudinary storage of product pictures
  - [x] Establish atlas DB
  - [x] Product CRUD
    - [x] Get all products
    - [x] Get single product
    - [x] Find products by keywords
    - [x] Create Product (admin)
    - [x] Delete products (admin)
    - [x] Product Filtering
  - [x] User reviews
    - [x] Add User Review
    - [x] Update/Edit User Review
    - [x] Delete User Review
    - [x] Get all reviews for a product

- [x] User DB
  - [x] Establish User Models
  - [ ] Setup Cloudinary storage of product pictures
  - [x] Establish atlas DB
  - [x] Password Encryption    
  - [x] Account Authentication
  - [x] Password Encryption
  - [x] JSON Webtoken
  - [x] ACTP only Cookie
  - [x] User Access Control (admin)
  - [x] User Roles (admin)
  - [x] User Password Reset
    - [x] generate encrypted token
    - [x] email link to user
  - [x] User CRUD
    - [x] Create User
    - [x] Logout User
    - [x] Edit User
    - [x] Delete User (admin)
    - [x] User Profile Suspension (admin)

- [x] Orders DB
  - [x] Establish Order Models
  - [x] Create Order
  - [x] Find Order by Order ID
  - [x] Find all Orders by Current User Profile
  - [x] Find all Orders (admin)
  - [x] Process Order by OrderID (admin)
  - [x] Delete Order (admin)

- [x] Pagination (browser overload)
- [x] Error Handling
