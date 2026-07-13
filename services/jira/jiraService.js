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
async function getProjects() {

    const response = await api.get("/rest/api/3/project");

    return response.data;

}
async function getMyIssues() {

    const response = await api.post(
        "/rest/api/3/search/jql",
        {
            jql: "assignee=currentUser() AND resolution=Unresolved ORDER BY priority DESC",
            maxResults: 20
        }
    );

    return response.data.issues;

}
module.exports = {
    getMyProfile,
    getProjects,
    getMyIssues
};

