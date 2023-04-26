import { gql } from '@apollo/client'

export const OWN_REPOSITORIES_QUERY = gql`
  query MyRepositories($after: String, $first: Int) {
    viewer {
      repositories(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          url
          description
          stargazerCount
          forkCount
          owner {
            avatarUrl
            login
            url
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`
