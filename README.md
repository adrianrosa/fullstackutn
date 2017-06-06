# UTN Fullstack
Project of course: Fullstack UTN http://www.lslutnfra.com/curso-fullstack <br />
API books (Node JS, Mongo) + IU React JS. <br />
Running on Docker containers.

## Mongo, API and React App

With __docker-compose__ we can define rules to run the containers in the correct order and with certain conditions necessary for everything to work.

## How to use (using docker)

### Install docker-compose
```bash
sudo bash install-docker-compose.sh
```

### Up containers
```bash
docker-compose up -d
```

## Warning

The ports __3000__, __3500__ Y __27017__ must be available.

## How to use (using without docker)

* Install mongo

* Install nodejs v 6.10

* Edit file __/etc/hosts__  add the follow line: __127.0.0.1	fullproject_mongodb_1__

* In the API folder run the command __npm start__

* In the APP folder run the command __npm start__

