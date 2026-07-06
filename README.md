# library-management-system
  This is a library management API backend for the management of users and books
  # Routes And The Endpoints
  ## /users
  GET: Get the list of all the users in the system
  POST: To Register a user

## /users/{id}
GET: Get a user by id
PUT: Updating a user by id
DELETE: Delete entry of a user by id ( Check if the user still has an issue back && or any penalty left to be collected)

## /users/Subscription-Details/{id}
GET: Get a user subscription details by their ID
>>Date of Subscription
>> Valid till ?
>> Fine if any ?

# /Books
GET: Get all the books in the system
POST: Add a new book to the system
 
## /Books/{id}
GET: Get a book by its id
PUT: Update any book detail by id
DELETE: Delete a book by its id

## /Books/{Issue-Details}
GET: Get all the issued book

## /Books/{Issue-Details}/fine
GET : Get all issued books with fine

### Subsciption Types
>> Basic( 3 months)

>> Standard ( 6 months)

>> Premium (12 months)



>> If a user missed the renewal date, then user should be collected with 100rupee

>> If a user misses his subscription, then user should pay 100 rupee

>> If a user misses both renewal date and subscription then the collected amount is 200

## commands  

npm init
npm i express
npm i nodemon --save-dev
npm run dev

import { MongoClient } from 'mongodb';

