# App

A social media app for publishing your posts and creating a profile with your favourite photos so everyone can see them.

## Fuctional description

- Add posts
- Edit posts
- Like posts
- Save posts
- View posts in profile
- View saved posts in profile
- Update user info: email, avatar, password

## Technical description

### Data model

User
- id (string)
- username (string)
- email (string)
- password (string)
- avatar (url)
- saves (strings array, refer to posts id)

Post
- id(string)
- author (string, refers to user id)
- image (url)
- caption (string)
- likes (string array, refers to users id)

## Planning

### Stories

#### Add post

as a client i want to write a text and choose an image from disk and a create a post

###### UI

- add button for creation post in home header
- on click open a modal window
- in modal show a form with post and cancel buttons, and an input field for the text and for the image URL
- on click post creates a new post in database by means of create-post logic
- on click cancel closes the modal window and does not affect database

###### Data

- add post data model with fields: id, date, author, image, text

#### List posts

- DONE implment me!

#### Update post

- DONE discern my posts in post list (presentation) and show edit button on them
- TODO open edit modal on edit button click
- TODO call update post logic on edit form submit
- TODO re render posts
- TODO implement update post logic


#### Author name and avatar in post

- TODO

##### Like / unlike in post

- TODO add heart button in each post
- TODO call toggle like on heart button click
- TODO re render posts
- TODO implement toggle like logic

#### Save / unsave in post

- TODO

