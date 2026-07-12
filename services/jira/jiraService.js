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
async function getMyProfile() {

    const response = await api.get("/rest/api/3/myself");

    return response.data;

}

module.exports = {
    getMyProfile
};

