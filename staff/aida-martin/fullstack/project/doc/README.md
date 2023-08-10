# Funko App

## Description

You will be able to view the complete catalog of Funko Pop figures that exist on the market, add them to your collection list or wishlist.

It will be possible to search by category, filter or order by other parameters.

Also, you will be able to know its characteristics (type of pop, year of release, status, trending value...)

<img src='https://i.gifer.com/21Yc.gif' width='100%'> </img>

The 'trade' section will be a space for buying and selling second-hand where you can find figures to buy or sell your own.

You will be able to see the ads and contact the seller or buyer through the chat to agree on the transaction that will be carried out outside the application.

## Funcional description

### Use cases

#### Admin (exclusive)

- Pops CRUD
    - Create pop
    - Edit pop
    - Delete pop

- Categories CRUD
    - Create category
    - Edit category
    - Delete category

- All Sales Posts CRUD

#### User

- View latest releases
- View complete catalog (search, filter, order)
- Manage your collection list
- Manage your whislist
- View sales posts in 'trade' section (search, filter, order)
- Contact the seller through the chat if you wish
- Manage your sales posts (CRUD)

### UI design

Figma:

https://www.figma.com/file/HMkXmnAVyCGVC4F0D4sI4U/Final-Project?type=design&node-id=0%3A1&mode=design&t=jaQM6iSOOX9ASzop-1

## Technical description

### Data model

#### User
- id (oid)
- name (string)
- email (string)
- password (encrypted string)
- avatar (string)
- adress (string)
- phoneNumber (string)
- role (string)
- popCollect ([oid refers Pop])
- popWhislist ([oid refers Pop])

#### Image
- id (oid)
- src (string)
- alt (string)
- width (number)
- height (number)

#### Category
- id (oid)
- name (string)
- slug (string)
- imageList (Image)
- imageDetail (Image)

#### Pop
- id (oid)
- variant (string)
- exclusivity (string)
- name (string)
- number (number)
- images ([Image])
- category (oid refers Category)
- collect (string)
- release (string)
- availability (string)
- trendingValue (number)
- userCollect (boolean)
- userWhislist (boolean)
- date (date)

#### Sale Post
- id (oid)
- author:
    - id (oid refers User)
    - name (string)
    - avatar (string)
    - location (string)
- tittle (string)
- description (string)
- number (number)
- images ([Image])
- variant (string)
- category (string)
- exclusivity (string)
- date (date)
- price (number)
- status (string)

### Test Coverage

//Coverage link

## Planning

Notion:

https://www.notion.so/57704f1b37cd4f87b74183273bbcdfab?v=4b458dbb9d7943f8a7b11928a4aaff87&pvs=4