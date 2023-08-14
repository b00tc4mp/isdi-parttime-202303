# App

## Intro

This webapp is the official web for Alex MayBe, an andalusian musician. It provides all the information that their fans need, including events information (dates, location, etc...), updates, lyrics posts, contact and social network integration. It also provides a section to manage all events, updates, lyrics posts and messages from the contact section, accessible only to him (and/or someone who he authorizes). Updates will be pushed via RSS too.

It uses React, Tailwind CSS, HeadlessUI, NextJS, MongoDB and Mongoose. API written in JavaScript, App written in TypeScript.

## Functional description

### Use cases

- add administrator
- authenticate administrator
- modify administrator credentials
- delete administrator

- see events list
- add event
- preview event
- modify event
- remove event
- toggle event visibility

- see updates list
- add update
- preview update
- modify update
- remove update
- toggle update visibility

- see lyrics list
- add lyric post
- preview lyric post
- modify lyric post
- delete lyric post
- toggle lyric post visibility

- see messages list
- read message
- toggle message read/unread
- delete message

- see update
- see event
- see lyric post
- create message
- subscribe to RSS?

## Technical description

### Data model

Administrator
- id (oid)
- name (string)
- email (string)
- password (string)

Update
- id (string)
- author (oid, refers to Administrator id)
- title (string)
- image (string)
- text (string)
- rss message text (string)
- date (date)
- visibility (boolean)

Event
- id(string)
- author (oid, refers to Administrator id)
- title (string)
- date (date)
- location (string)
- text (string)
- links (array of links)
- visibility (boolean)


Lyric Post
- id (string)
- author (oid, refers to Administrator id)
- title (string)
- media link (array of string)
- text (string)
- song info (string)
- date (date)
- visibility (boolean)

Message
- id (string)
- author (user email)
- title (string)
- text (string)
- date (date)
- status (boolean)

Users Data
- users mail (array of users mail)

Social Networks
- id (string)
- name (string)
- link (string)

### Test Coverage


## Design
Design will be managed with Figma: https://www.figma.com/file/M8POaubUvK4RN7R1Xidmv6/AMW?type=design&node-id=0%3A1&mode=design&t=qOYEB5PC6ZbirbBk-1
## Planning
Planning will be managed with Trello: https://trello.com/invite/b/Sw9wR2tM/ATTIa767f6a0e5966b75f726de8b3eedf89740CE1060/amw

### Epics & Stories

#### Add Administrator

- Me as an administrator, I want to add another administrator

##### Tasks

- Set up MongoDB
- Initiate core API functionality
- Create Mongoose model
- Set up Mongoose
- Create an administrator manually
- Implement add administrator

#### Authenticate Administrator

- Me as an administrator, I want to add authenticate myself in the system

##### Tasks

- Create tokenizer and encryption
- Implement authenticate administrator
- Modify add administrator so it requires authentication

#### Modify Administrator Credentials

- Me ad an administrator, I want to modify my credentials.

##### Task

- Implement modify credentials

#### Delete Administrator

- Me as an administrator, I want to delete an administrator account

##### Task

- Implement delete administrator

#### See Event List

- Me as an administrator, I want to see the event list
- Me as a user, I want to see the event list

##### Task

- Implement event listing

#### Add Event

- Me as an administrator, I want to create an event

###### Task

- Implement add event

#### Preview Event

- Me as an administrator, I want to see a preview of how a user will see my event

##### Task

- Implement preview event

#### Modify Event

- Me as an administrator, I want to modify an event information

##### Task

- Implement modify event

#### Delete Event

- Me as an adminitrator, I want to delete an event

##### Task

- Implement delete event

#### Toggle Event Visibility

- Me as an administrator, I want to toggle an event's visibility

##### Task

- Implement toggle event visibility

#### See Updates List

- Me as an administrator, I want to see the updates list
- Me as a user, I want to see the updates list

##### Task

- Implement updates listing

#### Add Update

- Me as an administrator, I want to create an update and push it to RSS if it's visible

###### Task

- Implement add update
- Implement RSS functionality

#### Preview Update

- Me as an administrator, I want to see a preview of how a user will see my update

##### Task

- Implement preview update


#### Modify Update

- Me as an administrator, I want to modify an update information

##### Task

- Implement modify update

#### Delete Update

- Me as an adminitrator, I want to delete an update

##### Task

- Implement delete update

#### Toggle Update Visibility

- Me as an administrator, I want to toggle an update's visibility and push it to RSS if it's visible

##### Task

- Implement toggle update visibility


#### See Lyrics List

- Me as an administrator, I want to see the lyrics list
- Me as a user, I want to see the lyrics list

##### Task

- Implement lyrics listing

#### Add Lyric Post

- Me as an administrator, I want to create an lyric post

###### Task

- Implement add lyric post

#### Preview Lyric Post

- Me as an administrator, I want to see a preview of how a user will see my lyric post

##### Task

- Implement preview lyric post


#### Modify Lyric Post

- Me as an administrator, I want to modify a lyric post

##### Task

- Implement modify lyric post

#### Delete Lyric Post

- Me as an administrator, I want to delete a lyric post

##### Task

- Implement delete lyric post

#### Toggle Lyric Post Visibility

- Me as an administrator, I want to toggle an lyric post's visibility

##### Task

- Implement toggle lyric post visibility

#### See Message List

- Me as an administrator, I want to see the messages list

##### Task

- Implement messages listing

#### Read Message

- Me as an administrator, I want to read a message

###### Task

- Implement read message

#### Toggle Message Read/Unread

- Me as an administrator, I want to toggle the read status of a message

##### Task

- Implement toggle message read/unread

#### Delete Message

- Me as an administrator, I want to delete a message

##### Task

- Implement delete message

#### Create Message

- Me as a user, I want to create a message

##### Task

- Implement create message

#### Suscribe to RSS feed

- Me as a user, I want to suscribe to the RSS feed

##### Task

- Implement suscription to RSS feed


#### See Event

- Me as a user, I want to see an event

##### Task

- Implement see event

#### See Update

- Me as a user, I want to see an update

##### Task

- Implement see update

#### See Lyric Post

- Me as a user, I want to see a lyric post

##### Task

- Implement see lyric post