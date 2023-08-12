# Welcome to RoamDesk - Your Guide to the Coolest Workspots in Barcelona!

## Description 
RoamDesk is a brand-new app designed to help you discover the perfect spot for remote work in the lively city of Barcelona. From charming cafes and foodie-favorite restaurants to buzzing coworkings and peaceful libraries, RoamDesk has you covered!

🔍 Powered by the Community  
We believe in teamwork and collective genius! RoamDesk is fueled by an awesome community of remote work hustlers who share their fantastic recommendations and honest reviews.

💡 Real Tips for Real Wins  
No fluff, just the good stuff! RoamDesk serves up all the essential information you need: free WiFi for smooth connections, access to plugs to keep you charged up, and even pet-friendly spots for your furry buddies. Get ready to plan your ultimate remote work setup like a pro.

📍 Your Personal Favorites List  
Create your own personalized list of go-to spots. RoamDesk’s Favorites feature lets you save your most-loved workspots for a productivity-packed day. No more hunting, your ideal spot is just a tap away!

🌟 Add, Review, and Roam  
Discover a hidden gem? Share it with the RoamDesk tribe by adding new places. Leave reviews, and let your fellow roamers know where the remote magic happens!

<img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDZrYzdzbXp6ZTA5bzFsMzB3Z3BheG9vOXVpbjVyMWFjanBndWVraSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dB15acdZ12Z7JJ6lOC/giphy.gif' > </img>

## Funcional description

### Use cases

- Create a new workspot
- Edit your workspots information
- Delete your workspots
- Search for workspots
- Narrow your search using filters
- See all workspots information 
- Add reviews
- Add workspots to a favourites list

### Design
https://www.figma.com/file/HBNb09aX1SxAI73ki1v6Ip/ROAMDESK-Final-Project?type=design&mode=design&t=ZZjHTrcHzVSww9TX-1

## Technical description

### Data model

#### User
- id: ObjectId
- email: String
- name: String
- password: String
- avatar: String
- favorites: Array of ObjectId (referring to Workspot id)

#### Workspot
- author: ObjectId (referring to User _id)
- image: String
- name: String
- location: Reference to Location Schema
- description: String
- type:
  - coffeeShop: Boolean
  - restaurant: Boolean
  - coWorking: Boolean
  - library: Boolean
  - hotelLobby: Boolean
- features:
  - Reference to WiFi Schema
  - Reference to Plugs Schema
  - Reference to Noise Schema
  - accessibility: Boolean
  - petFriendly: Boolean
  - ensuiteKitchen: Boolean
  - onSiteRestaurant: Boolean
  - meetingRooms: Boolean
  - parking: Boolean
  - bikeRack: Boolean
  - storage: Boolean
  - printScanCopy: Boolean
  - projector: Boolean
  - windowView: Boolean
- reviews: Array of Strings
- likes: Array of ObjectId (referring to User id)

## Location Schema
- street: String
- postalCode: String
- city: String
- country: String
- districts: Reference to District Schema
- mapLocation: Reference to Map Location Schema

## District Schema
- ciutatVella: Boolean
- gracia: Boolean
- horta: Boolean
- lEixample: Boolean
- lesCorts: Boolean
- nouBarris: Boolean
- santAndreu: Boolean
- santMarti: Boolean
- santsMontjuic: Boolean
- sarriaSantGervasi: Boolean

## Map Location Schema
- location: String 
- coordinates: Array of Numbers

## WiFi Schema
- unlimitedFree: Boolean
- timeLimited: Boolean
- timeLimitedWithPurchase: Boolean
- paidOptions: Boolean
- unavailable: Boolean

## Plugs Schema
- none: Boolean
- few: Boolean
- plenty: Boolean

## Noise Schema
- quiet: Boolean
- moderate: Boolean
- loud: Boolean


### Test Coverage  

## Planning
https://trello.com/invite/b/O8KlY9Nd/ATTIbef2d93ba0db358820d157a0fc53d2a02F4E5045/roamdesk






