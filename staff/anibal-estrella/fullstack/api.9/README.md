# API

## Endpoints


| action | method | path   | body                                                   | status |  
|--------|--------|--------|--------------------------------------------------------|--------|
| register user | POST   | /users | { "name": "...", email: "...", password: "..." }| 201    |
| authenticate user | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
...