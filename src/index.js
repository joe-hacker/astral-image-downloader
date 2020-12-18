const astralApi = require("./utils/astralApi");
const login = require("./utils/astralLogin");
const { createWriteStream, mkdirSync, existsSync } = require("fs");
const fetch = require("node-fetch");
const { credentials } = require("../config.json");

if (!existsSync("./images")) {
    mkdirSync("./images");
};

(async () => {
    const jwt = await login(credentials);
    if (!jwt) {
        console.log("failed to fetch jwt");
        return;
    }
    
    const Client = new astralApi(jwt);
    const { _id } = await Client.getUser(); 
    const images = await Client.getImages(_id);

    for (image of images) {
        const { link, filename } = image;
        const file = createWriteStream(`./images/${filename}`);
        console.log("downloading", filename);
        const fileResponse = await fetch(link);
        fileResponse.body.pipe(file);
        console.log("succesfully downloaded", filename);
    };
})();