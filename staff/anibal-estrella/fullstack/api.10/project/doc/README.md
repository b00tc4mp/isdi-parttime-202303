# App

## Intro

blah blah

![](https://cdn.discordapp.com/attachments/1083393632062689350/1121130512161976372/hb.gif)

## Functional description

### Use cases

- add post
- modify post
- remove post
- toggle like post
- toggle fav post

## Technical description

### Data model

User
- id (string)
- name (string)
- email (string)
- password (string)
- avatar (string)
- favs (string array, refers to Post id) 

Post
- id (string)
- author (string, refers to User id)
- image (string)
- text (string)
- likes (string array, refers to User id)
### Test Coverage
![Alt text](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077)
## "Planning"

### Epics & Stories

##### Add post

as a client i want to write a text and choose an image from disk and a create a post

##### UI

- add + button in the footer
- on click open a modal window
- in modal show a form with post and cancel buttons, and an input field for the text
- on click post creates a new post in database by means of create-post logic
- on click cancel closes the modal window

##### Data

- add post data model with fields: date, author, image, text

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

#### Like / unlike in post

- TODO add heart button in each post
- TODO call toggle like on heart button click
- TODO re render posts
- TODO implement toggle like logic

#### Save / unsave in post

- TODO

