const express = require("express");
const router = express.Router();

const {
    getProfile,
    getRepositories,
    getCommits
} = require("../services/github/githubService");


router.get("/profile", async (req, res) => {

    try {

        const profile = await getProfile();

        res.json(profile);

    } catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({
            error: "Unable to contact GitHub"
        });

    }

});
router.get("/repos", async (req, res) => {

    try {

       const repos = await getRepositories();

        const simplified = repos.map(repo => ({
            name: repo.name,
            owner: repo.owner.login,
            private: repo.private,
            language: repo.language,
            default_branch: repo.default_branch,
            updated_at: repo.updated_at,
            html_url: repo.html_url
        }));

        res.json(simplified);

    } catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({
            error: "Unable to fetch repositories"
        });

    }

});
router.get("/commits/:repo", async (req, res) => {

    try {

        const commits = await getCommits(req.params.repo);

        const simplified = commits.map(commit => ({

            author: commit.commit.author.name,

            message: commit.commit.message,

            date: commit.commit.author.date,

            sha: commit.sha.substring(0, 7)

        }));

        res.json(simplified);

    } catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({
            error: "Unable to fetch commits"
        });

    }

});

module.exports = router;