# Variables
NAME=wealthzen-frontend
VERSION=0.0.1
REGISTRY_HOST=192.53.115.165:5000

# add "insecure-registries":["192.53.115.165:5000"] to /etc/docker/daemon.json 

# Fetch the .env file
if [ -f ./.env ]; then
    source ./.env
fi

echo "Building ${NAME} Docker image with version ${VERSION}. Push to ${REGISTRY_HOST}/${NAME}"
# Login to docker registry
# ...

# Build production ready docker
npm run build

docker build -t $NAME:$VERSION -f deployment/Dockerfile.prod .

# Push to docker registry
docker tag $NAME:$VERSION $REGISTRY_HOST/$NAME:$VERSION
docker push $REGISTRY_HOST/$NAME:$VERSION

# Push as latest
docker tag $REGISTRY_HOST/$NAME:$VERSION $REGISTRY_HOST/$NAME:latest
docker push $REGISTRY_HOST/$NAME:latest