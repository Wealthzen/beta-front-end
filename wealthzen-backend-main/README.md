# WealthZen Backend

WealthZen Backend service, build with Laravel.

## Deployment guide

SSH into the instance
`sudo apt install unzip`



Copy Docker.zip to home folder using SFTP or using git clone

`git clone <link of Docker.zip in the github repository>`

`cd ~`

`unzip Docker.zip`

`cd Docker`

`chmod +x 01_initscript.sh`

`./01_initscript.sh`

Logout of ssh and log back in - Otherwise the next step won't work 



`cd ~/Docker`

`chmod +x 02_createnetworkandsecrets.sh`



Open this file( 02_createnetworkandsecrets.sh) and set the database password (by changing the code in the file). 
Replace `SET_YOUR_DB_PASSWORD_HERE` in the code  with the password of your choice.

For ex. If you want your password to be MySecr3tP@ssword, change the code to

```echo 'MySecr3tP@ssword' | docker secret create mariadb_root_password -```


Next, run the script,

`./02_createnetworkandsecrets.sh`



Run the docker stack

`dockerup`

#### Warning : if you dockerup, you have to wait for all the services to be running before you can proceed or dockerdown, or it may cause problems (that is difficult to troubleshoot and may potentially crash the instance).
Use `docker service ls` to check that all services are up and running. 

Create the database table

Enter the database container

`dcntshalp mariadb`

`mysql -u root -p`

Enter the database password you set above

`CREATE DATABASE wealthzen;`

`exit`

`exit`

or Alternatively, Use a database client and create a database called wealthzen



copy contents of wealthzen-backend to ~/Docker/mydevstack/webroot/wealthzen-backend using SFTP or git clone
`git clone <link of backend in the github repository>`



`cd ~/Docker/mydevstack/webroot/wealthzen-backend/`

Rename the file `.env.example` to `.env`



Open the file and add the database details

```
DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=wealthzen
DB_USERNAME=root
DB_PASSWORD=MySecr3tP@ssword
```



Enter the PHP container

`dcntshalp php81`

`cd /var/www/html/wealthzen-backend/`



`composer install`

`php artisan key:generate`



`php artisan migrate`



Create Dummy Users

`php artisan tinker`

`User::factory()->count(20)->create()`

`Exit Tinker`

`exit`



Exit the container

`exit`



Populate the questions in the database

`curl --location --request POST 'https://wztest.ga/api/questions/import' --form 'file=@“./mock_questions.json"'`


