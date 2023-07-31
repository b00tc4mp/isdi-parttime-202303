# App

## Intro

This webapp is the official web for Alex MayBe, an andalusian musician. It provides all the information that their fans need, including events information (dates, location, etc...), updates, media, contact, and social network integration. It also provides a section to manage all events, updates, media and messages from the contact section, accessible only to band members (or someone who they authorize). Updates will be pushed via RSS too.

It uses React, Tailwind CSS, NextJS, MongoDB and Mongoose.

## Functional description

### Use cases

- add administrator
- modify administrator credentials
- delete administrator

- see events list
- add event
- modify event
- remove event
- toggle event visibility

- see updates list
- add update
- modify update
- remove update
- toggle update visibility

- add lyric post
- modify lyric post
- delete lyric post
- toggle lyric post visibility

- see messages list
- read message
- toggle message read/unread
- delete message


- send message
- subscribe to RSS?

## Technical description

### Data model

Administrator
- id (oid)
- name (string)
- email (string)
- password (string)
- social networks (array of social network info) 

Update
- id (string)
- author (oid, refers to Administrator id)
- title (string)
- image (string)
- text (string)
- date (date)
- visibility (boolean)

Lyric Post
- id (string)
- author (oid, refers to Administrator id)
- media link (array of string)
- text (string)
- date (date)
- visibility (boolean)

### Test Coverage



## Planning

### Epics & Stories

#### Access control

- Me as a administrator, I want to access to the administration dashboard

##### Tasks

