# Test app for FF

### Info

You can use docker-compose file for lifting docker containers. For now there is only 1 Docker container so composer isn't needed, but I have left if in the case that we need to add DB

lift docker composer

```docker-compose up```

find docker container id with command

```docker ps```

exec bash on container

```docker exec -it #CONTAINER_ID bash```

### Testing

Test the app inside container running ```npm test```

### Running

Lift the app inside container running ```npm start```

### Postman collection

For manually testing the routes use provided Postman collection file ffTestApp.postman_collection