# Worko API

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install

#Completed All the points provided to create api

1. Create a NodeJs project with MVC architecture
    a. Create controller layer
    b. Create Service layer
    c. Create DAO layer
    d. Create Models for CRUD operations
    e. Create DTO for Request and response
    f. Add Validator framework
2. Create API:
    a. Create API for resource /worko/user
       i. GET – list user
       ii. GET - /worko/user/:userId - get user details
       iii. POST -  create user
       iv. PUT - update user
       v. PATCH - update user
       vi. DELETE - soft delete user in DB
    b. Required Payload for User
        i. Id (Generated)
        ii. Email
        iii. Name
        iv. Age
        v. City
        vi. Zip code
    c. Validate following fields on API call
        i. Email
        ii. Zip Code
        iii. Id - in case of POST/PUT/DELETE
    d. Persist User Information in Database
        i. Choose DB of your choice (NoSql is preferred)
        ii. Read DB config from Environment variable
    e. Write Unit tests with at least 60% coverage
    f. Prepare Readme/getting started guide 

##Authentication
  ###Implement basic authentication for all the APIs
