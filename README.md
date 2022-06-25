# Assessment-bknd MIR-top22

to use the repository:
1. clone the repository
2. execute in the command line `npm install` 
3. execute in the command line `npm run dev`

# End Points

| Route          | HTTP Verb | Route Middleware|Description|
| ----------     | --------- |-----------------|-----------|
|/users/register | POST      |N.A              |Create an user|
|/users/login    | POST      |N.A              |Loggin an user|
|/users/user-list|GET        |Authenticated    |Return the lists of user authenticated|
|/favs           |POST       |Authenticated    |Create a list for the user authenticated|
|/favs/:listId   |GET        |Authenticated    |Get the list with the favs items for the user authenticated|
|/favs/          |DELETE     |Authenticated    |Delete the list of favs|
|/items/:listId  |POST       |Authenticated    |Create a item in one list for the user authenticated|

# Usage
## /users/register - POST
Authorization: none

Body:
`{
    "email": "test1@test.com",
    "password":"Test123@"
}`

## /users/login - POST
Authorization: none

Body:
`{
    "email": "test14@test.com",
    "password":"Test123@"
}`
## /users/user-list - GET
Authorization: Bearer token

Body: none
## /favs - POST
Authorization: Bearer token

Body:
`{
    "titleList":"titulo de prueba 1"
}`
## /favs/:listId - GET
Authorization: Bearer token

Body: none

## /favs/ - DELETE
Authorization: Bearer token

Body: none

## /items/:listId - POST
Authorization: Bearer token

Body:
`{
    "itemTitle": "item 9",
    "description": "este item es el 9",
    "link":"www.bacano98.com.co"
}`

# Visual model for db
The following graphic shows the model design for the database:

![imagen](https://user-images.githubusercontent.com/54606412/175207912-b2a5704d-b60d-493e-9078-c4fa5fe79e1b.png)


