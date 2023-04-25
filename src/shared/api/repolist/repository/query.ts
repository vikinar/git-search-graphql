import { gql } from '@apollo/client'

export const GET_REPO_BY_ID = gql`
  query GetRepoById($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      url
      createdAt
      updatedAt
      stargazerCount
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
`
