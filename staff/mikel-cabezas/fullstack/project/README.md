# Map Playgrounds App


## General description 
This app allow to login (or register if not signed up) for search playgrounds in a map and collaborate/interact with in.

View the elements of each park, the recommended age of elements and if the place it's shaded or sun exposed.

Comment and rate parks for help other parents and childs.

<img src="https://media.giphy.com/media/ildLrpK7sOV9ky6NOf/giphy.gif" width="250"/>

Create issues in elements of park.

If you discover a playground is not in the app, you can create it.


In the register page, the user complete the profile with the ages of their children, for later view quickly if the park is compatible of their children.


In any playground, you can view the elements that are in the park, and view the recomended age for any element. 

---


## Functional description

### Use cases 
- Edit user information
- Rate playground 
- Create playground
- Create issue in playground
- Add comment to issue
- Explore playgrounds nearby
- Search playgrounds


### User stories
#### View playgrounds nearby
- View markers around the user directly in map
- View directly playgrounds in a modal box with: name, address, elements with ages, its sun exposed or shaded, and image gallery 
- interact with marker in map for open modal with this playground 
- interact with playground preview in nodal box for open another modal with this playground 

#### Search form
- Better display for: name, address, elements with ages, its sun exposed or shaded, and image gallery 
- Interact making a review or rate  
- create an issue 

#### User stories, IN CREATE PLAYGROUND
- If you discover a playground not entered in the app, you can create it if in around 10 meters does not have an other park. 



## TECHINAL DESCRIPTION 

### DATA MODELS 

User 
- id (string)
- name (string)
- email (string)
- password (string)
- childs ([Array]<'Numbers'>)
- Suscription (Input<'select'>)
- User comments (string)
- User ratings (string)
- User issues (string)


### Single Playground 
- id (string)
- address (string)
- coordenades (Object of Objects) {
    - latitude (number)
    - longitude (number)
}
- images ([Array]<'strings'>)
- elements (Array of Objects) Array > Object > two properties {
    - element: string ('playground'/'swings')
    - age: number (recommended age)
}
- Sun exposition (string/boolean) {
    - select > two options: sun exposed, shaded
}
- Go to button (string)