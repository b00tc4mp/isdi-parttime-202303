# App

## Intro

Application consisting of a summary generator through artificial intelligence, in which doubts and questions about different topics from users can also be resolved.

### Fuctional description

### Use cases
- search summary
- interact with chatbot (ask questions request summarys)
- generate post (with summary)
- publish post
- modify post
- delete post
- toggle like post
- toggle fav post

### Data model

User
- id (oid)
- name (string)
- email(string)
- password(string)
- avatar (string)
- favs (oid array, refers to Summary id)

Post
- id (string)
- author (oid, refers to User id)
- text (string)
- likes (oid array, refers to User id)
- suggestions (array of contributions from other users)

Comment
- id (oid)
- author (string)
- auhotr id (oid)
- text (string)

Suggestion
- id (oid)
- author (oid, refers to the User id)
- post (oid, refers to the Post id)
- title (string)
- content (string)

Conversation
- id (oid)
- author (oid, refers to User id)
- messages (array of messages containing the information of a conversation between chatbot and user)

Message
- id (oid)
- role (string)
- content (string)


### Test Coverage

![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1125)

## Planning

### Epics & Stories

#### Access control

- Me as a user, I want to register my credentials and acces with them to the App

##### Tasks

- build html
- build basic css
- implement register functionality
- implement login functionality
- implement home welcome functionality

#### Ask questions, create posts, and refresh posts list

- Me as user, I want to talk with the bot to ask some questions
- Me as user, I want ask the chat bot to generate a summary about some topics

##### Tasks

- implement a chat bot window to interact with it
- implement an 'ask me' button to talk to the chat bot
- implement a 'generate summary' button to make a summary
- implement prompt logic to generate responses and summaries (input: text)
- implement a 'create post' button to create a post with the generated summary
- implement a 'copy' button to copy the generated response
- implement logic to persist the info (post with summary) in database 
- implement retrievePosts logic to get all posts form database
- implement a panel for listing posts in home

#### Edit a post and refresh list

- Me as user, I want to have the edit option (as a button) in every post I created, open the Edit dialog with it, and save the changes in the post
- Me as user, I want to edit the comment section, to delte any comment if there are any inappropiate one
- Me as user, I want to see the list of updated posts with the changes applied in any of my posts

##### Tasks

- implement an 'edit' button to edit an existing post in all the posts that belong to the use connected (in the session)
- implement a 'delete comment' comment button to remove inappropiate comments in the posts that belong to the user connected()
- implement the modal window to edit the post
- implement logic to save in database the changes made to the post and its comment section
- add a call to refresh the posts list after saving the changes in the edited post

#### Delete a post and refresh list

- Me as a user, I want have a delete option (as a button) in any post I create, open a Delete dialog with it, and preceed to delete the post if accepted (or cancel it otherwise)
- Me as user, I want to see the list of summaries updated with the changes applied in any of my posts

##### Tasks

- implement a 'delete' button in any of the posts of the conencted user (in the session)
- implement deletePost logic to remove post from database
- implement a modal window to ask the user if he/she really want to deletethe post (two buttons: delete, cancel)
- add a call to refresh the posts list after deleting one post

#### Generate an improvement suggestion and refresh list

-Me as a user, I want to have the option to generate improvement suggestions (as a button) in every summary in the feed, open a dialog with it, and proceed to make the suggestion

##### Tasks

- implement an 'add suggestion' button to each post that does not belong to the user connected (in session)
- implement modal window to write the suggestion (form with two text inputs: title (reason of the suggestion) and content (description of the suggestion))
- implement generateSuggestion logic to save suggestion in database
- add call to refresh posts list with the new suggestions

#### Delete suggestion and refresh list

- Me as user, delete a suggestion made by me.

##### Tasks

- implement 'delete button' in every suggestion made by me
- implement deleteSuggestion logic to remove suggestion from database
- add call to refresh the posts list wiht the updated changes

#### Watch made suggestions, remove the checked ones in own posts and refresh list

- Me as user, I want to see the suggestions made in all posts to see if the contribution i want to make is already done.
- Me as user, I want to remove the suggestions made in my posts once checked.

##### Tasks

- implement 'suggestions' button in each post that does not belong to the connected user (in session) to open a window with all the suggestions made.
- implement logic to retrieve all the suggestions made in one post
- implement logic to remove the suggestions cheched by user in his/her posts
- add call to refresh the posts with the made changes