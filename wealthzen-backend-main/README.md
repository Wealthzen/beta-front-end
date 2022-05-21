# WealthZen Backend

WealthZen Backend service, build with Laravel.

## Deployment guide

### Build docker image

Update `VERSION` to the greater version than current in `build_docker.sh`, then run:

```bash
./deployment/build_docker.sh
```

Make sure you can access the Docker registry, defined at `REGISTRY_HOST` in `build_docker.sh`.

### Start the service with docker-compose

If you use `docker-compose`, create a `docker-compose.yml` file in the folder you wish to deploy, with the content based on `docker-compose.prod.yml`. Run:

```bash
docker-compose up -d
```

To update, run:

```bash
docker-compose pull
docker-compose up -d
```

You can also deploy the front-end service in the docker-compose file, and use Nginx to config the route, as in `nginx.example.conf`.

### Start the service with Kubernetes

To be defined...

## Import questions

Edit or create the `json` file as `mock_questions.json` file. Then call:

```bash
curl --location --request POST 'https://host.com/api/questions/import' \
--form 'file=@"/path/to/mock_questions.json"'
```

Note that if a posted question has the same `phase` and `order` values as an existing question in the database, it will be updated instead of created.

### For error: permission denied while connecting to the Docker daemon socket
Run:
```sudo chmod 666 /var/run/docker.sock
```
