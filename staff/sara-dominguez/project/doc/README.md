# b-Elevenzsd

## Intro

b-Elevenzsb is an employee portal, a digital platform that allows the company and its employees to stay in touch through an internal and personalized communication system.

![](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXlycDEwemJpYXliMmszYmk0eG5wbnJ5MjBhNWJmc3k2NGVweGVzNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/frBkZkz9tepdTOhsTY/giphy.gif)
<!-- ![](https://media2.giphy.com/media/ZciYhNqc9iFtC0yUTS/giphy.gif?cid=ecf05e47yr1ptklqda1kref6aw0v0qtph4nomcfmno2nz94e&ep=v1_gifs_search&rid=giphy.gif&ct=g) -->

## Functional description

### Use cases

- registration new employee
- modificate employees information
- remove employee access
- toggle like post
- toggle fav post

## Technical description

### Data model

Admin Users
- id (oid)
- name (string)
- email (string)
- password (string)
- avatar (string)
- favs (oid array, refers to Post id) 


- id (string)
- author (oid, refers to User id)
- image (string)
- text (string)
- likes (oid array, refers to User id)

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