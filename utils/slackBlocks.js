function dashboardBlocks(data) {

    return [

        {
            type: "header",
            text: {
                type: "plain_text",
                text: "🐙 GitHub Dashboard"
            }
        },

        {
            type: "divider"
        },

        {
            type: "section",
            fields: [

                {
                    type: "mrkdwn",
                    text: `*Repository*\n${data.repo}`
                },

                {
                    type: "mrkdwn",
                    text: `*Owner*\n${data.owner}`
                }

            ]
        },

        {
            type: "section",
            fields: [

                {
                    type: "mrkdwn",
                    text: `📝 *Commits*\n${data.commits}`
                },

                {
                    type: "mrkdwn",
                    text: `🔀 *Pull Requests*\n${data.pulls}`
                },

                {
                    type: "mrkdwn",
                    text: `🐞 *Issues*\n${data.issues}`
                }

            ]
        },

        {
            type: "divider"
        },

        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `🤖 *AI Insight*\n${data.summary}`
            }
        }

    ];

}

module.exports = {
    dashboardBlocks
};