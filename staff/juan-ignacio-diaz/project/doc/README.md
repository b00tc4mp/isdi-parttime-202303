# App

## Intro

Shared shopping list

The application allows you to create a shopping list, with several participants. They will be able to discuss the products to buy in the list chat, add and remove products and mark the purchased products adding the purchase price to make the cost sharing at the end of the list.
In the creation of the list the name, date of completion will be indicated. The creating user will be the administrator and will select the participants from his contact list. A notification will be sent to them, which they will have to accept in order to enter the shopping list.
The insertion of products allows to indicate the product, quantity, estimated price, type of product and stores where it can be purchased. 
The purchase of products allows to filter the products of the commerce in which we are buying and to organize them by types. We will mark the products that we add to the cart indicating their price and at the end of the purchase the products in the cart will pass to the status of purchased by the participant. The products that are already in the cart cannot be modified (option to incorporate a photo of the purchase receipt).
At the end of the purchase a summary of purchases is generated, indicating the money that each participant must contribute to the rest.

![](https://www.ideasyahorro.com/wp-content/uploads/2021/07/lista-de-la-compra.jpg)

## Functional description

### Use cases

- add user
- login
- update e-mail
- update password
- update avatar
- update mode
- add contact
- delete contact
- create the shopping list
- close the shopping list
- request for addition to shopping list
- accept addition to shopping list
- add stores
- add products
- delete products
- toggle like product
- update product stores
- update product type
- update product estimated price
- update product comment
- update chat comment
- update product state
- review list of products whit filter
- review list of strores
- review list of product type
- generate purchase summary

## Technical description

### Data model

User
- id (oid)
- name (string)
- email (string)
- password (string)
- avatar (string)
- mode (string)
- contacts (oid array, refers to user id) 

Stores
- id (oid)
- name (string)

ProductTypes
- id (oid)
- name (string)

Chat
- id (oid)
- text (string)
- author (oid, refers to user id) 

Products
- id (oid)
- name (string)
- howMany (number)
- estimatedPrice (number)
- date (date)
- author (oid, refers to user id) 
- price (number)
- dateOfPurchase (date)
- authorOfPurchase (oid, refers to user id) 
- state (number)
- likes (oid array, refers to user id)
- stores (oid array, refers to stores id)
- type (oid, refers to ProductTypes id)
- comment (String)
- notifyProductUpdate (oid array, refers to user id)

Lists
- id (oid)
- name (string)
- author (oid, refers to user id) 
- users (oid array, refers to user id) 
- date (date)
- dateToEnd (date)
- notifyChatUpdate (oid array, refers to user id)
- chat (type Chat)
- products (type Products)

### Test Coverage

![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077)

## Planning

### Epics & Stories

#### Access control

- Me as a user, I want to register my credentials and access with them to the App

##### Tasks

- TODO build html
- TODO build basic css
- TODO implement register functionality
- TODO implement login functionality
- TODO implement home welcome functionality

#### Create and access a shared shopping list

- Me as a user, I want to create a shared shopping list, enter name list and request for addition user to shopping list.
- Me as user, I want to see the list of shared shopping list and accept addition to shopping list. 

##### Tasks

- TODO implement shared shopping list creation button.
- TODO implement a list of shared shopping lists to which I can accept to access
- TODO implement list of shared shopping lists in which I participate to access
- TODO implement modal window of creation of shared shopping list with assignment of name, date of end and assignment of contacts who can participate
- TODO implement shared shopping list modal window, will contain access to chat and shared shopping list and access to shared shopping list summary

#### Add comment to chat
- Me as user, I want to add and view the comments of the users in the list

##### Tasks

- implement add comment
- implement reviews comments

#### Add product to the shared shopping list and update list

-I, as a user, want to insert products in the shared shopping list.
##### Tasks

- TODO implement modal window to insert products with name, quantity, type of product, trade, comment

#### Review shared shopping list

- Me as user, I want to review the products in the shared shopping list. 
- Me as user, I want to filter by number of likes, product type, merchants, users, products purchased.

##### Tasks

- TODO implement modal window to review products.
- TODO implement filter selector for review.
- TODO implement edit and delete buttons.

### Edit a product from the list and update list.

-As a user, I want to be able to edit a product. 

##### Tasks

- TODO implement modal window to edit a product name, quantity, type of product, trade, comment
- TODO add refresh of the shared shopping list

### Remove a product from the list and refresh list

-As a user, I want to be able to delete a product with a delete control dialog.

##### Tasks

- TODO implement deletion of a product
- TODO implement modal window to accept the deletion of a product
- TODO add refreshing of the shared shopping list