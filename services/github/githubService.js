const axios = require("axios");

const api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
    }
});

/**
 * Fetches the authenticated GitHub profile.
 */
async function getProfile() {
    const response = await api.get("/user");

    return response.data;
}

/**
 * Lists recently updated repositories for the authenticated user.
 */
async function getRepositories() {
    const response = await api.get("/user/repos", {
        params: {
            sort: "updated",
            per_page: 100
        }
    });

    return response.data;
}

/**
 * Fetches recent commits for a repository and normalizes the payload.
 */
async function getCommits(repo) {
    const response = await api.get(`/repos/${process.env.GITHUB_USERNAME}/${repo}/commits`, {
        params: {
            per_page: 10
        }
    });

    return response.data.map(commit => ({
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
        sha: commit.sha.substring(0, 7)
    }));
}

/**
 * Fetches open pull requests for a repository.
 */
async function getPullRequests(owner, repo) {
    const response = await api.get(
        `/repos/${owner}/${repo}/pulls`,
        {
            params: {
                state: "open",
                per_page: 20
            }
        }
    );

    return response.data;
}

/**
 * Fetches open issues for a repository, excluding pull requests.
 */
async function getIssues(owner, repo) {
    const response = await api.get(
        `/repos/${owner}/${repo}/issues`,
        {
            params: {
                state: "open",
                per_page: 20
            }
        }
    );

    return response.data
        .filter(issue => !issue.pull_request)
        .map(issue => ({
            number: issue.number,
            title: issue.title,
            author: issue.user.login,
            state: issue.state,
            created_at: issue.created_at
        }));
}
module.exports = {
    getProfile,
    getRepositories,
    getCommits,
    getPullRequests,
    getIssues
};