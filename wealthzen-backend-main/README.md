# WealthZen Backend

WealthZen Backend service, build with Laravel.

## Deployment guide

### Build docker image

Update `VERSION` to the greater version than current in `build_docker.sh`, then run:

```bash
./deployment/build_docker.sh
```

Make sure you can access the Docker registry, defined at `REGISTRY_HOST` in `build_docker.sh`.

### Deploy with docker-compose

Create a `docker-compose.yml` file and an `.env` file in the same folder.

- The `docker-compose.yml` file you can copy the content from `deployment/docker-compose.prod.yml`.
- The `.env` file can be copied from `deployment/example.env` file.

There are several important variables in the `.env` file:

- Database connection info is defined with `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`. The example `docker-compose.yml` deploy a `MySQL` database on the same server with other services, but it is recommended to use a remote database service for the best stability & reliability.
- `REACT_APP_API_URL` and `REACT_APP_OPTIMIZER_URL` define the API and Optimizer API endpoints for front-end app.
- `DB_PORT`, `BACKEND_PORT`, `APP_PORT` are the ports to be open from database, back-end service and front-end service, respectively. Make sure the server ports are open, too.

#### Start the services

. Run:

- if there is no vendor folder:
```bash
composer install
```

- for composer to work on a fresh system with no PHP, run `composer install` after these steps:
```bash
sudo apt install composer
sudo apt-get install php-xml
sudo apt-get install phpunit
sudo apt-get install php-curl
```

Before running docker-compose, run these commands:
```bash
export APP_SERVICE=${APP_SERVICE:-"laravel.test"}
export DB_PORT=${DB_PORT:-3306}
export WWWUSER=${WWWUSER:-$UID}
export WWWGROUP=${WWWGROUP:-$(id -g)}
```

```bash
docker-compose up -d
```

To update, run:

```bash
docker-compose pull
docker-compose up -d
```

To turn off the services, run:

```bash
docker-compose down
```

You can also deploy the front-end service in the docker-compose file, and use Nginx to config the route, as in `nginx.example.conf`.

### Other useful docker commands 

Check docker is running 
```bash 
docker ps
```


### Start the service with Kubernetes

To be defined...

## Import questions

Edit or create the `json` file as `mock_questions.json` file. Then call:

```bash
curl --location --request POST 'https://host.com/api/questions/import' \
--form 'file=@"/path/to/mock_questions.json"'
```

Note that if a posted question has the same `phase` and `order` values as an existing question in the database, it will be updated instead of created.
