const fetch = require("node-fetch");
const { API_URL } = require("./astralApiConfig");

function parseCookie(cookie) {
    for (i of cookie.split(";")) {
        const [ index, value ] = i.split("=");
        if (index.endsWith("jwt")) {
            return value;
        }
    };
}

module.exports = async credentials => {
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const { success } = await loginResponse.json();

    if (success) {
        const cookie = loginResponse.headers.get("set-cookie");
        const jwt = parseCookie(cookie);
        return jwt;
    };
    
    return undefined;
}