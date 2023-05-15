# App

## Intro

intro...........

gif.....

## Funtional description

### Use case

- add post
- modify post
- remove post
- toggle like post
- toggle fav post
- post auction

## Technical description

### Data Model

User
- id (string)
- name (string)
- email (string)
- password (string)
- avatar (string)
- favs (string array, refers to Post Id)

Post
- id (string)
- author (string, refers to User id)
- image (string)
- text (string)
- likes (string array, refers to User id)
- date (date, refers to create post)
- dateLastModified (date, refers to last  modified post)

postsAuction
- postId (string, post id)
- dateEnd (date, end auction)
- price (number, actual price)
- userId (string, id user auction})

##  "PLanning"

### Stories

## Add post

as a client i want to write a text and choose an image from disk and a create a post

### UI

- add + button in the footer
- on click open a modal window
- in modal show a form with post and cancel buttons, and an input field for the text
- on click post creates a new post in database by means of create-post logic
- on click cancel closes the modal window
- on click change mode

### Data

- add post data model with fields: date, author, image, text

## List posts

- 

## Update post

- discern my posts in post list (presentation) and show edit button on them
- open edit modal on edit button click
- call update post logic on edit form submit
- implement update post logic

## Author name and avatar in post

- TODO 
- añadir elemtos en post
- buscar el usuario en la recarga de cada post y dibujar 

## Like / unlike in post

- TODO
- añadir botones de + y -
- metodo de actulizacion del post

## Save / unsave in post

- TODO

## Auction post

- seller
    - seller management modal
    - check post and user
    - check post status
    - initial price
    - auction end date
    - save sales

- buyer
    - purchase bid management modal
    - bid entry
    - bid up
    - update sales

- auction
    - check sale date
    - make sale