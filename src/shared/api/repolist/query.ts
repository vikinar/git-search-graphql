import { gql } from '@apollo/client'

export const SEARCH_REPOSITORIES_QUERY = gql`
  query searchRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
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
  }
`
