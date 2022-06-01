## Setup an instance

Image: ubuntu 

Security Group: Allow HTTP, HTTPS

## Create a domian 

Create a free domain at freenom (wzenfe.ga/)
Add DNS records to map the web address to the  EC2 server

Name <<blank>> Type A, TTL 3600, Target <<ec2 public ip>>
Name <<WWW>> Type A, TTL 3600, Target <<ec2 public ip>>


## Install Stuff

```
sudo apt install nginx
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
/* The objective of Certbot, Let's Encrypt, and the ACME (Automated Certificate Management Environment) protocol is to make it possible to set up an HTTPS server and have it automatically obtain a browser-trusted certificate, without any human intervention. This is accomplished by running a certificate management agent on the web server.
https://snapcraft.io/install/certbot/ubuntu
*/ 
sudo ln -s /snap/bin/certbot /usr/bin/certbot
/*Create a soft link in /usr/bin folder*/

sudo certbot --nginx -d wzenfe.ga -d www.wzenfe.ga
/* Certbot needs to be able to find the correct server block in your Nginx configuration for it to be able to automatically configure SSL. You should have a server block for your domain at /etc/nginx/sites-available/example.com with the server_name directive already set appropriately.*/


systemctl status nginx
/* Check Status of nginx*/

sudo nginx -t
/* Don’t run, just test the configuration file. */


git clone https://github.com/Wealthzen/beta-front-end.git

cd beta-front-end

cd wealthzen-frontend-main/

sudo apt install nodejs

sudo apt install npm

npm install

npm run build
/* Creates the build folder */


sudo chown -R ubuntu /var/www/html
mv build /var/www/html
cd /var/www/html

sudo mv build ..
/* Move build to /var/www/ */

cd ..

sudo mv html html_old
sudo mv build html
sudo chown -R ubuntu /var/www/html
```

## Access the Site

Point the browser to <<wzenfe.ga>> (as configured in src/)

# wealthzen-frontend

`src > app > utils.js`

#### Change the IPv4 address and port number 
From my understanding, <br>
backend is on one instance <br>
and optimizer is on another instance.

```
export const getBaseUrl = () => {
    let baseURL;

    if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    ) {
        baseURL = 'http://XXX.XXX.XXX.XXX:XXXX/';
    } else {
        baseURL = window.location.href;
    }

    return baseURL;
};

export const getBaseOptimizerUrl = () => {
    let baseURL;

    if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    ) {
        baseURL = 'http://XXX.XXX.XXX.XXX:XXXX/';
    } else {
        baseURL = window.location.href;
    }

    return baseURL;
};
```
