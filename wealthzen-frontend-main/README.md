## Setup an instance

Image: ubuntu 

Security Group: Allow HTTP, HTTPS

## Install Stuff

```
sudo apt install nginx
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d wztestfe.ga www.wztestbe.ga
sudo certbot --nginx -d wztestfe.ga www.wztestfe.ga
sudo certbot --nginx -d wztestfe.ga -d www.wztestfe.ga
systemctl status nginx
sudo nginx -t
ls
git clone https://github.com/Wealthzen/beta-front-end.git
ls
cd beta-front-end
ls
cd wealthzen-
cd wealthzen-frontend-main/
ls
sudo apt install nodejs
ls
npm install
sudo apt install npm
npm install
npm run build
ls
sudo chown -R ubuntu /var/www/html
mv build /var/www/
mv build /var/www/html
cd /var/www/html
ls -Fila
sudo mv build ..
cd ..
ls
mv html html_old
sudo mv html html_old
sudo mv build html
sudo chown -R ubuntu /var/www/html
```

## Access the Site

Point the browser to <<wztestfe.ga>> (as configured in )

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
