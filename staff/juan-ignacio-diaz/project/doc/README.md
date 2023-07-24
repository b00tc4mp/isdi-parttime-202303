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
- review list of products
- generate purchase summary


## Technical description

### Data model

User
- id (oid)
- name (string)
- email (string)
- password (string)
- avatar (string)
- contact (oid array, refers to user id) 

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

- DONE build html
- DONE build basic css
- DONE implement register functionality
- DONE implement login functionality
- DONE implement home welcome functionality

#### Create a post and refresh posts

- Me as a user, I want to create a post with text and image
- Me as user, I want to see the list of created posts

##### Tasks

- DONE implement plus button at the bottom of home (footer)
- DONE implement modal window for creating a post (inputs: image, text)
- DONE implement createPost logic to persist the info (image, text) in database
- DONE implement retrievePosts logic to get all the posts from database
- DONE implement a panel for listing posts in home

#### Edit a post and refresh list

- Me as user, I want to have the edit option (as a button) in any post that I created, open the Edit dialog with it, and save the changes in the post
- Me as user, I want to see the list of posts updated with the changes applied in any of my posts

##### Tasks

- DONE add edit button in all the posts that belong to the user that is connected (in the session)
- DONE implement retrievePost logic to get the information of a post
- DONE implement the modal window for editing a post (inputs: image, text) showing the current information of the post when opened
- DONE implement updatePost logic to save the information of a post in db and mechanise in the edit post form submit
- DONE add a call to refresh the posts list after saving the changes in the edited post

#### Delete a post and refresh list

- Me as user, I want to have the delete option (as a button) in any post tha I created, open a Delete dialog with it, and proceed to delete the post if accepted (or cancel it otherwise)
- Me as user, I want to see the list of posts updated with the changes applied in any of my posts

##### Tasks

- DONE add delete button in all the posts that belong to the user that is connected (in the session)
- DONE implement deletePost logic to remove a post from database
- DONE implement the modal window for asking the user if she/he really wants to delete the post (two buttons: delete, cancel)
- DONE add a call to refresh the posts list after deleting the post

#### Migrate presentation layer to React

- DONE migrate all pages and components to React