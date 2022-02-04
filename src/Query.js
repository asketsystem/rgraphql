const githubQuery = (pageCount, queryString) => {
    return {
    query: `
        {
            viewer {
                name
            }
            search(query: "${queryString}user:asketsystem sort:updted-desc", type: REPOSITORY, first: 10) {
                repositoryCount
                nodes {
                ... on Repository {
                        name
                        description
                        id
                        url
                        viewerSubscription
                        licenseInfo {
                            spdxId
                        }
                    }
                }
            }
        }
    `,
    };
};

  export default githubQuery