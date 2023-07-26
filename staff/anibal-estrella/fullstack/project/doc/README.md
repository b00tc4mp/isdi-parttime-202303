# Live Dive App
![](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXE3NWRqY2dpdmo4MWx4dmczdTV5bm1tZ3o1cmFnMWRlbzd3eHkzbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Etgl96VVzkQqQ/giphy.gif)

## Intro

This web application is a community designed for musicians, music events enthusiasts, and melomaniacs who want to keep track of upcoming and past live music events. The app provides an accessible and user-friendly interface, allowing users to keep track of future events and share to other users and shocase their past events' memorabilia.

## Functional Description

### Use Cases

- Add Event: Users can add a new live music event to the app by providing relevant information such as the event name, date, venue, and an optional image representing the event.
- Add an Event Review: Users can add reviews as text and attach a multimedia file to the review as audio, video or image.
- Modify Event: Users have the option to edit the details of an existing event, including the event name, date, venue, and event image.
- Modify Review: Users have the option to edit the details of an existing event, including the event name, date, venue, and event image.
- Add score To event: when adding a review users can score using a scale from 1 to 100 the event to share their event impression, as 1 being bad, and 100 excelent.
- Remove Event: Users can delete an event from the app, removing it from their list of tracked events.
- Toggle Like Event: Users can express their interest in an event by liking it. They can toggle the like status to show or remove their interest.
- Toggle Favorite Event: Users can mark specific events as favorites, making it easier for them to access their most cherished events.

## Technical Description

### Data Model
#### User

- id: Unique identifier for the user (object id).
- name: Name of the user (string).
- nickName: nickName of the user (string).
- email: Email address of the user (string).
- password: Encrypted password for user authentication (string).
- avatar: URL or path to the user's avatar image (string).
- location: prefered location of the user.
- favEvents: An array of object ids referring to the user's favorite events.
- favArtists: an array of ids from api of artists
- favEvents: following future and past events array of objects ids (srting)
- scored events: scores given to an event array of objects includiding events object id and a score.

#### Event

- id: Unique identifier for the event (oid).
- author: Object id referring to the user who created the event (oid).
- image: URL or path to the event's image (string).
- eventInfo: Text Information or description of the event (string).
- date: date of the event (string)
- location: geolocation (???)
- lineUp: array od artists containing artist Apis ids (API Ids)
- venue: Venue information for the event (string)(API id?).

#### Review
- id: Unique identifier for the Review (oid).
- reviewedEvent: object id of the reviwed event (oid).
- author: id of the user that created the review (string).
- image: url of the uploaded file (string).
- video: url of the uploaded file (string).
- audio: url of the uploaded file (string).
- text: url of the uploaded file (string).
- score: average score given from users array of numbers 1/100 (number)

### Test Coverage
To ensure the reliability and correctness of the app, comprehensive test coverage will be implemented. The tests will cover different use cases and scenarios to validate the functionality and catch potential issues.

[Link](https://github.com/)

## Planning
Planning in the following link:
https://github.com/users/anibalestrella/projects/1

### Epics & Stories
#### Access Control
#### Create an Event and Refresh Events
- Me as a user, I want to be able to Create an Event and visualize an updated list of events.
- Me as a user, i want to be able to add an artist's details to the event'd lineup automatically using musicbrainz API.
#### Edit an Event and Refresh List
- Me as a user, i want to be able to
#### Delete an Event and Refresh List
- Me as a user, i want to be able to
#### Create an Event review and refresh list
- Me as a user, i want to be able to
#### Toggle fav an event
- Me as a user, i want to be able to
#### Toggle fav an artist
- Me as a user, i want to be able to
#### Fav an artist
- Me as a user, i want to be able to
#### Add artists to the user artists fav list suing Spotify API
- Me as a user, i want to be able to