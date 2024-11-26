# App

## Intro

intro...........

gif.....

## Funtional description

### Use case

## Technical description

### Data Model

User
- id (string)
- name (string)
- email (string)
- password (string)
- avatar (string)
- favs (array Post Id)

Post
- id (string)

##  "PLanning"

Stories

## Add post

as a client i want to write a text and choose an image from disk and a create a post

### UI

- add + button in the footer
- on click open a modal window
- in modal show a form with post and cancel buttons, and an input field for the text
- on click post creates a new post in database by means of create-post logic
- on click cancel closes the modal window

### Data

- add post data model with fields: date, author, image, text

## List posts

- implment me!

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
