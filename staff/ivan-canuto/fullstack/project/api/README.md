# API

## Endpoints


|        action        | method |        path        |        body                                | status |  
|----------------------|--------|--------------------|------------------------------------------|--------|
| register user        | POST   | /users         | { "name": "...", email: "...", password: "..." }| 201    |
| authenticate user    | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| ask for response     | POST   | /conversations/:conversationId/askForResponse | { conversationId: "...", currentConversation: [] }      | 200    |
| create comment       | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| create conversation  | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| create post          | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| create suggestion    | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| delete all conversations | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| delete comment       | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| delete conversation  | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| delete post          | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| delete suggestion    | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| generate summary     | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| hide suggestion      | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve conversation | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve conversations | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve own suggestions | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve post        | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve posts       | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve post suggestions | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve saved posts | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve searched posts | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve seen posts  | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve suggestion  | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve user        | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| retrieve user posts  | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| save post as seen    | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| store input in database | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| toggle check suggestion | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| toggle like post     | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| toggle save post     | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| toggle visibility post | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| update post          | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| update suggestion    | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| update user avatar   | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| update user password | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
...