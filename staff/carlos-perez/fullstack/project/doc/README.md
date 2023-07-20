# App

## Intro

This webapp will be the official web for MayBe, an andalusian music band. It will provide all the information that their fans need, including events information (dates, location, etc...), updates, media, contact, and social network integration. It will also provide a section to manage all events, updates, media and messages from the contact section, accessible only to band members (or someone who they authorize). Updates will be pushed via RSS too.

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
- add photo/album
- modify photo/album
- delete photo/album
- toggle photo/album visibility
- see messages list
- read message
- toggle message read/unread
- delete message
- add comment
- modify comment
- delete comment
- toggle comment visibility

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
- comments (array of comments)
- date (date)
- visibility (boolean)

Media
- id (string)
- author (oid, refers to Administrator id)
- type (audio/video/photo/album)
- file path (string)
- link (array of string)
- text (string)
- comments (array of comments)
- date (date)
- visibility (boolean)

### Test Coverage



## Planning

### Epics & Stories

#### Access control

- Me as a administrator, I want to access to the administration dashboard

##### Tasks

