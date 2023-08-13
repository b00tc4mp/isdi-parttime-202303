# App

## Intro

### Shared shopping list.

The application allows you to create a shopping list, with several participants. 

![](https://www.ideasyahorro.com/wp-content/uploads/2021/07/lista-de-la-compra.jpg)

They will be able to discuss the products to buy in the list chat, add and remove products and mark the purchased products adding the purchase price to make the cost sharing at the end of the list.

In the creation of the list the name, date of completion will be indicated. The creating user will be the administrator and will select the participants from his contact list. A notification will be sent to them, which they will have to accept in order to enter the shopping list.

The insertion of products allows to indicate the product, quantity, estimated price, type of product and stores where it can be purchased. 

The purchase of products allows to filter the products of the commerce in which we are buying and to organize them by types. We will mark the products that we add to the cart indicating their price and at the end of the purchase the products in the cart will pass to the status of purchased by the participant. The products that are already in the cart cannot be modified (option to incorporate a photo of the purchase receipt).

At the end of the purchase a summary of purchases is generated, indicating the money that each participant must contribute to the rest.



## Functional description

### Use cases

#### All
- Add contact user
- Delete contact user

#### Owner
- Create the shopping list
- Close the shopping list
- Request for addition to shopping list
- Accept addition to shopping list
- Update chat comment
- Generate purchase summary

#### Owner and guest
- Add products
- Delete products
- Toggle like product
- Update product stores
- Update product type
- Update product estimated price
- Update product comment
- Update product state
- Review products leaked
- Add stores
- Review stores
- Review product type

### Users stories

#### Access control

- Me as a user, I want to register my credentials and access with them to the App

#### Create and access a shared shopping list

- Me as a user, I want to create a shared shopping list, enter name list and request for addition user to shopping list.
- Me as user, I want to see the list of shared shopping list and accept addition to shopping list. 

#### Add messages to list

- Me as user, I want to add and view the comments of the users in the list

#### Add stores

- Me as user, I want to add and view the stores 

#### Add product to the shared shopping list and update list

- I, as a user, want to insert products in the shared shopping list.

#### Review shared shopping list

- Me as user, I want to review the products in the shared shopping list. 
- Me as user, I want to filter by number of likes, product type, merchants, users, products purchased.

### Edit a product from the list and update list.

-As a user, I want to be able to edit a product. 

### Remove a product from the list and refresh list

-As a user, I want to be able to delete a product with a delete control dialog.


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

Store
- id (oid)
- name (string)

Message
- id (oid)
- text (string)
- author (oid, refers to user id) 
- date (date)

Product
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
- type (String, enum)
- comment (String)
- view (oid array, refers to user id)

List
- id (oid)
- name (string)
- owner (oid, refers to user id) 
- guests (oid array, refers to user id) 
- date (date)
- dateToEnd (date)
- invited (oid array, refers to user id) 
- viewMessages (oid array, refers to user id)
- messages (type [Message])
- stores (type [Store])
- products (type [Product])

### Test Coverage

![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077)

## Planning

- https://anfac-my.sharepoint.com/:x:/g/personal/jignacio_ideauto_com/EanO8MAFxHlBoFxM-w-I76UBLwiTtFz-d6333BSjDwONYw?e=dD2O8e