const axios = require("axios");

const api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
    }
});

async function getProfile() {

    const response = await api.get("/user");

    return response.data;

}
async function getRepositories() {

    const response = await api.get("/user/repos", {
        params: {
            sort: "updated",
            per_page: 100
        }
    });

    return response.data;

}
async function getCommits(repo) {
    console.log(`Fetching commits for: ${process.env.GITHUB_USERNAME}/${repo}`);

    const response = await api.get(`/repos/${process.env.GITHUB_USERNAME}/${repo}/commits`, {
        params: {
            per_page: 10
        }
    });

    return response.data;

}

module.exports = {
    getProfile,
    getRepositories,
    getCommits
};