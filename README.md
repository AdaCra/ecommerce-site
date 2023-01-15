# ecommerce-site

MERN STACK: - Mongoose, - Express.js, - React, - Node.js, - Javascript - Redux,

API's - Stripe payment API

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
  - [x] Establish atlas DB
  - [x] Product CRUD
    - [x] Get all products
    - [x] Get single product
    - [x] Find products by keywords
    - [x] Delete products
    - [x] Product Filtering
  - [ ] Setup Cloudinary storage of product pictures

- [x] User DB
  - [x] Establish User Models
  - [x] Establish atlas DB
  - [x] Password Encryption    
  - [x] Account Authentication
  - [x] Password Encryption
  - [x] JSON Webtoken
  - [x] ACTP only Cookie
  - [x] User Access Control (admin)
  - [x] User Roles
  - [x] User Password Reset
    - [x] generate encrypted token
    - [x] email link to user
  - [ ] User CRUD
    - [x] Create User
    - [x] Logout User
    - [x] Edit User
    - [x] Delete User
    - [x] User blocking

- [x] Orders DB
  - [x] Establish Order Models
  - [ ] Create Order
  - [ ] Find Order by ID
  - [ ] Find all User Orders
  - [ ] Find Order by User
  - [ ] Find Order by Product

- [x] Pagination (browser overload)
- [x] Error Handling
