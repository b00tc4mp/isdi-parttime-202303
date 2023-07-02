# How to configure and run the app on aws

## 1. Register:
signin.aws.amazon.com
2-> budget
3-> s3
4-> give getObject permision policy
5-> create ec2 instance and connect to it
6-> install docker with yum-> sudo yum install docker
7-> run mongo-> sudo docker run -d -p 27017:27017 --name=mongo mongo:6.0.3
8-> create github action to have a pipeline
9-> register to dockerhub
10-> create repository github secret: https://github.com/docker/login-action#docker-hub
11-> configure github action for build and push:
https://github.com/docker/build-push-action

12-> back on EC2-> (sudo docker run -d -p 80:4321 rucev/backend)

** sudo docker ps --> shows docker coontainers running

13-> connect backend (container) to mongo (container) on EC2 

--> install docker compose
https://stackoverflow.com/questions/36685980/why-is-docker-installed-but-not-docker-compose

--> write docker-compose
vim docker-compose.yml
i
pegar --> el de mi repo!

--> esc :wq

-->$sudo docker-compose up

$ curl -v localhost:80/ --> hello api

--> deamon mode:
$sudo docker-compose up -d

curl -v -X POST localhost:80/levels -H "Content-Type: application/json" -d '{"name": "curlTest", "layout": [["empty", "bomb", "stonks", "empty", "dirt", "bomb", "dirt", "empty", "start"]], "id": "id-ex1"}'  

