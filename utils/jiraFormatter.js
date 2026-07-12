function formatProfile(profile) {

    return `
👤 *${profile.displayName}*

📧 ${profile.emailAddress}
🆔 ${profile.accountId}
`;

}

module.exports = {
    formatProfile
};