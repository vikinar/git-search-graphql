import { ApolloClient, InMemoryCache } from '@apollo/client'

import { ACCESS_TOKEN, API_URL } from '../../config'

export const client = new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          viewer: {
            merge: true,
          },
        },
      },
    },
  }),
})
