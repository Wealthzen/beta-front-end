# Wealthzen

<br>

# Environment Setup (ubuntu)

## Update

```bash
sudo apt update
sudo apt upgrade -y
```

## Nodejs installation

```bash
sudo apt install npm
```

## MongoDB

-   Follow the Documentation `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/`
-   If the current version of ubuntu is 22 then installation fails with the following error:

```
The following packages have unmet dependencies:
 mongodb-org-mongos : Depends: libssl1.1 (>= 1.1.1) but it is not installable
 mongodb-org-server : Depends: libssl1.1 (>= 1.1.1) but it is not installable
 mongodb-org-shell : Depends: libssl1.1 (>= 1.1.1) but it is not installable
```

-   Follow the below thread to clear the above error and then continue the installation:
    [https://askubuntu.com/questions/1403619/mongodb-install-fails-on-ubuntu-22-04-depends-on-libssl1-1-but-it-is-not-insta](https://askubuntu.com/questions/1403619/mongodb-install-fails-on-ubuntu-22-04-depends-on-libssl1-1-but-it-is-not-insta)

<br />

# Installation (Development Environment)

## Download the Source Code (git)

```bash
git clone https://github.com/Wealthzen/beta-front-end.git
cd beta-front-end
```

## Setting up the Backend

```bash
cd wealthzen-backend-express/
npm install
echo 'MONGO_URI=mongodb://localhost:27017/wealthzen' > .env
mongoimport --jsonArray --db wealthzen --collection questions --file data/questions.json
npm start
```

## Setting up the Frontend

```bash
cd wealthzen-front-end/
npm install
npm start
```

# Installation (Production Environment)

-
-
-
