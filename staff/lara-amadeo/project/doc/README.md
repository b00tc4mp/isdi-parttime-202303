# Tupper

## Intro

In the days we live in, people tend to have less and less time. Yet, there has been a big surge in interest towards cooking, food, and well-being. I believe there's a significant portion of the population that has a lot of time and exceptional cooking skills, while another significant portion lacks time due to the fast-paced nature of the present. It is crucial to connect those with few time to those who have plenty of time and an enthusiastic love for cooking.

![](https://media.giphy.com/media/wry7vkOOmDTMs/giphy.gif)

## Functional description

### Use cases

- See my profile
 - Create a new meal
 - See meal detail
 - See meals of other users
 - See Chef detail page
 - Add meals to my cart
 - Pay meals
 - See ordered meals to me in my profile
 - Set a Chef as favourite
 - See my favourites chefs
 - See reviews in Chef detail page
 - Add a review
 - Search for a meal

## Technical description

### Data model

Users
- id (oid)
- name (string)
- Username (string)
- email (string)
- password (string)
- avatar (string)
- availability(array of obj)
- likedChefs (oid array, refers to user id)
- reviews? (array of obj)
- meals (array of obj(meal id, status(string(in cart, pending to pick up, delivered, cancelled))))

Meals
- id (string)
- author (oid, refers to User id)
- images (img/imgs)
- title (string)
- description (string)
- category (string || array of strings)
- ingridients (array of strings)
- batchDuration (string)
- price (number)

### Test Coverage

![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077)

## Planning

For planning details, go check [Notion](https://lily-dentist-2a0.notion.site/ISDI-Final-project-9e8e2b7b2b034ac2923d8d9808f9d614?pvs=4)