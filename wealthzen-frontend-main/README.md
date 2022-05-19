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
