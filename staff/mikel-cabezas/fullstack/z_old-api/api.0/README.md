# API

## Endpoints


|<font color="green"> Action</font>               | method  | path                    | body                                                                 | status  |
| -------------------- | ------- | ----------------------- | ----------------------------------------------------                 | ------- |
| Register User        | POST    | /users                  | { "name": "...", "email": "...", "password": "..." }                 | 201     |
| Authenticate User    | POST    | /users/auth             | { "email": "...", "password": "..." }                                | 200     |
| Retieve User         | GET     | /users/:userId          |                                                                      | 200     |
| Update User Name     | PATCH   | /users/username/:userId | { "name": "..." }                                                    | 204     |
| Update User Email    | PATCH   | /users/email/:userId    | { "email": "..." }                                                   | 204     |
| Update User Image    | PATCH   | /users/image/:userId    | { "image": "..." }                                                   | 204     |
| Update User Password | PATCH   | /users/password/:userId | { "password": "...", "newPassword": "...", "repeatPassword": "..." } | 204     |


