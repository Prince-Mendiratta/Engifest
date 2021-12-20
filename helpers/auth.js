const cookie = require('js-cookie')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

// Set in Cookie
exports.setCookie = (key, value) => {
    cookie.set(key, value, {
        // 1 Day
        expires: 1
    })
}
// remove from cookie
exports.removeCookie = key => {
    cookie.remove(key, {
        expires: 1
    });
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
exports.getCookie = key => {
    return cookie.get(key);
};

// Set in localstorage
exports.setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Remove from localstorage
exports.removeLocalStorage = key => {
    localStorage.removeItem(key);
};

// Auth enticate user by passing data to cookie and localstorage during signin
exports.authenticate = (token, user) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', user);
    this.setCookie('token', token);
    this.setLocalStorage('user', user);
};

// Access user info from localstorage
exports.isAuth = () => {
    const cookieChecked = this.getCookie('token');
    if (cookieChecked) {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

exports.signout = next => {
    this.removeCookie('token');
    this.removeLocalStorage('user');
};