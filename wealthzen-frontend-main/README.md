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
10  sudo apt install nginx
   11  sudo apt install snapd
   12  sudo snap install core; sudo snap refresh core
   13  sudo snap install --classic certbot
   14  sudo ln -s /snap/bin/certbot /usr/bin/certbot
   15  sudo certbot --nginx -d wztestfe.ga www.wztestbe.ga
   16  sudo certbot --nginx -d wztestfe.ga www.wztestfe.ga
   17  sudo certbot --nginx -d wztestfe.ga -d www.wztestfe.ga
   18  systemctl status nginx
   19  sudo nginx -t
   20  ls
   21  git clone https://github.com/Wealthzen/beta-front-end.git
   22  ls
   23  cd beta-front-end
   24  ls
   25  cd wealthzen-
   26  cd wealthzen-frontend-main/
   27  ls
   28  sudo apt install nodejs
   29  ls
   30  npm install
   31  sudo apt install npm
   32  npm install
   33  npm run build
   34  ls
   35  sudo chown -R ubuntu /var/www/html
   36  mv build /var/www/
   37  mv build /var/www/html
   38  cd /var/www/html
   39  ls -Fila
   40  sudo mv build ..
   41  cd ..
   42  ls
   43  mv html html_old
   44  sudo mv html html_old
   45  sudo mv build html
   46  sudo chown -R ubuntu /var/www/html
   47  history
   48  history 
   49  exit
   50  history 
   51  cat history >> whatidid.txt
   52  history >> whatidid.txt
