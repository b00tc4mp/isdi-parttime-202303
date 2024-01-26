# Project setup

## Local

### Requirements
- NodeJs
- Mongo

To execute on local download the files and run them as specified:

### App
[Click here >>](../app/README.md)

### Api
[Click here >>](../api/README.md)

### Com
[Click here >>](../com/README.md)

</br>
</br>

## AWS

Github, through github actions, updates the image on push. It's automatic, but could fail. So always check for errors first.

Go to EC2, connect to the machine. Check the ip of the instance and keep it update, then run:

```sh
$ sudo docker-compose down # only if it was already running
$ sudo docker system prune -a # to clean local cache
$ sudo docker-compose up -d # run services on deamon mode
```

To know more about how this project was deployed on AWS [click here!](./aws-config.md)