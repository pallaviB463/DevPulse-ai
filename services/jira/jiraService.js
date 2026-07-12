const axios = require("axios");

const api = axios.create({
    baseURL: process.env.JIRA_BASE_URL,
    auth: {
        username: process.env.JIRA_EMAIL,
        password: process.env.JIRA_API_TOKEN
    },
    headers: {
        Accept: "application/json"
    }
});

module.exports = {
    api
};