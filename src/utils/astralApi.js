const fetch = require("node-fetch");
const { API_URL } = require("./astralApiConfig");

module.exports = class Api {
    constructor(jwt) {
        this.jwt = jwt;
    }

    async request(url, info) {
        if (info && !info.headers) 
            info.headers = {};
        else
            info = {};

        return await fetch(API_URL + url, {
            ...info,
            headers: {
                ...info.headers,
                cookie: `jwt=${this.jwt}`
            }
        });
    }

    async getUser() {
        const userResponse = await this.request("/users/@me");
        const user = await userResponse.json();
        return user;
    }

    async getImages(uid) {
        const imagesResponse = await this.request(`/users/${uid}/images`);
        const { images } = await imagesResponse.json();
        return images;
    }
}